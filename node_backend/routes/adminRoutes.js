
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
     //insert query
     const [rows, fields] = await connection.execute('SELECT * FROM users');
     console.log('Query results:', rows);
 
     await connection.end();
   } catch (error) {
     console.error('Database connectie is mislukt:', error);
   }
}

// je moet hem exporteren omdat je hem ander niet kan importeren bij anderre bestanden
module.exports = {getAdmins};