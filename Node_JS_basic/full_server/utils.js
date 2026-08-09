import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data.split('\n');
      const students = {};

      for (let i = 1; i < lines.length; i += 1) {
        if (!lines[i].trim()) {
          continue;
        }

        const [firstname, lastname, age, field] = lines[i].split(',');
        const cleanField = field.trim();

        if (!students[cleanField]) {
          students[cleanField] = [];
        }

        students[cleanField].push(firstname);
      }

      resolve(students);
    });
  });
}

export { readDatabase };
