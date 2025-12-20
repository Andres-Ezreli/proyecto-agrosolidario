// ============================================
// API Configuration & Authentication Module
// ============================================

const API_BASE_URL = 'http://localhost:5001/api';

// Token Management
class AuthService {
  static getToken() {
    return localStorage.getItem('authToken');
  }

  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  static removeToken() {
    localStorage.removeItem('authToken');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Register user
  static async register(nombre, email, password, role = 'persona') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          passwordConfirm: password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Save token and user info
      this.setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      // Save token and user info
      this.setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuario');
      }

      return data.user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Logout
  static logout() {
    this.removeToken();
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    window.location.href = '../index.html';
  }
}

// ============================================
// Profile Management
// ============================================

class ProfileService {
  static async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener perfil');
      }

      // Save profile to localStorage
      localStorage.setItem('profile', JSON.stringify(data.profile));

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  }

  static async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar perfil');
      }

      // Update localStorage
      localStorage.setItem('profile', JSON.stringify(data.profile));

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Helper: Get profile from localStorage
  static getStoredProfile() {
    const profileStr = localStorage.getItem('profile');
    return profileStr ? JSON.parse(profileStr) : null;
  }
}

// ============================================
// Oferta CRUD Operations
// ============================================

class OfertaService {
  static async getOfertas(filtros = {}) {
    try {
      let url = `${API_BASE_URL}/ofertas`;
      const params = new URLSearchParams();

      if (filtros.estado) params.append('estado', filtros.estado);
      if (filtros.tipo) params.append('tipo', filtros.tipo);
      if (filtros.ubicacion) params.append('ubicacion', filtros.ubicacion);

      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener ofertas');
      }

      return data.data || [];
    } catch (error) {
      console.error('Get ofertas error:', error);
      throw error;
    }
  }

  static async getOfertaById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/ofertas/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener oferta');
      }

      return data.data;
    } catch (error) {
      console.error('Get oferta error:', error);
      throw error;
    }
  }

  static async createOferta(ofertaData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ofertas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify(ofertaData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear oferta');
      }

      return data.data;
    } catch (error) {
      console.error('Create oferta error:', error);
      throw error;
    }
  }

  static async updateOferta(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/ofertas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar oferta');
      }

      return data.data;
    } catch (error) {
      console.error('Update oferta error:', error);
      throw error;
    }
  }

  static async deleteOferta(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/ofertas/${id}`, {
        method: 'DELETE',
        headers: {
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar oferta');
      }

      return data;
    } catch (error) {
      console.error('Delete oferta error:', error);
      throw error;
    }
  }
}

// ============================================
// Solicitud CRUD Operations
// ============================================

class SolicitudService {
  // Trabajador aplica a una oferta
  static async createSolicitud(ofertaId, mensaje = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify({
          ofertaId,
          mensaje,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar solicitud');
      }

      return data.solicitud;
    } catch (error) {
      console.error('Create solicitud error:', error);
      throw error;
    }
  }

  // Propietario envía oferta a un trabajador
  static async enviarOfertaATrabajador(ofertaId, trabajadorId, mensaje = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/enviar-oferta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify({
          ofertaId,
          trabajadorId,
          mensaje,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar oferta');
      }

      return data.solicitud;
    } catch (error) {
      console.error('Send offer error:', error);
      throw error;
    }
  }

  // Solicitudes que el trabajador envió (aplicaciones)
  static async getMisSolicitudesEnviadas() {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/enviadas`, {
        headers: {
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener solicitudes');
      }

      return data.solicitudes || [];
    } catch (error) {
      console.error('Get my solicitudes error:', error);
      throw error;
    }
  }

  // Solicitudes que el trabajador recibió (ofertas de propietarios)
  static async getSolicitudesRecibidas() {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/recibidas`, {
        headers: {
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener solicitudes recibidas');
      }

      return data.solicitudes || [];
    } catch (error) {
      console.error('Get received solicitudes error:', error);
      throw error;
    }
  }

  // Solicitudes que recibe el propietario para sus ofertas
  static async getSolicitudesPropietario() {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/propietario`, {
        headers: {
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener solicitudes');
      }

      return data.solicitudes || [];
    } catch (error) {
      console.error('Get propietario solicitudes error:', error);
      throw error;
    }
  }

  // Obtener una solicitud específica
  static async getSolicitudById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/${id}`, {
        headers: {
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener solicitud');
      }

      return data.solicitud;
    } catch (error) {
      console.error('Get solicitud error:', error);
      throw error;
    }
  }

  // Actualizar estado de solicitud (aceptar/rechazar)
  static async updateSolicitud(id, estado) {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify({ estado }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar solicitud');
      }

      return data.solicitud;
    } catch (error) {
      console.error('Update solicitud error:', error);
      throw error;
    }
  }

  static async deleteSolicitud(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitudes/${id}`, {
        method: 'DELETE',
        headers: {
          ...AuthService.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar solicitud');
      }

      return data;
    } catch (error) {
      console.error('Delete solicitud error:', error);
      throw error;
    }
  }
}
