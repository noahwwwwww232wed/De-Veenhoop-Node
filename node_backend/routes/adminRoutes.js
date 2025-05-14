const mysql = require('mysql2/promise');

async function register(req, res) {
  console.log('Probeer verbinding te maken met de database...');

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'deveenhoop'
    });

    const [rows, fields] = await connection.execute('SELECT * FROM users');
    console.log('Query results:', rows);

    await connection.end();

   
    return res.send("Welkom bij de admin pagina. Data opgehaald, zie console.");
  } catch (error) {
    console.error('Database connectie is mislukt:', error);
    return res.status(500).send("Database connectie is mislukt.");
  }
}

module.exports = { register };
