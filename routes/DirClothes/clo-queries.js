let queries = {
  read: "SELECT Clothes.idClothes, Clothes.name, Clothes.category, Clothes.size, Clothes.price, Clothes.purchaseCost AS 'Purchase Cost', Clothes.stock, Manufacturers.name AS 'Manufacturer' FROM Clothes INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer;",
  create: "INSERT INTO Clothes (name, category, size, price, purchaseCost, stock, Manufacturers_idManufacturer) VALUES (?, ?, ?, ?, ?, ?, (SELECT idManufacturer FROM Manufacturers WHERE name = ?));",
  update: "UPDATE Clothes SET name = ?, category = ?, size = ?, price = ?, purhcaseCost = ?, stock = ?, Manufacturers_idManufacturer = (SELECT idManufacturer FROM Manufacturers WHERE name = ?) WHERE idClothes = ?;",
  delete: "DELETE FROM Clothes WHERE idClothes = ?;",
  getManu: "SELECT name FROM Manufacturers;"
}

export default queries;