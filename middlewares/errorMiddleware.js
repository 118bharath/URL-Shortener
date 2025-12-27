import logger from '../service/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack, path: req.path, method: req.method });

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Check if the request expects JSON or if it's an API route
    if (req.accepts('json') || req.path.startsWith('/api') || req.path.startsWith('/url')) {
        return res.status(statusCode).json({
            error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
        });
    }

    // Otherwise render an error page (if view engine is set up)
    res.status(statusCode).render('home', {
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
        urls: [] // Pass empty urls or handle gracefully
    });
};

export default errorHandler;
