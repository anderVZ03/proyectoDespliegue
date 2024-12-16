CREATE DATABASE licoreriaelchinito;
USE licoreriaelchinito;

-- Tabla tipoProducto
CREATE TABLE TipoProducto (
    id_tipo_producto INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombreTipo VARCHAR(50) NOT NULL
);

-- Tabla categoria
CREATE TABLE Categoria (
    id_categoria INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_tipo_producto INT(11),
    nombreCategoria VARCHAR(50) NOT NULL,
    tipo VARCHAR(255),
    FOREIGN KEY (id_tipo_producto) REFERENCES TipoProducto (id_tipo_producto)
);

-- Tabla marca
CREATE TABLE Marca (
    id_marca INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT(11),
    nombreMarca VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria (id_categoria)
);

-- Tabla producto
CREATE TABLE Producto (
    id_producto INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_marca INT(11),
    nombreProducto VARCHAR(100) NOT NULL,
    cantidad INT(11),
    precio DECIMAL(10,2),
    presentacion_ml INT(11),
    id_categoria INT(11),
    imagen VARCHAR(120),
    FOREIGN KEY (id_marca) REFERENCES Marca (id_marca),
    FOREIGN KEY (id_categoria) REFERENCES Categoria (id_categoria)
);

-- Tabla factura
CREATE TABLE Factura (
    id_factura INT(11) PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    total DECIMAL(10,2),
    informacionCliente VARCHAR(255)
);

-- Tabla detalleFactura
CREATE TABLE DetalleFactura (
    id_detalle_factura INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_factura INT(11),
    id_producto INT(11),
    cantidad INT(11),
    precioUnitario DECIMAL(10,2),
    FOREIGN KEY (id_factura) REFERENCES Factura (id_factura),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
);

-- Inserción en tabla tipoProducto
INSERT INTO TipoProducto (id_tipo_producto, nombreTipo) VALUES
(1, 'Confiteria'),
(2, 'Licores');

-- Inserción en tabla categoria
INSERT INTO Categoria (id_categoria, id_tipo_producto, nombreCategoria, tipo) VALUES
(1, 2, 'Whiskey', 'licores'),
(2, 2, 'Vodka', 'licores'),
(3, 2, 'Tequila', 'licores'),
(4, 2, 'Brandy', 'licores'),
(5, 2, 'Vinos', 'licores'),
(6, 2, 'Gin', 'licores'),
(7, 2, 'Cerveza', 'licores');

-- Inserción en tabla marca
INSERT INTO Marca (id_marca, id_categoria, nombreMarca) VALUES
(1, 1, 'Jack Daniels'),
(2, 1, 'Johnnie Walker'),
(3, 2, 'Smirnoff'),
(4, 2, 'Absolut'),
(5, 3, 'Jose Cuervo'),
(6, 3, 'Patron'),
(7, 4, 'Hennessy'),
(8, 4, 'Rémy Martin'),
(9, 5, 'Bodegas Torres'),
(10, 5, 'Concha y Toro'),
(11, 5, 'Santa Carolina'),
(12, 6, 'Bombay Sapphire'),
(13, 7, 'Corona'),
(14, 7, 'Heineken'),
(15, 6, 'Tanqueay'),
(16, 6, 'Gin Mare'),
(17, 2, 'Grey Goose'),
(18, 2, 'Belvedere'),
(19, 2, 'Ciroc'),
(20, 1, 'Ballantine\'s'),
(21, 1, 'Chivas Regal'),
(22, 1, 'Jameson'),
(23, 7, 'Pilsener'),
(24, 7, 'Club Premiun'),
(25, 6, 'Beefeater'),
(26, 5, 'Casillero del Diablo'),
(27, 5, 'Marqués de Cáceres'),
(28, 5, 'Trapiche'),
(29, 3, 'Don Julio');

-- Inserción en tabla producto
INSERT INTO Producto (id_producto, id_marca, nombreProducto, cantidad, precio, presentacion_ml, id_categoria, imagen) VALUES
(1, 1, 'Jack Daniels', 50, 45.99, 700, 1, 'JackDaniels.jpg'),
(2, 2, 'Johnnie Walker Black', 40, 55.50, 750, 1, 'JohnnieWalkerBlack.jpg'),
(3, 3, 'Smirnoff Vodka', 30, 25.99, 700, 2, 'SmirnoffVodka.jpg'),
(4, 4, 'Absolut Vodka', 25, 35.00, 1000, 2, 'AbsolutVodka.jpg'),
(5, 5, 'Jose Cuervo Especial Gold', 60, 40.00, 700, 3, 'JoseEspecialGold.jpg'),
(6, 6, 'Patron Silver', 20, 70.00, 750, 3, 'PatronSilver.png'),
(7, 7, 'Hennessy VS', 45, 60.00, 700, 4, 'HennessyVS.jpg'),
(8, 8, 'Rémy Martin XO', 15, 150.00, 700, 4, 'RemyMartin.jpg'),
(9, 9, 'Torres 10 Brandy', 50, 28.00, 700, 5, NULL),
(10, 10, 'Concha y Toro Gran Reserva', 30, 20.00, 750, 5, 'ConchaGranReserva.png'),
(11, 15, 'Tanqueray London Dry Gin', 40, 35.00, 700, 6, NULL),
(12, 12, 'Bombay Sapphire Gin', 35, 40.00, 750, 6, 'BombaySapphire.jpg'),
(13, 13, 'Corona Extra', 100, 1.50, 355, 7, 'CoronaExtra.png'),
(14, 14, 'Heineken', 120, 1.75, 330, 7, 'Heineken.jpg'),
(15, 3, 'Smirnoff Red Label', 100, 15.00, 750, 2, NULL),
(16, 3, 'Smirnoff Green Apple', 90, 16.50, 750, 2, 'SminoffGreen.jpg'),
(17, 3, 'Smirnoff Raspberry', 85, 16.50, 750, 2, NULL),
(18, 3, 'Smirnoff Ice', 120, 12.00, 275, 2, 'SmirnoffIce.jpg'),
(19, 4, 'Absolut Vodka Original', 70, 30.00, 750, 2, 'AbsolutVodka.jpg'),
(20, 4, 'Absolut Citron', 60, 32.00, 750, 2, 'AbsolutCitron.jpg'),
(21, 4, 'Absolut Vanilla', 50, 32.00, 750, 2, 'AbsolutVainilla.png'),
(22, 17, 'Grey Goose Original', 40, 50.00, 750, 2, 'GreyOriginal.jpg'),
(23, 17, 'Grey Goose L’Orange', 35, 52.00, 750, 2, 'GreyOrage.jpg'),
(24, 17, 'Grey Goose Le Citron', 30, 52.00, 750, 2, 'GreyLeCitron.jpg'),
(25, 18, 'Belvedere Vodka', 45, 45.00, 750, 2, 'BelvedereVodka.jpg'),
(26, 18, 'Belvedere Peach Nectar', 40, 48.00, 750, 2, 'BelvedereNectar.jpg'),
(27, 19, 'Cîroc Snap Frost', 30, 60.00, 750, 2, 'cirocSnap.jpg'),
(28, 19, 'Cîroc Red Berry', 25, 65.00, 750, 2, 'cirocRed.jpg'),
(29, 19, 'Cîroc Coconut', 20, 65.00, 750, 2, 'CirocCoconut.jpg'),
(30, 1, 'Johnnie Walker Red Label', 120, 25.00, 750, 1, 'JohnnieRed.jpg');