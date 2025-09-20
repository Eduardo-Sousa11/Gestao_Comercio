const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.query.token;
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = payload; // payload pode conter userId, role, etc.
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
