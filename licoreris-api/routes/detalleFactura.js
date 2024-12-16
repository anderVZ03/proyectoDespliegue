const express = require('express');
const router = express.Router();

// Importar contraladores
const { getDetalleFactura, addDetalleFactura } = require('../controllers/detalleFacturaController');

// definir rutas
router.get('/', getDetalleFactura);
router.post('/', addDetalleFactura);

// exportar router 
module.exports = router;
