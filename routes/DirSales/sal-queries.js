let queries = {
  read: "SELECT Sales.idSale, Sales.discountPercent AS 'Discount Percent', Sales.payment, Sales.date, CONCAT(Customers.firstName, ' ', Customers.lastName) AS 'Customer', CONCAT(Employees.firstName, ' ', Employees.lastName) AS 'Employee' FROM Sales INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer LEFT JOIN Employees ON Sales.Employees_idEmployee = Employees.idEmployee;",
  create: "INSERT INTO Sales (discountPercent, payment, date, Customers_idCustomer, Employees_idEmployee) VALUES (?, ?, ?, ?, ?);",
  update: "UPDATE Sales SET discountPercent = ?, payment = ?, date = ?, Customers_idCustomer = (SELECT idCustomer FROM Customers WHERE firstName = ? AND lastName = ?), Employees_idEmployee = (SELECT idEmployee FROM Employees WHERE firstName = ? AND lastName = ?) WHERE idCustomer = ?;",
  delete: "DELETE FROM Sales WHERE idSale = ?;",
  getCustInfo: "SELECT idCustomer, CONCAT(firstName, ' ', lastName) AS 'Customer Name' FROM Customers; ",
  getEmpInfo: "SELECT idEmployee, CONCAT(firstName, ' ', lastName) AS 'Employee Name' FROM Employees; "
}

export default queries;