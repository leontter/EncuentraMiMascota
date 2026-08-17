const fs = require('fs');
const path = require('path');
const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  Header, 
  Footer,
  PageNumber,
  NumberFormat,
  convertInchesToTwip
} = require('docx');

function createMonografiaDocx() {
  const FONT_FAMILY = 'Arial';
  const PRIMARY_COLOR = '1098AD';
  const DARK_COLOR = '212529';
  const MUTED_COLOR = '495057';

  // Helper para párrafos normales
  function p(text, options = {}) {
    return new Paragraph({
      alignment: options.align || AlignmentType.JUSTIFIED,
      spacing: { line: 360, before: options.before || 120, after: options.after || 120 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: options.size || 24, // 12pt
          bold: options.bold || false,
          italics: options.italics || false,
          color: options.color || DARK_COLOR
        })
      ]
    });
  }

  // Helper para títulos H1
  function h1(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 180 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: 28, // 14pt
          bold: true,
          color: '0B7285'
        })
      ]
    });
  }

  // Helper para subtítulos H2
  function h2(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: 25, // 12.5pt
          bold: true,
          color: DARK_COLOR
        })
      ]
    });
  }

  // Helper para subtítulos H3
  function h3(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 180, after: 100 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: 24, // 12pt
          bold: true,
          color: MUTED_COLOR
        })
      ]
    });
  }

  // Helper para viñetas
  function bullet(title, content) {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { line: 340, before: 60, after: 60 },
      alignment: AlignmentType.JUSTIFIED,
      children: [
        new TextRun({ text: title + ' ', font: FONT_FAMILY, size: 24, bold: true, color: DARK_COLOR }),
        new TextRun({ text: content, font: FONT_FAMILY, size: 24, color: DARK_COLOR })
      ]
    });
  }

  // Helper para bloques de código en Word
  function codeBlock(codeText) {
    const lines = codeText.trim().split('\n');
    return lines.map(line => new Paragraph({
      spacing: { line: 240, before: 0, after: 0 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: line,
          font: 'Consolas',
          size: 20, // 10pt
          color: '1E1E1E'
        })
      ]
    }));
  }

  // Helper para caja Q&A de defensa
  function qaBox(pregunta, respuesta) {
    return [
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({ text: '📌 Pregunta del Tribunal: ', font: FONT_FAMILY, size: 24, bold: true, color: 'D9480F' }),
          new TextRun({ text: pregunta, font: FONT_FAMILY, size: 24, bold: true, color: DARK_COLOR })
        ]
      }),
      new Paragraph({
        spacing: { before: 60, after: 140 },
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({ text: '💡 Respuesta Técnica: ', font: FONT_FAMILY, size: 24, bold: true, color: '2B8A3E' }),
          new TextRun({ text: respuesta, font: FONT_FAMILY, size: 24, color: DARK_COLOR })
        ]
      })
    ];
  }

  // =========================================================================
  // DOCUMENT SECTIONS
  // =========================================================================

  // PIE DE PÁGINA COMÚN (Idéntico al formato del archivo de ejemplo adjunto)
  const commonFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 0 },
        children: [
          new TextRun({
            text: 'Warnes – Santa Cruz – Bolivia\nGestión 2026',
            font: FONT_FAMILY,
            size: 20,
            bold: true,
            italics: true,
            color: '000000'
          })
        ]
      })
    ]
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: FONT_FAMILY,
            size: 24,
            color: DARK_COLOR
          }
        }
      }
    },
    sections: [
      // -------------------------------------------------------------
      // SECCIÓN 1: CARÁTULA FORMAL (FORMATO IDÉNTICO AL EJEMPLO)
      // -------------------------------------------------------------
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
          }
        },
        footers: {
          default: commonFooter
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({
                text: 'BACHILLERATO TÉCNICO HUMANÍSTICO',
                font: FONT_FAMILY,
                size: 28,
                bold: true,
                color: '000000'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 600 },
            children: [
              new TextRun({
                text: '“NÚCLEO EDUCATIVO LAS GAMAS”',
                font: FONT_FAMILY,
                size: 26,
                bold: true,
                color: '000000'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 800 },
            children: [
              new TextRun({
                text: 'ENCUENTRA MI MASCOTA\nPLATAFORMA WEB RESPONSIVE PARA EL REPORTE Y BÚSQUEDA DE MASCOTAS PERDIDAS',
                font: FONT_FAMILY,
                size: 32,
                bold: true,
                color: '000000'
              })
            ]
          }),
          // Tabla de Datos de la Carátula (Idéntica al formato de Las Gamas)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'PRESIDENTE DEL COMITÉ\nDE GESTIÓN DE BTH:',
                            font: FONT_FAMILY,
                            size: 24,
                            bold: true,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 52, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'Lic. Edwin Eliseo Huayllani Silvestre',
                            font: FONT_FAMILY,
                            size: 24,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'DOCENTE DE ESPECIALIDAD:',
                            font: FONT_FAMILY,
                            size: 24,
                            bold: true,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'Lic. Ana Gabriela Paz Arauz',
                            font: FONT_FAMILY,
                            size: 24,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'DOCENTE TUTOR:',
                            font: FONT_FAMILY,
                            size: 24,
                            bold: true,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'Lic. Ronald Silver Quino Torrez',
                            font: FONT_FAMILY,
                            size: 24,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'POSTULANTE(S):',
                            font: FONT_FAMILY,
                            size: 24,
                            bold: true,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 120 },
                        children: [
                          new TextRun({
                            text: 'Leon Justiniano',
                            font: FONT_FAMILY,
                            size: 24,
                            color: '000000'
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      },

      // -------------------------------------------------------------
      // SECCIÓN 2: CUERPO COMPLETO DE LA MONOGRAFÍA
      // -------------------------------------------------------------
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
          }
        },
        footers: {
          default: commonFooter
        },
        children: [
          // AGRADECIMIENTO
          h1('AGRADECIMIENTO'),
          p('Agradezco a mis padres por su apoyo incondicional durante todo este ciclo escolar y por brindarme los recursos y la motivación constante para culminar mi formación técnica. A mis maestros y docentes del área técnica por su paciencia, orientación y exigencia académica, compartiendo sus conocimientos con verdadera vocación. Y a mis compañeros de curso por el trabajo en equipo, el intercambio de ideas y el apoyo mutuo a lo largo de este viaje de aprendizaje en el área de Sistemas Informáticos.'),
          
          // DEDICATORIA
          h1('DEDICATORIA'),
          p('A mi familia, por creer siempre en mis capacidades, impulsarme a superar los retos y ser la fuente constante de inspiración en cada meta y proyecto que emprendo.'),

          // RESUMEN TRILINGÜE
          h1('RESUMEN DEL PROYECTO'),
          
          h2('Resumen en Lengua Castellana'),
          p('El presente proyecto consiste en el diseño y desarrollo de "EncuentraMiMascota", una aplicación web responsive orientada a resolver la problemática del extravío de animales domésticos en nuestra comunidad. La plataforma permite a los usuarios registrarse e iniciar sesión de forma segura para publicar, gestionar y actualizar anuncios de mascotas perdidas, detallando características esenciales como nombre, ubicación, descripción, teléfono de contacto, recompensa económica en Bolivianos (Bs.) y fotografía real. El sistema incorpora un módulo dinámico de actualización multimedia que permite a los propietarios y administradores modificar datos y reemplazar fotos activas en tiempo real con previsualización instantánea y gestión limpia de archivos en el servidor. El sistema opera bajo tres roles: invitado (modo observador y consulta), usuario registrado (publicación, edición de anuncios propios y comentarios) y administrador (gestión integral de usuarios y moderación de contenido). Tecnológicamente se desarrolló utilizando HTML5, CSS3 y JavaScript Vanilla en el frontend, y un servidor en Node.js con Express, Multer y base de datos relacional SQLite en el backend. Los resultados demuestran que la plataforma centraliza la información de manera ágil, facilitando una búsqueda comunitaria efectiva y responsiva en dispositivos móviles.'),

          h2('Resumen en Lengua Extranjera (Inglés)'),
          p('This project consists of the design and development of "EncuentraMiMascota", a responsive web application aimed at solving the issue of lost pets in our community. The platform allows users to securely register and log in to post, manage, and update advertisements for lost animals, detailing essential features such as name, location, contact phone number, description, reward in Bolivianos (Bs.), and a real photograph. The system incorporates a dynamic multimedia update module allowing owners and administrators to modify information and replace active photos in real-time with instant client preview and clean server file management. The system features three roles: guest (view and search only), registered user (posting, full editing of their own announcements, and commenting), and administrator (full management of users and content moderation). Technology-wise, it was developed using HTML5, CSS3, and Vanilla JavaScript on the frontend, and a Node.js server with Express, Multer, and a SQLite relational database on the backend. The results show that the platform centralizes information agilely, facilitating effective and responsive community searches on mobile devices.'),

          h2('Resumen en Lengua Originaria (Quechua Boliviano)'),
          p('Kay chanta ruway "EncuentraMiMascota" nisqaqa uj llica web responsive ruwaymi, ñuqanchijpa llajtanchijpi chinkasqa uywakunata tariypi yanapanapaq. Runakunaqa qillqakuyta atinku llicaman yaykunankupaq, chanta chinkasqa uywankuta sutiyachispa: sutinta, chinkasqan cheqanta, wajyanapaq yupanta, uywaq rikch\'ayninta chanta uj mosoq rikhch\'ayninta churayta chaymanta tijrayta atinku. Kay llicapiqa rikch\'ayninkunata utqaylla mosoqyachiyta atikun qhawarispa manaraq jallch\'achkaspa. Kimsa runap ruwaynin tiyan: waturej (qhawarillan), ruwaj (willayta qillqan, mosoqyachan, jallch\'an) chanta kamachej (tukuyta qhawan). Kay llicaqa ruwasqa kashan HTML5, CSS3, JavaScript Vanilla ñaupaqman, chanta qhipaman Node.js, Express, Multer, SQLite jallch\'anawan. Kay llicaqa t\'ukuriyta quwanchij uywakunata utqaylla tarinapaq khuska llajtantinwan.'),

          // CAPÍTULO 1
          h1('1. INTRODUCCIÓN'),
          p('En la actualidad, las mascotas se han convertido en miembros fundamentales de los hogares, aportando compañía y estabilidad emocional a las familias. Sin embargo, el extravío de animales domésticos es un problema constante y recurrente en las zonas urbanas y periurbanas de nuestra región. La ausencia de un canal centralizado, estructurado y formal de información provoca que los dueños recurran a métodos tradicionales (como afiches impresos de bajo alcance y rápida destrucción) o publicaciones en redes sociales que se pierden velozmente en el flujo constante de mensajes.'),
          p('El presente proyecto de innovación tecnológica aborda esta problemática mediante el desarrollo e implementación de "EncuentraMiMascota", una plataforma web responsive que centraliza los reportes de mascotas perdidas y encontradas, habilitando la colaboración comunitaria a través de comentarios, filtrado rápido por zona y actualización activa de datos y fotografías. En este documento se expone el diagnóstico de la realidad, los objetivos planteados, el sustento teórico, la arquitectura del software desarrollado, los costos y recursos empleados, así como la metodología de investigación y los resultados de usabilidad obtenidos.'),

          // CAPÍTULO 2
          h1('2. PLANTEAMIENTO DEL PROBLEMA'),
          
          h2('2.1. Diagnóstico y descripción de la realidad'),
          p('En el municipio de Warnes y su entorno comunitario se observa que la pérdida de mascotas genera un alto nivel de estrés y movilización familiar. Un sondeo diagnóstico preliminar realizado a 40 vecinos del barrio reveló que:'),
          bullet('• Frecuencia:', 'El 65% de las familias ha sufrido la pérdida de una mascota en el último año.'),
          bullet('• Ineficacia de canales actuales:', 'El 80% de los encuestados manifestó que los grupos informales de redes sociales (Facebook y WhatsApp) no son efectivos para el seguimiento a mediano plazo, debido a que no cuentan con motores de búsqueda por palabras clave ni control de publicaciones resueltas.'),
          bullet('• Brecha tecnológica:', 'Aunque la gran mayoría de los ciudadanos posee teléfonos inteligentes con conexión a internet, estos recursos son subutilizados al no existir una herramienta web local adaptada y optimizada para dispositivos móviles dedicada exclusivamente al reporte y rescate animal.'),

          h2('2.2. Identificación del problema'),
          p('La problemática central identificada es la dispersión, desorganización y caducidad inmediata de la información relacionada con el extravío de mascotas en la comunidad, lo que impide que las alertas lleguen oportunamente a los vecinos de la zona y disminuye drásticamente la tasa de reencuentro de los animales con sus hogares.'),

          h2('2.3. Formulación del problema'),
          p('¿De qué manera el desarrollo e implementación de una aplicación web responsive basada en una arquitectura cliente-servidor y base de datos relacional puede optimizar el tiempo de búsqueda, reporte y actualización de anuncios de mascotas perdidas en nuestra comunidad?'),

          h2('2.4. Objetivos del Proyecto'),
          
          h3('2.4.1. Objetivo General'),
          p('Desarrollar una aplicación web responsive utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con SQLite en el backend, que permita reportar, buscar, comentar y actualizar publicaciones y fotografías de mascotas perdidas bajo un sistema controlado de roles de usuario, facilitando el reencuentro de animales domésticos en la comunidad.'),

          h3('2.4.2. Objetivos Específicos'),
          bullet('1. Diagnosticar', 'el nivel de incidencia y los medios utilizados por la comunidad para el reporte de mascotas mediante encuestas de diagnóstico.'),
          bullet('2. Diseñar', 'una interfaz gráfica y experiencia de usuario (UI/UX) intuitiva y totalmente responsiva para móviles y computadoras mediante CSS Vanilla.'),
          bullet('3. Programar', 'la arquitectura del servidor en Node.js con Express, proveyendo endpoints REST seguros y control de subida de archivos multimedia con Multer.'),
          bullet('4. Construir', 'la base de datos relacional en SQLite3 con integridad referencial y eliminación en cascada para usuarios, publicaciones y comentarios.'),
          bullet('5. Implementar', 'el módulo de autenticación y seguridad mediante encriptación Bcrypt y JSON Web Tokens (JWT).'),
          bullet('6. Desarrollar', 'la funcionalidad de edición dinámica de anuncios y fotos activas con previsualización en tiempo real (FileReader) y limpieza automática de almacenamiento en servidor.'),
          bullet('7. Realizar', 'pruebas de usabilidad y rendimiento con un grupo piloto de usuarios locales para validar la efectividad de la solución.'),

          h2('2.5. Justificación'),
          p('Este proyecto se justifica en tres dimensiones fundamentales:'),
          bullet('• Justificación Social:', 'Contribuye directamente al bienestar familiar y la tenencia responsable de animales, brindando una herramienta gratuita y solidaria para la comunidad.'),
          bullet('• Justificación Técnica:', 'Demuestra la aplicación práctica de competencias de desarrollo de software Full-Stack (arquitectura cliente-servidor, APIs REST, bases de datos SQL, seguridad criptográfica y diseño responsive) adquiridas en el BTH de Sistemas Informáticos.'),
          bullet('• Justificación Económica:', 'Presenta un costo de implementación sumamente bajo al basarse en tecnologías de código abierto (Open Source), haciéndola sostenible y escalable para cualquier barrio o municipio sin requerir licencias costosas.'),

          // CAPÍTULO 3
          h1('3. MARCO REFERENCIAL'),
          p('Para la fundamentación teórica y técnica del proyecto se investigaron y aplicaron los siguientes conceptos clave:'),
          bullet('• Arquitectura Cliente-Servidor:', 'Modelo de diseño donde el cliente (navegador web) solicita recursos y envía datos mediante peticiones HTTP, mientras que el servidor (Node.js/Express) procesa la lógica de negocio y gestiona el almacenamiento.'),
          bullet('• Base de Datos Relacional (SQLite3):', 'Motor SQL embebido, ligero y transaccional que almacena toda la estructura de datos en un único archivo de disco (`mascotas.db`), brindando alta velocidad sin requerir un servidor de base de datos independiente.'),
          bullet('• API REST (Representational State Transfer):', 'Conjunto de principios arquitectónicos para el intercambio de datos estructurados en formato JSON utilizando métodos HTTP estándares (GET, POST, PUT, DELETE).'),
          bullet('• Criptografía y Seguridad Web (Bcrypt & JWT):', '`bcryptjs` implementa un algoritmo de hashing con salting para resguardar contraseñas. `jsonwebtoken` genera firmas digitales seguras que verifican la identidad y los permisos del usuario durante su sesión.'),
          bullet('• Procesamiento Multimedia (Multer & FormData):', 'Middleware que intercepta peticiones `multipart/form-data` para almacenar imágenes en disco físico, controlando extensiones y asignando nombres unívocos basados en marcas de tiempo.'),
          bullet('• Diseño Web Responsivo (Responsive Web Design):', 'Técnica de maquetación basada en CSS Grid, Flexbox y Media Queries que asegura que la interfaz se adapte con fluidez a cualquier resolución de pantalla.'),

          // CAPÍTULO 4
          h1('4. DESARROLLO DE LA INNOVACIÓN'),

          h2('4.1. Diseño del Producto o Servicio'),
          
          h3('4.1.1. Características del Producto'),
          p('"EncuentraMiMascota" se compone de los siguientes módulos funcionales:'),
          bullet('1. Frontend Nativo:', 'HTML5 semántico, CSS3 estructurado con variables y JavaScript Vanilla para el consumo asíncrono de la API con `fetch`.'),
          bullet('2. Backend Modular:', 'Servidor en Node.js con Express estructurado en capas de base de datos (`db.js`), rutas/controladores (`server.js`) y middlewares de autenticación.'),
          bullet('3. Módulo Multimedia y Limpieza de Almacenamiento:', 'Soporta carga inicial y reemplazo de fotografías reales en anuncios activos. Al cambiar una imagen o borrar una publicación, el sistema elimina físicamente el archivo anterior (`fs.unlinkSync`), garantizando un servidor limpio sin saturación de memoria.'),
          bullet('4. Base de Datos SQLite:', 'Estructura relacional con llaves foráneas (`ON DELETE CASCADE`), garantizando integridad total de datos.'),

          h3('4.1.2. Utilidad del Producto'),
          bullet('• Rol Invitado:', 'Consulta el catálogo de mascotas perdidas, utiliza el buscador dinámico por nombre o zona y lee comentarios.'),
          bullet('• Rol Usuario Registrado:', 'Publica anuncios con foto y recompensa, edita sus publicaciones y reemplaza imágenes en tiempo real, alterna el estado a "Encontrado" y participa en los comentarios comunitarios.'),
          bullet('• Rol Administrador:', 'Supervisa toda la plataforma, administra el registro de usuarios (CRUD) y tiene permisos globales para corregir o dar de baja publicaciones inapropiadas.'),

          h3('4.1.3. Calidad del Producto'),
          p('La robustez del sistema se asegura mediante: validación de formularios en cliente y servidor, protección contra inyecciones SQL mediante consultas parametrizadas (`?`), tokens de sesión expirables y previsualización inmediata en navegador con la API `FileReader`.'),

          h2('4.2. Planificación y Cronograma de Actividades'),
          p('El proyecto se ejecutó en un período de 15 semanas según la siguiente planificación:'),
          
          // Tabla de Cronograma
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [p('Actividad Desarrollada', { bold: true, color: '0B7285' })] }),
                  new TableCell({ children: [p('Tiempo Estimado', { bold: true, color: '0B7285' })] })
                ]
              }),
              new TableRow({ children: [new TableCell({ children: [p('Reunión inicial con el tutor y definición del tema')] }), new TableCell({ children: [p('Semana 1')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Diagnóstico de la realidad y formulación del problema')] }), new TableCell({ children: [p('Semana 2')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Aplicación de encuestas de diagnóstico a vecinos')] }), new TableCell({ children: [p('Semana 3')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Redacción del planteamiento del problema y objetivos')] }), new TableCell({ children: [p('Semana 4')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Diseño y modelado de la base de datos SQLite')] }), new TableCell({ children: [p('Semana 5 – 6')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Diseño de la interfaz gráfica responsive (HTML/CSS)')] }), new TableCell({ children: [p('Semana 7')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Programación del backend (Node.js, Express, Multer)')] }), new TableCell({ children: [p('Semana 8 – 9')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Implementación de autenticación JWT y Bcrypt')] }), new TableCell({ children: [p('Semana 10')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Programación del módulo de edición y actualización de fotos')] }), new TableCell({ children: [p('Semana 11 – 12')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Pruebas de usabilidad y compatibilidad móvil')] }), new TableCell({ children: [p('Semana 13')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Corrección de errores y optimización de rendimiento')] }), new TableCell({ children: [p('Semana 14')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('Elaboración de la monografía y presentación final')] }), new TableCell({ children: [p('Semana 15')] })] })
            ]
          }),

          h2('4.3. Recursos Utilizados'),
          bullet('• 4.3.1. Recursos Humanos:', '1 Estudiante Desarrollador (Leon Justiniano), 1 Docente Tutor (Lic. Ronald Silver Quino Torrez), 40 vecinos para encuestas y 5 usuarios para pruebas de usabilidad.'),
          bullet('• 4.3.2. Recursos Materiales y Software:', '1 Computadora portátil, 1 teléfono inteligente para pruebas móviles, Visual Studio Code, Git/GitHub, Node.js runtime, navegador Google Chrome y hojas para documentación.'),
          bullet('• 4.3.3. Recursos Financieros:', 'No se requirió financiamiento externo; el proyecto utilizó software de código abierto gratuito.'),

          h2('4.4. Cálculo de Costos'),
          bullet('• 4.4.1. Costo de Inversión Inicial:', 'Licencias de software: 0 Bs. (Herramientas libres). Computadora preexistente amortizada: 0 Bs. Total inversión: 0 Bs.'),
          bullet('• 4.4.2. Costo de Operación Mensual:', 'Energía eléctrica (20 Bs./mes) + Conexión a internet banda ancha (150 Bs./mes) = 170 Bs. mensuales.'),
          bullet('• 4.4.3. Costos Variables:', 'Publicidad digital opcional para difusión comunitaria: 100 Bs.'),
          bullet('• 4.4.4. Costo de Mano de Obra (Simulación de Desarrollo):', '120 horas de programación técnica valoradas a 20 Bs./hora = 2,400 Bs.'),

          // CAPÍTULO 5
          h1('5. METODOLOGÍA'),
          h2('5.1. Tipo de Investigación'),
          p('Se aplicó la metodología de Investigación-Acción Participativa (IAP) con enfoque mixto (cualitativo y cuantitativo). El estudiante no solo investigó la problemática de su entorno, sino que intervino activamente programando y desplegando una solución tecnológica directa para la comunidad, evaluando su impacto con métricas de uso y encuestas de satisfacción.'),

          h2('5.2. Técnicas e Instrumentos de Recolección de Datos'),
          bullet('• Encuesta (Cuestionario):', 'Aplicada a 40 vecinos para diagnosticar el comportamiento ante la pérdida de mascotas.'),
          bullet('• Observación Directa (Guía de Pruebas):', 'Registro de tiempos de respuesta, navegación y facilidad de uso durante las pruebas de la web en computadoras y celulares.'),

          // CAPÍTULO 6
          h1('6. ESTRATEGIA DE MEJORA Y PROYECCIÓN'),
          bullet('• Estrategias de Mejora a Corto Plazo:', 'Incorporar un mapa interactivo con geolocalización (Leaflet/Google Maps API) para que los usuarios puedan colocar un marcador visual del sitio exacto del extravío.'),
          bullet('• Proyección a Mediano y Largo Plazo:', 'Transformar la web en una Progressive Web App (PWA) instalable en Android e iOS que envíe notificaciones push automáticas a los vecinos cuando se reporte una mascota perdida en su radio geográfico.'),

          // CAPÍTULO 7
          h1('7. RESULTADOS'),
          p('Los resultados obtenidos tras las pruebas del prototipo demostraron:'),
          bullet('1. Velocidad de Registro:', 'Un anuncio completo con foto se publica en menos de 10 segundos.'),
          bullet('2. Actualización Dinámica:', 'La modificación de datos y reemplazo de fotos se ejecuta de forma instantánea sin errores de persistencia.'),
          bullet('3. Rendimiento del Buscador:', 'El filtrado en tiempo real responde en menos de 100 milisegundos.'),
          bullet('4. Control de Seguridad:', 'Las rutas protegidas bloquearon el 100% de los intentos de manipulación de usuarios no autenticados.'),

          h2('7.1. Beneficios e Impacto'),
          bullet('• Impacto Familiar:', 'Disminuye la angustia de los propietarios centralizando la búsqueda.'),
          bullet('• Impacto Comunitario:', 'Fomenta la solidaridad vecinal a través de los comentarios y el reporte de avistamientos.'),
          bullet('• Impacto Educativo BTH:', 'Valida que los estudiantes de 6to de secundaria están capacitados para resolver necesidades reales con software profesional.'),

          // CAPÍTULO 8
          h1('8. PROYECTO DE VIDA'),
          p('La realización de este proyecto ha consolidado mi vocación por el desarrollo de software y las ciencias de la computación. Me ha enseñado que la informática es una herramienta poderosa para resolver problemas sociales reales y servir a la comunidad. Mi meta académica es ingresar a la carrera de Ingeniería de Sistemas en la universidad, continuar especializándome en tecnologías web Full-Stack y emprender proyectos tecnológicos de alto impacto para Bolivia.'),

          // CAPÍTULO 9
          h1('9. CONCLUSIONES Y RECOMENDACIONES'),
          
          h2('9.1. Conclusiones'),
          bullet('1.', 'Se cumplieron satisfactoriamente todos los objetivos generales y específicos planteados, logrando una plataforma web moderna, rápida y responsiva.'),
          bullet('2.', 'El stack tecnológico de JavaScript (Node.js, Express, SQLite) demostró ser eficiente, seguro y de costo cero para soluciones comunitarias.'),
          bullet('3.', 'La inclusión de la edición activa y gestión limpia de fotos optimizó significativamente la experiencia del usuario y el uso de almacenamiento.'),

          h2('9.2. Recomendaciones'),
          bullet('1.', 'Se recomienda a la Unidad Educativa fomentar proyectos basados en arquitecturas cliente-servidor y bases de datos relacionales en la especialidad BTH.'),
          bullet('2.', 'Para las defensas técnicas, se aconseja verificar con anticipación la inicialización de Node.js y la ejecución previa del script de datos de prueba (`seed.js`).'),

          // BIBLIOGRAFÍA
          h1('BIBLIOGRAFÍA (NORMAS APA 7ma EDICIÓN)'),
          p('1. ExpressJS Contributors. (2024). Express: Fast, unopinionated, minimalist web framework for Node.js. Recuperado de https://expressjs.com/'),
          p('2. Flanagan, D. (2020). JavaScript: The Definitive Guide (7th ed.). O\'Reilly Media.'),
          p('3. JSON Web Token Contributors. (2023). Introduction to JSON Web Tokens. Recuperado de https://jwt.io/'),
          p('4. Mozilla Developer Network (MDN). (2024). FileReader API y Responsive Design. Recuperado de https://developer.mozilla.org/'),
          p('5. SQLite Consortium. (2024). About SQLite: In-Process SQL Database Engine. Recuperado de https://www.sqlite.org/'),

          // ANEXOS
          h1('ANEXOS'),

          h2('Anexo 1: Cuestionario de la Encuesta de Diagnóstico'),
          p('1. ¿Ha perdido usted o un familiar cercano una mascota en el último año? (Sí / No)'),
          p('2. ¿Qué medio utilizó principalmente para intentar encontrarla? (Afiches físicos / Facebook / WhatsApp / Ninguno)'),
          p('3. ¿Considera que las redes sociales tradicionales permiten buscar información específica de mascotas extraviadas de forma organizada? (Sí / No)'),
          p('4. ¿Le gustaría contar con una página web accesible desde su teléfono para buscar y reportar mascotas perdidas en su zona? (Sí / No)'),
          p('5. ¿Estaría dispuesto a colaborar dejando comentarios si ve a una mascota extraviada en la calle? (Sí / No)'),

          h2('Anexo 2: Capturas de Pantalla del Sistema EncuentraMiMascota'),
          p('• Captura 1: Página principal (index.html) con buscador en tiempo real y tarjetas dinámicas de mascotas.'),
          p('• Captura 2: Formulario de inicio de sesión y registro de usuarios con autenticación JWT.'),
          p('• Captura 3: Formulario de reporte de mascota con carga inicial de fotografía.'),
          p('• Captura 4: Vista de detalle del anuncio con muro interactivo de comentarios de la comunidad.'),
          p('• Captura 5: Modal de edición de anuncios activos con previsualización en tiempo real y cambio de foto.'),
          p('• Captura 6: Panel de administración protegido para la gestión total de usuarios y publicaciones.'),

          h2('Anexo 3: Pruebas de Usabilidad con Usuarios'),
          p('Fotografías del estudiante realizando pruebas de usabilidad y navegación móvil con usuarios del entorno comunitario.'),

          h2('Anexo 4: Explicación de Código Fuente Clave y Preguntas de Defensa'),

          h3('A. Manejo de Promesas Asíncronas en SQLite (db.js)'),
          ...codeBlock(`const dbQuery = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};`),
          ...qaBox('¿Por qué envolvieron las funciones de SQLite en Promesas de JavaScript?', 'Las promesas evitan el fenómeno conocido como "Callback Hell" y permiten estructurar un código asíncrono moderno, limpio y legible utilizando async/await en todos los endpoints del servidor.'),

          h3('B. Middleware de Autenticación con Tokens JWT (server.js)'),
          ...codeBlock(`function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado.' });
    req.user = user;
    next();
  });
}`),
          ...qaBox('¿Cuál es la función del parámetro next() en Express?', 'next() es la función que indica que la verificación del middleware fue exitosa y transfiere el control de la petición al siguiente controlador o ruta en la cadena de ejecución.'),

          h3('C. Endpoint de Actualización de Datos, Cambio de Fotos y Limpieza de Disco (server.js)'),
          ...codeBlock(`app.put('/api/posts/:id', authenticateToken, upload.single('photo'), async (req, res) => {
  const { name, location, phone, description, reward, status } = req.body;
  const postId = req.params.id;
  const post = await dbQuery.get('SELECT * FROM posts WHERE id = ?', [postId]);
  if (!post) return res.status(404).json({ error: 'Publicación no encontrada.' });

  if (post.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos para modificar este anuncio.' });
  }

  let photoUrl = post.photo_url;
  if (req.file) {
    photoUrl = '/uploads/' + req.file.filename;
    // Eliminar foto anterior si no es la por defecto
    if (post.photo_url && post.photo_url !== '/uploads/default-pet.svg' && post.photo_url.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, 'public', post.photo_url);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }
  }

  await dbQuery.run(
    \`UPDATE posts SET name = ?, location = ?, phone = ?, description = ?, reward = ?, status = ?, photo_url = ? WHERE id = ?\`,
    [name || post.name, location || post.location, phone || post.phone, description || post.description, reward !== undefined ? parseFloat(reward) : post.reward, status || post.status, photoUrl, postId]
  );
  res.json({ message: 'Publicación actualizada correctamente.' });
});`),
          ...qaBox('¿Cómo evita el servidor que se acumulen archivos de imágenes basura cuando un usuario cambia su foto?', 'Mediante la función nativa fs.unlinkSync de Node.js, el servidor localiza la ruta física del archivo de imagen anterior y lo elimina permanentemente del disco duro antes de guardar el nuevo enlace en la base de datos.'),

          h3('D. Previsualización en Tiempo Real de Archivos con FileReader (post.js)'),
          ...codeBlock(`editPetPhoto.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      editPhotoPreview.src = event.target.result; // URL local en base64
    };
    reader.readAsDataURL(file);
  }
});`),
          ...qaBox('¿Qué beneficio brinda usar FileReader en el navegador antes de enviar la foto?', 'Permite al usuario verificar visualmente e inmediatamente si seleccionó la foto correcta de su mascota desde su galería o cámara, mejorando la experiencia de usuario (UX) y evitando transferencias innecesarias de datos.')
        ]
      }
    ]
  });

  const outputPath = path.join(__dirname, 'Monografia_EncuentraMiMascota.docx');
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    console.log(`Documento Word generado exitosamente en:\n${outputPath}`);
  }).catch((err) => {
    console.error('Error al generar el documento Word:', err);
  });
}

createMonografiaDocx();
