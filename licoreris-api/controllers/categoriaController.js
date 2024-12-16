// impotar la base de datos
const db = require('../db');

// Obtener todas las categrias
const getCategoriaNombre = (req, res) => {
    // ejecuatr consulta en la bd ejerciciendo consulta
    db.query('SELECT c.nombreCategoria FROM Categoria c JOIN TipoProducto t ON c.id_tipo_producto = t.id_tipo_producto', (err, results)=>{
        if(err){
            console.log('Error al ver la tabla', err)
            // manejo de error 500--> Error Interno del servidor 
            return res.status(500).json({error: err});

        }
        // datos de la bd 
        res.status(200).json(results);
    })
}
// Obtener categoria y cantidad de cada una 
const getCategoriaCantidad = (req, res) => {
    // ejecuatr consulta en la bd ejerciciendo consulta
    db.query(' SELECT c.nombreCategoria AS Categoria, COUNT(p.id_producto) AS TotalProductos FROM Producto p INNER JOIN  Categoria c ON p.id_categoria = c.id_categoria GROUP BY  c.nombreCategoria ORDER BY TotalProductos DESC;', (err, results)=>{
        if(err){
        
            // manejo de error 500--> Error Interno del servidor 
            return res.status(500).json({error: err});

        }
        // datos de la bd 
        res.status(200).json(results);
    })
}

// agregar categoria
const addCategoria=(req, res )=>{
    const {nombreCategoria} = req.body;// solicitud POST datos enviados por el cliente , el cuerpo de la de la solicitud tenga el nombre de categorias 
    // ejecución consulta bd inserción para ag categoria 
    db.query('INSERT INTO Categoria (nombreCategoria, id_tipo_producto) VALUES (?, ?)', [nombreCategoria, id_tipo_producto], (err,result) =>{
    //    manejo de errores 
        if(err){
            console.error('Error al ingresar el nuevo registro',err);
            return res.status(500).json({error:err});
        }
        // respuesta con categoria agg + id 
        res.json({id: result.insertId, nombreCategoria, id_tipo_producto});
    });

};
// Eliminar categoría
// Eliminar categoría
const deleteCategoria = (req, res) => {
    const { id_categoria } = req.params;
    db.query('DELETE FROM Categoria WHERE id_categoria = ?', [id_categoria], (err, result) => {
        if (err) {
            console.error('Error al eliminar categoría', err);
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Categoría no encontrada'); // Categoría no existe
        }
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    });
};

module.exports = {getCategoriaNombre, addCategoria,deleteCategoria, getCategoriaCantidad};