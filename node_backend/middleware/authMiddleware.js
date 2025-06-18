const jwt = require('jsonwebtoken');

// Check of token aanwezig en geldig is
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Geen toegang - token ontbreekt' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // bevat id, role, etc.
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token ongeldig' });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Geen toegang - rol vereist: ' + role });
    }
    next();
  };
}

module.exports = { authenticate, authorizeRole };
