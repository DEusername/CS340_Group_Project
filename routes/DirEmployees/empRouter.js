import express from 'express';

import db from '../db-connector.js'
import queries from './emp-queries.js';

const empRouter = express.Router();

// employees page
empRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);

  // convert date format of each record in results
  results.forEach(record => {
    // convert the yyyy-mm-dd... format to be in mm/dd/yyyy format
    record['Hire Date'] = record['Hire Date'].toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  });

  // serve the employees webpage back to the user
  res.render('employees', { records: results })
});

// create employee entry
empRouter.post('/create', async (req, res) => {
  res.redirect('/employees');
});

// update employee entry data
empRouter.post('/update', async (req, res) => {
  res.redirect('/employees');
});

// delete employee entry.
empRouter.post('/delete', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.delete, [req.body.ID]);
  if (results.affectedRows != 1)
    console.log("delete failed");

  res.redirect('/employees');
});

export default empRouter;