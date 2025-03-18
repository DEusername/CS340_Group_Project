# CS340_Group_Project
This project provides a database management system meant for employees, with features that aims to solve the problems facing the imaginary clothing company of 'Everson & Addis Co.' This database project supports a web interface for performing CRUD operations on the Customers, Employees, Sales, SaleHasClothes, Clothes, Manufacturers tables of a database.

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [License](#License)
- [Citations](#Citations)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/DEusername/CS340_Group_Project.git
cd CS340_Group_Project
```

2. Install dependencies:
```bash
npm install
```

3. Setup a database connection:
- Within the routes directory, ensure there exists a file named 'db-connector.js':
```bash
cd routes
touch db-connector.js
```
- Then ensure that it has the same contents as `ex-db-connector.js`, where `<HOST>` is swapped for the hosting server name, `<USERNAME>` is swapped for the username you are going to use to connect to the database, `<PASSWORD>` is swapped to the associated password for your username, and `<DATABASE>` is swapped with the database name you are going to connect to.
- Import the database tables into the database used for `<DATABASE>` using the `creation.sql` file to create the Employees, Customers, Sales, SaleHasClothes, Clothes, and Manufacturers tables that are required for the database management system to run.

## Usage
To run the project, use the following command:
```bash
npm run start
```

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes.
4. Push your branch: `git push origin feature-name`
5. Create a pull request.

## License
This project is licensed under the [MIT License](./LICENSE).

## Citations
All code in this project is original work, with the exception of the database connection code found in the routes/db-connector.js and routes/ex-db-connector.js files.

### routes/db-connector.js and routes/ex-db-connector.js Citation

```JavaScript
/**
 * @Header Attribution
 * All of the code in this file is repurposed and adapted from the
 * 'Activity 2 - Connect webapp to database (Individual)' Canvas page
 * from OSU.
 * @Source https://canvas.oregonstate.edu/courses/1987790/assignments/9888486?module_item_id=25022943
 * @Instructor Michael Curry 
 *    - CS340 
 *    - Introduction to Databases
 *    - Oregon State University
 * @Date Feb. 27 2025
 */
```