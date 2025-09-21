const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Eduardo_Sousa:Dudu%402006@cluster0.je6waqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB conectado!');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;

