const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Solicitud = require('../models/Solicitud');
const Oferta = require('../models/Oferta');
const Trabajador = require('../models/Trabajador');
const User = require('../models/User');

// Get solicitudes for a trabajador (offers they received from propietarios)
router.get('/recibidas', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find the trabajador profile for this user
    const trabajador = await Trabajador.findOne({ userId: req.user.id });
    
    if (!trabajador) {
      return res.json({ success: true, solicitudes: [] });
    }

    const solicitudes = await Solicitud.find({ 
      trabajadorId: trabajador._id,
      tipo: 'propietario_a_trabajador'
    })
    .populate('ofertaId')
    .populate('propietarioId', 'nombre email')
    .sort({ createdAt: -1 });

    res.json({ success: true, solicitudes });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes: ' + error.message });
  }
});

// Get solicitudes made by a trabajador (applications they sent)
router.get('/enviadas', protect, async (req, res) => {
  try {
    const trabajador = await Trabajador.findOne({ userId: req.user.id });
    
    if (!trabajador) {
      return res.json({ success: true, solicitudes: [] });
    }

    const solicitudes = await Solicitud.find({ 
      trabajadorId: trabajador._id,
      $or: [
        { tipo: 'trabajador_a_oferta' },
        { tipo: { $exists: false } }
      ]
    })
    .populate('ofertaId')
    .populate('propietarioId', 'nombre email')
    .sort({ createdAt: -1 });

    res.json({ success: true, solicitudes });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes: ' + error.message });
  }
});

// Get solicitudes for a propietario's ofertas
router.get('/propietario', protect, async (req, res) => {
  try {
    // Get all ofertas by this propietario
    const ofertas = await Oferta.find({ userId: req.user.id });
    const ofertaIds = ofertas.map(o => o._id);

    const solicitudes = await Solicitud.find({ 
      ofertaId: { $in: ofertaIds }
    })
    .populate('ofertaId')
    .populate({
      path: 'trabajadorId',
      populate: {
        path: 'userId',
        select: 'nombre email'
      }
    })
    .sort({ createdAt: -1 });

    res.json({ success: true, solicitudes });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes: ' + error.message });
  }
});

// Create a new solicitud (trabajador applying to oferta)
router.post('/', protect, async (req, res) => {
  try {
    const { ofertaId, mensaje } = req.body;
    
    const trabajador = await Trabajador.findOne({ userId: req.user.id });
    if (!trabajador) {
      return res.status(400).json({ message: 'No tienes perfil de trabajador' });
    }

    const oferta = await Oferta.findById(ofertaId);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    // Check if already applied
    const existing = await Solicitud.findOne({ 
      ofertaId, 
      trabajadorId: trabajador._id,
      tipo: 'trabajador_a_oferta'
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Ya aplicaste a esta oferta' });
    }

    const solicitud = new Solicitud({
      ofertaId,
      trabajadorId: trabajador._id,
      propietarioId: oferta.userId,
      mensaje: mensaje || '',
      tipo: 'trabajador_a_oferta'
    });

    await solicitud.save();

    res.json({ success: true, message: 'Solicitud enviada', solicitud });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear solicitud: ' + error.message });
  }
});

// Propietario sends offer to trabajador
router.post('/enviar-oferta', protect, async (req, res) => {
  try {
    const { ofertaId, trabajadorId, mensaje } = req.body;

    const oferta = await Oferta.findById(ofertaId);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    // Verify this propietario owns the oferta
    if (oferta.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No tienes permiso para enviar esta oferta' });
    }

    const solicitud = new Solicitud({
      ofertaId,
      trabajadorId,
      propietarioId: req.user.id,
      mensaje: mensaje || '',
      tipo: 'propietario_a_trabajador'
    });

    await solicitud.save();

    res.json({ success: true, message: 'Oferta enviada al trabajador', solicitud });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar oferta: ' + error.message });
  }
});

// Update solicitud status (accept/reject)
router.put('/:id', protect, async (req, res) => {
  try {
    const { estado } = req.body;
    
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    solicitud.estado = estado;
    await solicitud.save();

    res.json({ success: true, message: 'Solicitud actualizada', solicitud });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar solicitud: ' + error.message });
  }
});

// Get single solicitud
router.get('/:id', protect, async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id)
      .populate('ofertaId')
      .populate('propietarioId', 'nombre email')
      .populate({
        path: 'trabajadorId',
        populate: {
          path: 'userId',
          select: 'nombre email'
        }
      });

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.json({ success: true, solicitud });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitud: ' + error.message });
  }
});

module.exports = router;
