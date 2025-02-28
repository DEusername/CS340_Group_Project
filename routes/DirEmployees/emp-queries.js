let queries = {
  read: "SELECT idEmployee, firstName AS 'First Name', lastName AS 'Last Name', hireDate AS 'Hire Date', email, phone FROM Employees;",
  create: "",
  update: "",
  delete: "DELETE FROM Employees WHERE idEmployee = ? "
}

export default queries;