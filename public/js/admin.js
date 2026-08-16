// Lógica del Panel de Administración (admin.js) - EncuentraMiMascota

document.addEventListener('DOMContentLoaded', () => {
  // Pestañas
  const tabUsersBtn = document.getElementById('tab-users-btn');
  const tabPostsBtn = document.getElementById('tab-posts-btn');
  const sectionUsers = document.getElementById('section-users');
  const sectionPosts = document.getElementById('section-posts');

  // Tablas
  const usersTableBody = document.getElementById('users-table-body');
  const postsTableBody = document.getElementById('posts-table-body');

  // Modales
  const userModal = document.getElementById('user-modal');
  const postModal = document.getElementById('post-modal');
  const closeUserModalBtn = document.getElementById('close-user-modal');
  const closePostModalBtn = document.getElementById('close-post-modal');
  
  // Formularios de modales
  const userForm = document.getElementById('user-modal-form');
  const postForm = document.getElementById('post-modal-form');
  
  // Elementos de Feedback
  const adminMessage = document.getElementById('admin-message');

  // Botones e inputs de creación
  const createUserBtn = document.getElementById('create-user-btn');

  // Variables de control de estado
  let isEditingUser = false;

  // Cargar pestaña inicial
  initAdmin();

  function initAdmin() {
    loadUsers();
    setupTabs();
    setupModals();
  }

  // ==========================================
  // CONFIGURACIÓN DE PESTAÑAS
  // ==========================================
  function setupTabs() {
    tabUsersBtn.addEventListener('click', () => {
      tabUsersBtn.classList.add('active');
      tabPostsBtn.classList.remove('active');
      sectionUsers.style.display = 'block';
      sectionPosts.style.display = 'none';
      loadUsers();
    });

    tabPostsBtn.addEventListener('click', () => {
      tabPostsBtn.classList.add('active');
      tabUsersBtn.classList.remove('active');
      sectionPosts.style.display = 'block';
      sectionUsers.style.display = 'none';
      loadPosts();
    });
  }

  // ==========================================
  // CONFIGURACIÓN DE MODALES
  // ==========================================
  function setupModals() {
    // Abrir modal usuario (Crear)
    createUserBtn.addEventListener('click', () => {
      isEditingUser = false;
      document.getElementById('user-modal-title').textContent = 'Crear Nuevo Usuario';
      document.getElementById('password-label').textContent = 'Contraseña *';
      document.getElementById('modal-user-password').setAttribute('required', 'true');
      document.getElementById('user-id-hidden').value = '';
      userForm.reset();
      userModal.classList.add('active');
    });

    // Cerrar modal usuario
    closeUserModalBtn.addEventListener('click', () => {
      userModal.classList.remove('active');
    });

    // Cerrar modal post
    closePostModalBtn.addEventListener('click', () => {
      postModal.classList.remove('active');
    });

    // Cerrar modales haciendo clic fuera del contenido
    window.onclick = (e) => {
      if (e.target === userModal) userModal.classList.remove('active');
      if (e.target === postModal) postModal.classList.remove('active');
    };
  }

  // ==========================================
  // 1. GESTIÓN DE USUARIOS
  // ==========================================
  async function loadUsers() {
    try {
      const users = await apiFetch('/users');
      renderUsers(users);
    } catch (err) {
      showFeedback('Error al cargar usuarios: ' + err.message, 'danger');
    }
  }

  function renderUsers(users) {
    if (!users || users.length === 0) {
      usersTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No hay usuarios registrados.</td></tr>`;
      return;
    }

    usersTableBody.innerHTML = users.map(user => {
      return `
        <tr>
          <td>${user.id}</td>
          <td><strong>${user.name}</strong></td>
          <td>${user.email}</td>
          <td><span class="badge-status" style="background-color: ${user.role === 'admin' ? 'var(--primary-color)' : 'var(--text-light)'}">${user.role}</span></td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-primary btn-sm" onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.role}')">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Enviar formulario de usuario (Crear o Editar)
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('user-id-hidden').value;
    const name = document.getElementById('modal-user-name').value.trim();
    const email = document.getElementById('modal-user-email').value.trim();
    const password = document.getElementById('modal-user-password').value;
    const role = document.getElementById('modal-user-role').value;

    try {
      if (isEditingUser) {
        // Editar
        const body = { name, email, role };
        if (password) body.password = password; // Solo enviar contraseña si se reescribió
        
        await apiFetch(`/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body)
        });
        showFeedback('Usuario actualizado con éxito.', 'success');
      } else {
        // Crear
        await apiFetch('/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, role })
        });
        showFeedback('Usuario creado con éxito.', 'success');
      }
      userModal.classList.remove('active');
      loadUsers();
    } catch (err) {
      showFeedback(err.message, 'danger');
    }
  });

  // Hacer funciones disponibles globalmente para los botones inline
  window.editUser = (id, name, email, role) => {
    isEditingUser = true;
    document.getElementById('user-modal-title').textContent = 'Editar Usuario';
    document.getElementById('password-label').textContent = 'Nueva Contraseña (dejar vacío para mantener)';
    document.getElementById('modal-user-password').removeAttribute('required');
    
    document.getElementById('user-id-hidden').value = id;
    document.getElementById('modal-user-name').value = name;
    document.getElementById('modal-user-email').value = email;
    document.getElementById('modal-user-role').value = role;
    document.getElementById('modal-user-password').value = '';

    userModal.classList.add('active');
  };

  window.deleteUser = async (id) => {
    const loggedUser = getUser();
    if (loggedUser && loggedUser.id === id) {
      showFeedback('No puedes eliminarte a ti mismo de la lista.', 'danger');
      return;
    }

    if (confirm('¿Estás seguro de eliminar este usuario? Se borrarán también todas sus publicaciones y comentarios.')) {
      try {
        await apiFetch(`/users/${id}`, {
          method: 'DELETE'
        });
        showFeedback('Usuario eliminado correctamente.', 'success');
        loadUsers();
      } catch (err) {
        showFeedback(err.message, 'danger');
      }
    }
  };

  // ==========================================
  // 2. GESTIÓN DE PUBLICACIONES
  // ==========================================
  async function loadPosts() {
    try {
      const posts = await apiFetch('/posts');
      renderPosts(posts);
    } catch (err) {
      showFeedback('Error al cargar publicaciones: ' + err.message, 'danger');
    }
  }

  function renderPosts(posts) {
    if (!posts || posts.length === 0) {
      postsTableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">No hay reportes de mascotas en la base de datos.</td></tr>`;
      return;
    }

    postsTableBody.innerHTML = posts.map(post => {
      const rewardText = post.reward > 0 ? `${post.reward} Bs.` : '0 Bs.';
      const statusClass = post.status.toLowerCase() === 'encontrado' ? 'encontrado' : 'perdido';

      return `
        <tr>
          <td>${post.id}</td>
          <td><img src="${post.photo_url}" width="50" height="50" style="object-fit: cover; border-radius: 6px;" onerror="this.src='/uploads/default-pet.svg'"></td>
          <td><strong>${post.name}</strong></td>
          <td>${post.location}</td>
          <td>${post.phone}</td>
          <td>${rewardText}</td>
          <td><span class="badge-status ${statusClass}">${post.status}</span></td>
          <td>${post.owner_name}</td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-primary btn-sm btn-sm" onclick="openEditPostModal(${post.id})">Editar</button>
              <button class="btn btn-danger btn-sm btn-sm" onclick="deletePost(${post.id})">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Cargar anuncio específico y abrir el modal
  window.openEditPostModal = async (id) => {
    try {
      const post = await apiFetch(`/posts/${id}`);
      
      document.getElementById('post-id-hidden').value = post.id;
      document.getElementById('modal-post-name').value = post.name;
      document.getElementById('modal-post-location').value = post.location;
      document.getElementById('modal-post-phone').value = post.phone;
      document.getElementById('modal-post-reward').value = post.reward;
      document.getElementById('modal-post-status').value = post.status;
      document.getElementById('modal-post-desc').value = post.description;

      postModal.classList.add('active');
    } catch (err) {
      showFeedback('Error al cargar datos del anuncio: ' + err.message, 'danger');
    }
  };

  // Enviar formulario de edición de publicación
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('post-id-hidden').value;
    const name = document.getElementById('modal-post-name').value.trim();
    const location = document.getElementById('modal-post-location').value.trim();
    const phone = document.getElementById('modal-post-phone').value.trim();
    const reward = document.getElementById('modal-post-reward').value;
    const status = document.getElementById('modal-post-status').value;
    const description = document.getElementById('modal-post-desc').value.trim();

    try {
      await apiFetch(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, location, phone, reward, status, description })
      });
      showFeedback('Publicación actualizada correctamente.', 'success');
      postModal.classList.remove('active');
      loadPosts();
    } catch (err) {
      showFeedback(err.message, 'danger');
    }
  });

  // Eliminar publicación desde el admin panel
  window.deletePost = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar permanentemente este reporte de mascota?')) {
      try {
        await apiFetch(`/posts/${id}`, {
          method: 'DELETE'
        });
        showFeedback('Publicación eliminada correctamente.', 'success');
        loadPosts();
      } catch (err) {
        showFeedback(err.message, 'danger');
      }
    }
  };

  // Helper de alertas de feedback
  function showFeedback(text, type) {
    adminMessage.textContent = text;
    adminMessage.className = `message message-${type}`;
    adminMessage.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Ocultar a los 4 segundos
    setTimeout(() => {
      adminMessage.style.display = 'none';
    }, 4000);
  }
});
