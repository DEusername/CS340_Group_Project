-- : character being used to denote the variables that will have data from the 
-- backend programming language

-- --------------------------------------------------
-- Employees Queries
-- --------------------------------------------------

-- SELECTION 
-- all employee display
SELECT idEmployee,
  firstName AS 'First Name',
  lastName AS 'Last Name',
  hireDate AS 'Hire Date',
  email, 
  phone
FROM Employees;

-- populate drop down menu for making a sale
SELECT firstName, lastName
FROM Employees;

-- INSERTION
INSERT INTO Employees (firstName, lastName, hireDate, email, phone)
VALUES (:givenFirstName, :givenLastName, :givenHireDate, :givenEmail, :givenPhone);

-- UPDATE
UPDATE Employees
SET firstName = :givenFirstName, lastName = :givenLastName,
  hireDate = :givenHireDate, email = :givenEmail, phone = :givenPhone
WHERE idEmployee = :givenIdFromForm;

-- DELETE
DELETE FROM Employees 
WHERE idEmployee = :givenIdFromForm;

-- --------------------------------------------------
-- Customer Queries
-- --------------------------------------------------

-- SELECTION 
-- all customer display
SELECT idCustomer,
  firstName AS 'First Name',
  lastName AS 'Last Name',
  email,
  phone
FROM Customers;

-- populate drop down menu for making a sale
SELECT firstName, lastName
FROM Customers;

-- INSERTION
INSERT INTO Customers (firstName, lastName, email, phone)
VALUES (:givenFirstName, :givenLastName, :givenEmail, :givenPhone);

-- UPDATE
UPDATE Customers
SET firstName = :givenFirstName, lastName = :givenLastName,
  email = :givenEmail, phone = :givenPhone
WHERE idCustomer = :givenIdFromForm;

-- DELETE
DELETE FROM Customers 
WHERE idCustomer = :givenIdFromForm;

-- --------------------------------------------------
-- Sales Queries
-- --------------------------------------------------

-- SELECTION 
-- all Sales display
SELECT Sales.discountPercent AS 'Discount Percent',
  Sales.payment,
  Sales.date,
  CONCAT(Customers.firstName, ' ', Customers.lastName) AS 'Customer',
  CONCAT(Employees.firstName, ' ', Employees.lastName) AS 'Employee'
FROM Sales
INNER JOIN Customers ON Sales.Customers_idCustomer = Customers_idCustomer
INNER JOIN Employees ON Sales.Employees_idEmployee = Employees_idEmployee;

-- populate drop down menu for making a SaleHasClothes entry
SELECT Customers.firstName, Customers.lastName, Sales.date
FROM Sales
INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer;

-- INSERTION
INSERT INTO Sales (discountPercent, payment, date, Customers_idCustomer, Employees_idEmployee)
VALUES 
(
  :givenDiscountPercentage, 
  :givenPayment, 
  :givenDate, 
  (
    SELECT idCustomer
    FROM Customers
    WHERE firstName = :givenCusFirstName 
    AND lastName = :givenCusLastName
  ), 
  (
    SELECT idEmployee
    FROM Employees
    WHERE firstName = :givenEmpFirstName
    AND lastName = :givenEmpLastName
  )
);

-- UPDATE
UPDATE Sales
SET discountPercent = :givenDiscountPercentage, 
  payment = :givenPayment,
  date = :givenDate,
  Customers_idCustomer = 
  (
    SELECT idCustomer
    FROM Customers
    WHERE firstName = :givenCusFirstName 
    AND lastName = :givenCusLastName
  ),
  Employees_idEmployee = 
  (
    SELECT idEmployee
    FROM Employees
    WHERE firstName = :givenEmpFirstName
    AND lastName = :givenEmpLastName
  )
WHERE idCustomer = :givenIdFromForm;

-- DELETE
DELETE FROM Sales 
WHERE idSale = :givenIdFromForm;;

-- --------------------------------------------------
-- Manufacturer Queries
-- --------------------------------------------------

-- SELECTION 
-- all manufacturers display
SELECT *
FROM Manufacturers;

-- populate drop down menu for making a Clothes item
SELECT name
FROM Manufacturers;

-- INSERTION
INSERT INTO Manufacturers (name, email, phone, address)
VALUES (:givenName, :givenEmail, :givenPhone, :givenAddress);

-- UPDATE
UPDATE Manufacturers
SET name = :givenName, email = :givenEmail,
  phone = :givenPhone, address = :givenAddress
WHERE idManufacturer = :givenIdFromForm;

-- DELETE
DELETE FROM Manufacturers 
WHERE idManufacturer = :givenIdFromForm;

-- --------------------------------------------------
-- Clothes Queries
-- --------------------------------------------------

-- SELECTION 
-- all Clothes display
SELECT Clothes.idClothes,
  Clothes.name,
  Clothes.category,
  Clothes.size,
  Clothes.price,
  Clothes.purchaseCost AS 'Purchase Cost',
  Clothes.stock,
  Manufacturers.name AS 'Manufacturer'
FROM Clothes
INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer;

-- populate drop down menu for making a SaleHasClothes entry
SELECT Clothes.name, Clothes.size, Manufacturer.name
FROM Clothes
INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturer.idManufacturer;

-- INSERTION
INSERT INTO Clothes (name, category, size, price, purchaseCost, stock, Manufacturers_idManufacturer)
VALUES 
(
  :givenName, 
  :givenCategory, 
  :givenSize, 
  :givenPrice,
  :givenPurchaseCost,
  :givenStock,
  (
    SELECT idManufacturer
    FROM Manufacturers
    WHERE name = :givenManuName
  )
);

-- UPDATE
UPDATE Clothes
SET name = :givenName, 
  category = :givenCategory, 
  size = :givenSize, 
  price = :givenPrice,
  purhcaseCost = :givenPurchaseCost,
  stock = :givenStock,
  Manufacturers_idManufacturer = 
  (
    SELECT idManufacturer
    FROM Manufacturers
    WHERE name = :givenManuName
  )
WHERE idClothes = :givenIdFromForm;

-- DELETE
DELETE FROM Clothes
WHERE idClothes = :givenIdFromForm;

-- --------------------------------------------------
-- SaleHasClothes Queries
-- --------------------------------------------------

-- SELECTION 
SELECT Customers.firstName AS "Customer's First Name", 
  Customers.lastName AS "Customer's Last Name", 
  Sales.date AS 'Datetime', 
  Clothes.name AS 'Clothes Name', 
  Manufacturers.name AS 'Manufacturer', 
  SaleHasClothes.quantity
FROM SaleHasClothes
INNER JOIN Sales ON SaleHasClothes.Sales_idSale = Sales.idSale
INNER JOIN Customers ON Sales.Customers_idCustomer = Customers.idCustomer
INNER JOIN Clothes ON SaleHasClothes.Clothes_idClothes = Clothes.idClothes
INNER JOIN Manufacturers ON Clothes.Manufacturers_idManufacturer = Manufacturers.idManufacturer;

-- INSERTION
INSERT INTO SaleHasClothes (Sales_idSale, Clothes_idClothes, quantity)
VALUES 
(
  :givenSalesId
  :givenClothesId
  :givenQuantity 
);

-- UPDATE
UPDATE SaleHasClothes
SET Sales_idSale = :givenSalesIdFromForm
  Clothes_idClothes = :givenClothesIdFromForm
  quantity = :givenQuantity
WHERE idSaleHasClothes = :givenIdFromForm;

-- DELETE
DELETE FROM SaleHasClothes
WHERE idSaleHasClothes = :givenIdFromForm;