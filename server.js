const express = require('express');
const app = express();
const connectDB = require('./database/db'); // ajustado para db.js
const companyRoutes = require('./routes/companies');

app.use(express.json());
app.use('/api/companies', companyRoutes);

connectDB();

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
