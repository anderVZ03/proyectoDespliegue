const express = require('express');
const router = express.Router();

// Importar controladores
const { getMarcasTequila, getCountMarcasTequila, getAllProductTequila, getPresentacionesTequila, getPresentacionesTequilaCount } = require('../controllers/marcaTequilaController');

// Definir rutas
router.get('/', getMarcasTequila);
router.get('/count', getCountMarcasTequila);
router.get('/All', getAllProductTequila)
router.get('/presentaciones', getPresentacionesTequila)
router.get('/presentaciones-count', getPresentacionesTequilaCount)
// Exportar router 
module.exports = router;
