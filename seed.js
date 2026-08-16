const bcrypt = require('bcryptjs');
const { db, dbQuery } = require('./db');

async function seed() {
  console.log('Iniciando poblamiento de base de datos (seeding)...');

  try {
    // 1. Limpiar datos existentes (opcional, para empezar limpios)
    await dbQuery.run('DELETE FROM comments');
    await dbQuery.run('DELETE FROM posts');
    await dbQuery.run('DELETE FROM users');
    await dbQuery.run('DELETE FROM sqlite_sequence'); // Reiniciar autoincrementales

    // 2. Crear contraseñas encriptadas
    const hashAdmin = await bcrypt.hash('admin123', 10);
    const hashUser1 = await bcrypt.hash('usuario123', 10);
    const hashUser2 = await bcrypt.hash('juan123', 10);

    // 3. Insertar Usuarios
    const adminRes = await dbQuery.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Administrador', 'admin@mascotas.com', hashAdmin, 'admin']
    );
    const user1Res = await dbQuery.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Carlos Gómez', 'usuario@mascotas.com', hashUser1, 'user']
    );
    const user2Res = await dbQuery.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Juan Pérez', 'juan@mascotas.com', hashUser2, 'user']
    );

    const adminId = adminRes.id;
    const user1Id = user1Res.id;
    const user2Id = user2Res.id;

    console.log('Usuarios insertados con éxito.');

    // 4. Insertar Anuncios (Mascotas)
    // Usaremos URLs públicas o marcadores de posición estáticos que manejaremos en el frontend.
    // También crearemos la carpeta uploads.
    const post1 = await dbQuery.run(
      `INSERT INTO posts (name, location, phone, description, photo_url, reward, status, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Toby',
        'Plaza Principal, Zona Central',
        '78945612',
        'Poodle mediano color blanco, llevaba un collar azul. Es muy asustadizo pero manso.',
        '/uploads/toby_poodle.jpg',
        500,
        'Perdido',
        user1Id
      ]
    );

    const post2 = await dbQuery.run(
      `INSERT INTO posts (name, location, phone, description, photo_url, reward, status, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Luna',
        'Av. América y Villarroel',
        '65412398',
        'Gatita siamesa de ojos azules, se perdió la tarde del jueves. Responde a su nombre.',
        '/uploads/luna_siamesa.jpg',
        200,
        'Perdido',
        user2Id
      ]
    );

    const post3 = await dbQuery.run(
      `INSERT INTO posts (name, location, phone, description, photo_url, reward, status, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Rocco',
        'Barrio Las Palmas, Calle 4',
        '71234567',
        'Pastor Alemán joven. ¡Ya fue encontrado por un vecino! Muchas gracias a todos.',
        '/uploads/rocco_pastor.jpg',
        0,
        'Encontrado',
        user1Id
      ]
    );

    console.log('Publicaciones iniciales creadas con éxito.');

    // 5. Insertar Comentarios
    await dbQuery.run(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [post1.id, user2Id, 'Creo haberlo visto cerca de la farmacia de la esquina ayer por la tarde. ¡Espero lo encuentren!']
    );

    await dbQuery.run(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [post1.id, adminId, 'Por favor, si tienen información llamen de inmediato al teléfono de contacto del anuncio. Evitemos falsas alarmas.']
    );

    await dbQuery.run(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [post2.id, user1Id, 'Es hermosa, estaré atento por mi zona si la veo.']
    );

    console.log('Comentarios iniciales creados con éxito.');
    console.log('Base de datos sembrada (seeding) correctamente.');

  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    db.close();
  }
}

seed();
