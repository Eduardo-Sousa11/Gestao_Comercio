const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// --- Registro e Login ---
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// --- CRUD completo ---
router.get('/users', userController.getUsers);           // Listar todos
router.get('/users/:id', userController.getUserById);    // Buscar por ID
router.post('/users', userController.createUser);       // Criar usuário
router.put('/users/:id', userController.updateUser);    // Atualizar usuário
router.delete('/users:id', userController.deleteUser); // Deletar usuário

module.exports = router;
