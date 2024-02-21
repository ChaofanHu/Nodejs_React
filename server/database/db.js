import mysql from 'mysql2'
export const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password:'hcf991025',
     database:'my_blog'
 })