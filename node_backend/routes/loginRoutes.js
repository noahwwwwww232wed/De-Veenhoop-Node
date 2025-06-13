const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, password, role } = req.body;

  console.log('Login poging:', { email, role });

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [email, role]
    );

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

    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.naam },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await connection.end();

    return res.status(200).json({
      message: 'Inloggen is gelukt!',
      token,
      role: user.role,
      name: user.naam,
    });
  } catch (error) {
    console.error('Fout bij inloggen:', error);
    return res.status(500).json({ message: 'Serverfout bij inloggen' });
  }
}

module.exports = { login };
