const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token and attach user info to req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Contains decoded JWT payload, e.g. { id, email, role }
    next();
  });
}

// Middleware to authorize based on user role(s)
// Usage: authorizeRoles('business_owner', 'gov_employee')
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
