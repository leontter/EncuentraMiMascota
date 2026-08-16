// Lógica de la Página Principal (index.html) - EncuentraMiMascota

document.addEventListener('DOMContentLoaded', () => {
  const postsGrid = document.getElementById('posts-grid');
  const searchInput = document.getElementById('search-input');
  
  // Cargar publicaciones inicialmente
  loadPosts();

  // Escuchar entrada de texto en el buscador
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      // Agregar un pequeño retraso (debounce) para no saturar al servidor al escribir rápido
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        loadPosts(e.target.value.trim());
      }, 300);
    });
  }

  // Cargar y mostrar los anuncios
  async function loadPosts(query = '') {
    try {
      const endpoint = query ? `/posts?q=${encodeURIComponent(query)}` : '/posts';
      const posts = await apiFetch(endpoint);
      
      renderPosts(posts);
    } catch (err) {
      console.error('Error al cargar posts:', err);
      postsGrid.innerHTML = `
        <div style="text-align: center; grid-column: 1/-1; padding: 40px; color: var(--status-lost); font-weight: bold;">
          Error al cargar los reportes: ${err.message}
        </div>
      `;
    }
  }

  // Renderizar las tarjetas de mascotas en el HTML
  function renderPosts(posts) {
    if (!posts || posts.length === 0) {
      postsGrid.innerHTML = `
        <div style="text-align: center; grid-column: 1/-1; padding: 60px; color: var(--text-light); font-size: 1.1rem;">
          <p style="font-size: 3rem; margin-bottom: 10px;">🔍</p>
          <p>No se encontraron anuncios de mascotas que coincidan con tu búsqueda.</p>
        </div>
      `;
      return;
    }

    const html = posts.map(post => {
      // Determinar clase de badge según estado
      const statusClass = post.status.toLowerCase() === 'encontrado' ? 'encontrado' : 'perdido';
      
      // Formatear recompensa
      const rewardText = post.reward > 0 
        ? `🎁 Recompensa: ${post.reward} Bs.` 
        : '❤️ Sin recompensa';

      return `
        <article class="card">
          <div class="card-img-container">
            <img src="${post.photo_url}" 
                 alt="${post.name}" 
                 class="card-img" 
                 onerror="this.src='/uploads/default-pet.svg'">
            <span class="badge-status ${statusClass}">${post.status}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${post.name}</h3>
            <div class="card-location">
              <span>📍</span> <span>${post.location}</span>
            </div>
            <p class="card-description">${post.description}</p>
            <div class="card-footer">
              <span class="card-reward">${rewardText}</span>
              <a href="/detalle.html?id=${post.id}" class="card-link">
                Ver Detalles <span>➔</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    postsGrid.innerHTML = html;
  }
});
