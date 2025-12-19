const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const profile = await UserProfile.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
      },
      profile: profile || {
        numeroDocumento: '',
        ubicacion: '',
        numeroCelular: '',
        nombreFinca: '',
        ubicacionFinca: '',
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil: ' + error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      ubicacion,
      numeroCelular,
      numeroDocumento,
      nombreFinca,
      ubicacionFinca,
      desc_exp,
      habilidades,
      anios,
      edad,
      tamano,
      tipo_prod,
      desc_finca,
    } = req.body;

    // Update or create user profile
    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      profile = new UserProfile({ userId });
    }

    // Update fields if provided (use !== undefined to allow empty strings)
    if (numeroDocumento !== undefined) profile.numeroDocumento = numeroDocumento;
    if (ubicacion !== undefined) profile.ubicacion = ubicacion;
    if (numeroCelular !== undefined) profile.numeroCelular = numeroCelular;
    if (nombreFinca !== undefined) profile.nombreFinca = nombreFinca;
    if (ubicacionFinca !== undefined) profile.ubicacionFinca = ubicacionFinca;
    if (desc_exp !== undefined) profile.desc_exp = desc_exp;
    if (habilidades !== undefined) profile.habilidades = habilidades;
    if (anios !== undefined) profile.anios = anios;
    if (edad !== undefined) profile.edad = edad;
    if (tamano !== undefined) profile.tamano = tamano;
    if (tipo_prod !== undefined) profile.tipo_prod = tipo_prod;
    if (desc_finca !== undefined) profile.desc_finca = desc_finca;

    await profile.save();

    res.json({
      success: true,
      message: 'Perfil actualizado correctamente',
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil: ' + error.message });
  }
};
