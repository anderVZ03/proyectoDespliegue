// Conexión a la base de datos 

// Importar biblioteca y cargar variables de entornos 
const mysql = require('mysql2'); //Interactuar con la base de datos
require('dotenv').config(); // carga variables de un archivo .env 

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'database',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Exportar conexión 
module.exports = connection;
