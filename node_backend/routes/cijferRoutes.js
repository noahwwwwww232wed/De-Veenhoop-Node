const mysql = require('mysql2/promise');
const connectDB = require('../db/connection');

async function cijfers(req, res) {
  console.log('Probeer verbinding te maken met de database...');

  try {
    const connection = await connectDB();
  

    const [rows] = await connection.execute(
      'INSERT INTO users (cijfer) VALUES (?)',
      [req.body.cijfers ]
    );


    //await connection.end();

    return res.send(JSON.stringify("Data is opgeslagen in de database: " + rows));
  } catch (error) {
    const errorMessage = JSON.stringify('Database connectie is mislukt: ' + error);
    console.error(errorMessage);
    return res.status(500).send(errorMessage);
  }
}

module.exports = {cijfers};