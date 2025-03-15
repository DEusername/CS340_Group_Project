let queries = {
  read: "SELECT SaleHasClothes.idSaleHasClothes, Customers.firstName AS 'Customer First Name', Customers.lastName AS 'Customer Last Name', Sales.date AS 'Datetime', Clothes.name AS 'Clothes Name', Clothes.size, Manufacturers.name AS 'Manufacturer', SaleHasClothes.quantity FROM SaleHasClothes INNER JOIN Sales ON SaleHasClothes.Sales_idSale = Sales.idSale INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer INNER JOIN Clothes ON SaleHasClothes.Clothes_idClothes = Clothes.idClothes INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer; ",
  create: "INSERT INTO SaleHasClothes (Sales_idSale, Clothes_idClothes, quantity) VALUES (?, ?, ?); ",
  update: "UPDATE SaleHasClothes SET Sales_idSale = ?, Clothes_idClothes = ?, quantity = ? WHERE idSaleHasClothes = ?; ",
  delete: "DELETE FROM SaleHasClothes WHERE idSaleHasClothes = ?; ",
  getSaleInfo: "SELECT Sales.idSale, Customers.firstName, Customers.lastName, Sales.date FROM Sales INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer; ",
  getClothesInfo: "SELECT Clothes.idClothes, Clothes.name AS 'Clothes Name', Clothes.size, Manufacturers.name AS 'Manufacturer Name' FROM Clothes INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer; "
}

export default queries;