// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const { register } = require('./routes/registerRoutes');
const { login } = require('./routes/loginRoutes');
const { home } = require('./routes/userRoutes');
const cijfersRoutes = require('./routes/cijfersRoutes');

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
app.use('/api/cijfers', cijfersRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route niet gevonden' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server draait op http://localhost:${port}`);
});
