let productos = require('../data/productos');

const obtenerTodos = (req, res) => res.json(productos);

const obtenerPorId = (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    producto ? res.json(producto) : res.status(404).json({ message: "Producto no encontrado" });
};

const crear = (req, res) => {
    const { nombre, categoría, precio, stock } = req.body;
    
    if (!nombre || !categoría || precio <= 0 || stock < 0) {
        return res.status(400).json({ message: "Datos inválidos" });
    }

    const nuevoProducto = { id: Date.now(), nombre, categoría, precio, stock };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
};

const actualizar = (req, res) => {
    const { id } = req.params;
    const { nombre, categoría, precio, stock } = req.body;
    const index = productos.findIndex(p => p.id === parseInt(id));

    if (index === -1) return res.status(404).json({ message: "No encontrado" });
    if (!nombre || !categoría || precio <= 0 || stock < 0) return res.status(400).json({ message: "Datos inválidos" });

    productos[index] = { id: parseInt(id), nombre, categoría, precio, stock };
    res.json(productos[index]);
};

const eliminar = (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    
    if (index === -1) return res.status(404).json({ message: "No encontrado" });
    
    productos.splice(index, 1);
    res.status(200).json({ message: "Producto eliminado" });
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };