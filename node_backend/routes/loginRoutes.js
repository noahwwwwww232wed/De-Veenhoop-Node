const mysql = require('mysql2/promise');

async function login(req, res) {

  console.log('Probeer verbinding te maken met de database...');

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'deveenhoop'
    });

    console.log('Verbonden met de database!');

    //check met select of req.body.email en password in de database zitten
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password]);
    console.log('rows: ', rows);
    await connection.end();

    if (rows.length == 0) {
      return res.status(401).send('Gebruikersnaam of wachtwoord is onjuist');
    } else {
      return res.status(200).send(rows);
    }

  } catch (error) {
    var errorMessage = JSON.stringify('Database connectie is mislukt:' + error);
    console.error(errorMessage)
    return res.status(500).send(errorMessage);
  }
}

module.exports = { login };
