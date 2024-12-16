const express = require('express');
const router = express.Router();

// Importar controladores
const { getMarcasWhiskey, getCountMarcasWhiskey, getAllProductWhiskey, getPresentacionesWhiskey, getPresentacionesWhiskeyCount } = require('../controllers/marcaWhiskeyController');

// Definir rutas
router.get('/', getMarcasWhiskey);
router.get('/count', getCountMarcasWhiskey);
router.get('/All', getAllProductWhiskey)
router.get('/presentaciones', getPresentacionesWhiskey)
router.get('/presentaciones-count', getPresentacionesWhiskeyCount)
// Exportar router 
module.exports = router;
