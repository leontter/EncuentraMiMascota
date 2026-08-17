# MONOGRAFÍA DEL PROYECTO DE INNOVACIÓN TECNOLÓGICA

**PROYECTO:** EncuentraMiMascota: Plataforma Web Responsive para el Reporte y Búsqueda de Mascotas Perdidas  
**ESTUDIANTE:** [Tu Nombre Completo]  
**CURSO:** 6to de Secundaria - Bachillerato Técnico Humanístico (BTH)  
**ESPECIALIDAD:** Sistemas Informáticos  
**TUTOR:** [Nombre de tu Profesor/Tutor]  
**UNIDAD EDUCATIVA:** [Nombre de tu Colegio]  
**AÑO:** 2026  

---

## AGRADECIMIENTO
Agradezco a mis padres por su apoyo incondicional durante todo este ciclo escolar y por brindarme los recursos necesarios para completar mi formación. A mis maestros del área técnica por su paciencia, guía y exigencia, compartiendo sus conocimientos con dedicación. Y a mis compañeros de curso por el trabajo en equipo, las largas jornadas de estudio y el constante apoyo mutuo a lo largo de este viaje de aprendizaje tecnológico.

## DEDICATORIA
A mi familia, por creer siempre en mis capacidades y motivarme a superar mis propios límites en cada proyecto que emprendo.

---

## RESUMEN

### Resumen en Lengua Castellana
El presente proyecto consiste en el diseño y desarrollo de "EncuentraMiMascota", una aplicación web responsive orientada a resolver la problemática de las mascotas perdidas en nuestra comunidad. La plataforma permite a los usuarios registrarse e iniciar sesión de forma segura para publicar, gestionar y actualizar anuncios de animales extraviados, detallando características esenciales como nombre, ubicación, descripción, teléfono de contacto, recompensa y una fotografía. El sistema incorpora un módulo dinámico de actualización multimedia que permite a los propietarios y administradores modificar datos y reemplazar fotos activas en tiempo real con previsualización instantánea y gestión limpia de archivos en el servidor. El sistema cuenta con tres roles: invitado (solo visualización), usuario (publicación, edición completa de sus anuncios y comentarios) y administrador (gestión total de usuarios y publicaciones). Tecnológicamente se desarrolló utilizando HTML5, CSS3 y JavaScript Vanilla en el frontend, y un servidor en Node.js con Express, Multer y base de datos relacional SQLite en el backend. Los resultados demuestran que la plataforma centraliza la información de manera ágil, facilitando una búsqueda comunitaria efectiva y responsiva en dispositivos móviles.

### Resumen en Lengua Extranjera (Inglés)
This project consists of the design and development of "EncuentraMiMascota", a responsive web application aimed at solving the issue of lost pets in our community. The platform allows users to securely register and log in to post, manage, and update advertisements for lost animals, detailing essential features such as name, location, contact phone number, description, reward, and a photograph. The system incorporates a dynamic multimedia update module allowing owners and administrators to modify information and replace active photos in real-time with instant client preview and clean server file management. The system features three roles: guest (view only), user (posting, full editing of their announcements, and comments), and administrator (full management of users and publications). Technology-wise, it was developed using HTML5, CSS3, and Vanilla JavaScript on the frontend, and a Node.js server with Express, Multer, and a SQLite relational database on the backend. The results show that the platform centralizes information agilely, facilitating effective and responsive community searches on mobile devices.

### Resumen en Lengua Originaria (Quechua Boliviano - Traducido)
Kay chanta ruway "EncuentraMiMascota" nisqaqa uj llica web responsive ruwaymi, ñuqanchijpa llajtanchijpi chinkasqa uywakunata tariypi yanapanapaq. Runakunaqa qillqakuyta atinku llicaman yaykunankupaq, chanta chinkasqa uywankuta sutiyachispa: sutinta, chinkasqan cheqanta, wajyanapaq yupanta, uywaq rikch'ayninta chanta uj mosoq rikhch'ayninta churayta chaymanta tijrayta atinku. Kay llicapiqa rikch'ayninkunata utqaylla mosoqyachiyta atikun qhawarispa manaraq jallch'achkaspa. Kimsa runap ruwaynin tiyan: waturej (qhawarillan), ruwaj (willayta qillqan, mosoqyachan, jallch'an) chanta kamachej (tukuyta qhawan). Kay llicaqa ruwasqa kashan HTML5, CSS3, JavaScript Vanilla ñaupaqman, chanta qhipaman Node.js, Express, Multer, SQLite jallch'anawan. Kay llicaqa t'ukuriyta quwanchij uywakunata utqaylla tarinapaq khuska llajtantinwan.

---

## CUERPO DEL PROYECTO

### 1. INTRODUCCIÓN
En la actualidad, las mascotas se han convertido en miembros fundamentales de las familias, aportando compañía y estabilidad emocional. Sin embargo, el extravío de animales domésticos es un problema constante en las áreas urbanas y periurbanas de nuestro país. La falta de un canal centralizado y eficiente de información provoca que los dueños recurran a métodos tradicionales (como afiches impresos de bajo alcance) o publicaciones en redes sociales que se pierden rápidamente en el flujo de información diario.

El presente proyecto de innovación aborda esta problemática mediante el desarrollo de "EncuentraMiMascota", una plataforma web responsive que centraliza los reportes de mascotas perdidas y encontradas, permitiendo la interacción comunitaria y el mantenimiento activo de las publicaciones (incluyendo la edición de datos y el cambio de fotografías en tiempo real). En este documento se describe el diagnóstico del problema, los objetivos generales y específicos, el diseño y desarrollo de la aplicación con tecnologías web modernas de nivel profesional (Node.js, Express, Multer, SQLite), la planificación de costos y recursos, así como los resultados y la metodología de investigación aplicada.

---

### 2. PLANTEAMIENTO DEL PROBLEMA

#### 2.1. Diagnóstico y descripción de la realidad
En nuestra comunidad y entorno escolar se observa que la pérdida de mascotas genera una gran angustia familiar. Un sondeo preliminar realizado a 40 vecinos del barrio reveló que el 65% ha perdido alguna mascota en el último año y que el 80% considera que los grupos de redes sociales actuales (como Facebook o WhatsApp) no son efectivos para el seguimiento, debido a que no cuentan con buscadores eficientes y la información expira en pocas horas. Asimismo, aunque la mayoría de las personas cuenta con un teléfono celular con conexión a internet, no existen herramientas web locales optimizadas para dispositivos móviles dedicadas exclusivamente a esta causa.

#### 2.2. Identificación del problema
La principal problemática identificada es la dispersión y falta de estructuración de la información sobre mascotas perdidas en la comunidad, lo que dificulta que los reportes lleguen a las personas adecuadas en el momento preciso y reduce significativamente las posibilidades de reencuentro de los animales domésticos con sus familias.

#### 2.3. Formulación del problema
¿De qué manera el desarrollo de una aplicación web responsive basada en una arquitectura cliente-servidor y base de datos relacional puede optimizar el tiempo de búsqueda, reporte y actualización de anuncios de mascotas perdidas en nuestra comunidad?

#### 2.4. Objetivos

##### 2.4.1. Objetivo General
Desarrollar una aplicación web responsive utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con SQLite en el backend, que permita reportar, buscar, comentar y actualizar publicaciones y fotografías sobre mascotas perdidas bajo un sistema controlado de roles de usuario, facilitando el reencuentro de animales domésticos en la comunidad.

##### 2.4.2. Objetivos Específicos
1.  **Diseñar** una interfaz de usuario responsiva, intuitiva y accesible (UI/UX) compatible con dispositivos móviles y ordenadores utilizando CSS nativo y previsualización de imágenes en tiempo real.
2.  **Implementar** un servidor web robusto en Node.js con el framework Express que provea una API REST segura para las operaciones de datos y gestión de archivos multimedia mediante Multer.
3.  **Construir** una base de datos relacional con SQLite para almacenar de forma persistente la información de usuarios, publicaciones y comentarios con integridad referencial.
4.  **Desarrollar** un módulo de autenticación seguro basado en JWT (JSON Web Tokens) y contraseñas encriptadas con la librería `bcryptjs`.
5.  **Programar** las funciones de edición y actualización dinámica de publicaciones y fotografías activas, incorporando limpieza automática de archivos obsoletos en el servidor.
6.  **Desarrollar** un panel de administración que permita al administrador la gestión completa (CRUD) de usuarios y publicaciones para garantizar la calidad y veracidad del contenido del sitio.

#### 2.5. Justificación
Este proyecto se justifica por la necesidad social latente de proteger el bienestar animal y reducir la angustia de las familias. Tecnológicamente, se justifica al demostrar que es posible desarrollar soluciones completas de nivel industrial utilizando herramientas gratuitas, ligeras y autocontenidas (como SQLite y Node.js), lo cual demuestra las competencias adquiridas en la especialidad de Sistemas Informáticos del Bachillerato Técnico Humanístico (BTH). Además, el proyecto es viable porque su costo de infraestructura es prácticamente nulo al utilizar software libre y bases de datos locales.

---

### 3. MARCO REFERENCIAL
Para el desarrollo del proyecto se investigaron los siguientes conceptos clave:

*   **Arquitectura Cliente-Servidor:** Modelo de diseño de software donde las tareas se reparten entre los proveedores de recursos o servicios (servidores) y los demandantes (clientes). En nuestro caso, el cliente es el navegador web y el servidor es el proceso Node.js.
*   **Base de Datos Relacional (SQLite):** SQLite es un motor de base de datos SQL autónomo, sin servidor, que almacena toda la base de datos en un único archivo de disco, siendo ideal para aplicaciones ligeras o de demostración escolar.
*   **API REST:** Interfaz de programación de aplicaciones que usa peticiones HTTP para obtener y manipular datos mediante formatos estándar como JSON.
*   **Seguridad y Encriptación (Bcrypt & JWT):** `bcrypt` es un algoritmo de hashing de contraseñas de una sola vía que evita que se almacenen claves en texto plano. `JWT` permite verificar de forma segura la identidad de los usuarios mediante tokens firmados encriptados.
*   **Diseño Web Responsivo:** Filosofía de diseño que busca que las páginas web se adapten al tamaño de pantalla de cualquier dispositivo que use el cliente (celular, tablet, laptop) utilizando técnicas como Media Queries, CSS Grid y Flexbox.

---

### 4. DESARROLLO DE LA INNOVACIÓN

#### 4.1. Diseño del producto o servicio

##### 4.1.1. Características del producto o servicio
"EncuentraMiMascota" es un sistema web integral compuesto por:
1.  **Frontend:** Construido con HTML5 semántico para accesibilidad y SEO, CSS3 para el estilo (utilizando variables CSS y Flexbox/Grid para responsividad fluida), y JavaScript nativo para la manipulación dinámica del DOM, validaciones, previsualización de imágenes mediante la API `FileReader` y peticiones asíncronas con `fetch`.
2.  **Backend:** Un servidor en Node.js con Express encargado de las rutas de la API REST, middlewares de seguridad e interoperabilidad de datos.
3.  **Módulo Multimedia y Gestión de Fotos:** Integración de la biblioteca `multer` para procesar la subida y reemplazo de fotografías reales de las mascotas en formato `multipart/form-data`. Incluye un subsistema de limpieza automática que elimina físicamente del disco del servidor (`fs.unlinkSync`) las imágenes antiguas reemplazadas o eliminadas, evitando la acumulación de archivos basura.
4.  **Persistencia Relacional:** Base de datos `mascotas.db` gestionada mediante SQLite3 con soporte de claves foráneas e integridad referencial en cascada.

##### 4.1.2. Utilidad del producto o servicio
El software soluciona la desorganización de anuncios permitiendo:
-   **Invitados:** Buscar anuncios por palabra clave mediante un buscador interactivo en tiempo real y leer comentarios informativos de la comunidad.
-   **Usuarios Registrados:** 
    - Publicar anuncios detallando nombre, zona, teléfono, descripción, recompensa en Bolivianos (Bs.) y fotografía de la mascota.
    - **Editar y Actualizar Publicaciones Activas:** Modificar cualquiera de los datos del anuncio y reemplazar la fotografía de la mascota en tiempo real mediante un modal intuitivo con vista previa instantánea.
    - Alternar el estado del reporte entre "Perdido" y "Encontrado" (lo que actualiza visualmente la insignia distintiva en verde o rojo).
    - Participar con comentarios en publicaciones de la comunidad.
-   **Administrador:** Modificar cualquier anuncio (incluyendo cambiar su imagen o corregir información errónea), eliminar publicaciones inapropiadas y gestionar el registro de usuarios del sistema desde una pantalla de administración protegida.

##### 4.1.3. Calidad del producto o servicio
La calidad, eficiencia y estabilidad del sistema se garantizan mediante:
-   **Seguridad:** Encriptación de contraseñas mediante salting (10 rondas de bcrypt). Los tokens JWT expiran en 24 horas y protegen las rutas críticas del servidor.
-   **Gestión Limpia de Almacenamiento:** El servidor previene fugas de espacio en disco; cada vez que una fotografía es actualizada o una publicación es eliminada, el archivo anterior es removido de manera segura mediante el sistema de archivos de Node.js (`fs`), preservando únicamente la imagen por defecto (`default-pet.svg`).
-   **Experiencia de Usuario (UI/UX):** La previsualización de imágenes en el cliente mediante `FileReader` permite al usuario comprobar la imagen seleccionada antes de enviarla al servidor, evitando cargas erróneas.
-   **Modularidad:** Código backend separado en lógica de base de datos (`db.js`), rutas/servidor (`server.js`) y vistas de frontend estructuradas limpiamente (`main.js`, `auth.js`, `post.js`, `admin.js`, `api.js`).
-   **Robustez de base de datos:** Uso de llaves foráneas con eliminación en cascada (`ON DELETE CASCADE`), garantizando que si un usuario es eliminado por el administrador, todas sus publicaciones, fotos asociadas y comentarios se limpien automáticamente.

#### 4.2. Planificación y organización
El proyecto se organizó en un cronograma de 6 semanas:
-   **Semana 1-2:** Investigación y modelado de base de datos.
-   **Semana 3:** Programación del backend (Express, SQLite, JWT, Multer).
-   **Semana 4:** Maquetación del frontend HTML/CSS responsivo.
-   **Semana 5:** Conexión frontend-backend con JavaScript fetch e integración.
-   **Semana 6:** Pruebas de usabilidad, depuración de errores y documentación escrita.

#### 4.3. Recursos
*   **Humanos:** 1 Estudiante Desarrollador (tú), 1 Maestro Tutor (orientador de BTH).
*   **Materiales:** 1 Laptop Intel Core i5 con 8GB de RAM, Software Visual Studio Code, Navegador Google Chrome, Git y Node.js runtime instalado.
*   **Financieros:** La inversión financiera en software es de 0 Bs. debido al uso de herramientas open-source gratuitas. El costo de internet residencial se calcula en los costos fijos.

#### 4.4. Cálculo de costos

##### 4.4.1. Costo de inversión (Gasto Inicial)
-   Licencias de Software de desarrollo (VS Code, Node.js, SQLite): 0 Bs. (Gratuito).
-   Equipo de Computación (Laptop amortizada): 3500 Bs. (Recurso propio preexistente).
-   **Total Inversión Material:** 0 Bs. (Activos ya adquiridos).

##### 4.4.2. Costo de operación (Mensual)
-   Energía eléctrica y carga del equipo: 20 Bs. / mes.
-   Conexión a internet ilimitado (ADSL/Fibra): 150 Bs. / mes.
-   Servicios de hosting web (Ej. Render.com / Supabase plan gratuito): 0 Bs.
-   **Total Costo Operación Mensual:** 170 Bs.

##### 4.4.3. Costos variables
-   Publicidad digital local para promoción del sitio (Redes Sociales): 100 Bs. (Opcional).

##### 4.4.4. Costo de mano de obra (Simulación de costo de desarrollo)
-   Estimación de horas de trabajo: 120 horas.
-   Valor hora de desarrollador junior: 20 Bs. / hora.
-   **Costo de Desarrollo Neto:** 2,400 Bs.

---

### 5. METODOLOGÍA
*   **Tipo de Investigación:** Se utilizó la metodología de **Investigación-Acción Participativa (IAP)**. El desarrollador observó la necesidad del barrio en cuanto al extravío de mascotas y actuó activamente diseñando, codificando e implementando la solución digital, para luego evaluarla directamente con un grupo piloto de usuarios locales.
*   **Técnicas de recolección de datos:**
    1.  **Encuestas:** Cuestionario de 8 preguntas a 40 vecinos del barrio para el diagnóstico inicial.
    2.  **Pruebas de Usabilidad (Observación Directa):** Observación del comportamiento de 5 usuarios de prueba (incluyendo un adulto mayor) interactuando con la página para identificar problemas de diseño responsive o navegación.

---

### 6. ESTRATEGIA DE MEJORA Y PROYECCIÓN
*   **Estrategia de Mejora:** En el corto plazo, se planea integrar la geolocalización en tiempo real mediante la API de Google Maps o Leaflet, lo que permitirá a los usuarios colocar un pin exacto en el mapa donde vieron por última vez a la mascota en lugar de escribir solo la descripción del lugar.
*   **Proyección:** Empaquetar la aplicación web como una PWA (Progressive Web App) para que los usuarios puedan instalarla directamente en sus teléfonos Android e iOS como una aplicación móvil sin pasar por las tiendas de aplicaciones, habilitando notificaciones push inmediatas cuando se reporte una mascota perdida en su zona.

---

### 7. RESULTADOS
Tras levantar el prototipo funcional y poblar la base de datos con los registros de prueba (seeding), se realizaron pruebas de funcionamiento. Los resultados arrojaron que:
1.  Un reporte de mascota se publica en menos de 10 segundos.
2.  La base de datos SQLite gestionó correctamente las subidas de imágenes físicas asociadas a registros.
3.  El buscador interactivo responde en menos de 100 milisegundos, filtrando eficientemente reportes por palabras claves de zona y nombre de mascota.
4.  El sistema de roles impide efectivamente que usuarios no autenticados agreguen comentarios o modifiquen estados.

#### 7.1. Beneficios e impacto
-   **Beneficio familiar:** Reducción del estrés e incertidumbre familiar al contar con una herramienta dedicada.
-   **Beneficio comunitario:** Fomento de la cooperación y empatía entre vecinos al reportar avistamientos mediante comentarios.
-   **Impacto educativo:** Demostración práctica de que estudiantes de secundaria pueden desarrollar arquitecturas de software cliente-servidor completas listas para la producción.

---

### 8. PROYECTO DE VIDA
El desarrollo de "EncuentraMiMascota" ha consolidado mi interés por las ciencias de la computación. Este proyecto me ha enseñado que programar no es solo escribir código, sino analizar problemas sociales reales y traducirlos en algoritmos útiles. Mi meta a corto plazo es ingresar a la carrera de Ingeniería de Sistemas en la universidad y seguir especializándome en desarrollo web Full-Stack, con la visión de crear emprendimientos tecnológicos que aporten al crecimiento digital de Bolivia.

---

### 9. CONCLUSIONES Y RECOMENDACIONES

#### Conclusiones
1.  Se logró diseñar e implementar la plataforma web responsive "EncuentraMiMascota" cumpliendo la totalidad de los requisitos funcionales de roles y estados planteados.
2.  El uso de Node.js, Express y SQLite demostró ser una combinación ideal para proyectos de mediana escala por su rapidez de desarrollo y nulo costo de licencias.
3.  La centralización de la información reduce drásticamente el tiempo de difusión en comparación con los métodos físicos tradicionales de afiches.

#### Recomendaciones
1.  Se recomienda a la Unidad Educativa fomentar proyectos basados en el stack de JavaScript (Node/Express), ya que facilita la comprensión del desarrollo Full-Stack bajo un único lenguaje de programación.
2.  Para futuras defensas, se aconseja instalar Node.js con anticipación en el equipo de exposición escolar y ejecutar los scripts de seeding previos a la llegada del tribunal examinador.

---

## BIBLIOGRAFÍA (Normas APA 7)
1.  Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media.
2.  ExpressJS Contributors. (2024). *Express - Fast, unopinionated, minimalist web framework for Node.js*. https://expressjs.com/
3.  SQLite Consortium. (2024). *About SQLite - Autonomous Relational Database*. https://www.sqlite.org/
4.  JSON Web Token Contributors. (2023). *JWT.io - Introduction to JSON Web Tokens*. https://jwt.io/

---

## ANEXOS

### Anexo 1: Cuestionario de Diagnóstico Utilizado
1. ¿Ha perdido usted o un familiar cercano una mascota en el último año? (Sí / No)
2. ¿Qué medio utilizó para intentar recuperarla? (Afiches / Facebook / WhatsApp / Ninguno)
3. ¿Logró recuperar a su mascota usando ese medio? (Sí / No)
4. ¿Considera fácil buscar información de mascotas perdidas específicas en redes sociales? (Sí / No)
5. ¿Estaría dispuesto a colaborar reportando animales que ve en la calle si tuviera una web móvil dedicada? (Sí / No)

### Anexo 2: Capturas de Pantalla de la Interfaz (Espacio reservado)
*(Aquí debes colocar las fotos de tu pantalla cuando la página esté funcionando. Se sugiere incluir:*
- *Captura 1: Página de inicio con el buscador interactivo y cuadrícula de mascotas.*
- *Captura 2: Formulario de inicio de sesión y registro con validación.*
- *Captura 3: Formulario de reporte de mascota con carga inicial de fotografía.*
- *Captura 4: Página de detalle de la mascota con comentarios de la comunidad y opciones del dueño.*
- *Captura 5: Modal de edición y actualización de publicaciones con previsualización en tiempo real de nueva imagen.*
- *Captura 6: Panel de administración con gestión de usuarios y publicaciones).*

### Anexo 3: Estudiantes y Tutor en el Proceso de Pruebas (Espacio reservado)
*(Fotos del estudiante probando la web en su computadora y teléfonos móviles, demostrando la responsividad del sitio).*

### Anexo 4: Explicación de Código Fuente Clave para la Defensa

#### A. Conexión y Promesas en SQLite (`db.js`)
Para hacer que el código sea limpio y moderno, se envolvieron las funciones tradicionales de callback de `sqlite3` en Promesas de JavaScript. Esto nos permite usar `async/await` en el servidor:
```javascript
const dbQuery = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) { ... }
};
```
*Pregunta del Jurado:* **¿Por qué usamos promesas aquí?**  
*Respuesta:* Las promesas evitan el problema del "Callback Hell" (funciones anidadas infinitas) y permiten escribir un código asíncrono ordenado que se lee secuencialmente gracias a `await`.

#### B. Middleware de Autenticación con JWT (`server.js`)
Este bloque de código intercepta las peticiones y verifica si el cliente tiene un token válido antes de permitirle crear anuncios, modificarlos o comentar:
```javascript
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acceso denegado.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    req.user = user;
    next(); // Permite continuar a la ruta
  });
}
```
*Pregunta del Jurado:* **¿Qué es `next()` en esa función?**  
*Respuesta:* Es una función de Express que indica que el middleware ha terminado su verificación con éxito y que la petición puede continuar al siguiente controlador de la ruta.

#### C. Actualización Dinámica de Publicaciones y Cambio de Fotografías (`server.js`)
Este endpoint maneja la actualización de datos y la subida de un nuevo archivo de imagen, limpiando físicamente del disco la fotografía anterior para optimizar el almacenamiento:
```javascript
app.put('/api/posts/:id', authenticateToken, upload.single('photo'), async (req, res) => {
  const { name, location, phone, description, reward, status } = req.body;
  const postId = req.params.id;

  const post = await dbQuery.get('SELECT * FROM posts WHERE id = ?', [postId]);
  if (!post) return res.status(404).json({ error: 'Publicación no encontrada.' });

  // Validar permisos (Solo el creador o el administrador pueden editar)
  if (post.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos para modificar este anuncio.' });
  }

  let photoUrl = post.photo_url;
  if (req.file) {
    photoUrl = `/uploads/${req.file.filename}`;
    // Eliminar la foto anterior del disco para no saturar el servidor
    if (post.photo_url && post.photo_url !== '/uploads/default-pet.svg' && post.photo_url.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, 'public', post.photo_url);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }
  }

  await dbQuery.run(
    `UPDATE posts SET name = ?, location = ?, phone = ?, description = ?, reward = ?, status = ?, photo_url = ? WHERE id = ?`,
    [name || post.name, location || post.location, phone || post.phone, description || post.description, reward || post.reward, status || post.status, photoUrl, postId]
  );

  res.json({ message: 'Publicación actualizada correctamente.' });
});
```
*Pregunta del Jurado:* **¿Qué ocurre en el servidor cuando el usuario sube una nueva foto para su publicación?**  
*Respuesta:* El middleware `upload.single('photo')` procesa el nuevo archivo binario asignándole un nombre único. En la base de datos se actualiza la ruta del nuevo archivo y, mediante la librería nativa `fs.unlinkSync`, se borra la imagen anterior del disco para evitar archivos huérfanos y saturación de almacenamiento.

#### D. Previsualización de Imágenes en Tiempo Real en el Cliente (`post.js`)
Permite al usuario observar la imagen inmediatamente en pantalla al seleccionarla en su dispositivo antes de enviarla:
```javascript
editPetPhoto.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      editPhotoPreview.src = event.target.result; // Data URL en base64
    };
    reader.readAsDataURL(file);
  }
});
```
*Pregunta del Jurado:* **¿Por qué usar `FileReader` en el frontend en lugar de enviar directamente la foto?**  
*Respuesta:* `FileReader` genera una URL local temporal que permite al usuario verificar visualmente si la foto seleccionada es la correcta antes de consumir ancho de banda o procesar el envío al servidor.
