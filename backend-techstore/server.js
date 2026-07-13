const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const productosRoutes = require('./routes/productos.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/productos', productosRoutes);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));