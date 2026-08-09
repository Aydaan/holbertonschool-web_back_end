import { readDatabase } from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv[2];

    readDatabase(database)
      .then((students) => {
        let result = 'This is the list of our students\n';

        const fields = Object.keys(students).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        fields.forEach((field) => {
          result += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
        });

        response.status(200).send(result.trim());
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const database = process.argv[2];

    readDatabase(database)
      .then((students) => {
        response.status(200).send(`List: ${students[major].join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
