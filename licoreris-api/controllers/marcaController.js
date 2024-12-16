// Importar la base de datos
const db = require('../db');


// Obtener todas las marcas
const getMarca = (req, res) => {
  // Ejecutar consulta en la base de datos
  db.query(
    `SELECT m.nombreMarca
FROM Marca m
LEFT JOIN Producto p ON m.id_marca = p.id_marca
GROUP BY m.nombreMarca;`,  // Filtrar por 'licores'
    (err, results) => {
      if (err) {
        // Manejo de error 500 --> Error Interno del servidor 
        return res.status(500).json({ error: err });
      }
      // Datos de la base de datos 
      res.status(200).json(results);
    }
  );
};

// Agregar marca
const addMarca = (req, res) => {
  const { nombreMarca } = req.body;
  db.query('INSERT INTO Marca (nombreMarca) VALUES (?)', [nombreMarca], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).send(`Marca agregada con éxito: id ${result.insertId}`);
  });
};

// Eliminar marca
const deleteMarca = (req, res) => {
  const { id_marca } = req.params;  // Cambié `id` por `id_marca`
  db.query('DELETE FROM Marca WHERE id_marca = ?', [id_marca], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.status(200).json({ message: 'Marca eliminada con éxito' });
  });
};

// Contar marcas
// Contar marcas
const getCountMarcas = (req, res) => {
  db.query (`SELECT m.nombreMarca, COUNT(p.id_producto) AS cantidad
FROM Marca m
LEFT JOIN Producto p ON m.id_marca = p.id_marca
GROUP BY m.nombreMarca;`,
    (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};


module.exports = { getMarca, addMarca, deleteMarca, getCountMarcas };
