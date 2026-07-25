const express = require('express');
const { getUpsolvePlan } = require('../services/codeforces');

const router = express.Router();

router.get('/', (req, res) => res.render('home'));

router.get('/planner', async (req, res) => {
  const handle = req.query.handle?.trim();
  if (!handle) return res.status(400).render('result', { handle: '', error: 'Please enter a Codeforces handle.', data: null });
  try {
    const data = await getUpsolvePlan(handle);
    res.render('result', { handle, error: null, data });
  } catch (error) {
    const message = /not found|handles: user/i.test(error.message)
      ? 'We could not find that Codeforces handle. Check the spelling and try again.'
      : 'Codeforces is unavailable right now. Please try again in a moment.';
    res.status(502).render('result', { handle, error: message, data: null });
  }
});

module.exports = router;
