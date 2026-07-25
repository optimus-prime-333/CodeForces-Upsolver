# Codeforces Upsolve Planner

Codeforces Upsolve Planner is a full-stack web application that helps competitive programmers find the Codeforces problems they attempted but have not solved yet. The app analyzes a user's Codeforces submissions, separates solved problems from attempted unsolved problems, and creates a clean upsolve list sorted by rating.

## Live Demo

```text
  https://code-forces-upsolver-cp2pz908h-lokresonu1-2924s-projects.vercel.app/
```

## GitHub Repository

 
```text
 https://github.com/optimus-prime-333/CodeForces-Upsolver
```

## Features

- Search by Codeforces handle
- Uses the official Codeforces API
- Fetches user submissions with `user.status`
- Fetches problem metadata with `problemset.problems`
- Detects solved problems using `OK` verdicts
- Finds attempted but unsolved problems for upsolving
- Sorts the upsolve list by rating in ascending order
- Displays total attempted problems
- Displays total solved problems
- Displays total upsolve problems
- Calculates average rating of the upsolve list
- Shows highest and lowest rated unsolved problems
- Shows rating distribution cards
- Provides client-side search by problem name
- Provides rating-based filtering
- Displays problem tags as colored pills
- Links directly to Codeforces problem pages
- Handles invalid handles, API failures, and users with no submissions
- Responsive design for desktop and mobile

## Tech Stack

- Node.js
- Express.js
- EJS
- Vanilla CSS
- Axios
- Codeforces API
- GitHub Actions
- Vercel

## How It Works

The application takes a Codeforces handle from the user and calls the official Codeforces API.

It fetches:

- `user.status` to get all submissions for the user
- `problemset.problems` to get problem details such as name, rating, and tags

For every submitted problem:

- If the problem has at least one submission with verdict `OK`, it is marked as solved.
- If the problem has submissions but no `OK` verdict, it is marked as attempted.
- The final upsolve list contains only attempted but unsolved problems.

Each upsolve problem includes:

- Contest ID
- Problem index
- Problem name
- Rating
- Tags

The final list is sorted by rating in ascending order so users can start with easier problems first.

## Project Structure

```text
project/
|-- api/
|   `-- index.js
|-- server.js
|-- package.json
|-- package-lock.json
|-- routes/
|   `-- index.js
|-- services/
|   `-- codeforces.js
|-- public/
|   `-- style.css
|-- views/
|   |-- home.ejs
|   `-- result.ejs
|-- .github/
|   `-- workflows/
|       |-- ci.yml
|       `-- vercel-deploy.yml
|-- vercel.json
|-- .gitignore
`-- README.md
```

## Installation

Clone the repository:

```bash
git clone  https://github.com/optimus-prime-333/CodeForces-Upsolver.git
```

Move into the project folder:

```bash
cd CodeForces-Upsolver
```

Install dependencies:

```bash
npm install
```
 
## Run Locally

Start the application:

```bash
npm start
```
 
Open the app in your browser:

```text
http://localhost:3000
```

## Build Check

Run the project build check:

```bash
npm run build
```
 
The build script checks the JavaScript files for syntax errors.

## Deployment

This project is prepared for deployment on Vercel.

The Express app is exported from `server.js` and used by `api/index.js`, which allows Vercel to run the app as a serverless function.

### Vercel Files

- `api/index.js` exports the Express app for Vercel.
- `vercel.json` rewrites all requests to the serverless Express entry point.
- `.github/workflows/vercel-deploy.yml` deploys the app to Vercel production on every push to the `main` branch.

### Required GitHub Secrets

Add these secrets in GitHub under:

```text
Repository Settings -> Secrets and variables -> Actions
```

Required secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### Automatic Deployment

On every push to the `main` branch, GitHub Actions will:

- Check out the repository
- Set up Node.js
- Install dependencies
- Run the build check
- Install the Vercel CLI
- Pull the Vercel production environment
- Build the project with Vercel
- Deploy to Vercel production

## CI/CD

The project includes GitHub Actions workflows for:

- Continuous integration checks
- Automatic Vercel production deployment
 

## Screenshots

 
### Home Page
 <img width="1886" height="873" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/fe1854fd-bc1c-4165-94e2-ecdf06f5f70c" />

 

### Result Page
 <img width="1858" height="899" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/477432ce-b66e-4461-83e7-1724c379d17c" />

 
 
## Error Handling

The application shows friendly messages for common problems:

- Empty handle input
- Invalid Codeforces handle
- Codeforces API failure
- User with no submissions

## Future Improvements

- Add tag-based filtering
- Add difficulty range filtering
- Export upsolve list as CSV
- Save upsolve plans for later
- Add user authentication
- Add charts for rating distribution
- Add progress tracking for solved upsolve problems
- Add dark mode
 
