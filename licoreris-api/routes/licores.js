const express = require('express');
const router = express.Router();
const db = require('../db');

    router.get('/', (req, res) => {
        const { page = 1, limit = 10, marca, categoria, presentacion } = req.query;
        const filters = {};
      
        if (marca) filters.marca = marca;
        if (categoria) filters.categoria = categoria;
        if (presentacion) filters.presentacion = presentacion;
      
        const productos = database.filter(product => {
          return (!marca || product.marca === marca) &&
                 (!categoria || product.categoria === categoria) &&
                 (!presentacion || product.presentacion === presentacion);
        });
      
        const paginated = productos.slice((page - 1) * limit, page * limit);
        res.json({ productos: paginated, total: productos.length });
      });
      
      module.exports = router;