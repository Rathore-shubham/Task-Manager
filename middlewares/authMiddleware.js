const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token after "Bearer"
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Check if JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables' });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded token in request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.log('Error verifying token:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
