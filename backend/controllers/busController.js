const db = require('../config/db'); // Asegúrate de que tengas tu conexión exportada desde aquí

// GET /bus
const getAllBuses = (req, res) => {
    // Obtener los parámetros de la consulta, con valores predeterminados
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sql = `
        SELECT b.id_bus, b.numero_bus, b.placa, b.fecha_creacion, b.caracteristicas, 
               b.estado, m.nombre_marca 
        FROM buses b 
        JOIN marcas m ON b.id_marca = m.id_marca
        LIMIT ? OFFSET ?;
    `;
    
    // Consulta para obtener los buses con paginación
    db.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error('Error al obtener los buses:', err);
            return res.status(500).json({ error: 'Error al obtener los buses' });
        }

        // Consulta para obtener el total de buses (para contar las páginas)
        const countSql = 'SELECT COUNT(*) AS total FROM buses';
        db.query(countSql, (err, countResults) => {
            if (err) {
                console.error('Error al contar los buses:', err);
                return res.status(500).json({ error: 'Error al contar los buses' });
            }

            const totalBuses = countResults[0].total;
            const totalPages = Math.ceil(totalBuses / limit);

            res.json({
                totalBuses,
                totalPages,
                currentPage: page,
                buses: results
            });
        });
    });
};


// GET /bus/:id
const getBusById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT b.id_bus, b.numero_bus, b.placa, b.fecha_creacion, b.caracteristicas, 
               b.estado, m.nombre_marca 
        FROM buses b 
        JOIN marcas m ON b.id_marca = m.id_marca
        WHERE b.id_bus = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el bus:', err);
            return res.status(500).json({ error: 'Error al obtener el bus' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Bus no encontrado' });
        }

        res.json(results[0]);
    });
};

module.exports = {
    getAllBuses,
    getBusById
};
