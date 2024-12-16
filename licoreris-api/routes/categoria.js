const express = require('express');
const router = express.Router();

// Importar los controladores
const { getCategoriaNombre, addCategoria, deleteCategoria, getCategoriaCantidad } = require('../controllers/categoriaController');

// Definir las rutas
router.get('/tipos-licores', getCategoriaNombre);  // Obtener todas las categorías
router.post('/', addCategoria);  // Agregar una nueva categoría
router.delete('/:id_categoria', deleteCategoria);  // Eliminar una categoría por id
router.get('/categorias-cantidad', getCategoriaCantidad)

// Exportar el router
module.exports = router;
