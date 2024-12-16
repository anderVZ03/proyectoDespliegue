// impotar la base de datos
const db = require('../db');

const getPresentaciones = (req, res) => {
    db.query('SELECT DISTINCT presentacion_ml FROM Producto ORDER BY presentacion_ml ASC', (err, results) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        res.status(200).json(results.map(row => row.presentacion_ml))
    });
};


// Agregar presentación (si corresponde a un campo específico)
const addPresentacion = (req, res) => {
    const { presentacion_ml } = req.body;
    db.query('UPDATE Producto SET presentacion_ml = ? WHERE id_producto = ?', 
        [presentacion_ml, req.body.id_producto], 
        (err, result) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            res.status(201).send(`Presentación actualizada con éxito`);
        }
    );
};

// Eliminar presentación (si es necesario hacerlo a nivel de productos)
const deletePresentacion = (req, res) => {
    const { id_producto } = req.params;
    db.query('UPDATE Producto SET presentacion_ml = NULL WHERE id_producto = ?', [id_producto], (err, result) => {
        if (err) {
            return res.status(500).send({err: err});
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.status(201).send(`Presentación eliminada con éxito`);
    });
};

module.exports = { getPresentaciones, addPresentacion, deletePresentacion };