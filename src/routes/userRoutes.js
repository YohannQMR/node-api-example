const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route GET pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route GET pour récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// Route POST pour créer un nouvel utilisateur
router.post('/', userController.createUser);

// Route PUT pour mettre à jour un utilisateur existant
router.put('/:id', userController.updateUser);

// Route DELETE pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
