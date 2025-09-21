const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registro e Login
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// (opcional) listar todos os usuários
router.get("/", userController.getUsers);

module.exports = router;
