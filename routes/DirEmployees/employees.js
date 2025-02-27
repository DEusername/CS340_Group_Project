import express from 'express';

import db from '../db-connector.js'
import queries from './sql-queries.js';

const empRouter = express.Router();

// employees page
empRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);

  console.log(fields);
  console.log(results);

  // serve the employees webpage back to the user
  res.render('employees', { info: [] })
});

// create employee entry
empRouter.post('/create', async (req, res) => {
  res.redirect('/employees');
});

// update employee entry data
empRouter.put('/update', async (req, res) => {
  res.redirect('/employees');
});

// delete employee entry.
empRouter.delete('/delete', async (req, res) => {
  res.redirect('/employees');
});

export default empRouter;