import express from 'express';

import db from '../db-connector.js'
import queries from './man-queries.js';

const manRouter = express.Router();

// manufacturers page
manRouter.get('/', async (req, res) => {
    // read most current data from the db
    let [results, fields] = await db.query(queries.read);

    // serve the manufacturers webpage back to the user
    res.render('manufacturers', { records: results })
});

// create manufacturer entry
manRouter.post('/create', async (req, res) => {
    let [results, fields] = await db.query(queries.create, [req.body.name, req.body.email, req.body.phone, req.body.address]);
    if (results.affectedRows != 1)
        console.log("create failed");
    
    res.redirect('/manufacturers');
});

// update manufacturer entry data
manRouter.post('/update', async (req, res) => {
    let [results, fields] = await db.query(queries.create, [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.ID]);
    if (results.affectedRows != 1)
        console.log("update failed");
    
    res.redirect('/manufacturers');
});

// delete manufacturer entry
manRouter.post('/delete', async (req, res) => {
    let [results, fields] = await db.query(queries.delete, [req.body.ID]);
    if (results.affectedRows != 1)
        console.log("delete failed");
    
    res.redirect('/manufacturers');
});

export default manRouter;