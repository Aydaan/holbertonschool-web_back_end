const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.type('text');

  fs.readFile(process.argv[2], 'utf8', (error, data) => {
    if (error) {
      res.send('Cannot load the database');
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    let output = 'This is the list of our students\n';
    output += `Number of students: ${students.length}\n`;

    const fields = {};

    students.forEach((student) => {
      const values = student.split(',');
      const firstname = values[0];
      const field = values[3];

      if (!fields[field]) {
        fields[field] = [];
      }

      fields[field].push(firstname);
    });

    Object.keys(fields).forEach((field) => {
      output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
    });

    res.send(output);
  });
});

app.listen(1245);

module.exports = app;
