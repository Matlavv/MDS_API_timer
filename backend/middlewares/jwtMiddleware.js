const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = (req, res, next) => {
    // Le token est normalement envoyé dans un en-tête 'Authorization' sous la forme 'Bearer [token]'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Diviser le 'Bearer token'

    if (token == null) {
        return res.status(403).json({ message: 'Accès interdit : token manquant' });
    }

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Accès interdit: token invalide' });
        }
        req.user = user;
        next(); 
    });
};
