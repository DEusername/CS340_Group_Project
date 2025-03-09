let queries = {
  read: "SELECT * FROM Manufacturers;",
  create: "INSERT INTO Manufacturers (name, email, phone, address) VALUES (?, ?, ?, ?);",
  update: "UPDATE Manufacturers SET name = ?, email = ?, phone = ?, address = ? WHERE idManufacturer = ?;",
  delete: "DELETE FROM Manufacturers WHERE idManufacturer = ?;"
}

export default queries;