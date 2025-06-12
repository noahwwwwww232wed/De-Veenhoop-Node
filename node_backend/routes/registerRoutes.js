const mysql = require('mysql2/promise');

const bcrypt = require('bcrypt');

const saltRounds = 10;
 
async function register(req, res) {

  console.log('📡 Registratiepoging ontvangen...');
 
  try {

    // 🔌 Database connectie maken

    const connection = await mysql.createConnection({

      host: process.env.DB_HOST,

      user: process.env.DB_USER,

      password: process.env.DB_PASSWORD,

      database: process.env.DB_NAME,

    });
 
    console.log('✅ Verbonden met de database');
 
    // 📥 Haal de gegevens uit het request

    const {

      naam,

      tussenvoegsels = '',

      achternaam,

      email,

      password,

      role

    } = req.body;
    
    // ❗ Validaties

    if (!naam || !achternaam || !email || !password || !role) {

      await connection.end();

      return res.status(400).json({ message: 'Alle verplichte velden moeten ingevuld zijn.' });

    }
 
    if (role !== 'docent' && role !== 'leerling') {

      await connection.end();

      return res.status(400).json({ message: 'Ongeldige rol opgegeven.' });

    }
 
    // 📛 Check of email al bestaat

    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
 
    if (existingUser.length > 0) {

      await connection.end();

      return res.status(400).json({ message: 'E-mailadres is al in gebruik.' });

    }
 
    // 🔐 Wachtwoord hashen

    const hashedPassword = await bcrypt.hash(password, saltRounds);
 
    // 👤 Volledige naam samenvoegen

    const volledigeNaam = [naam, tussenvoegsels, achternaam].filter(Boolean).join(' ');
 
    // 💾 Gebruiker opslaan

    const [result] = await connection.execute(

      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',

      [0, volledigeNaam, email, hashedPassword, role]

    );
 
    console.log(`✅ Gebruiker succesvol geregistreerd als "${role}":`, result);
 
    await connection.end();
 
    return res.status(201).json({ message: 'Registratie gelukt!' });
 
  } catch (error) {

    console.error('❌ Fout bij registratie:', error);

    return res.status(500).json({ message: 'Er is een interne fout opgetreden.' });

  }

}
 
module.exports = { register };

 