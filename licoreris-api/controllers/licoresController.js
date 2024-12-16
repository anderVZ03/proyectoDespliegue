const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para obtener productos con filtros y paginación
router.get('/', (req, res) => {
    const { page = 1, limit = 10, marca, categoria, presentacion } = req.query;

    // Variables para la consulta SQL
    let sql = 'SELECT * FROM Producto WHERE 1=1';
    const params = [];

    // Aplicar filtros si están presentes
    if (marca) {
        sql += ' AND id_marca = ?';
        params.push(marca);
    }
    if (categoria) {
        sql += ' AND id_categoria = ?'; // Suponiendo que hay una columna `id_categoria`
        params.push(categoria);
    }
    if (presentacion) {
        sql += ' AND presentacion_ml = ?';
        params.push(presentacion);
    }

    // Agregar paginación
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    // Consulta principal con paginación
    db.query(sql, params, (err, productos) => {
        if (err) {
            console.error('Error al consultar productos:', err);
            return res.status(500).json({ error: 'Error al consultar productos' });
        }

        // Consulta para obtener el total sin paginación
        const countSql = 'SELECT COUNT(*) AS total FROM Producto WHERE 1=1';
        db.query(countSql, params.slice(0, -2), (countErr, countResult) => {
            if (countErr) {
                console.error('Error al contar productos:', countErr);
                return res.status(500).json({ error: 'Error al contar productos' });
            }

            const total = countResult[0].total; // Total de productos encontrados
            res.json({ productos, total });
        });
    });
});

module.exports = router;
