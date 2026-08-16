// Lógica de Detalle y Comentarios (detalle.html) - EncuentraMiMascota

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    window.location.href = '/index.html';
    return;
  }

  // Elementos del DOM
  const petImg = document.getElementById('pet-img');
  const petName = document.getElementById('pet-name');
  const petStatusBadge = document.getElementById('pet-status-badge');
  const rewardContainer = document.getElementById('reward-container');
  const petRewardVal = document.getElementById('pet-reward-val');
  const petLocation = document.getElementById('pet-location');
  const petPhone = document.getElementById('pet-phone');
  const petOwner = document.getElementById('pet-owner');
  const petDate = document.getElementById('pet-date');
  const petDescription = document.getElementById('pet-description');
  
  const ownerActions = document.getElementById('owner-actions');
  const toggleStatusBtn = document.getElementById('toggle-status-btn');
  const deletePostBtn = document.getElementById('delete-post-btn');
  
  const commentsList = document.getElementById('comments-list');
  const commentFormWrapper = document.getElementById('comment-form-wrapper');
  const commentLoginMsg = document.getElementById('comment-login-msg');
  const commentForm = document.getElementById('comment-form');
  const commentContent = document.getElementById('comment-content');
  const feedbackMsg = document.getElementById('feedback-msg');

  let currentPost = null;

  // Inicialización de la página
  initPage();

  async function initPage() {
    await loadPostDetails();
    await loadComments();
    setupCommentFormVisibility();
  }

  // 1. Cargar detalles del anuncio
  async function loadPostDetails() {
    try {
      currentPost = await apiFetch(`/posts/${postId}`);
      
      // Renderizar datos básicos
      petName.textContent = currentPost.name;
      petImg.src = currentPost.photo_url;
      petImg.onerror = () => { petImg.src = '/uploads/default-pet.svg'; };
      
      // Configurar estado
      petStatusBadge.textContent = currentPost.status;
      petStatusBadge.className = `badge-status ${currentPost.status.toLowerCase() === 'encontrado' ? 'encontrado' : 'perdido'}`;
      
      // Configurar recompensa
      if (currentPost.reward > 0) {
        petRewardVal.textContent = `${currentPost.reward} Bs.`;
        rewardContainer.style.display = 'flex';
      } else {
        rewardContainer.style.display = 'none';
      }

      petLocation.textContent = currentPost.location;
      petPhone.textContent = currentPost.phone;
      petOwner.textContent = currentPost.owner_name;
      petDate.textContent = new Date(currentPost.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      petDescription.textContent = currentPost.description;

      // Configurar acciones del propietario / administrador
      const currentUser = getUser();
      if (currentUser && (currentUser.id === currentPost.user_id || currentUser.role === 'admin')) {
        ownerActions.style.display = 'flex';
        
        // Ajustar el botón de alternar estado
        if (currentPost.status === 'Perdido') {
          toggleStatusBtn.textContent = 'Marcar como Encontrado';
          toggleStatusBtn.className = 'btn btn-success';
        } else {
          toggleStatusBtn.textContent = 'Marcar como Perdido';
          toggleStatusBtn.className = 'btn btn-secondary';
        }

        setupActionButtons();
      }

    } catch (err) {
      console.error(err);
      showFeedback('No se pudieron cargar los detalles del anuncio.', 'danger');
    }
  }

  // 2. Configurar eventos de botones de dueño/admin
  function setupActionButtons() {
    // Alternar Estado (Perdido <-> Encontrado)
    toggleStatusBtn.onclick = async () => {
      const nextStatus = currentPost.status === 'Perdido' ? 'Encontrado' : 'Perdido';
      try {
        await apiFetch(`/posts/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({ status: nextStatus })
        });
        showFeedback(`El anuncio se marcó como "${nextStatus}" con éxito.`, 'success');
        loadPostDetails(); // Recargar datos
      } catch (err) {
        showFeedback(err.message, 'danger');
      }
    };

    // Eliminar publicación
    deletePostBtn.onclick = async () => {
      if (confirm('¿Estás completamente seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.')) {
        try {
          await apiFetch(`/posts/${postId}`, {
            method: 'DELETE'
          });
          showFeedback('Publicación eliminada correctamente. Redirigiendo...', 'success');
          setTimeout(() => {
            window.location.href = '/index.html';
          }, 1500);
        } catch (err) {
          showFeedback(err.message, 'danger');
        }
      }
    };
  }

  // 3. Cargar comentarios
  async function loadComments() {
    try {
      const comments = await apiFetch(`/posts/${postId}/comments`);
      renderComments(comments);
    } catch (err) {
      console.error(err);
      commentsList.innerHTML = `<p style="color: var(--status-lost)">Error al cargar comentarios.</p>`;
    }
  }

  // Renderizar comentarios en pantalla
  function renderComments(comments) {
    if (!comments || comments.length === 0) {
      commentsList.innerHTML = `
        <p style="color: var(--text-light); text-align: center; padding: 20px;">
          Aún no hay comentarios en este anuncio. ¡Sé el primero en aportar!
        </p>
      `;
      return;
    }

    const html = comments.map(comment => {
      const commentDate = new Date(comment.created_at).toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short'
      });

      return `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-author">${comment.user_name}</span>
            <span class="comment-date">${commentDate}</span>
          </div>
          <p class="comment-body">${comment.content}</p>
        </div>
      `;
    }).join('');

    commentsList.innerHTML = html;
  }

  // 4. Configurar visibilidad del formulario de comentarios
  function setupCommentFormVisibility() {
    if (isAuthenticated()) {
      commentFormWrapper.style.display = 'block';
      commentLoginMsg.style.display = 'none';
      
      // Manejar el envío de comentarios
      commentForm.onsubmit = async (e) => {
        e.preventDefault();
        const content = commentContent.value.trim();
        if (!content) return;

        try {
          await apiFetch(`/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content })
          });
          
          commentContent.value = ''; // Limpiar campo
          loadComments(); // Recargar comentarios
        } catch (err) {
          showFeedback(err.message, 'danger');
        }
      };
    } else {
      commentFormWrapper.style.display = 'none';
      commentLoginMsg.style.display = 'block';
    }
  }

  // Mostrar alertas de feedback arriba
  function showFeedback(text, type) {
    feedbackMsg.textContent = text;
    feedbackMsg.className = `message message-${type}`;
    feedbackMsg.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto ocultar después de 4 segundos
    setTimeout(() => {
      feedbackMsg.style.display = 'none';
    }, 4000);
  }
});
