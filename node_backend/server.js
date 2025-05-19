
// server.js
const express = require('express');
const app = express();
const port = 3000;
const cors=require('cors');
require('dotenv').config();





// Importeer de getAdmins functie uit je routes-bestand
const { register } = require('./routes/registerRoutes');
const { home } = require('./routes/userRoutes');

const options = {
  origin: process.env.ORIGIN,
}

app.use(cors(options));
app.use(express.json());

app.get('/', home);
// Route voor /admin
// app.get('/admin', getAdmins);
app.post('/register', register);

// Start de server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


