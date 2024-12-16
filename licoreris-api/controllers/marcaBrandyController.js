const db = require('../db');


// Obtener MarcasBrandy 
const getMarcasBrandy = (req, res) => {
    db.query(
        `SELECT DISTINCT m.nombreMarca
         FROM Marca m
         JOIN Producto p ON m.id_marca = p.id_marca
         JOIN Categoria c ON p.id_categoria = c.id_categoria
         WHERE c.nombreCategoria = 'Brandy'`,
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        }
    );
};


//  Contar marcas de brandy 
const getCountMarcasBrandy = (req, res) => {
    db.query(`
        SELECT m.nombreMarca, COUNT(p.id_producto) AS cantidad
        FROM Marca m
        LEFT JOIN Producto p ON m.id_marca = p.id_marca
        JOIN Categoria c ON p.id_categoria = c.id_categoria
        WHERE c.nombreCategoria = 'Brandy'
        GROUP BY m.nombreMarca;
    `, (err, results) => {
        if (err) {
            // Manejo de error 500 --> Error Interno del servidor 
            return res.status(500).json({ error: err });
        }
        // Datos de la base de datos 
        res.status(200).json(results);
    });
};

// Se encarga de obtener todos los productos de la base de datos  solo los que pertenecen Brandy 
const getAllProductBrandy = (req,res)=>{
    const query= `SELECT * 
        FROM Producto p
        JOIN Categoria c ON p.id_categoria = c.id_categoria
        WHERE c.nombreCategoria = 'Brandy';`; //Consulta para ver todos lo produtos 
    db.query(query,(err,results)=>{ //ejecuta la consulta en ka bd
        if(err) return res.status(500).json({error:err})
        return res.status(200).json(results);  //devuleve los resultados
    });

};


// Obtener las presentaciones únicas de la categoria brandy
const getPresentacionesBrandy = (req, res) => {
    db.query(  `
        SELECT DISTINCT p.presentacion_ml 
        FROM Producto p
        JOIN Categoria c ON p.id_categoria = c.id_categoria
        WHERE c.nombreCategoria = 'Brandy' AND p.presentacion_ml IS NOT NULL
        ORDER BY p.presentacion_ml ASC
        `, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(results.map(result => result.presentacion_ml));  // Asegúrate de solo devolver los valores de `presentacion_ml`
    });
  };
  
  // Obtener las presentaciones únicas de la categoria brandy
  const getPresentacionesBrandyCount = (req, res) => {
    db.query(
        `
        SELECT p.presentacion_ml, COUNT(p.id_producto) AS cantidad
        FROM Producto p
        JOIN Categoria c ON p.id_categoria = c.id_categoria
        WHERE c.nombreCategoria = 'Brandy' AND p.presentacion_ml IS NOT NULL
        GROUP BY p.presentacion_ml
        ORDER BY p.presentacion_ml ASC
        `,
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            // Devolver directamente los objetos resultantes
            res.status(200).json(results);
        }
    );
};



 module.exports = { getMarcasBrandy, getCountMarcasBrandy,getAllProductBrandy, getPresentacionesBrandy, getPresentacionesBrandyCount};
