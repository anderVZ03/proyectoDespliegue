// impotar la base de datos
const db = require('../db');

// Obtener todas las categrias
const getDetalleFactura = (req, res) => {
    // ejecuatr consulta en la bd ejerciciendo consulta
    db.query('SELECT * FROM  DetalleFactura', (err, results)=>{
        if(err){
            // manejo de error 500--> Error Interno del servidor 
            return res.status(500).json({error: err});

        }
        // datos de la bd 
        res.status(200).res.json(results);
    })
}

// agregar categoria
const addDetalleFactura=(rep, res )=>{
    const {id_factura, id_producto, cantidad, precioUnitario} = req.body;// solicitud POST datos enviados por el cliente , el cuerpo de la de la solicitud tenga el nombre de categorias 
    // ejecución consulta bd inserción para ag categoria 
    db.query('INSERT INTO   DetalleFactura (id_factura, id_producto, cantidad, precioUnitario) VALUES (?), (?), (?), (?)', [id_factura, id_producto, cantidad, precioUnitario], (err,result) =>{
    //    manejo de errores 
        if(err){
            return res.status(500).json({error:err});
        }
        // respuesta con categoria agg + id 
        res.json({id: result.insertId, id_factura, id_producto, cantidad, precioUnitario});
    });

};


// eliminar detalle de factura 
const deleteDetalleFactura =(req, res) =>{
    const {id_detalle_factura} = req.params;
    db.query('DELETE FROM DetalleFactura WHERE id_detalle_factura =?' , [id_detalle_factura],(err, result) =>{
        if (err){
            return res.status(500).send({err:err})
        }if(result.affectedRows ===0){
            return res.status(404).send('Factuyra no encontrada')

        }
        return res.status(200).send(result[0])
        
    })
}
module.exports = {getDetalleFactura, addDetalleFactura, deleteDetalleFactura};