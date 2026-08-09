const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');

    countStudents(process.argv[2])
      .then(() => {
        res.end();
      })
      .catch(() => {
        res.end('Cannot load the database\n');
      });
  } else {
    res.end('Hello Holberton School!');
  }
});

app.listen(1245);

module.exports = app;
