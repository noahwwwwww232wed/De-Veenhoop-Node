const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function register(req, res) {
  console.log('Probeer verbinding te maken met de database...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Verbonden met de database!');

    const userPassword = req.body.password;

    //Hasht het wachtwoord correct
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    //Gebruikt het gehashte wachtwoord in de query
    const [rows] = await connection.execute(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [0, req.body.naam, req.body.email, hashedPassword]
    );

    console.log('Data is opgeslagen in de database:', rows);

    await connection.end();

    return res.send(JSON.stringify("Data is opgeslagen in de database: " + rows));
  } catch (error) {
    const errorMessage = JSON.stringify('Database connectie is mislukt: ' + error);
    console.error(errorMessage);
    return res.status(500).send(errorMessage);
  }
}

module.exports = { register };