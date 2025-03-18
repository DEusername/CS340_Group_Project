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

SET FOREIGN_KEY_CHECKS=1;