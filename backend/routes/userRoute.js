const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Route pour l'inscription d'un user
router
    .route('/register')
    .post(userController.userRegister)

// Route pour la connection d'un user
router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/:user_id')
    .all(jwtMiddleware.verifyToken) 
    .get(userController.getUser) // Obtenir un user spécifique 
    .put(userController.putUser) // Modifier un user spécifique 
    .patch(userController.patchUser) // Modifier un user spécifique 
    .delete(userController.deleteUser) // Supprimer un user spécifique 

// Route pour obtenir les timers d'un user spécifique
router
    .route('/:user_id/timer')
    .get(userController.getUserTimer)
    .post(jwtMiddleware.verifyToken, userController.getUser)

// Route pour obtenir la moyenne des timers d'un user spécifique
router
    .route('/:user_id/averageTimer')
    .get(userController.getAverageTimerUser)

module.exports = router;