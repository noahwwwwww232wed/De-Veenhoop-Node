const connectDB = require('../db/connection');

async function cijfers(req, res) {
  try {
    const { leerlingId, periode, vakId, cijfer } = req.body;

    if (!leerlingId || !periode || !vakId || !cijfer) {
      return res.status(400).json({ message: 'Vul alle velden in.' });
    }

    const connection = await connectDB();

    
    const [blokResult] = await connection.execute(
      'SELECT blok_id FROM blokken WHERE naam = ?',
      [periode]
    );

    if (blokResult.length === 0) {
      return res.status(400).json({ message: 'Ongeldige periode geselecteerd.' });
    }

    const blokId = blokResult[0].blok_id;

    
    const ingevoerdDoor = 21; 

    
    await connection.execute(
      'INSERT INTO cijfers (leerling_id, vak_id, blok_id, cijfer, ingevoerd_door) VALUES (?, ?, ?, ?, ?)',
      [leerlingId, vakId, blokId, cijfer, ingevoerdDoor]
    );

    res.status(200).json({ message: 'Cijfer succesvol opgeslagen!' });
  } catch (error) {
    console.error('Fout bij invoeren cijfer:', error);
    res.status(500).json({ message: 'Interne serverfout' });
  }
}

module.exports = { cijfers };
