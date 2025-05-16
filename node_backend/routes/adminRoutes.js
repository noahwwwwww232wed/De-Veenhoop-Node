const mysql = require('mysql2/promise'); // Vergeet deze regel niet als je mysql2 gebruikt
const path = require('path');

async function register(req, res) {
  // req is voor de data vanuit de frontend (bijvoorbeeld uit een formulier)
  // res is voor de data die je terug stuurt naar de frontend
  // res.send("welkom bij de admin pagina");
  // res.sendFile(path.join(__dirname, '../views/admin.html'));
  
  console.log('Probeer verbinding te maken met de database...');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'deveenhoop'
    });

    // Execute a simple query
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    console.log('Query results:', rows);

    await connection.end();

    // stuur de resultaten terug naar de frontend
    res.json(rows);
  } catch (error) {
    console.error('Database connectie is mislukt:', error);
    res.status(500).send('Database fout');
  }
}

// Een voorbeeldfunctie voor getAdmins
async function getAdmins(req, res) {
  res.send("Admins ophalen...");
}

// Exporteer beide functies
module.exports = { register, getAdmins };
