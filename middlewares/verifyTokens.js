// verifyToken.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/configKey');

function verifyToken(req, res, next) {   
  const token = req.headers.authorization;

  if (!token) {
    console.log("!token");
    return res.status(403).send({ auth: false, message: 'No se proporcionó un token.' });
    
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("error de servidor");
      return res.status(500).send({ auth: false, message: 'Error al autenticar el token.' });
    }

    // Si el token es válido, puedes almacenar información adicional en req.user para su uso posterior
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
