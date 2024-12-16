const express = require('express');
const router = express.Router();

// Importar controladores
const { getMarcasBrandy, getCountMarcasBrandy, getAllProductBrandy, getPresentacionesBrandy, getPresentacionesBrandyCount } = require('../controllers/marcaBrandyController');

// Definir rutas
router.get('/', getMarcasBrandy);
router.get('/count', getCountMarcasBrandy);
router.get('/All', getAllProductBrandy)
router.get('/presentaciones', getPresentacionesBrandy)
router.get('/presentaciones-count', getPresentacionesBrandyCount)
// Exportar router 
module.exports = router;
