const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function login(req, res) {

  console.log('Probeer verbinding te maken met de database...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Verbonden met de database!');

    //check met select of req.body.email en password in de database zitten
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE email = ?', [req.body.email]);
    if (rows.length === 0) {
      return res.status(401).send('Gebruikersnaam of wachtwoord is onjuist');
    }

    const user = rows[0];
    await connection.end();

    bcrypt.compare(req.body.password, user.password, function (err, result) {
      console.log(result);
      if (err) { throw (err); }
      else {
        return res.status(200).send(JSON.stringify('Inloggen is gelukt!'));
      }
    });
  } catch (error) {
    var errorMessage = JSON.stringify('Database connectie is mislukt:' + error);
    console.error(errorMessage)
    return res.status(500).send(errorMessage);
  }
}

module.exports = { login };