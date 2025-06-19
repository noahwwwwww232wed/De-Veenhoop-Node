const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function register(req, res) {
  console.log('📡 Registratiepoging ontvangen...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(' Verbonden met de database');

    const {
      naam,
      tussenvoegsels = '',
      achternaam,
      email,
      password,
      rol  
    } = req.body;

    if (!naam || !achternaam || !email || !password || !rol) {  
      await connection.end();
      return res.status(400).json({ message: 'Alle verplichte velden moeten ingevuld zijn.' });
    }

    
    const rolFormatted = rol.toLowerCase();

    if (rolFormatted !== 'docent' && rolFormatted !== 'leerling') {
      await connection.end();
      return res.status(400).json({ message: 'Ongeldige rol opgegeven.' });
    }

    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'E-mailadres is al in gebruik.' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const volledigeNaam = [naam, tussenvoegsels, achternaam].filter(Boolean).join(' ');

    
    const [result] = await connection.execute(
      'INSERT INTO users (naam, email, wachtwoord, rol) VALUES (?, ?, ?, ?)',
      [volledigeNaam, email, hashedPassword, rolFormatted]
    );

    console.log(` Gebruiker succesvol geregistreerd als "${rolFormatted}":`, result);

    await connection.end();

    return res.status(201).json({ message: 'Registratie gelukt!' });

  } catch (error) {
    console.error(' Fout bij registratie:', error);
    return res.status(500).json({ message: 'Er is een interne fout opgetreden.' });
  }
}

module.exports = { register };
