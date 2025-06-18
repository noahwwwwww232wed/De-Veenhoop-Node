const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const connection = require('../db/connection');

async function login(req, res) {

  console.log('Probeer verbinding te maken met de database...');

  try {
    
    //check met select of req.body.email en password in de database zitten
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [req.body.email]);
   console.log(rows);
   
    if (rows.length === 0) {
      return res.status(401).send('Gebruikersnaam of wachtwoord is onjuist');
    }

    const user = rows[0];
    
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) { throw (err); }
      else {
        return res.status(200).send(JSON.stringify('Inloggen is gelukt!'));
      }
    });
    await connection.end();

  } catch (error) {
    var errorMessage = JSON.stringify('Database connectie is mislukt:' + error);
    console.error(errorMessage)
    return res.status(500).send(errorMessage);
  }
}

module.exports = { login };