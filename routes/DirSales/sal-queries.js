let queries = {
    read: "SELECT Sales.discountPercent AS 'Discount Percent', Sales.payment, Sales.date, CONCAT(Customers.firstName, ' ', Customers.lastName) AS 'Customer', CONCAT(Employees.firstName, ' ', Employees.lastName) AS 'Employee' FROM Sales INNER JOIN Customers ON Sales.Customers_idCustomer = Customers_idCustomer INNER JOIN Employees ON Sales.Employees_idEmployee = Employees_idEmployee;"
    create: "INSERT INTO Sales (discountPercent, payment, date, Customers_idCustomer, Employees_idEmployee) VALUES (?, ?, ?, (SELECT idCustomer FROM Customers WHERE firstName = ? AND lastName = ?), (SELECT idEmployee FROM Employees WHERE firstName = ? AND lastName = ?));"
    update: "UPDATE Sales SET discountPercent = ?, payment = ?, date = ?, Customers_idCustomer = (SELECT idCustomer FROM Customers WHERE firstName = ? AND lastName = ?), Employees_idEmployee = (SELECT idEmployee FROM Employees WHERE firstName = ? AND lastName = ?) WHERE idCustomer = ?;"
    delete: "DELETE FROM Sales WHERE idSale = ?;"
}

export default queries;