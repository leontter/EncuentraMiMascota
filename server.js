const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbQuery } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'secreto_super_seguro_para_la_defensa';

// Asegurar que la carpeta de subidas de fotos exista
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de Multer para almacenar imágenes de mascotas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'pet-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middlewares globales
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para verificar la sesión/token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
    req.user = user;
    next();
  });
}

// Middleware para verificar si el usuario es administrador
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso restringido. Se requiere rol de Administrador.' });
  }
}

// ==========================================
// 1. RUTAS DE AUTENTICACIÓN
// ==========================================

// Registrar nuevo usuario
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const existingUser = await dbQuery.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await dbQuery.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente.', userId: result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor al registrar.' });
  }
});

// Iniciar sesión
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña requeridos.' });
  }

  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    // Generar el Token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
  }
});

// Obtener datos del usuario logueado actualmente
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await dbQuery.get('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos del usuario.' });
  }
});

// ==========================================
// 2. RUTAS DE PUBLICACIONES (ANUNCIOS)
// ==========================================

// Obtener todas las publicaciones (soporta búsqueda por texto con `?q=`)
app.get('/api/posts', async (req, res) => {
  const search = req.query.q;

  try {
    let query = `
      SELECT p.*, u.name as owner_name 
      FROM posts p
      JOIN users u ON p.user_id = u.id
    `;
    let params = [];

    if (search) {
      query += ` WHERE p.name LIKE ? OR p.location LIKE ? OR p.description LIKE ?`;
      const likeParam = `%${search}%`;
      params = [likeParam, likeParam, likeParam];
    }

    query += ` ORDER BY p.created_at DESC`;
    const posts = await dbQuery.all(query, params);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener publicaciones.' });
  }
});

// Obtener una publicación por su ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await dbQuery.get(`
      SELECT p.*, u.name as owner_name, u.email as owner_email
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [req.params.id]);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener detalles del anuncio.' });
  }
});

// Crear una publicación (con subida de imagen)
app.post('/api/posts', authenticateToken, upload.single('photo'), async (req, res) => {
  const { name, location, phone, description, reward } = req.body;

  if (!name || !location || !phone || !description) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios excepto la foto y recompensa.' });
  }

  // Guardar ruta de la foto si fue subida
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-pet.svg';
  const parsedReward = reward ? parseFloat(reward) : 0;

  try {
    const result = await dbQuery.run(
      `INSERT INTO posts (name, location, phone, description, photo_url, reward, status, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, 'Perdido', ?)`,
      [name, location, phone, description, photoUrl, parsedReward, req.user.id]
    );

    res.status(201).json({ message: 'Anuncio publicado con éxito.', postId: result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la publicación.' });
  }
});

// Modificar publicación (Dueño o Administrador) - Soporta actualizar datos y/o cambiar foto
app.put('/api/posts/:id', authenticateToken, upload.single('photo'), async (req, res) => {
  const { name, location, phone, description, reward, status } = req.body;
  const postId = req.params.id;

  try {
    // Verificar si existe la publicación y quién la posee
    const post = await dbQuery.get('SELECT * FROM posts WHERE id = ?', [postId]);
    if (!post) {
      if (req.file && fs.existsSync(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch (e) {}
      }
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    // Permitir solo al creador o al admin editar
    if (post.user_id !== req.user.id && req.user.role !== 'admin') {
      if (req.file && fs.existsSync(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch (e) {}
      }
      return res.status(403).json({ error: 'No tienes permisos para modificar este anuncio.' });
    }

    let photoUrl = post.photo_url;
    if (req.file) {
      photoUrl = `/uploads/${req.file.filename}`;
      // Eliminar foto anterior si existía y no era la imagen por defecto
      if (post.photo_url && post.photo_url !== '/uploads/default-pet.svg' && post.photo_url.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, 'public', post.photo_url);
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (e) {
            console.error('Error al eliminar foto anterior:', e);
          }
        }
      }
    }

    const updatedName = name !== undefined ? name : post.name;
    const updatedLocation = location !== undefined ? location : post.location;
    const updatedPhone = phone !== undefined ? phone : post.phone;
    const updatedDescription = description !== undefined ? description : post.description;
    const updatedReward = reward !== undefined && reward !== '' ? parseFloat(reward) : post.reward;
    const updatedStatus = status !== undefined ? status : post.status;

    await dbQuery.run(
      `UPDATE posts 
       SET name = ?, location = ?, phone = ?, description = ?, reward = ?, status = ?, photo_url = ? 
       WHERE id = ?`,
      [
        updatedName,
        updatedLocation,
        updatedPhone,
        updatedDescription,
        updatedReward,
        updatedStatus,
        photoUrl,
        postId
      ]
    );

    res.json({ 
      message: 'Publicación actualizada correctamente.',
      post: {
        id: postId,
        name: updatedName,
        location: updatedLocation,
        phone: updatedPhone,
        description: updatedDescription,
        reward: updatedReward,
        status: updatedStatus,
        photo_url: photoUrl
      }
    });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar publicación.' });
  }
});

// Eliminar publicación (Dueño o Administrador)
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await dbQuery.get('SELECT user_id, photo_url FROM posts WHERE id = ?', [postId]);
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    // Permitir solo al creador o al admin borrar
    if (post.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para eliminar este anuncio.' });
    }

    // Borrar físicamente el archivo de foto si no es la por defecto
    if (post.photo_url && post.photo_url !== '/uploads/default-pet.svg') {
      const filePath = path.join(__dirname, 'public', post.photo_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await dbQuery.run('DELETE FROM posts WHERE id = ?', [postId]);
    res.json({ message: 'Publicación eliminada correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar publicación.' });
  }
});

// ==========================================
// 3. RUTAS DE COMENTARIOS
// ==========================================

// Obtener comentarios de una publicación
app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const comments = await dbQuery.all(`
      SELECT c.*, u.name as user_name 
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `, [req.params.id]);

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener comentarios.' });
  }
});

// Agregar comentario (Cualquier usuario logueado puede comentar)
app.post('/api/posts/:id/comments', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;

  if (!content) {
    return res.status(400).json({ error: 'El contenido del comentario no puede estar vacío.' });
  }

  try {
    const postExists = await dbQuery.get('SELECT id FROM posts WHERE id = ?', [postId]);
    if (!postExists) {
      return res.status(404).json({ error: 'La publicación no existe.' });
    }

    const result = await dbQuery.run(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, req.user.id, content]
    );

    const newComment = await dbQuery.get(`
      SELECT c.*, u.name as user_name 
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [result.id]);

    res.status(201).json({ message: 'Comentario agregado.', comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar comentario.' });
  }
});

// ==========================================
// 4. RUTAS DE ADMINISTRACIÓN DE USUARIOS (Solo Admin)
// ==========================================

// Ver lista de todos los usuarios
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await dbQuery.all('SELECT id, name, email, role FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

// Crear usuario
app.post('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const existingUser = await dbQuery.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await dbQuery.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'Usuario creado con éxito.', userId: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario.' });
  }
});

// Modificar usuario
app.put('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  const userId = req.params.id;

  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    let query = 'UPDATE users SET name = ?, email = ?, role = ?';
    let params = [name || user.name, email || user.email, role || user.role];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(userId);

    await dbQuery.run(query, params);
    res.json({ message: 'Usuario actualizado con éxito.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario.' });
  }
});

// Eliminar usuario
app.delete('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const userId = req.params.id;

  if (parseInt(userId) === req.user.id) {
    return res.status(400).json({ error: 'No puedes eliminarte a ti mismo.' });
  }

  try {
    const user = await dbQuery.get('SELECT id FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    await dbQuery.run('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'Usuario eliminado con éxito.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario.' });
  }
});

// ==========================================
// REDIRECCIÓN FRONTEND DE RUTA BASE A INDEX
// ==========================================
app.get('*', (req, res, next) => {
  // Si la petición pide API, seguir adelante
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de EncuentraMiMascota corriendo en http://localhost:${PORT}`);
});
