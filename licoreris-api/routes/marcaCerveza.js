const express = require('express');
const router = express.Router();

// Importar controladores
const { 
    getMarcasCerveza,
    getCountMarcasCerveza,
    getAllProductCerveza, 
    getPresentacionesCerveza, 
    getPresentacionesCervezaCount
} = require('../controllers/marcaCervezaController');

// Definir rutas
router.get('/', getMarcasCerveza);
router.get('/count', getCountMarcasCerveza);
router.get('/All', getAllProductCerveza);
router.get('/presentaciones', getPresentacionesCerveza);
router.get('/presentaciones-count', getPresentacionesCervezaCount);

// Exportar router
module.exports = router;
