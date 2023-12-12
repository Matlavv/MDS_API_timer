const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware'); 

// Route pour ajouter un temps de réaction pour l'utilisateur actuel
router.post('/add', jwtMiddleware.verifyToken, timerController.addTime);

// Route pour obtenir tous les temps de réaction d'un utilisateur spécifique
router.get('/user/:userId', jwtMiddleware.verifyToken, timerController.getTimesByUser);

module.exports = router;
