const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
  name: String,
  password: String,
  password_aes: String
});

module.exports = mongoose.model('users', UsuarioSchema);
