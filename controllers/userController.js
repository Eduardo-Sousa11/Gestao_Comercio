const User = require("../models/User");

// Registrar novo usuário
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se já existe usuário com o mesmo email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Cria usuário
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login do usuário
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca usuário por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Compara senha
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os usuários (apenas para teste/admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // não retorna senha
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
