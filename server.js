const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Codeforces Upsolve Planner running at http://localhost:${port}`);
  });
}
