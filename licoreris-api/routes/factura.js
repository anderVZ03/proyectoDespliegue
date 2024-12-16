const express = require('express');
const router = express.Router();

// Importar contraladores
const { getFactura, addFactura } = require('../controllers/facturaController');

// definir rutas
router.get('/', getFactura);
router.post('/', addFactura);

// exportar router 
module.exports = router;
