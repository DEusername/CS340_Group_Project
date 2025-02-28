let queries = {
  read: "SELECT idEmployee, firstName AS 'First Name', lastName AS 'Last Name', hireDate AS 'Hire Date', email, phone FROM Employees;",
  create: "INSERT INTO Employees (firstName, lastName, hireDate, email, phone) VALUES (:givenFirstName, :givenLastName, :givenHireDate, :givenEmail, :givenPhone);",
  update: "UPDATE Employees SET firstName = :givenFirstName, lastName = :givenLastName, hireDate = :givenHireDate, email = :givenEmail, phone = :givenPhone WHERE idEmployee = :givenIdFromForm;",
  delete: "DELETE FROM Employees WHERE idEmployee = :givenIdFromForm;",
}

export default queries;