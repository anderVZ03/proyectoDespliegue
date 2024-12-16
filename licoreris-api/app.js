// Configuración del servidor 
const express = require('express'); // Importar express
const cors = require('cors');
require('dotenv').config();

const app = express(); // Instancia de express
const path = require('path');
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.urlencoded({ extended: true })); // Para manejar formularios
// Importar rutas 
const categoriaRoutes = require('./routes/categoria');
const marcaRoutes = require('./routes/marca');
const productoRoutes = require('./routes/producto'); // Corregido aquí
const facturaRoutes = require('./routes/factura');
const detalleFacturaRoutes = require('./routes/detalleFactura');
const licoresRoutes = require('./routes/licores');
const productosController = require('./routes/producto'); // Corregido aquí
const marcaBrandyRoutes = require('./routes/marcaBrandy');
const  marcaCervezaRoutes = require('./routes/marcaCerveza');
const marcaGinRoutes = require('./routes/marcaGin');
const marcaTequilaRoutes = require('./routes/marcaTequila');
const marcaWhiskey = require('./routes/marcaWhiskey');
const marcaVinos = require('./routes/marcaVino');
const marcaVodka = require('./routes/marcaVodka')

// Configuración middleware - Proceso de solicitud JSON
app.use(express.json());

// Configuración de rutas del servidor 
app.use('/categoria', categoriaRoutes);
app.use('/marca', marcaRoutes);
app.use('/producto', productoRoutes); // Usa `productoRoutes` para manejar rutas de productos
app.use('/detalleFactura', detalleFacturaRoutes);
app.use('/licores', licoresRoutes);
app.use('/factura', facturaRoutes);
app.use('/marcaBrandy', marcaBrandyRoutes);
app.use('/marcaCerveza', marcaCervezaRoutes);
app.use('/marcaGin', marcaGinRoutes);
app.use('/marcaTequila', marcaTequilaRoutes);
app.use('/marcaWhiskey', marcaWhiskey);
app.use('/marcaVinos', marcaVinos);
app.use('/marcaVodka', marcaVodka);
// Configuración del puerto 
const PORT = process.env.PORT || 3000;

// Inicio del servidor 
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
