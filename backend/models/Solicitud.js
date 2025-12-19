const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  ofertaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Oferta', 
    required: true 
  },
  trabajadorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trabajador', 
    required: true 
  },
  propietarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ['pendiente', 'aceptada', 'rechazada'], 
    default: 'pendiente' 
  },
  tipo: {
    type: String,
    enum: ['trabajador_a_oferta', 'propietario_a_trabajador'],
    default: 'trabajador_a_oferta'
  },
  mensaje: { 
    type: String, 
    default: '' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
