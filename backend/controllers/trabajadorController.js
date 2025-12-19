const Trabajador = require('../models/Trabajador');

// Get all trabajadores
exports.getTrabajadores = async (req, res) => {
  try {
    const trabajadores = await Trabajador.find({ disponible: true }).populate('userId', 'nombre email');
    
    res.json({
      success: true,
      count: trabajadores.length,
      data: trabajadores,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener trabajadores: ' + error.message });
  }
};

// Get trabajador by ID
exports.getTrabajadorById = async (req, res) => {
  try {
    const trabajador = await Trabajador.findById(req.params.id).populate('userId', 'nombre email');
    
    if (!trabajador) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }
    
    res.json({
      success: true,
      data: trabajador,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener trabajador: ' + error.message });
  }
};
