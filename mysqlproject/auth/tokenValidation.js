const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: 0,
                message: 'Access denied',
            });
        }


        const tokenWithoutBearer = token.replace('Bearer ', '');

        try {
            const decoded = verify(tokenWithoutBearer, 'amit');
            req.user = decoded.results;
            next();
        } catch (error) {
            console.error(error);
            return res.status(403).json({
                success: 0,
                message: 'Invalid user.',
            });
        }
    },
};
