/**
 * @Header Attribution for Adaptation
 * All of the code in this file is repurposed and adapted from the
 * 'Activity 2 - Connect webapp to database (Individual)' Canvas page
 * from OSU. Specifically, lines 15, 17, and 25 are modified from the 
 * original to work with the mysql2/promise dependency, while everything
 * else is the same (except for the inserting my own database info into the fields).
 * @Scope File
 * @Source https://canvas.oregonstate.edu/courses/1987790/assignments/9888486?module_item_id=25022943
 * @Instructor Michael Curry 
 *    - CS340 
 *    - Introduction to Databases
 *    - Oregon State University
 * @Date Feb. 27 2025
 */

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '<HOST>',
  user: '<USERNAME>',
  password: '<PASSWORD>',
  database: '<DATABASE>'
});

export default pool;