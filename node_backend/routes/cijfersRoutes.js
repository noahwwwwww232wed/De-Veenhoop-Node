const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const connectDB = require('../db/connection');


// Leerling bekijkt zijn cijfers + gemiddelde
router.get('/leerling/cijfers', authenticate, authorizeRole('leerling'), async (req, res) => {
  try {
    const connection = await connectDB();

    // haal cijfers van deze leerling op
    const [cijfers] = await connection.execute(
      'SELECT * FROM cijfers WHERE leerling_id = ?',
      [req.user.id]
    );

    // bereken gemiddelde
    const gemiddelde = cijfers.length > 0
      ? cijfers.reduce((sum, c) => sum + parseFloat(c.waarde), 0) / cijfers.length
      : 0;

    res.json({ cijfers, gemiddelde });
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen cijfers', error: error.message });
  }
});

// Leraar voegt cijfers toe
router.post('/leraar/cijfers', authenticate, authorizeRole('leraar'), async (req, res) => {
  try {
    const connection = await connectDB();

    const { leerlingId, vak, waarde } = req.body;

    // check of leerling in klas van leraar zit
    const [klas] = await connection.execute(
      `SELECT klassen.id FROM klassen
       JOIN klas_leerlingen ON klas_leerlingen.klas_id = klassen.id
       WHERE klassen.leraar_id = ? AND klas_leerlingen.leerling_id = ?`,
      [req.user.id, leerlingId]
    );

    if (klas.length === 0) {
      return res.status(403).json({ message: 'Leerling zit niet in jouw klas' });
    }

    // cijfer toevoegen
    const [result] = await connection.execute(
      'INSERT INTO cijfers (leerling_id, vak, waarde, datum) VALUES (?, ?, ?, NOW())',
      [leerlingId, vak, waarde]
    );

    res.json({ id: result.insertId, leerlingId, vak, waarde, datum: new Date() });
  } catch (error) {
    res.status(500).json({ message: 'Fout bij toevoegen cijfer', error: error.message });
  }
});


module.exports = router;
