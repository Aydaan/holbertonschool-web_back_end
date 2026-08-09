import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data.split('\n');
      const fields = {};

      for (let i = 1; i < lines.length; i += 1) {
        if (!lines[i].trim()) {
          continue;
        }

        const [firstname, lastname, age, field] = lines[i].split(',');

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstname);
      }

      resolve(fields);
    });
  });
}
