// Error handling middleware
module.exports = (error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    const data = error.data || {};
    res.status(status).json({ message: message, data: data });
};