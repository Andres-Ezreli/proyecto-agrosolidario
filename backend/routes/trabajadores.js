const express = require('express');
const router = express.Router();
const { getTrabajadores, getTrabajadorById } = require('../controllers/trabajadorController');

// Get all trabajadores
router.get('/', getTrabajadores);

// Get trabajador by ID
router.get('/:id', getTrabajadorById);

module.exports = router;
