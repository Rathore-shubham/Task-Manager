// generateSecret.js
const crypto = require('crypto');

// Generate a 64-byte random secret key and convert it to hexadecimal
const secretKey = crypto.randomBytes(64).toString('hex');

console.log("Generated JWT Secret Key: ", secretKey);
