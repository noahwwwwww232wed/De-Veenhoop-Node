require('dotenv').config();

// server.js
const express = require('express');
const app = express();
const port = 3000;
const cors=require('cors');
const connection = require('./db/connection'); 




// Importeer de getAdmins functie uit je routes-bestand
const { register } = require('./routes/registerRoutes');
const { login } = require('./routes/loginRoutes');
const { home } = require('./routes/userRoutes');
const { cijfers } = require('./routes/cijferRoutes');

const options = {
  origin: 'http://localhost:5173',
}

app.use(cors(options));
app.use(express.json());

app.get('/', home);
// Route voor /admin
// app.get('/admin', getAdmins);
app.post('/register', register);
app.post('/login', login);
app.post('/cijfers', cijfers);


app.get('/api/namen', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Database fout:', err);  // Fout loggen naar console
      return res.status(500).json({ error: 'Databasefout' });
    }
    console.log('Data opgehaald:', rows);  // Succes loggen naar console
    res.json(rows);
  });
});

//hier moet nog een request komen voor cijfers
app.post('/api/cijfers', (req, res) => {
console.log('Inkomende cijfers:', req.body);
  console.log("ontvangen data van frontend :", req.body);
  connection.query('INSERT INTO users (cijfer) VALUES (?)', [req.body.cijfer], (err, result) => {
    if (err) {
      console.error('Database fout:', err);  // Fout loggen naar console
      return res.status(500).json({ error: 'Databasefout' });
    }
    console.log('Cijfer opgeslagen:', result);  // Succes loggen naar console
    res.json({ message: 'Cijfer succesvol opgeslagen' });
  });
  
});
//haal alle klassen op
app.get('/klassen', (req, res) => {
  connection.query('SELECT * FROM klassen', (err, rows) => {
    if (err) {
      console.error('Database fout:', err);  // Fout loggen naar console
      return res.status(500).json({ error: 'Databasefout' });
    }
    console.log('Data opgehaald:', rows);  // Succes loggen naar console
    res.json(rows);
  });
});

app.get('/klassen/:id', (req, res) => {
  const classId = req.params.id;
  connection.query('SELECT * FROM klassen WHERE id = ?', [classId], (err, rows) => {
    if (err) {
      console.error('Database fout:', err);
      return res.status(500).json({ error: 'Databasefout' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Klas niet gevonden' });
    }
    console.log('Data opgehaald:', rows[0]);
    res.json(rows[0]);
  });
});

app.get('/klassen/:id/leerlingen', (req, res) => {
  const klasId = req.params.id;
  connection.query(`
    SELECT users.id, users.naam 
    FROM users 
    JOIN klas_leerling ON users.id = klas_leerling.leerling_id 
    WHERE klas_leerling.klas_id = ?
  `, [klasId], (err, rows) => {
    if (err) {
      console.error('Database fout:', err);
      return res.status(500).json({ error: 'Databasefout' });
    }
    res.json(rows);
  });
});


// Start de server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



