const Oferta = require('../models/Oferta');
const { protect } = require('../middleware/auth');

// Get all ofertas
exports.getOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.find().populate('userId', 'nombre email');
    
    res.json({
      success: true,
      count: ofertas.length,
      data: ofertas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ofertas: ' + error.message });
  }
};

// Get oferta by ID
exports.getOfertaById = async (req, res) => {
  try {
    const oferta = await Oferta.findById(req.params.id).populate('userId', 'nombre email');
    
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    
    res.json({
      success: true,
      data: oferta,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener oferta: ' + error.message });
  }
};

// Create oferta
exports.createOferta = async (req, res) => {
  try {
    const { titulo, descripcion, requisitos, salario, numeroTrabajadores, fechaInicio } = req.body;
    
    const oferta = await Oferta.create({
      userId: req.user.id,
      titulo,
      descripcion,
      requisitos,
      salario,
      numeroTrabajadores,
      fechaInicio,
      estado: 'activa',
    });
    
    res.status(201).json({
      success: true,
      data: oferta,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear oferta: ' + error.message });
  }
};

// Update oferta
exports.updateOferta = async (req, res) => {
  try {
    const oferta = await Oferta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    
    res.json({
      success: true,
      data: oferta,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar oferta: ' + error.message });
  }
};

// Delete oferta
exports.deleteOferta = async (req, res) => {
  try {
    const oferta = await Oferta.findByIdAndDelete(req.params.id);
    
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    
    res.json({
      success: true,
      message: 'Oferta eliminada',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar oferta: ' + error.message });
  }
};
