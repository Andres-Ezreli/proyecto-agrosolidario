const mongoose = require('mongoose');

const ofertaSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  titulo: { 
    type: String, 
    required: true 
  },
  descripcion: { 
    type: String, 
    required: true 
  },
  requisitos: { 
    type: String, 
    required: true 
  },
  salario: { 
    type: Number, 
    required: true 
  },
  numeroTrabajadores: { 
    type: Number, 
    required: true 
  },
  fechaInicio: { 
    type: String, 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ['activa', 'cerrada', 'completada'], 
    default: 'activa' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Oferta', ofertaSchema);
