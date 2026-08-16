// Lógica de Autenticación (Login/Registro) - EncuentraMiMascota

document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('auth-form');
  const authTitle = document.getElementById('auth-title');
  const submitBtn = document.getElementById('submit-btn');
  const nameGroup = document.getElementById('name-group');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const authMessage = document.getElementById('auth-message');
  const switchToRegister = document.getElementById('switch-to-register');
  const switchContainer = document.getElementById('switch-container');

  let isRegisterMode = false;

  // Comprobar si venimos con un parámetro de registro en la URL (?register=true)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('register') === 'true') {
    enableRegisterMode();
  }

  // Alternar a modo registro
  switchToRegister.addEventListener('click', () => {
    if (isRegisterMode) {
      enableLoginMode();
    } else {
      enableRegisterMode();
    }
  });

  function enableRegisterMode() {
    isRegisterMode = true;
    authTitle.textContent = 'Crear Cuenta';
    submitBtn.textContent = 'Registrarse';
    nameGroup.style.display = 'block';
    nameInput.setAttribute('required', 'true');
    switchContainer.innerHTML = '¿Ya tienes cuenta? <span class="form-switch-link" id="switch-to-login">Inicia sesión aquí</span>';
    
    // Re-vincular el evento del switch
    document.getElementById('switch-to-login').addEventListener('click', enableLoginMode);
    hideMessage();
  }

  function enableLoginMode() {
    isRegisterMode = false;
    authTitle.textContent = 'Iniciar Sesión';
    submitBtn.textContent = 'Ingresar';
    nameGroup.style.display = 'none';
    nameInput.removeAttribute('required');
    switchContainer.innerHTML = '¿No tienes cuenta? <span class="form-switch-link" id="switch-to-register-new">Regístrate aquí</span>';
    
    // Re-vincular el evento del switch
    document.getElementById('switch-to-register-new').addEventListener('click', enableRegisterMode);
    hideMessage();
  }

  // Manejar el envío del formulario
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const name = nameInput.value.trim();

    try {
      if (isRegisterMode) {
        // 1. Registro
        await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        });

        showMessage('Registro exitoso. Iniciando sesión...', 'success');

        // Autologuearse después del registro
        const loginData = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });

        setToken(loginData.token);
        setUser(loginData.user);

        setTimeout(() => {
          window.location.href = '/index.html';
        }, 1200);

      } else {
        // 2. Login
        const loginData = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });

        setToken(loginData.token);
        setUser(loginData.user);

        showMessage('¡Bienvenido de nuevo! Redirigiendo...', 'success');

        setTimeout(() => {
          window.location.href = '/index.html';
        }, 1000);
      }
    } catch (err) {
      showMessage(err.message, 'danger');
    }
  });

  // Helpers de mensajes
  function showMessage(text, type) {
    authMessage.textContent = text;
    authMessage.className = `message message-${type}`;
    authMessage.style.display = 'block';
  }

  function hideMessage() {
    authMessage.style.display = 'none';
  }
});
