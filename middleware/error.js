
const error = (err, req, res, next) => {
    res.send(err.message)
};

module.exports = error;