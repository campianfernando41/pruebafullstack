const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const busRoutes = require('./routes/busRoutes');
const verifyApiKey = require('./middleware/apiKeyMiddleware');  // Importamos el middleware

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Aplicar el middleware para verificar la clave API globalmente
app.use('/api', verifyApiKey);  // Protegemos todas las rutas bajo /api

// Rutas
app.use('/api', busRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
