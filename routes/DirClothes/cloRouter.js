import express from 'express';

import db from '../db-connector.js'
import queries from './clo-queries.js';

const cloRouter = express.Router();

// clothes page
cloRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [clothesResults, clothesFields] = await db.query(queries.read);
  let [manuResults, manuFields] = await db.query(queries.getManu);

  // serve the clothes webpage back to the user
  res.render('clothes', { records: clothesResults, manuNames: manuResults })
});

// create clothes entry
cloRouter.post('/create', async (req, res) => {
  if (req.body.size !== 'non-value' && req.body.manufacturer !== 'non-value') {
    let [results, fields] = await db.query(queries.create, [req.body.name, req.body.category, req.body.size, req.body.price, req.body.purchaseCost, req.body.stock, req.body.manufacturer]);
    if (results.affectedRows != 1)
      console.log("create failed");
  }

  res.redirect('/clothes');
});

// update clothes entry data
cloRouter.post('/update', async (req, res) => {
  if (req.body.ID !== '0' && req.body.size !== 'non-value' && req.body.manufacturer !== 'non-value') {
    let [results, fields] = await db.query(queries.update, [req.body.name, req.body.category, req.body.size, req.body.price, req.body.purchaseCost, req.body.stock, req.body.manufacturer, req.body.ID]);
    if (results.affectedRows != 1)
      console.log("update failed");
  }

  res.redirect('/clothes');
});

// delete clothes entry
cloRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== 'non-value') {
    let [results, fields] = await db.query(queries.delete, [req.body.ID]);
    if (results.affectedRows != 1)
      console.log("delete failed");
  }

  res.redirect('/clothes');
});

export default cloRouter;