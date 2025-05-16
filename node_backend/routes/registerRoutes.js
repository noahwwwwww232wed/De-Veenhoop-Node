const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function register(req, res) {

  console.log('Probeer verbinding te maken met de database...');

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'deveenhoop'
    });

    console.log('Verbonden met de database!');

    let salt;
    let hash;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        // Handle error
        return;
      }

      // Salt generation successful, proceed to hash the password
      salt = salt;
    });

    const userPassword = req.body.password; // Replace with the actual password
    bcrypt.hash(userPassword, salt, (err, hash) => {
      if (err) {
        // Handle error
        return;
      }

      // Hashing successful, 'hash' contains the hashed password
      hash = hash;
    });



    const [rows, fields] = await connection.execute('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [0, req.body.name, req.body.email, req.body.password]);
    console.log('Data is opgeslagen in de database:', rows);

    await connection.end();


    return res.send(JSON.stringify("data is opgeslagen in de database: " + rows));
  } catch (error) {
    var errorMessage = JSON.stringify('Database connectie is mislukt:' + error);
    console.error(errorMessage)
    return res.status(500).send(errorMessage);
  }
}

module.exports = { register };
