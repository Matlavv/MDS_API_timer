const Timer = require('../models/timerModel');

const timerController = {
  // Enregistrement d'un nouveau temps de réaction
  addTime: async (req, res) => {
    try {
      const { time } = req.body;
      const timer = new Timer({
        user_id: req.user._id, 
        time
      });
      await timer.save();
      res.status(201).json({ message: 'Time recorded successfully', timerId: timer._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Récupération des temps pour un utilisateur spécifique
  getTimesByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const times = await Timer.find({ user_id: userId });
      res.status(200).json(times);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = timerController;
