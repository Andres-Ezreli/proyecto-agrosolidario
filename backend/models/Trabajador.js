const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  edad: { 
    type: Number, 
    required: true 
  },
  ubicacion: { 
    type: String, 
    required: true 
  },
  habilidades: { 
    type: String, 
    required: true 
  },
  disponible: { 
    type: Boolean, 
    default: true 
  },
  experiencia: { 
    type: String, 
    default: '' 
  },
  foto: { 
    type: String, 
    default: '../imagenes/campesino.jpg' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Trabajador', trabajadorSchema);
