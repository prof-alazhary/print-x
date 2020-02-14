const jwt = require('../helpers/jwt')

function verifyTokenPolicy(req, res, next) {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    const decoded = jwt.verifyToken(token);

    if (decoded && decoded.id) {
        //in another case we can do that validation : userId == decoded.id ;
        next();
    } else {
        return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });
    }
}

module.exports = verifyTokenPolicy;