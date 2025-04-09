// apiKeyMiddleware.js

const dotenv = require('dotenv');
dotenv.config();

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];  // Esperamos la clave API en los encabezados

    if (!apiKey) {
        return res.status(403).json({ message: 'Acceso denegado. Clave API no proporcionada.' });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Acceso denegado. Clave API inválida.' });
    }

    next();  // La clave API es válida, procedemos con la solicitud
};

module.exports = verifyApiKey;
