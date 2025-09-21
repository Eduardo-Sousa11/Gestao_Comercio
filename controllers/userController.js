const User = require('../models/User');


exports.registerUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email já cadastrado' });

        const newUser = new User({ name, email, senha });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findOne({ email, senha });
        if (!user) return res.status(400).json({ message: 'Email ou senha incorretos' });

        res.json({ message: 'Login realizado com sucesso', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};


exports.createUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body;
        const newUser = new User({ name, email, senha });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, senha },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};
