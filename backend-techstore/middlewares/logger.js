const logger = (req, res, next) => {
    const fecha = new Date().toLocaleString('es-CL');
    console.log(`${req.method} ${req.originalUrl} - ${fecha}`);
    next();
};

module.exports = logger;