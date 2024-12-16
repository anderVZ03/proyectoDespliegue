const express = require('express');
const router = express.Router();

// Importar controladores
const { getMarcasVodka, getCountMarcasVodka, getAllProductVodka, getPresentacionesVodka, getPresentacionesVodkaCount } = require('../controllers/marcaVodkaController');

// Definir rutas
router.get('/', getMarcasVodka);
router.get('/count', getCountMarcasVodka);
router.get('/All', getAllProductVodka)
router.get('/presentaciones', getPresentacionesVodka)
router.get('/presentaciones-count', getPresentacionesVodkaCount)
// Exportar router 
module.exports = router;
