
// server.js
const express = require('express');
const app = express();
const port = 3000;
const cors=require('cors');




// Importeer de getAdmins functie uit je routes-bestand
const { register } = require('./routes/registerRoutes');
const { login } = require('./routes/loginRoutes');
const { home } = require('./routes/userRoutes');
require('dotenv').config();

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

// Start de server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


