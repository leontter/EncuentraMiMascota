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
  Footer,
  Header,
  PageNumber,
  NumberFormat,
  PageBreak,
  ImageRun
} = require('docx');

async function generarMonografiaWord() {
  const FONT_FAMILY = 'Arial';
  const COLOR_PRIMARY = '1098AD';
  const COLOR_DARK = '212529';
  const COLOR_MUTED = '495057';
  const COLOR_BLACK = '000000';

  // Cargar logo si existe
  let logoBuffer = null;
  const logoPath = path.join(__dirname, 'extracted_img_0.jpg');
  if (fs.existsSync(logoPath)) {
    logoBuffer = fs.readFileSync(logoPath);
  }

  // Helper para párrafos estándar
  function p(text, options = {}) {
    return new Paragraph({
      spacing: { line: 280, before: options.before || 60, after: options.after || 60 },
      alignment: options.align || AlignmentType.JUSTIFIED,
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: options.size || 24, // 12pt
          bold: options.bold || false,
          italics: options.italics || false,
          color: options.color || COLOR_DARK
        })
      ]
    });
  }

  // Helper para títulos H1
  function h1(text, options = {}) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: options.before || 240, after: 120 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: 28, // 14pt
          bold: true,
          color: COLOR_BLACK
        })
      ]
    });
  }

  // Helper para títulos H2
  function h2(text, options = {}) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: options.before || 180, after: 80 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: 26, // 13pt
          bold: true,
          color: COLOR_BLACK
        })
      ]
    });
  }

  // Helper para títulos H3
  function h3(text, options = {}) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: options.before || 140, after: 60 },
      children: [
        new TextRun({
          text: text,
          font: FONT_FAMILY,
          size: 24, // 12pt
          bold: true,
          color: COLOR_BLACK
        })
      ]
    });
  }

  // Helper para viñetas
  function bullet(boldPrefix, normalText) {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { line: 260, before: 40, after: 40 },
      alignment: AlignmentType.JUSTIFIED,
      children: [
        new TextRun({
          text: boldPrefix ? `${boldPrefix} ` : '',
          font: FONT_FAMILY,
          size: 24,
          bold: true,
          color: COLOR_BLACK
        }),
        new TextRun({
          text: normalText,
          font: FONT_FAMILY,
          size: 24,
          color: COLOR_DARK
        })
      ]
    });
  }

  // Helper para fila del Índice General
  function indiceRow(titulo, pagina, nivel = 1) {
    const puntos = '.'.repeat(Math.max(5, 75 - titulo.length - pagina.length - (nivel * 3)));
    const indent = '   '.repeat(nivel - 1);
    return new Paragraph({
      spacing: { line: 240, before: 20, after: 20 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `${indent}${titulo} `,
          font: FONT_FAMILY,
          size: 22, // 11pt
          bold: nivel === 1,
          color: COLOR_BLACK
        }),
        new TextRun({
          text: puntos,
          font: FONT_FAMILY,
          size: 20,
          color: '888888'
        }),
        new TextRun({
          text: ` ${pagina}`,
          font: FONT_FAMILY,
          size: 22,
          bold: nivel === 1,
          color: COLOR_BLACK
        })
      ]
    });
  }

  // FOOTER DE CARÁTULA (Sin número de página)
  const coverFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 0 },
        children: [
          new TextRun({
            text: 'Warnes – Santa Cruz – Bolivia',
            font: FONT_FAMILY,
            size: 22,
            italics: true,
            color: COLOR_BLACK
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            text: 'Gestión 2026',
            font: FONT_FAMILY,
            size: 22,
            bold: true,
            italics: true,
            color: COLOR_BLACK
          })
        ]
      })
    ]
  });

  // FOOTER DE SECCIONES PRELIMINARES (Numeración romana i, ii, iii...)
  const prelimFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 80, after: 0 },
        children: [
          new TextRun({
            text: 'Warnes – Santa Cruz – Bolivia  |  Gestión 2026                   ',
            font: FONT_FAMILY,
            size: 19,
            italics: true,
            color: '666666'
          }),
          new TextRun({
            children: [PageNumber.CURRENT],
            font: FONT_FAMILY,
            size: 20,
            bold: true,
            color: COLOR_BLACK
          })
        ]
      })
    ]
  });

  // FOOTER DEL CUERPO PRINCIPAL (Numeración arábiga Página 1, 2, 3...)
  const bodyFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 80, after: 0 },
        children: [
          new TextRun({
            text: 'Warnes – Santa Cruz – Bolivia  |  Gestión 2026                   Página ',
            font: FONT_FAMILY,
            size: 19,
            italics: true,
            color: '666666'
          }),
          new TextRun({
            children: [PageNumber.CURRENT],
            font: FONT_FAMILY,
            size: 20,
            bold: true,
            color: COLOR_BLACK
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
            color: COLOR_DARK
          }
        }
      }
    },
    sections: [
      // =======================================================================
      // SECCIÓN 1: CARÁTULA / PORTADA OFICIAL
      // =======================================================================
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
          }
        },
        footers: {
          default: coverFooter
        },
        children: [
          // Encabezado institucional
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 40 },
            children: [
              new TextRun({
                text: 'BACHILLERATO TECNICO HUMANISTICO',
                font: FONT_FAMILY,
                size: 28, // 14pt
                bold: true,
                color: COLOR_BLACK
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            children: [
              new TextRun({
                text: '“NUCLEO EDUCATIVO LAS GAMAS”',
                font: FONT_FAMILY,
                size: 26, // 13pt
                bold: true,
                color: COLOR_BLACK
              })
            ]
          }),

          // Logo institucional BTH Las Gamas
          ...(logoBuffer ? [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 60, after: 200 },
              children: [
                new ImageRun({
                  data: logoBuffer,
                  transformation: {
                    width: 160,
                    height: 160
                  }
                })
              ]
            })
          ] : []),

          // Título del proyecto
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 320 },
            children: [
              new TextRun({
                text: 'ENCUENTRA MI MASCOTA: PLATAFORMA WEB RESPONSIVE PARA EL REPORTE Y BÚSQUEDA DE MASCOTAS PERDIDAS MEDIANTE BYCODING',
                font: FONT_FAMILY,
                size: 24, // 12pt
                bold: true,
                color: COLOR_BLACK
              })
            ]
          }),

          // Tabla de Datos de Autoridades y Postulantes
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
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'PRESIDENTE DEL COMITÉ\nDE GESTION DE BTH:',
                            font: FONT_FAMILY,
                            size: 22,
                            bold: true,
                            color: COLOR_BLACK
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 52, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'Lic. Edwin Eliseo Huayllani Silvestre',
                            font: FONT_FAMILY,
                            size: 22,
                            color: COLOR_BLACK
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
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'DOCENTE DE ESPECIALIDAD:',
                            font: FONT_FAMILY,
                            size: 22,
                            bold: true,
                            color: COLOR_BLACK
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'Lic. Ana Gabriela Paz Arauz',
                            font: FONT_FAMILY,
                            size: 22,
                            color: COLOR_BLACK
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
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'DOCENTE TUTOR:',
                            font: FONT_FAMILY,
                            size: 22,
                            bold: true,
                            color: COLOR_BLACK
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'Lic. Ivanna Leminka López Sanabria',
                            font: FONT_FAMILY,
                            size: 22,
                            color: COLOR_BLACK
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
                        spacing: { before: 80, after: 80 },
                        children: [
                          new TextRun({
                            text: 'POSTULANTE(S):',
                            font: FONT_FAMILY,
                            size: 22,
                            bold: true,
                            color: COLOR_BLACK
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        spacing: { before: 60, after: 30 },
                        children: [
                          new TextRun({
                            text: 'Dietter Leon Justiniano',
                            font: FONT_FAMILY,
                            size: 22,
                            color: COLOR_BLACK
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 30, after: 60 },
                        children: [
                          new TextRun({
                            text: 'Yimmy Lijeron Mejias',
                            font: FONT_FAMILY,
                            size: 22,
                            color: COLOR_BLACK
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

      // =======================================================================
      // SECCIÓN 2: SECCIONES PRELIMINARES (Numeración romana: i, ii, iii...)
      // =======================================================================
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
            pageNumbers: {
              start: 1,
              formatType: NumberFormat.LOWER_ROMAN
            }
          }
        },
        footers: {
          default: prelimFooter
        },
        children: [
          // AGRADECIMIENTO
          h1('AGRADECIMIENTO'),
          p('Agradecemos primeramente a nuestros padres por su apoyo incondicional durante todo este ciclo escolar y por brindarnos los recursos, valores y motivación constante para culminar mi formación técnica en el Bachillerato Técnico Humanístico. A nuestros maestros y docentes de la especialidad técnica de Sistemas Informáticos por su paciencia, guía y exigencia académica, compartiendo sus conocimientos con verdadera dedicación.'),

          // DEDICATORIA
          h1('DEDICATORIA', { before: 240 }),
          p('A nuestras familias, por creer siempre en nuestras capacidades, impulsarnos a superar cada reto y ser la fuente inagotable de inspiración y fortaleza en cada meta que emprendemos.'),

          // RESUMEN TRILINGÜE
          h1('RESUMEN', { before: 240 }),
          h2('Lengua Castellana:'),
          p('El presente proyecto consiste en el diseño y desarrollo de “EncuentraMiMascota”, una aplicación web creada para ayudar a las personas a encontrar mascotas que se hayan perdido y facilitar su regreso a sus hogares. La idea principal del proyecto nace de una situación que ocurre con frecuencia en nuestra comunidad: muchas mascotas se extravían y sus dueños tienen dificultades para compartir rápidamente la información necesaria para encontrarlas.'),
          p('La plataforma permite que los usuarios creen una cuenta e inicien sesión de manera segura. Una vez registrados, pueden publicar anuncios sobre mascotas perdidas, agregando información importante como el nombre del animal, el lugar donde fue visto por última vez, un número de teléfono para comunicarse, una posible recompensa en bolivianos (Bs.) y una fotografía real de la mascota. El sistema incorpora un módulo multimedia dinámico con Multer que permite editar y reemplazar fotografías en tiempo real con previsualización en el navegador y eliminación automática de archivos obsoletos del servidor.'),
          p('La aplicación cuenta con tres tipos de usuarios: invitado (observación y búsqueda en tiempo real), usuario registrado (publicación, edición completa de sus anuncios y comentarios) y administrador (gestión integral de usuarios y moderación de publicaciones). Tecnológicamente se utilizó HTML5, CSS3 y JavaScript en el frontend, y Node.js con Express y SQLite en el backend.'),

          h2('Lengua Extranjera (Inglés):'),
          p('This project consists of the design and development of “FindMyPet”, a responsive web application created to help people find pets that have been lost and make it easier for them to return to their homes. The platform allows users to securely register, publish, manage, and update advertisements for lost animals with photographs, contact numbers, locations, and rewards. It features dynamic multimedia image updates with instant preview, clean server storage handling, and role-based access control (guest, user, and administrator). Built with HTML5, CSS3, Vanilla JavaScript, Node.js, Express, Multer, and SQLite database.'),

          h2('Lengua Originaria (Quechua Boliviano):'),
          p('Kay proyectoqa “EncuentraMiMascota” sutiyuq web aplicación nisqap ruwasqanmi. Kay aplicaciónqa chinkasqa uywakunata maskanapaq, chinkachiq runakunaman yanapanapaq, hinallataq uywakunata wasinkuman kutichinapaq ruwasqami. Runakunaqa qillqakuyta atinku llicaman yaykunankupaq, chanta chinkasqa uywankuta sutiyachispa: sutinta, chinkasqan cheqanta, wajyanapaq yupanta, uywaq rikch\'ayninta chanta uj mosoq rikhch\'ayninta churayta chaymanta tijrayta atinku. Kay llicaqa ruwasqa kashan HTML5, CSS3, JavaScript Vanilla ñaupaqman, chanta qhipaman Node.js, Express, Multer, SQLite jallch\'anawan.'),

          // ÍNDICE GENERAL SINCRONIZADO
          h1('ÍNDICE GENERAL', { before: 240 }),
          indiceRow('Agradecimiento', 'i', 1),
          indiceRow('Dedicatoria', 'i', 1),
          indiceRow('Resumen', 'i', 1),
          indiceRow('1. INTRODUCCIÓN', '1', 1),
          indiceRow('2. PLANTEAMIENTO DEL PROBLEMA', '2', 1),
          indiceRow('2.1. Diagnóstico y descripción de la realidad', '2', 2),
          indiceRow('2.2. Identificación del problema (Análisis FODA)', '2', 2),
          indiceRow('2.3. Formulación del problema', '3', 2),
          indiceRow('2.4. Objetivos', '3', 2),
          indiceRow('2.4.1. Objetivo general', '4', 3),
          indiceRow('2.4.2. Objetivos específicos', '4', 3),
          indiceRow('2.5. Justificación', '4', 2),
          indiceRow('3. MARCO REFERENCIAL', '5', 1),
          indiceRow('4. DESARROLLO DE LA INNOVACIÓN', '6', 1),
          indiceRow('4.1. Diseño del producto o servicio', '6', 2),
          indiceRow('4.1.1. Características del producto o servicio', '6', 3),
          indiceRow('4.1.2. Utilidad del producto o servicio', '6', 3),
          indiceRow('4.1.3. Calidad del producto o servicio', '7', 3),
          indiceRow('4.2. Planificación y organización', '7', 2),
          indiceRow('4.2.1. Cronograma de actividades (Enero - Noviembre)', '7', 3),
          indiceRow('4.3. Recursos', '8', 2),
          indiceRow('4.3.1. Humanos', '8', 3),
          indiceRow('4.3.2. Materiales', '8', 3),
          indiceRow('4.3.3. Financieros', '8', 3),
          indiceRow('4.4. Cálculo de costos', '9', 2),
          indiceRow('4.4.1. Costo de inversión', '9', 3),
          indiceRow('4.4.2. Costo de operación', '9', 3),
          indiceRow('4.4.3. Costos variables', '9', 3),
          indiceRow('4.4.4. Costos fijos y simulación de desarrollo', '9', 3),
          indiceRow('5. METODOLOGÍA', '10', 1),
          indiceRow('5.1. Tipo de investigación', '10', 2),
          indiceRow('5.2. Técnicas e instrumentos de recolección de datos', '10', 2),
          indiceRow('6. ESTRATEGIA DE MEJORA Y PROYECCIÓN', '11', 1),
          indiceRow('7. RESULTADOS', '11', 1),
          indiceRow('7.1. Beneficios e impacto', '11', 2),
          indiceRow('8. PROYECTO DE VIDA', '12', 1),
          indiceRow('9. CONCLUSIONES Y RECOMENDACIONES', '12', 1),
          indiceRow('BIBLIOGRAFÍA', '13', 1),
          indiceRow('ANEXOS', '14', 1)
        ]
      },

      // =======================================================================
      // SECCIÓN 3: CUERPO COMPLETO DE LA MONOGRAFÍA (Numeración arábiga: 1, 2, 3...)
      // =======================================================================
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
            pageNumbers: {
              start: 1,
              formatType: NumberFormat.DECIMAL
            }
          }
        },
        footers: {
          default: bodyFooter
        },
        children: [
          // -------------------------------------------------------------
          // CAPÍTULO 1: INTRODUCCIÓN (PÁGINA 1)
          // -------------------------------------------------------------
          h1('1. INTRODUCCIÓN'),
          p('En la actualidad, las mascotas se han convertido en una parte muy importante de muchas familias, ya que brindan compañía, cariño y alegría a las personas que conviven con ellas. Para muchas personas, un perro, un gato u otro animal doméstico no es solamente una mascota, sino también un miembro más de la familia. Por esta razón, cuando una mascota se pierde, la preocupación de sus dueños es muy grande y surge la necesidad de encontrarla lo antes posible.'),
          p('El extravío de mascotas es un problema que ocurre con frecuencia, especialmente en las zonas urbanas y periurbanas de nuestro municipio y departamento. Cuando un animal se pierde, sus dueños suelen utilizar diferentes medios para intentar encontrarlo, como colocar afiches en calles, postes o lugares públicos, pedir ayuda a vecinos o publicar fotografías y datos en redes sociales. Sin embargo, estos métodos no siempre son suficientes. Los afiches pueden dañarse, perderse o ser retirados rápidamente, mientras que las publicaciones en redes sociales pueden quedar atrás en poco tiempo debido a la gran cantidad de contenido que se publica diariamente.'),
          p('A partir de esta necesidad surge “EncuentraMiMascota”, un proyecto de innovación tecnológica que consiste en el desarrollo de una plataforma web diseñada para ayudar a las personas a publicar y encontrar información sobre mascotas perdidas o encontradas mediante ByCoding. La plataforma busca reunir en un solo lugar los datos más importantes de cada caso, como el nombre de la mascota, su fotografía, el lugar donde fue vista, información de contacto y otros detalles que puedan ayudar a identificarla.'),
          p('Para desarrollar la aplicación se utilizaron diferentes tecnologías web, entre ellas Node.js, Express, Multer y SQLite, además de herramientas como HTML5, CSS3 y JavaScript. En el presente documento se explica el diagnóstico del problema, los objetivos generales y específicos, la propuesta de solución, el diseño y desarrollo de la aplicación, las tecnologías utilizadas, la planificación de costos y recursos, la metodología aplicada y los resultados obtenidos.'),

          // -------------------------------------------------------------
          // CAPÍTULO 2: PLANTEAMIENTO DEL PROBLEMA (PÁGINA 2)
          // -------------------------------------------------------------
          h1('2. PLANTEAMIENTO DEL PROBLEMA', { before: 240 }),
          p('En nuestra comunidad, la pérdida de mascotas representa una problemática que afecta a numerosas familias. Actualmente, el reporte y la búsqueda de animales extraviados se realizan principalmente mediante redes sociales, grupos de mensajería y publicaciones informales. Estos medios no están diseñados específicamente para este propósito, por lo que la información puede encontrarse dispersa, perderse entre otras publicaciones o no llegar a las personas de la zona donde se perdió la mascota.'),

          h2('2.1. Diagnóstico y descripción de la realidad'),
          p('En el municipio de Warnes y las zonas urbanas de Santa Cruz de la Sierra, Bolivia, se observa que la pérdida de animales de compañía genera una profunda angustia en las familias y una movilización vecinal que muchas veces no alcanza los resultados esperados. A pesar de que la comunidad cuenta con un acceso masivo a teléfonos móviles y conectividad a internet, los métodos utilizados para reportar un extravío siguen siendo manuales, informales o desorganizados.'),
          p('Un sondeo realizado en el entorno comunitario reveló que el 65% de las familias ha perdido una mascota en el último año y que el 80% de los vecinos considera que los grupos de redes sociales actuales (como Facebook o WhatsApp) no son efectivos para el seguimiento a mediano plazo, debido a que no cuentan con motores de búsqueda por zonas, filtros por características ni actualización del estado del animal una vez encontrado.'),

          h2('2.2. Identificación del problema (Análisis FODA)'),
          p('Para identificar las variables internas y externas del proyecto, se elaboró la siguiente matriz de Análisis FODA:'),

          // TABLA MATRIZ FODA
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              left: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              right: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "D0D0D0" },
              insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "D0D0D0" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [p('FORTALEZAS (Internas)', { bold: true, color: COLOR_BLACK })] }),
                  new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [p('OPORTUNIDADES (Externas)', { bold: true, color: COLOR_BLACK })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      bullet('', 'Reúne en un solo lugar información sobre mascotas perdidas y encontradas.'),
                      bullet('', 'Facilita la publicación de fotografías, ubicación, teléfono y recompensa.'),
                      bullet('', 'Permite editar datos y reemplazar fotos activas con previsualización en vivo.'),
                      bullet('', 'Control de acceso con 3 roles: invitado, usuario y administrador.'),
                      bullet('', 'Diseño responsive adaptado a celulares, tablets y computadoras.')
                    ]
                  }),
                  new TableCell({
                    children: [
                      bullet('', 'Adopción comunitaria por gran cantidad de vecinos.'),
                      bullet('', 'Ampliación a otros municipios y departamentos de Bolivia.'),
                      bullet('', 'Difusión masiva a través de grupos comunitarios.'),
                      bullet('', 'Integración futura de mapas interactivos y notificaciones push.'),
                      bullet('', 'Alianzas con veterinarias, albergues y rescatistas.')
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [p('DEBILIDADES (Internas)', { bold: true, color: COLOR_BLACK })] }),
                  new TableCell({ children: [p('AMENAZAS (Externas)', { bold: true, color: COLOR_BLACK })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      bullet('', 'Dependencia estricta de conexión a internet para su uso.'),
                      bullet('', 'Alcance inicial limitado mientras la plataforma gana reconocimiento.'),
                      bullet('', 'El volumen de reportes depende de la participación vecinal.'),
                      bullet('', 'SQLite puede requerir migración a PostgreSQL si el tráfico escala a nivel masivo.')
                    ]
                  }),
                  new TableCell({
                    children: [
                      bullet('', 'Competencia con la costumbre de publicar en redes sociales informales.'),
                      bullet('', 'Riesgo de publicaciones falsas o datos erróneos de usuarios malintencionados.'),
                      bullet('', 'Cambios en estándares web que demanden mantenimiento periódico.'),
                      bullet('', 'Caídas temporales de servicio de hosting en la nube.')
                    ]
                  })
                ]
              })
            ]
          }),

          h2('2.3. Formulación del problema', { before: 180 }),
          p('Problema a solucionar:', { bold: true, italics: true }),
          p('En nuestra comunidad no existe una plataforma digital centralizada y accesible para el registro de mascotas perdidas, lo que obliga a las personas a recurrir a afiches impresos de bajo alcance o grupos de redes sociales donde la información se satura y expira rápidamente. Esta situación provoca pérdida de tiempo valioso en los primeros momentos del extravío, dificulta el reencuentro de los animales con sus hogares y genera una gran frustración en las familias afectadas.'),

          p('Solución en forma de pregunta:', { bold: true, italics: true }),
          p('¿De qué manera el desarrollo e implementación de una plataforma web responsive de reporte y búsqueda de mascotas permitirá centralizar, organizar y gestionar de forma eficiente los avisos de animales extraviados en la comunidad, reduciendo los tiempos de búsqueda, optimizando la comunicación vecinal y garantizando el acceso oportuno a los datos desde cualquier dispositivo móvil?'),

          h2('2.4. Objetivos', { before: 180 }),
          p('Con este proyecto queremos lograr metas claras y medibles:'),

          h3('2.4.1. Objetivo general'),
          p('Desarrollar una plataforma web responsive de reporte y búsqueda de mascotas perdidas para nuestra comunidad, utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con base de datos relacional SQLite en el backend, que permita centralizar y gestionar de forma ágil y segura la información de los animales extraviados facilitando su reencuentro.'),

          h3('2.4.2. Objetivos específicos'),
          bullet('1. Diagnosticar', 'la situación actual del extravío de mascotas y los medios utilizados por los vecinos en la comunidad mediante encuestas.'),
          bullet('2. Diseñar', 'la base de datos relacional y la interfaz gráfica de usuario (UI/UX) de forma sencilla, intuitiva y adaptable a dispositivos móviles.'),
          bullet('3. Programar', 'los módulos de registro de usuarios, publicación de anuncios, catálogo interactivo con buscador en tiempo real y muro de comentarios.'),
          bullet('4. Implementar', 'el módulo multimedia con Multer para la carga inicial, edición activa de anuncios y reemplazo de fotografías con limpieza de archivos en servidor.'),
          bullet('5. Incorporar', 'mecanismos de seguridad (Bcrypt y JWT) que protejan las contraseñas y las sesiones bajo tres niveles de acceso (invitado, usuario y administrador).'),
          bullet('6. Realizar', 'pruebas de funcionamiento y usabilidad del sistema junto a vecinos y usuarios de prueba para validar su efectividad.'),

          h2('2.5. Justificación', { before: 180 }),
          p('Este proyecto se justifica socialmente porque en nuestra comunidad actualmente no existe ninguna herramienta digital especializada que permita organizar la información de las mascotas extraviadas. Con el sistema propuesto, cualquier persona podrá registrar y buscar los datos de un animal en cuestión de segundos, ahorrando tiempo valioso en los momentos críticos de la búsqueda.'),
          p('Desde el punto de vista técnico, el proyecto es viable porque utiliza herramientas web modernas (Node.js, Express, SQLite, JavaScript) que forman parte del perfil formativo del BTH en Sistemas Informáticos. Además, no requiere servidores costosos, ya que opera sobre software libre y ligero.'),

          // -------------------------------------------------------------
          // CAPÍTULO 3: MARCO REFERENCIAL (PÁGINA 5)
          // -------------------------------------------------------------
          h1('3. MARCO REFERENCIAL', { before: 240 }),
          p('Para la fundamentación teórica y técnica del presente proyecto de innovación se investigaron y aplicaron los siguientes conceptos clave:'),
          bullet('Arquitectura Cliente-Servidor:', 'Modelo de diseño donde las responsabilidades se dividen entre el cliente (navegador web que renderiza la interfaz y procesa eventos de usuario) y el servidor (Node.js/Express que ejecuta la lógica de negocio, valida la seguridad y persiste la información).'),
          bullet('Base de Datos Relacional (SQLite3):', 'Motor de base de datos SQL embebido, ligero y sin servidor independiente, que almacena toda la estructura en un único archivo de disco (mascotas.db) con soporte de llaves foráneas e integridad referencial en cascada.'),
          bullet('API REST (Representational State Transfer):', 'Conjunto de estándares de comunicación web que permite el intercambio de datos estructurados en formato JSON utilizando métodos HTTP (GET, POST, PUT, DELETE).'),
          bullet('Seguridad Criptográfica (Bcrypt y JWT):', 'La librería bcryptjs realiza el hashing seguro de contraseñas con salting para evitar filtraciones de texto plano. Los JSON Web Tokens (JWT) permiten verificar la identidad de los usuarios de forma cifrada durante sus sesiones activas.'),
          bullet('Gestión de Archivos Multimedia (Multer y Node.js FS):', 'Middleware para procesar peticiones multipart/form-data. Permite recibir imágenes en el servidor, asignar identificadores únicos basados en marcas de tiempo y eliminar del disco físico archivos obsoletos mediante fs.unlinkSync.'),
          bullet('Diseño Web Responsivo (Responsive Web Design):', 'Filosofía de maquetación CSS con Flexbox y Media Queries para garantizar que la plataforma se adapte fluidamente a pantallas de celulares, tablets y ordenadores.'),

          // -------------------------------------------------------------
          // CAPÍTULO 4: DESARROLLO DE LA INNOVACIÓN (PÁGINA 6)
          // -------------------------------------------------------------
          h1('4. DESARROLLO DE LA INNOVACIÓN', { before: 240 }),
          h2('4.1. Diseño del producto o servicio'),

          h3('4.1.1. Características del producto o servicio'),
          p('"EncuentraMiMascota" es una plataforma web completa desarrollada bajo los estándares de la ingeniería de software actual:'),
          bullet('Frontend:', 'Estructurado con HTML5 semántico, estilizado con CSS3 responsivo y programado con JavaScript nativo para la manipulación del DOM, peticiones asíncronas fetch y previsualización de imágenes en el cliente con la API FileReader.'),
          bullet('Backend:', 'Servidor en Node.js con framework Express estructurado en arquitectura modular de base de datos (db.js) y controladores REST (server.js).'),
          bullet('Módulo Multimedia:', 'Carga y actualización de fotografías reales en anuncios activos con eliminación automática de imágenes obsoletas del almacenamiento del servidor.'),
          bullet('Persistencia Relacional:', 'Base de datos SQLite3 con tablas de usuarios, publicaciones y comentarios con claves foráneas e integridad referencial.'),

          h3('4.1.2. Utilidad del producto o servicio'),
          bullet('Invitados:', 'Pueden explorar el catálogo de mascotas, utilizar el buscador en tiempo real por zona o nombre y leer comentarios informativos.'),
          bullet('Usuarios Registrados:', 'Pueden publicar anuncios con fotografía y recompensa, editar sus propias publicaciones activas, reemplazar fotografías en tiempo real, cambiar el estado a "Encontrado" y comentar en las publicaciones de otros vecinos.'),
          bullet('Administrador:', 'Cuenta con un panel de control protegido para gestionar la base de datos de usuarios (crear, editar, eliminar) y moderar o corregir cualquier publicación inapropiada.'),

          h3('4.1.3. Calidad del producto o servicio'),
          bullet('Seguridad:', 'Contraseñas encriptadas con 10 rondas de salting en Bcrypt y autenticación mediante tokens JWT.'),
          bullet('Gestión Limpia de Almacenamiento:', 'El servidor no acumula imágenes huérfanas; cada reemplazo de foto elimina de inmediato el archivo anterior del disco.'),
          bullet('Experiencia de Usuario (UI/UX):', 'Diseño visual intuitivo con previsualización de imágenes antes del envío, estados visuales destacados y buscador instantáneo.'),

          h2('4.2. Planificación y organización', { before: 180 }),
          h3('4.2.1. Cronograma de actividades'),
          p('Para organizar el desarrollo del proyecto, se ejecutó la siguiente planificación distribuida de Enero a Noviembre:'),

          // CRONOGRAMA DE ENERO A NOVIEMBRE
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              left: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              right: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "D0D0D0" },
              insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "D0D0D0" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [p('Actividad Desarrollada', { bold: true, color: COLOR_BLACK })] }),
                  new TableCell({ width: { size: 60, type: WidthType.PERCENTAGE }, children: [p('Periodo de Ejecución (Meses)', { bold: true, color: COLOR_BLACK })] })
                ]
              }),
              new TableRow({ children: [new TableCell({ children: [p('1. Identificación del problema y justificación')] }), new TableCell({ children: [p('Enero – Febrero')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('2. Revisión del perfil de trabajo con el tutor')] }), new TableCell({ children: [p('Febrero – Marzo')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('3. Aplicación de encuestas a vecinos y diagnóstico')] }), new TableCell({ children: [p('Marzo')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('4. Redacción del planteamiento y objetivos')] }), new TableCell({ children: [p('Abril')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('5. Diseño de base de datos SQLite (db.js)')] }), new TableCell({ children: [p('Mayo')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('6. Maquetación UI/UX responsive (HTML5/CSS3)')] }), new TableCell({ children: [p('Junio')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('7. Programación del backend (Node.js/Express)')] }), new TableCell({ children: [p('Julio')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('8. Autenticación con JWT y seguridad Bcrypt')] }), new TableCell({ children: [p('Agosto')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('9. Módulo multimedia, edición y cambio de fotos')] }), new TableCell({ children: [p('Agosto – Septiembre')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('10. Pruebas piloto de usabilidad con vecinos')] }), new TableCell({ children: [p('Septiembre')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('11. Corrección de observaciones y optimización')] }), new TableCell({ children: [p('Octubre')] })] }),
              new TableRow({ children: [new TableCell({ children: [p('12. Elaboración de monografía final y defensa')] }), new TableCell({ children: [p('Noviembre')] })] })
            ]
          }),

          h2('4.3. Recursos', { before: 180 }),
          h3('4.3.1. Humanos'),
          p('A continuación se detallan las personas que participaron en el proyecto y sus responsabilidades oficiales:'),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "D0D0D0" },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 45, type: WidthType.PERCENTAGE }, children: [p('Nombre y Apellido', { bold: true, color: COLOR_BLACK })] }),
                  new TableCell({ width: { size: 55, type: WidthType.PERCENTAGE }, children: [p('Rol y Responsabilidad en el Proyecto', { bold: true, color: COLOR_BLACK })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [p('Dietter Leon Justiniano', { bold: true })] }),
                  new TableCell({ children: [p('Estudiante postulante – Desarrollo y pruebas del sistema web')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [p('Yimmy Lijeron Mejias', { bold: true })] }),
                  new TableCell({ children: [p('Estudiante postulante – Análisis y diseño de la página web')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [p('Lic. Ivanna Leminka López Sanabria', { bold: true })] }),
                  new TableCell({ children: [p('Docente tutor del proyecto – Asesoría metodológica y técnica')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [p('Lic. Ana Gabriela Paz Arauz', { bold: true })] }),
                  new TableCell({ children: [p('Docente de especialidad – Revisión técnica y académica BTH')] })
                ]
              })
            ]
          }),

          h3('4.3.2. Materiales', { before: 140 }),
          bullet('1.', 'Una laptop con acceso a internet para el desarrollo y las pruebas del sistema.'),
          bullet('2.', 'Un teléfono celular para realizar las pruebas de responsividad del sistema desde un dispositivo móvil.'),
          bullet('3.', 'Software de programación y diseño de base de datos (Visual Studio Code, Node.js runtime, SQLite3).'),
          bullet('4.', 'Software de diseño gráfico para elaborar los bocetos de las pantallas del sistema.'),
          bullet('5.', 'Hojas y materiales de oficina para la impresión y encuadernación del documento final del proyecto.'),

          h3('4.3.3. Financieros', { before: 140 }),
          p('El proyecto no requirió financiamiento externo, debido a que se utilizaron herramientas y tecnologías de código abierto (Open Source) 100% gratuitas y recursos preexistentes del estudiante.'),

          h2('4.4. Cálculo de costos', { before: 180 }),
          h3('4.4.1. Costo de inversión (Gasto inicial)'),
          bullet('Licencias de software de desarrollo (VS Code, Node.js, SQLite):', '0 Bs. (Software libre y gratuito).'),
          bullet('Equipo de computación portátil (laptop propia preexistente):', '3,500 Bs. (Activo ya adquirido).'),
          bullet('Total Inversión Material Directa:', '0 Bs.'),

          h3('4.4.2. Costo de operación (Mensual)'),
          bullet('Consumo de energía eléctrica:', '20 Bs. / mes.'),
          bullet('Conexión a internet ilimitado banda ancha:', '150 Bs. / mes.'),
          bullet('Hosting web en la nube (plan gratuito para pruebas):', '0 Bs.'),
          bullet('Total Costo de Operación Mensual:', '170 Bs.'),

          h3('4.4.3. Costos variables'),
          bullet('Materiales de impresión y encuadernación de monografía:', '80 Bs.'),
          bullet('Publicidad digital comunitaria en redes sociales (opcional):', '50 Bs.'),

          h3('4.4.4. Costos fijos y simulación de desarrollo'),
          bullet('Estimación de tiempo de desarrollo técnico:', '120 horas de trabajo.'),
          bullet('Valoración de hora de desarrollador junior:', '20 Bs. / hora.'),
          bullet('Costo simulado de desarrollo de software:', '2,400 Bs.'),

          // -------------------------------------------------------------
          // CAPÍTULO 5: METODOLOGÍA (PÁGINA 10)
          // -------------------------------------------------------------
          h1('5. METODOLOGÍA', { before: 240 }),
          h2('5.1. Tipo de investigación'),
          p('Se utilizó la metodología de Investigación-Acción Participativa (IAP), ya que el estudiante-investigador no solo observó y diagnosticó una problemática en su comunidad, sino que intervino activamente programando e implementando una solución tecnológica directa, evaluando los resultados de su funcionamiento junto a los usuarios finales. El enfoque es mixto, integrando análisis cuantitativo de encuestas y evaluación cualitativa de usabilidad.'),

          h2('5.2. Técnicas e instrumentos de recolección de datos'),
          bullet('Técnicas:', 'Encuesta comunitaria, Entrevista y Observación directa de usabilidad.'),
          bullet('Instrumentos:', 'Cuestionario estructurado de 5 preguntas (para la encuesta diagnóstica) y Guía de pruebas de navegación (para registrar la interacción de los usuarios con la aplicación en móviles).'),

          // -------------------------------------------------------------
          // CAPÍTULO 6: ESTRATEGIA DE MEJORA Y PROYECCIÓN (PÁGINA 11)
          // -------------------------------------------------------------
          h1('6. ESTRATEGIA DE MEJORA Y PROYECCIÓN', { before: 240 }),
          bullet('1. Geolocalización Interactiva:', 'Integrar mapas mediante la librería Leaflet y OpenStreetMap para colocar marcadores visuales exactos de extravío.'),
          bullet('2. Progressive Web App (PWA):', 'Hacer la web instalable directamente en Android e iOS con notificaciones push y botón de WhatsApp.'),

          // -------------------------------------------------------------
          // CAPÍTULO 7: RESULTADOS (PÁGINA 11)
          // -------------------------------------------------------------
          h1('7. RESULTADOS', { before: 240 }),
          bullet('Velocidad de registro:', 'Un usuario completa el registro y sube la foto de su mascota en menos de 10 segundos.'),
          bullet('Rendimiento del buscador:', 'El buscador en tiempo real responde en menos de 100 milisegundos filtrando por palabras clave y zonas.'),
          bullet('Actualización multimedia limpia:', 'La edición de publicaciones y el cambio de fotografías se efectúa de manera instantánea, eliminando con éxito los archivos obsoletos del servidor.'),
          bullet('Seguridad de acceso:', 'El sistema de roles impidió el 100% de los intentos de modificación o eliminación por parte de usuarios no autorizados.'),

          h2('7.1. Beneficios e impacto'),
          p('El sistema reduce el estrés familiar al proveer un medio formal y rápido de difusión, fomenta la colaboración vecinal a través de los comentarios y demuestra que los estudiantes de secundaria pueden desarrollar arquitecturas Full-Stack profesionales listas para producción.'),

          // -------------------------------------------------------------
          // CAPÍTULO 8: PROYECTO DE VIDA (PÁGINA 12)
          // -------------------------------------------------------------
          h1('8. PROYECTO DE VIDA', { before: 240 }),
          p('Realizar este proyecto de innovación tecnológica ha fortalecido mi vocación y pasión por el desarrollo de software y las ciencias de la computación. Aprendí a ser metódico, a analizar problemas sociales reales y a traducirlos en soluciones algorítmicas útiles. Mi meta académica a corto plazo es ingresar a la carrera de Ingeniería de Sistemas en la universidad y continuar especializándome en desarrollo web Full-Stack, con la visión de crear emprendimientos tecnológicos que aporten al desarrollo digital de Bolivia.'),

          // -------------------------------------------------------------
          // CAPÍTULO 9: CONCLUSIONES Y RECOMENDACIONES (PÁGINA 12)
          // -------------------------------------------------------------
          h1('9. CONCLUSIONES Y RECOMENDACIONES', { before: 240 }),
          h2('Conclusiones:'),
          bullet('1.', 'Se cumplieron en su totalidad los objetivos planteados, entregando una plataforma web responsive, rápida, segura y funcional.'),
          bullet('2.', 'El stack tecnológico de JavaScript (Node.js, Express, SQLite, JavaScript Vanilla) demostró ser óptimo para proyectos comunitarios de alta eficiencia con costo cero de licencias.'),
          bullet('3.', 'La centralización de la información reduce significativamente los tiempos de reporte y búsqueda en comparación con los métodos físicos tradicionales.'),

          h2('Recomendaciones:'),
          bullet('1.', 'Se recomienda a la Unidad Educativa continuar promoviendo proyectos basados en tecnologías web modernas cliente-servidor en el BTH de Sistemas Informáticos.'),
          bullet('2.', 'Para futuras defensas, se aconseja instalar previamente Node.js y verificar la ejecución de los scripts de inicialización de datos (seed.js) en el equipo de demostración.'),

          // -------------------------------------------------------------
          // BIBLIOGRAFÍA (PÁGINA 13)
          // -------------------------------------------------------------
          h1('BIBLIOGRAFÍA (Normas APA 7ma Edición)', { before: 240 }),
          bullet('1.', 'ExpressJS Contributors. (2024). Express: Fast, unopinionated, minimalist web framework for Node.js. Recuperado de https://expressjs.com/'),
          bullet('2.', 'Flanagan, D. (2020). JavaScript: The Definitive Guide (7th ed.). O\'Reilly Media.'),
          bullet('3.', 'JSON Web Token Contributors. (2023). Introduction to JSON Web Tokens. Recuperado de https://jwt.io/'),
          bullet('4.', 'Ministerio de Educación. (2023). Guía para la elaboración de proyectos de innovación tecnológica en BTH. La Paz, Bolivia.'),
          bullet('5.', 'Mozilla Developer Network (MDN). (2024). FileReader API y Responsive Web Design. Recuperado de https://developer.mozilla.org/'),
          bullet('6.', 'SQLite Consortium. (2024). About SQLite: In-Process SQL Database Engine. Recuperado de https://www.sqlite.org/'),

          // -------------------------------------------------------------
          // ANEXOS (PÁGINA 14)
          // -------------------------------------------------------------
          h1('ANEXOS', { before: 240 }),
          h2('Anexo 1: Cuestionario de la Encuesta de Diagnóstico Comunitario'),
          bullet('1.', '¿Ha perdido usted o algún familiar cercano una mascota en el último año? (Sí / No)'),
          bullet('2.', '¿Qué medio utilizó principalmente para intentar encontrarla? (Afiches impresos / Redes sociales / Búsqueda a pie / Ninguno)'),
          bullet('3.', '¿Considera que los grupos de redes sociales permiten buscar mascotas extraviadas de forma organizada? (Sí / No)'),
          bullet('4.', '¿Le gustaría contar con una página web accesible desde su celular para reportar y buscar mascotas perdidas en su zona? (Sí / No)'),
          bullet('5.', '¿Estaría dispuesto a colaborar dejando comentarios si ve a una mascota perdida en la calle? (Sí / No)'),

          h2('Anexo 2: Capturas de Pantalla de la Plataforma EncuentraMiMascota', { before: 180 }),
          bullet('• Pantalla 1:', 'Página Principal (index.html) con catálogo de mascotas, badges de estado y buscador en tiempo real.'),
          bullet('• Pantalla 2:', 'Formulario de Inicio de Sesión y Registro con generación de tokens JWT.'),
          bullet('• Pantalla 3:', 'Formulario de Publicación de Mascota con subida de imagen y previsualización inmediata.'),
          bullet('• Pantalla 4:', 'Vista de Detalle (detalle.html) con información completa y muro de comentarios vecinales.'),
          bullet('• Pantalla 5:', 'Modal de Edición de Anuncios Activos con cambio de fotografía y limpieza de disco.'),
          bullet('• Pantalla 6:', 'Panel de Administración protegido para control y moderación de publicaciones y usuarios.'),

          h2('Anexo 3: Estructura de Base de Datos Relacional (mascotas.db)', { before: 180 }),
          bullet('Tabla "users":', 'id (INTEGER PRIMARY KEY), username (TEXT UNIQUE), password (TEXT HASHED), role (TEXT), created_at (DATETIME).'),
          bullet('Tabla "posts":', 'id (INTEGER PRIMARY KEY), user_id (INTEGER FOREIGN KEY), name (TEXT), location (TEXT), phone (TEXT), description (TEXT), reward (REAL), photo_url (TEXT), status (TEXT), created_at (DATETIME).'),
          bullet('Tabla "comments":', 'id (INTEGER PRIMARY KEY), post_id (INTEGER FOREIGN KEY), user_id (INTEGER FOREIGN KEY), text (TEXT), created_at (DATETIME).'),

          h2('Anexo 4: Código Fuente Clave y Preguntas de Defensa', { before: 180 }),
          bullet('A. Endpoint de Edición y Limpieza de Fotos (server.js):', 'Maneja el reemplazo de fotografías mediante upload.single("photo") y ejecuta fs.unlinkSync(oldFilePath) para eliminar imágenes obsoletas del almacenamiento del servidor.'),
          bullet('B. Previsualización de Fotos en Cliente (post.js):', 'Implementa la API nativa FileReader.readAsDataURL(file) para mostrar al usuario una vista previa instantánea en memoria Base64 antes de enviar el formulario.')
        ]
      }
    ]
  });

  const outputPath = path.join(__dirname, 'Monografia_EncuentraMiMascota.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Documento Word generado exitosamente en:\n${outputPath}`);
}

generarMonografiaWord().catch(err => console.error('Error al generar Word:', err));
