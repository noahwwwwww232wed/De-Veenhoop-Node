// server.js
const express = require('express');
require('dotenv').config();
 
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const connectDB = require('./db/connection');
 
 
// Import routes
const { register } = require('./routes/registerRoutes');
const { login } = require('./routes/loginRoutes');
const { home } = require('./routes/userRoutes');
const { cijfers } = require('./routes/cijferRoutes');
 
// CORS config
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true // als je cookies gebruikt later
};
 
app.use(cors(corsOptions));
app.use(express.json());
 
// Routes
app.get('/', home);
app.post('/register', register);
app.post('/login', login);
app.post('/cijfers', cijfers);
 
 
app.get('/api/namen', async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('Data opgehaald:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Database fout:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});

 app.get('/vakken', async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT vak_id, naam FROM vakken');
    res.json(rows);
  } catch (err) {
    console.error('Fout bij ophalen vakken:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});
 
app.post('/api/cijfers', async (req, res) => {
  try {
    const connection = await connectDB();
    console.log('Inkomende cijfers:', req.body);
 
    const [result] = await connection.execute(
      'INSERT INTO users (cijfer) VALUES (?)',
      [req.body.cijfer]
    );
 
    console.log('Cijfer opgeslagen:', result);
    res.json({ message: 'Cijfer succesvol opgeslagen' });
  } catch (err) {
    console.error('Database fout:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});
 
 
app.get('/klassen', async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM klassen');
    console.log('Data opgehaald:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Database fout:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});
 
 
app.get('/klassen/:id', async (req, res) => {
  try {
    const connection = await connectDB();
    const classId = req.params.id;
    const [rows] = await connection.execute('SELECT * FROM klassen WHERE id = ?', [classId]);
 
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Klas niet gevonden' });
    }
 
    console.log('Data opgehaald:', rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Database fout:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});
 
 
app.get('/klassen/:id/leerlingen', async (req, res) => {
  try {
    const connection = await connectDB();
    const klasId = req.params.id;
 
    const [rows] = await connection.execute(`
      SELECT users.id, users.naam
      FROM users
      JOIN klas_leerling ON users.id = klas_leerling.leerling_id
      WHERE klas_leerling.klas_id = ?
    `, [klasId]);
 
    res.json(rows);
  } catch (err) {
    console.error('Database fout:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});
app.get('/api/cijfers/:vak', async (req, res) => {
  const vak = req.params.vak;
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      `SELECT c.cijfer, u.naam AS leerling_naam
       FROM cijfers c
       JOIN users u ON c.leerling_id = u.id
       JOIN vakken v ON c.vak_id = v.vak_id
       WHERE v.naam = ?`, [vak]
    );
    res.json(rows);
  } catch (err) {
    console.error('Database fout:', err);
    res.status(500).json({ error: 'Databasefout' });
  }
});
 
 
 
// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route niet gevonden' });
});
 
// Start server
app.listen(port, () => {
  console.log(` Server draait op http://localhost:${port}`);
});
 
 