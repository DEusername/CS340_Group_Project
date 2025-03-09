let queries = {
  read: "SELECT idCustomer, firstName AS 'First Name', lastName AS 'Last Name', email, phone FROM Customers;",
  create: "INSERT INTO Customers (firstName, lastName, email, phone) VALUES(?, ?, ?, ?);",
  update: "UPDATE Customers SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE idCustomer = ?;",
  delete: "DELETE FROM Customers WHERE idCustomer = ?;"
}

export default queries;