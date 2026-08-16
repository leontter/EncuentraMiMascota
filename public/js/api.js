// ==========================================================================
// CLIENTE API Y FUNCIONES COMUNES - ENCUENTRA MI MASCOTA
// ==========================================================================

const API_BASE_URL = '/api';

// Gestión del token JWT y el usuario en LocalStorage
function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function getUser() {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Función fetch personalizada para realizar peticiones HTTP de forma limpia
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  
  // Clonar las cabeceras por defecto o usar las pasadas
  const headers = { ...options.headers };
  
  // Agregar token si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Si no es un FormData (subida de archivos), establecer Content-Type JSON por defecto
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error en el servidor.');
  }

  return data;
}

// Verificar roles
function isAuthenticated() {
  return getToken() !== null;
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

function logout() {
  clearAuth();
  window.location.href = '/index.html';
}

// Renderiza dinámicamente la barra de navegación basada en el estado de autenticación
function renderNavbar() {
  const navbarElement = document.getElementById('navbar-links');
  if (!navbarElement) return;

  const user = getUser();
  let html = `<li><a href="/index.html" class="username" style="margin-right: 15px;">Inicio</a></li>`;

  if (user) {
    // Usuario Autenticado (Administrador o Usuario normal)
    html += `
      <div class="user-menu">
        <span class="username">¡Hola, ${user.name}! ${user.role === 'admin' ? '(Admin)' : ''}</span>
        ${user.role === 'admin' ? `<li><a href="/admin.html" class="btn btn-outline btn-sm">Panel Admin</a></li>` : ''}
        <li><a href="/crear-anuncio.html" class="btn btn-primary">Reportar Mascota</a></li>
        <li><button onclick="logout()" class="btn btn-danger btn-sm">Cerrar Sesión</button></li>
      </div>
    `;
  } else {
    // Invitado (No autenticado)
    html += `
      <li><a href="/login.html" class="btn btn-outline">Iniciar Sesión</a></li>
      <li><a href="/login.html?register=true" class="btn btn-primary">Registrarse</a></li>
    `;
  }

  navbarElement.innerHTML = html;
}

// Al cargar cualquier página, renderizar el navbar
document.addEventListener('DOMContentLoaded', renderNavbar);
