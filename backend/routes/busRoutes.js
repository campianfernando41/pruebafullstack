const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');  // Asegúrate de que busController esté correctamente importado
const verifyApiKey = require('../middleware/apiKeyMiddleware');

// Middleware para verificar la API Key
router.use(verifyApiKey);

// Rutas de buses
router.get('/bus', busController.getAllBuses);  // Usamos busController.getAllBuses
router.get('/bus/:id', busController.getBusById);  // Usamos busController.getBusById

module.exports = router;
