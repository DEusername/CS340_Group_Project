/**
 * @Header Attribution
 * The code in this file is repurposed and slightly modified from the
 * 'Activity 2 - Connect webapp to database (Individual)' Canvas page
 * from OSU.
 * @Source Michael Curry 
 *    - CS340 
 *    - Introduction to Databases
 *    - Oregon State University
 * @Date Feb. 27 2025
 */

import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_<onid>',
  password: '<password>',
  database: '<onid>'
});

export default pool;