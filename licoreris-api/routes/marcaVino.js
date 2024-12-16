const express = require('express');
const router = express.Router();

// Importar controladores
const { getMarcasVinos, getCountMarcasVinos, getAllProductVinos, getPresentacionesVinos, getPresentacionesVinosCount } = require('../controllers/marcaVinoController');

// Definir rutas
router.get('/', getMarcasVinos);
router.get('/count', getCountMarcasVinos);
router.get('/All', getAllProductVinos)
router.get('/presentaciones', getPresentacionesVinos)
router.get('/presentaciones-count', getPresentacionesVinosCount)
// Exportar router 
module.exports = router;
