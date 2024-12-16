const express = require('express');
const router = express.Router();

// Importar los controladores
const { getPresentaciones, addPresentacion, deletePresentacion } = require('../controllers/presentacionController');

// Definir las rutas
router.get('/', getPresentaciones);  // Obtener todas las presentaciones
router.post('/', addPresentacion);  // Agregar o actualizar presentación de producto
router.delete('/:id_producto', deletePresentacion);  // Eliminar presentación de un producto

// Exportar el router
module.exports = router;
