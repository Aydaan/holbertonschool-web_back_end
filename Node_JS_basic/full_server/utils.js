import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);
      const result = {};

      for (const student of students) {
        const columns = student.split(',');
        const firstname = columns[0];
        const field = columns[3];

        if (!result[field]) {
          result[field] = [];
        }

        result[field].push(firstname);
      }

      resolve(result);
    });
  });
}
