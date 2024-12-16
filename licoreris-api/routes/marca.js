const express = require('express');
const router = express.Router();

// Importar contraladores
const { getMarca, addMarca, deleteMarca , getCountMarcas} = require('../controllers/marcaController');

// definir rutas
router.get('/', getMarca);
router.post('/', addMarca);
router.delete('/:id', deleteMarca);
router.get('/count', getCountMarcas);
// exportar router 
module.exports = router;
