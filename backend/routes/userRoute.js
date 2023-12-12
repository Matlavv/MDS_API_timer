const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour l'inscription d'un utilisateur
router.post('/register', userController.register);
router.get('/', userController.getAllUsers);
// Route pour la connexion d'un utilisateur
router.post('/login', userController.login);
// Route pour modifier les utilisateurs connectés
router
    .route('/:user_id')
    .all(jwtMiddleware.verifyToken)
    .delete(userController.deleteUser)
    .put(userController.putUser)
    .update(userController.updateUser)
    .get(userController.getUser)

module.exports = router;
