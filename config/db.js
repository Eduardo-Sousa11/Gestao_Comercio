const mongoose = require('mongoose');

async function connect(mongoUri) {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB', err);
    process.exit(1);
  }
}

module.exports = { connect };
