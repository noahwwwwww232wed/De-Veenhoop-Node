const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

//  CORS configuratie voor Vite (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware voor JSON-bodys
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello, Node.js met Express!</h1>');
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hallo vanaf de Node.js backend!' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'admin123') {
    res.status(200).json({ message: 'Login succesvol' });
  } else {
    res.status(401).json({ message: 'Onjuiste e-mail of wachtwoord' });
  }
});

// Start de server
app.listen(port, () => {
  console.log(`✅ Express server draait op http://localhost:${port}`);
});
// Registratie API
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Check of gebruiker al bestaat
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Gebruiker bestaat al' });
    }
  
    // Nieuw account maken
    const newUser = new User({ email, password });
    await newUser.save();
  
    res.status(201).json({ message: 'Registratie succesvol' });
  });
  