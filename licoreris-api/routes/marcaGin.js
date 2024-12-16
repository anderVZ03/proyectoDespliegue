const express = require('express');
const router = express.Router();

// Importar controladores
const { getMarcasGin, getCountMarcasGin, getAllProductGin, getPresentacionesGin, getPresentacionesGinCount } = require('../controllers/marcaGinController');

// Definir rutas
router.get('/', getMarcasGin);
router.get('/count', getCountMarcasGin);
router.get('/All', getAllProductGin)
router.get('/presentaciones', getPresentacionesGin)
router.get('/presentaciones-count', getPresentacionesGinCount)
// Exportar router 
module.exports = router;