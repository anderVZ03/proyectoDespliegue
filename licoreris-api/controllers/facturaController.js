// impotar la base de datos
const db = require('../db');

// Obtener todas las categrias
const getFactura = (req, res) => {
    // ejecuatr consulta en la bd ejerciciendo consulta
    db.query('SELECT * FROM  Factura', (err, results)=>{
        if(err){
            // manejo de error 500--> Error Interno del servidor 
            return res.status(500).json({error: err});

        }
        // datos de la bd 
        res.status(200).send(results);
    })
}

// agregar categoria
const addFactura=(req, res )=>{
    const {fecha,total,informacionCliente} = req.body;// solicitud POST datos enviados por el cliente , el cuerpo de la de la solicitud tenga el nombre de categorias 
    // ejecución consulta bd inserción para ag categoria 
    db.query('INSERT INTO  Factura (fecha, total, informacionCliente) VALUES (?), (?), (?)',
         [fecha, total, informacionCliente], 
         (err,result) =>{
    //    manejo de errores 
        if(err){
            return res.status(500).json({error:err});
        }
        // respuesta con categoria agg + id 
        res.status(201).json(`Factura agg con exito con el id ${result.insertId}`)
    });

};


// eliminar detalle de factura 
const deleteFactura =(req, res) =>{
    const {id_factura} = req.params;
    db.query('DELETE FROM Factura WHERE id_factura =?' , [id_factura],(err, result) =>{
        if (err){
            return res.status(500).send({err:err})
        }if(result.affectedRows ===0){
            return res.status(404).send('Factura no encontrado')

        }
        res.status(201).send(`Factura eliminado con éxito`)
        
    })
}
module.exports = {getFactura, addFactura, deleteFactura};