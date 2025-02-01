const mongoose = require('mongoose'); // Importo mongoose
const sql = require('mssql'); // Importo mssql

// Konfigurimi për MSSQL
const mssqlConfig = {
  user: 'db',          // Emri i përdoruesit të krijuar
  password: '123456',  // Fjalëkalimi i përdoruesit të krijuar
  server: 'DESKTOP-QK8141T', // Ose adresa e serverit tuaj SQL
  database: 'review',  // Emri i bazës së të dhënave
  options: {
    encrypt: true,            // Aktivizo nëse përdorni SSL
    trustServerCertificate: true, // Aktivizo për certifikata të vetë-nënshkruara
  }
};

// Krijo lidhjen me MSSQL
async function connectMSSQL() {
  try {
    await sql.connect(mssqlConfig);
    console.log('Lidhja me MSSQL është krijuar me sukses!');
  } catch (err) {
    console.error('Gabim gjatë lidhjes me MSSQL:', err);
  }
}

// Konfigurimi dhe lidhja me MongoDB
var mongoURL = 'mongodb+srv://elzakrasniqi2:Mongo123.@cluster0.mwxtd.mongodb.net/mern-rooms';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error: ', err); // Ky log do t'ju tregojë nëse ka gabime lidhjeje
  });

module.exports = { connectMSSQL, sql, mongoose };
