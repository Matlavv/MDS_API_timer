const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const userController = {
  // Inscription d'un nouvel utilisateur
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = new User({ email, password, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Connexion d'un utilisateur
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Vérification du profil utilisateur
  profile: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ profile: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Put un utilisateur
exports.putUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, req.body, {new: true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur'});
    }
};

module.exports = userController;
