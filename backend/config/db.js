const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

/* Configuración del pool de conexiones */
const pool = mysql.createPool({
  host: process.env.DB_HOST,      
  user: process.env.DB_USER,      
  password: process.env.DB_PASS,   
  database: process.env.DB_NAME,       
  port: process.env.DB_PORT,           
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0             
});

/* Verificar conexión inicial */
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar al pool de la base de datos:', err.stack);
    return;
  }
  console.log('Conectado al pool de la base de datos con ID de conexión:', connection.threadId);
  connection.release();
});

module.exports = pool;
