// controllers/productosController.js

const db = require('../db'); // Asegúrate de que la conexión a la base de datos esté bien configurada
const upload = require('../multerConfig'); //MulterCondig
// Función para obtener los productos
const getProductos = (req, res) => {
    const { categoria, marca, presentacion } = req.query;
    let query = `
         SELECT 
            Producto.id_producto, 
            Producto.nombreProducto, 
            Producto.cantidad, 
            Producto.precio, 
            Producto.presentacion_ml, 
            Marca.nombreMarca, 
            Categoria.nombreCategoria,
            Categoria.tipo AS tipoLicor
        FROM Producto 
        JOIN Marca ON Producto.id_marca = Marca.id_marca 
        JOIN Categoria ON Producto.id_categoria = Categoria.id_categoria  `;
    
    const params = [];
    if (categoria) {
        query += ' WHERE Categoria.nombreCategoria = ?';
        params.push(categoria);
    }
    if (marca) {
        query += params.length > 0 ? ' AND' : ' WHERE';
        query += ' Marca.nombreMarca = ?';
        params.push(marca);
    }
    if (presentacion) {
        query += params.length > 0 ? ' AND' : ' WHERE';
        query += ' Producto.presentacion_ml = ?';
        params.push(presentacion);
    }
    if (tipoLicor) {
        query += params.length > 0 ? ' AND' : ' WHERE';
        query += ' Categoria.tipo = ?';
        params.push(tipoLicor);
    }
    
    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

// Se encarga de obtener todos kos productos de la base de datos 
const getAllProduct = (req,res)=>{
    const query= `SELECT * 
        FROM Producto p
        JOIN Categoria c ON p.id_categoria = c.id_categoria
        WHERE c.tipo = 'licores';`; //Consulta para ver todos lo produtos 
    db.query(query,(err,results)=>{ //ejecuta la consulta en ka bd
        if(err) return res.status(500).json({error:err})
        return res.status(200).json(results);  //devuleve los resultados
    })

}

const getProductById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM Producto WHERE id_producto = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el producto', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(result[0]);
  });
};



// Obtener las presentaciones únicas desde la tabla Producto
const getPresentaciones = (req, res) => {
    db.query('SELECT DISTINCT presentacion_ml FROM Producto WHERE presentacion_ml IS NOT NULL ORDER BY presentacion_ml ASC', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results.map(result => result.presentacion_ml));  // Asegúrate de solo devolver los valores de `presentacion_ml`
    });
  };
  

// Obtener las presentaciones únicas desde la tabla Producto cantidad de cada una 
const getPresentacionesCantidad = (req, res) => {
    db.query('SELECT p.presentacion_ml, COUNT(p.id_producto) AS cantidad FROM Producto p GROUP BY p.presentacion_ml', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results);
    }
  
);
};


const InsertProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error al subir la imagen', error: err });
      }
  
      const { id_marca, nombreProducto, cantidad, precio, presentacion_ml, id_categoria } = req.body;
      
      // Validar que todos los campos requeridos estén presentes
      if (!id_marca || !nombreProducto || !cantidad || !precio || !presentacion_ml || !id_categoria) {
        return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud.' });
      }
  
      const imagen = req.file ? req.file.filename : null;
  
      const query = `
        INSERT INTO Producto (id_marca, nombreProducto, cantidad, precio, presentacion_ml, id_categoria, imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [id_marca, nombreProducto, cantidad, precio, presentacion_ml, id_categoria, imagen];
  
      db.query(query, values, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error al insertar el producto', error: err });
        }
        res.status(201).json({ message: 'Producto insertado con éxito', product: result });
      });
    });
  };
  
  const updateProduct = (req, res) => { const { id_producto, id_marca, nombreProducto, cantidad, precio, presentacion_ml, id_categoria } = req.body; const imagen = req.file ? req.file.filename : null; let query = ` UPDATE Producto SET id_marca = ?, nombreProducto = ?, cantidad = ?, precio = ?, presentacion_ml = ?, id_categoria = ?`; const values = [id_marca, nombreProducto, cantidad, precio, presentacion_ml, id_categoria]; if (imagen) { query += `, imagen = ?`; values.push(imagen); } query += ` WHERE id_producto = ?`; values.push(id_producto); db.query(query, values, (err, result) => { if (err) { return res.status(500).json({ message: 'Error al actualizar el producto en la base de datos', error: err }); } res.status(200).json({ message: 'Producto actualizado con éxito', product: result }); });};


// Exportar funciones
module.exports = {
    getProductos,
    getAllProduct,
    getPresentaciones,
    getPresentacionesCantidad,
    InsertProduct,
    updateProduct, // Debe incluirse aquí
    getProductById
};