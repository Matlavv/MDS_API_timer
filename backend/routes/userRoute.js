const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware'); // Assurez-vous que le chemin est correct

// Route pour l'inscription d'un utilisateur
router.post('/register', userController.register);

// Route pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.login);

// Route pour obtenir, modifier, supprimer un utilisateur spécifique
// et pour obtenir les timers d'un utilisateur
router
    .route('/:userId')
    .all(jwtMiddleware.verifyToken)
    .get(userController.getUser)        // Obtenir un utilisateur spécifique
    .put(userController.putUser)        // Modifier un utilisateur spécifique
    .delete(userController.deleteUser); // Supprimer un utilisateur spécifique

// Route pour obtenir les timers d'un utilisateur spécifique
router.get('/:userId/timers', jwtMiddleware.verifyToken, userController.getUserTimers);

module.exports = router;
