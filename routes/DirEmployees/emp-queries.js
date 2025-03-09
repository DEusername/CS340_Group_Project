let queries = {
  read: "SELECT idEmployee, firstName AS 'First Name', lastName AS 'Last Name', hireDate AS 'Hire Date', email, phone FROM Employees;",
  create: "INSERT INTO Employees (firstName, lastName, hireDate, email, phone) VALUES (?, ?, ?, ?, ?);",
  update: "UPDATE Employees SET firstName = ?, lastName = ?, hireDate = ?, email = ?, phone = ? WHERE idEmployee = ?;",
  delete: "DELETE FROM Employees WHERE idEmployee = ?;"
}

export default queries;