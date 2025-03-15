import express from 'express';

import db from '../db-connector.js'
import queries from './saleClo-queries.js';

const saleCloRouter = express.Router();

// SaleHasClothes page
saleCloRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);
  let [SaleInfoResults, SaleInfoFields] = await db.query(queries.getSaleInfo);
  let [ClothesInfoResults, ClothesInfoFields] = await db.query(queries.getClothesInfo);

  // serve the SaleHasClothes webpage back to the user
  res.render('salehas_clothes', { records: results, saleInfo: SaleInfoResults, clothesInfo: ClothesInfoResults })
});

// create SaleHasClothes entry
saleCloRouter.post('/create', async (req, res) => {
  if (req.body.saleInfoID !== '0' && req.body.clothesInfoID !== '0') {
    console.log("tried to query");
    let [results, fields] = await db.query(queries.create, [req.body.saleInfoID, req.body.clothesInfoID, req.body.quantity]);
    if (results.affectedRows != 1)
      console.log("create failed");
    res.redirect('/salehas_clothes');
    return;
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the create form with no dropdown 
    item selected for a record. Please make sure all dropdowns are filled with 
    adequate information.`
    res.render('salehas_clothes', { message: nonValMessage })
    return
  }
});

// update SaleHasClothes entry data
saleCloRouter.post('/update', async (req, res) => {
  if (req.body.saleClothesID !== '0') {
    if (req.body.saleInfoID !== '0' && req.body.clothesInfoID !== '0') {
      let [results, fields] = await db.query(queries.update, [req.body.saleInfoID, req.body.clothesInfoID, req.body.quantity, req.body.saleClothesID]);
      if (results.affectedRows != 1)
        console.log("update failed");

      res.redirect('/salehas_clothes');
      return
    } else {
      let nonValMessage;
      nonValMessage = `You tried to submit the update form with no dropdown 
      item selected for a record. Please make sure all dropdowns are filled with 
      adequate information.`
      res.render('salehas_clothes', { message: nonValMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the update form with no ID selected. 
    Please select an ID and try again.`
    res.render('salehas_clothes', { message: nonValMessage })
    return
  }
});

// delete SaleHasClothes entry
saleCloRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      let [results, fields] = await db.query(queries.delete, [req.body.ID]);
      if (results.affectedRows != 1)
        console.log("delete failed");
      res.redirect('/salehas_clothes');
      return
    } catch (error) {
      let errMessage;
      errMessage = `An unknown error occured with the deletion of the record.`;
      res.render('salehas_clothes', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the deletion form with no ID selected. 
    Please select an ID and try again.`
    res.render('salehas_clothes', { message: nonValMessage })
    return
  }
});

export default saleCloRouter;