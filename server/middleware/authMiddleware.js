const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token and attach user info to req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('[AuthMiddleware] Authorization header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"
  console.log('[AuthMiddleware] Extracted token:', token);

  if (!token) {
    console.log('[AuthMiddleware] No token found - returning 401');
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('[AuthMiddleware] JWT verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log('[AuthMiddleware] JWT verified successfully. Decoded user:', user);
    req.user = user; // Contains decoded JWT payload, e.g. { id, email, role }
    next();
  });
}

// Middleware to authorize based on user role(s)
// Usage: authorizeRoles('business_owner', 'gov_employee')
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    console.log('[AuthMiddleware] Checking user role authorization...');
    console.log('[AuthMiddleware] req.user:', req.user);

    if (!req.user) {
      console.log('[AuthMiddleware] No user info attached - returning 401');
      return res.status(401).json({ message: 'Unauthorized: No user info' });
    }

    console.log('[AuthMiddleware] User role:', req.user.role);
    console.log('[AuthMiddleware] Allowed roles for this route:', allowedRoles);

    if (!allowedRoles.includes(req.user.role)) {
      console.log('[AuthMiddleware] Role not authorized - returning 403');
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    console.log('[AuthMiddleware] Role authorized, proceeding...');
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
