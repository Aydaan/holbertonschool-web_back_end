const http = require('http');
const fs = require('fs');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!\n');
    return;
  }

  if (req.url === '/students') {
    fs.readFile(database, 'utf8', (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.end('Cannot load the database\n');
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);

      let output = `This is the list of our students\n`;
      output += `Number of students: ${students.length}\n`;

      const fields = {};

      students.forEach((student) => {
        const parts = student.split(',');
        const firstname = parts[0];
        const field = parts[3];

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstname);
      });

      Object.keys(fields).forEach((field) => {
        output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
      });

      res.end(output);
    });

    return;
  }

  res.statusCode = 404;
  res.end('Not found\n');
});

app.listen(1245);

module.exports = app;
