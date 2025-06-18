const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const connectDB = require('../db/connection');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, password, rol } = req.body;  // let op: 'rol' ipv 'role'

  console.log('Login poging:', { email, rol });

  try {
    const connection = await connectDB();
    
    //check met select of req.body.email en password in de database zitten
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [req.body.email]);
   console.log(rows);
   
    if (rows.length === 0) {
      console.log('Geen gebruiker gevonden');
      await connection.end();
      return res.status(401).json({ message: 'Gebruiker niet gevonden of verkeerde rol' });
    }

    const user = rows[0];

    console.log('Gebruiker gevonden:', user);
    console.log('Wachtwoord van frontend:', password);
    console.log('Gehashed wachtwoord in DB:', user.wachtwoord);

    const passwordMatch = await bcrypt.compare(password, user.wachtwoord);

    if (!passwordMatch) {
      console.log('Wachtwoord komt niet overeen');
      await connection.end();
      return res.status(401).json({ message: 'Wachtwoord is onjuist' });
    }

    // JWT payload met 'rol'
    const token = jwt.sign(
      { userId: user.id, rol: user.rol, name: user.naam },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await connection.end();

    return res.status(200).json({
      message: 'Inloggen is gelukt!',
      token,
      rol: user.rol,
      name: user.naam,
    });
    await connection.end();

  } catch (error) {
    console.error('Fout bij inloggen:', error);
    return res.status(500).json({ message: 'Serverfout bij inloggen' });
  }
}

module.exports = { login };  


