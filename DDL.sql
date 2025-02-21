-- Group Members: Alexander Addis, Duncan Everson
-- Group Number: 93

SET FOREIGN_KEY_CHECKS=0;

-- --------------------------------------------------
-- Drop tables in order, such that tables with fks are
-- 		dropped before the tables the fk belong to.
-- --------------------------------------------------
DROP TABLE IF EXISTS SaleHasClothes;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS Clothes;
DROP TABLE IF EXISTS Manufacturers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Customers;

-- --------------------------------------------------
-- Employees table
-- --------------------------------------------------
CREATE TABLE Employees (
  idEmployee INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  hireDate DATE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE
);

-- --------------------------------------------------
-- Customers table
-- --------------------------------------------------
CREATE TABLE Customers (
  idCustomer INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(15) UNIQUE
);

-- --------------------------------------------------
-- Sales table
-- --------------------------------------------------
CREATE TABLE Sales (
  idSale INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  discountPercent DECIMAL(5, 2),
  payment DECIMAL(11, 2) NOT NULL,
  date DATETIME NOT NULL,
  Customers_idCustomer INT NOT NULL,
  Employees_idEmployee INT,
  FOREIGN KEY (Customers_idCustomer) 
    REFERENCES Customers(idCustomer)
    ON DELETE RESTRICT,
  FOREIGN KEY (Employees_idEmployee) 
    REFERENCES Employees(idEmployee)
    ON DELETE SET NULL
);

-- --------------------------------------------------
-- Manufacturers table
-- --------------------------------------------------
CREATE TABLE Manufacturers (
  idManufacturer INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(45) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE,
  address VARCHAR(255) UNIQUE NOT NULL
);

-- --------------------------------------------------
-- Clothes table
-- --------------------------------------------------
CREATE TABLE Clothes (
  idClothes INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(45) NOT NULL,
  size VARCHAR(15) NOT NULL,
  price DECIMAL(11, 2) NOT NULL,
  purchaseCost DECIMAL(11, 2) NOT NULL,
  stock INT NOT NULL,
  Manufacturers_idManufacturer INT NOT NULL,
  FOREIGN KEY (Manufacturers_idManufacturer) 
    REFERENCES Manufacturers(idManufacturer) 
    ON DELETE RESTRICT
);

-- --------------------------------------------------
-- SaleHasClothes table
-- --------------------------------------------------
CREATE TABLE SaleHasClothes (
  idSaleHasClothes INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  Sales_idSale INT NOT NULL,
  Clothes_idClothes INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (Sales_idSale) 
    REFERENCES Sales(idSale)
    ON DELETE CASCADE,
  FOREIGN KEY (Clothes_idClothes)
    REFERENCES Clothes(idClothes)
    ON DELETE RESTRICT
);

-- --------------------------------------------------
-- Insert sample data into Employees table
-- --------------------------------------------------
INSERT INTO Employees (firstName, lastName, hireDate, email, phone)  
VALUES 
('Alexander', 'Addis', '2017-12-23', 'aaddis@gmail.com', '(541)555-3850'),
('Duncan', 'Everson', '2016-05-03', 'duncane@gmail.com', '(541)555-0931'),
('Benny', 'Beaver', '2019-10-30', 'bbeav@gmail.com', '(541)555-9874');

-- --------------------------------------------------
-- Insert sample data into Customers table
-- --------------------------------------------------
INSERT INTO Customers (firstName, lastName, email, phone)  
VALUES 
('Ben', 'Gulbranson', 'beng@gmail.com', '(541)555-5739'),
('Parsa', 'Fallah', 'parsaf@gmail.com', '(541)555-2849'),
('Jade', 'Carey', 'jadec@gmail.com', '(541)555-5533');

-- --------------------------------------------------
-- Insert sample data into Sales table
-- --------------------------------------------------
INSERT INTO Sales (discountPercent, payment, date, Customers_idCustomer, Employees_idEmployee)  
VALUES 
(
  0.10, 
  9.89, 
  '2018-03-21 14:30:00', 
  (SELECT idCustomer FROM Customers WHERE firstName = 'Ben' AND lastName = 'Gulbranson'), 
  (SELECT idEmployee FROM Employees WHERE firstName = 'Alexander' AND lastName = 'Addis')
),
(
  0.25, 
  40.88, 
  '2023-07-05 15:20:00', 
  (SELECT idCustomer FROM Customers WHERE firstName = 'Parsa' AND lastName = 'Fallah'), 
  (SELECT idEmployee FROM Employees WHERE firstName = 'Duncan' AND lastName = 'Everson')
),
(
  0.05, 
  20.89, 
  '2024-09-29 09:30:00', 
  (SELECT idCustomer FROM Customers WHERE firstName = 'Jade' AND lastName = 'Carey'), 
  (SELECT idEmployee FROM Employees WHERE firstName = 'Benny' AND lastName = 'Beaver')
);

-- --------------------------------------------------
-- Insert sample data into Manufacturers table
-- --------------------------------------------------
INSERT INTO Manufacturers (name, email, phone, address)  
VALUES 
('Gucci', 'gucci@gmail.com', '(541)555-1948', '91-487 Somewhere Pl.'),
('Versace', 'versace@gmail.com', '(541)555-9876', '435 Road St.'),
('Prada', 'prada@gmail.com', '(541)555-8762', '9002 Boulevard Ave.'),
('Nike', 'nike@gmail.com', '(541)555-3827', '123 Place Rd.'),
('Uniqlo', 'uniqlo@gmail.com', '(541)555-2911', '98-324 Sidewalk Ave.');

-- --------------------------------------------------
-- Insert sample data into Clothes table
-- --------------------------------------------------
INSERT INTO Clothes (name, category, size, price, purchaseCost, stock, Manufacturers_idManufacturer)  
VALUES 
(
  'Shirt', 
  'Tops', 
  'Medium', 
  10.99, 
  9.89, 
  1, 
  (SELECT idManufacturer FROM Manufacturers WHERE name = 'Gucci')
),
(
  'Coat', 
  'Outerwear', 
  'Large', 
  54.50, 
  40.88, 
  1, 
  (SELECT idManufacturer FROM Manufacturers WHERE name = 'Versace')
),
(
  'Pants', 
  'Bottoms', 
  'Small', 
  21.99, 
  20.89, 
  1, 
  (SELECT idManufacturer FROM Manufacturers WHERE name = 'Prada')
),
(
  'Hat',
  'Accessories',
  'Large',
  7.99,
  7.99,
  1,
  (SELECT idManufacturer FROM Manufacturers WHERE name = 'Gucci')
),
(
  'Shorts',
  'Bottoms',
  'Medium',
  10.99,
  10.99,
  1,
  (SELECT idManufacturer FROM Manufacturers WHERE name = 'Prada')
);

-- --------------------------------------------------
-- Insert sample data into SaleHasClothes table
-- --------------------------------------------------
INSERT INTO SaleHasClothes (Sales_idSale, Clothes_idClothes, quantity)  
VALUES 
(
  (SELECT Sales.idSale FROM Sales
   INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer
   WHERE Sales.date = '2018-03-21 14:30:00'
   AND Customers.firstName = 'Ben' AND Customers.lastName = 'Gulbranson'),
  (SELECT Clothes.idClothes FROM Clothes
   INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer
   WHERE Clothes.name = 'Shirt' AND Manufacturers.name = 'Gucci'),
  1
),
(
  (SELECT Sales.idSale FROM Sales
   INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer
   WHERE Sales.date = '2018-03-21 14:30:00'
   AND Customers.firstName = 'Ben' AND Customers.lastName = 'Gulbranson'),
  (SELECT Clothes.idClothes FROM Clothes
   INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer
   WHERE Clothes.name = 'Coat' AND Manufacturers.name = 'Versace'),
  1
),
(
  (SELECT Sales.idSale FROM Sales
   INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer
   WHERE Sales.date = '2023-07-05 15:20:00'
   AND Customers.firstName = 'Parsa' AND Customers.lastName = 'Fallah'),
  (SELECT Clothes.idClothes FROM Clothes
   INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer
   WHERE Clothes.name = 'Coat' AND Manufacturers.name = 'Versace'),
  1
),
(
  (SELECT Sales.idSale FROM Sales
   INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer
   WHERE Sales.date = '2024-09-29 09:30:00'
   AND Customers.firstName = 'Jade' AND Customers.lastName = 'Carey'),
  (SELECT Clothes.idClothes FROM Clothes
   INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer
   WHERE Clothes.name = 'Pants' AND Manufacturers.name = 'Prada'),
  1
);

SET FOREIGN_KEY_CHECKS=1;