const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/apinode2')
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch(err => console.error('Impossible de se connecter à MongoDB', err));

// Middleware pour analyser les requêtes entrantes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route pour les utilisateurs
const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);

// Route pour les timers
const timerRoute = require('./routes/timerRoute');
app.use('/timers', timerRoute);


// Démarrage du serveur Express
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
