const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.readFile(database, 'utf8', (err, data) => {
    if (err) {
      res.send('Cannot load the database');
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    let output = 'This is the list of our students\n';
    output += `Number of students: ${students.length}\n`;

    const fields = {};

    for (const student of students) {
      const columns = student.split(',');
      const firstname = columns[0];
      const field = columns[3];

      if (!fields[field]) {
        fields[field] = [];
      }

      fields[field].push(firstname);
    }

    for (const field of Object.keys(fields)) {
      output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
    }

    res.send(output);
  });
});

app.listen(1245);

module.exports = app;
