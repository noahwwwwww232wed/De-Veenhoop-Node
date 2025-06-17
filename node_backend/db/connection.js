const mysql = require('mysql2/promise');
async function connectToDatabase() {
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
  } catch (error) {
    console.error('Database connectie is mislukt:', error);
  }
}

module.exports = {connectToDatabase};