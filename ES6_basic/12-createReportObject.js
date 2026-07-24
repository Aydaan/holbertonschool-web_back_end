export default function createReportObject(employeesList) {
  return{
    allEmployees: employeesList,
    
    getNumberOfDepartments(empployees) {
      return Object.keys(employees).length;   
    },
  };
}
