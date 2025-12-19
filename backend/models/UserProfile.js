const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  numeroDocumento: {
    type: String,
    default: '',
  },
  ubicacion: {
    type: String,
    default: '',
  },
  numeroCelular: {
    type: String,
    default: '',
  },
  nombreFinca: {
    type: String,
    default: '',
  },
  ubicacionFinca: {
    type: String,
    default: '',
  },
  tamano: {
    type: String,
    default: '',
  },
  tipo_prod: {
    type: String,
    default: '',
  },
  desc_finca: {
    type: String,
    default: '',
  },
  desc_exp: {
    type: String,
    default: '',
  },
  habilidades: {
    type: String,
    default: '',
  },
  anios: {
    type: Number,
    default: 0,
  },
  edad: {
    type: Number,
    default: 0,
  },
  foto: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
