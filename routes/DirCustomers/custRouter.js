import express from 'express';

import db from '../db-connector.js'
import queries from './cust-queries.js';

const custRouter = express.Router();

// customers page
custRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);

  // serve the customers webpage back to the user
  res.render('customers', { records: results })
});

// create customer entry
custRouter.post('/create', async (req, res) => {
  let [results, fields] = await db.query(queries.create, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone]);
  if (results.affectedRows != 1)
    console.log("create failed");

  res.redirect('/customers');
});

// update customer entry data
custRouter.post('/update', async (req, res) => {
  let [results, fields] = await db.query(queries.update, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.ID]);
  if (results.affectedRows != 1)
    console.log("update failed")

  res.redirect('/customers');
});

// delete customer entry.
custRouter.post('/delete', async (req, res) => {
  let [results, fields] = await db.query(queries.delete, [req.body.ID]);
  if (results.affectedRows != 1)
    console.log("delete failed");

  res.redirect('/customers');
});

export default custRouter;