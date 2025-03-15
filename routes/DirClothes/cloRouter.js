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
    res.redirect('/clothes');
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the create form with no dropdown 
    item selected for a record. Please make sure all dropdowns are filled with 
    adequate information.`
    res.render('clothes', { message: nonValMessage })
    return
  }
});

// update clothes entry data
cloRouter.post('/update', async (req, res) => {
  if (req.body.ID !== '0') {
    if (req.body.size !== 'non-value' && req.body.manufacturer !== 'non-value') {
      let [results, fields] = await db.query(queries.update, [req.body.name, req.body.category, req.body.size, req.body.price, req.body.purchaseCost, req.body.stock, req.body.manufacturer, req.body.ID]);
      if (results.affectedRows != 1)
        console.log("update failed");
      res.redirect('/clothes');
      return;
    }
    else {
      let noDropdownMessage;
      noDropdownMessage = `You tried to submit the update form with no dropdown 
      item selected for a record. Please make sure all dropdowns are filled with 
      adequate information.`
      res.render('clothes', { message: noDropdownMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the update form with no ID selected. 
    Please select an ID and try again.`
    res.render('clothes', { message: nonValMessage })
    return
  }
});

// delete clothes entry
cloRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      let [results, fields] = await db.query(queries.delete, [req.body.ID]);
      if (results.affectedRows != 1)
        console.log("delete failed");
      res.redirect('/clothes');
      return
    } catch (error) {
      let errMessage;
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        errMessage = `A referential error occured. To allow this clothing record to be
        deleted, you need to delete all SaleHasClothes record involving this clothing
        item.`;
      }
      else
        errMessage = `An unknown error occured with the deletion of the record.`;
      res.render('clothes', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the deletion form with no ID selected. 
    Please select an ID and try again.`
    res.render('clothes', { message: nonValMessage })
    return
  }
});

export default cloRouter;