import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fyp21-kupm',
  database: 'KUPM',
});

export default connection;
