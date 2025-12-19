const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  getOfertas, 
  getOfertaById, 
  createOferta, 
  updateOferta, 
  deleteOferta 
} = require('../controllers/ofertaController');

// Public routes
router.get('/', getOfertas);
router.get('/:id', getOfertaById);

// Protected routes
router.post('/', protect, createOferta);
router.put('/:id', protect, updateOferta);
router.delete('/:id', protect, deleteOferta);

module.exports = router;
