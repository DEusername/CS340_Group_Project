import express from 'express';

import db from '../db-connector.js'
import queries from './clo-queries.js';

const cloRouter = express.Router();

// clothes page
cloRouter.get('/', async (req, res) => {
    // read most current data from the db
    let [results, fields] = await db.query(queries.read);

    // serve the clothes webpage back to the user
    res.render('clothes', { records: results })
});

// create clothes entry
cloRouter.post('/create', async (req, res) => {
    let [results, fields] = await db.query(queries.create, [req.body.name, req.body.category, req.body.size, req.body.price, req.body.purchaceCost, req.body.stock, req.body.Manufacturers_idManufacturer]);
    if (results.affectedRows != 1)
        console.log("create failed");

    res.redirect('/clothes');
});

// update clothes entry data
cloRouter.post('/update', async (req, res) => {
    let [results, fields] = await db.query(queries.create, [req.body.name, req.body.category, req.body.size, req.body.price, req.body.purchaceCost, req.body.stock, req.body.Manufacturers_idManufacturer, req.body.ID]);
    if (results.affectedRows != 1)
        console.log("update failed");

    res.redirect('/clothes');
});

// delete clothes entry
cloRouter.post('/delete', async (req, res) => {
    let [results, fields] = await db.query(queries.delete, [req.body.ID]);
    if (results.affectedRows != 1)
        console.log("delete failed");

    res.redirect('/clothes');
});

export default cloRouter;