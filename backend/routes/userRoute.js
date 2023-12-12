const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour l'inscription d'un utilisateur
router.post('/register', userController.register);
router.get('/', userController.getAllUsers);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.login);

// Route pour obtenir le profil d'un utilisateur (supposant que vous avez un tel contrôleur)
router.get('/profile/:userId', userController.profile);


module.exports = router;
