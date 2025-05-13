// server.js
const express = require('express');
const app = express();
const port = 3000;

// Importeer de getAdmins functie uit je routes-bestand
const { register } = require('./routes/adminRoutes');
const { home } = require('./routes/userRoutes');

app.get('/', home);
// Route voor /admin
// app.get('/admin', getAdmins);
app.get('/register', register);

// Start de server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


