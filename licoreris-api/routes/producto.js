const express = require('express');
const router = express.Router();
// Ruta para obtener productos
const { getProductos, addProducto, deleteProducto,getAllProduct, getPresentaciones, getPresentacionesCantidad,InsertProduct , updateProduct, getProductById} = require('../controllers/productoController');
const upload = require('../multerConfig');

// Definir rutas
router.get('/', getProductos);
router.get('/All',getAllProduct); //definirla ruta 
router.get('/presentaciones', getPresentaciones);
router.get('/getProduct/:id', getProductById);
router.get('/presentaciones-cantidad', getPresentacionesCantidad)
router.post('/insertProduct',upload.single('image'),InsertProduct)
router.put('/updateProduct', upload.single('image'), updateProduct);


module.exports = router;
