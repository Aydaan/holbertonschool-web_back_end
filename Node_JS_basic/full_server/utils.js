import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data.trim().split('\n');
      const fields = {};

      // Skip the header
      for (let i = 1; i < lines.length; i += 1) {
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