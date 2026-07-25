const axios = require('axios');

const API_URL = 'https://codeforces.com/api';
const client = axios.create({ baseURL: API_URL, timeout: 15000 });

async function apiGet(endpoint, params = {}) {
  try {
    const { data } = await client.get(endpoint, { params });
    if (data.status !== 'OK') throw new Error(data.comment || 'Codeforces API returned an error.');
    return data.result;
  } catch (error) {
    if (error.response?.data?.comment) throw new Error(error.response.data.comment);
    if (error.code === 'ECONNABORTED') throw new Error('The Codeforces API took too long to respond. Please try again.');
    throw error;
  }
}

async function getUpsolvePlan(handle) {
  const [submissions, problemData] = await Promise.all([
    apiGet('/user.status', { handle }),
    apiGet('/problemset.problems'),
  ]);

  if (!submissions.length) return { noSubmissions: true };

  const problemStates = new Map();
  for (const submission of submissions) {
    const { contestId, index } = submission.problem;
    if (!contestId || !index) continue;
    const key = `${contestId}-${index}`;
    const state = problemStates.get(key) || { attempted: false, solved: false };
    state.attempted = true;
    state.solved ||= submission.verdict === 'OK';
    problemStates.set(key, state);
  }

  const catalog = new Map();
  for (const problem of problemData.problems) {
    if (problem.contestId && problem.index) catalog.set(`${problem.contestId}-${problem.index}`, problem);
  }

  const attempted = [...problemStates.values()].filter((item) => item.attempted).length;
  const solved = [...problemStates.values()].filter((item) => item.solved).length;
  const upsolve = [...problemStates.entries()]
    .filter(([, state]) => state.attempted && !state.solved)
    .map(([key]) => catalog.get(key))
    .filter(Boolean)
    .map(({ contestId, index, name, rating, tags }) => ({ contestId, index, name, rating: rating || null, tags }))
    .sort((a, b) => (a.rating ?? Infinity) - (b.rating ?? Infinity) || a.name.localeCompare(b.name));

  const rated = upsolve.filter((problem) => problem.rating);
  const ratings = rated.map((problem) => problem.rating);
  const distribution = new Map();
  for (const problem of rated) distribution.set(problem.rating, (distribution.get(problem.rating) || 0) + 1);

  return {
    noSubmissions: false,
    upsolve,
    stats: {
      attempted,
      solved,
      totalUpsolve: upsolve.length,
      averageRating: ratings.length ? Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) : null,
      highest: ratings.length ? Math.max(...ratings) : null,
      lowest: ratings.length ? Math.min(...ratings) : null,
    },
    distribution: [...distribution.entries()].sort(([a], [b]) => a - b).map(([rating, count]) => ({ rating, count })),
    ratingOptions: [...distribution.keys()].sort((a, b) => a - b),
  };
}

module.exports = { getUpsolvePlan };
