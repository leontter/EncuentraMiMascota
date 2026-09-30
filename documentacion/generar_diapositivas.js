const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

function generarPresentacion() {
  const pptx = new pptxgen();

  // Configurar dimensiones Widescreen (16:9)
  pptx.layout = 'LAYOUT_16x9';

  // Paleta de Colores
  const TEAL = '1098AD';
  const TEAL_DARK = '0B7285';
  const DARK = '212529';
  const GRAY_BG = 'F8F9FA';
  const GRAY_BORDER = 'DEE2E6';
  const MUTED = '495057';
  const ORANGE = 'FF922B';
  const WHITE = 'FFFFFF';
  const GREEN = '2B8A3E';
  const RED = 'FA5252';

  // Helper para títulos de diapositiva
  function agregarEncabezado(slide, titulo, seccion) {
    // Barra superior
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0, y: 0, w: '100%', h: 1.1,
      fill: { color: WHITE },
      line: { color: GRAY_BORDER, width: 1 }
    });

    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0, y: 0, w: 0.25, h: 1.1,
      fill: { color: TEAL }
    });

    if (seccion) {
      slide.addText(seccion.toUpperCase(), {
        x: 0.6, y: 0.15, w: 12.0, h: 0.3,
        fontSize: 11, fontFace: 'Arial', bold: true, color: ORANGE
      });
    }

    slide.addText(titulo, {
      x: 0.6, y: seccion ? 0.45 : 0.25, w: 12.0, h: 0.55,
      fontSize: 24, fontFace: 'Arial', bold: true, color: DARK
    });
  }

  // Helper para tarjetas contenedor
  function agregarTarjeta(slide, x, y, w, h, titulo, textoArray = [], opciones = {}) {
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: opciones.bgColor || WHITE },
      line: { color: opciones.borderColor || GRAY_BORDER, width: 1.5 },
      roundRadius: 0.15
    });

    let currentY = y + 0.2;

    if (titulo) {
      slide.addText(titulo, {
        x: x + 0.25, y: currentY, w: w - 0.5, h: 0.4,
        fontSize: opciones.titleSize || 16, fontFace: 'Arial', bold: true,
        color: opciones.titleColor || TEAL_DARK
      });
      currentY += 0.45;
    }

    if (textoArray.length > 0) {
      const items = textoArray.map(item => {
        if (typeof item === 'string') {
          return { text: item, options: { fontSize: opciones.textSize || 13, color: opciones.textColor || MUTED, breakLine: true } };
        }
        return item;
      });

      slide.addText(items, {
        x: x + 0.25, y: currentY, w: w - 0.5, h: h - (currentY - y) - 0.2,
        fontFace: 'Arial', align: 'left', valign: 'top', paraSpaceAfter: opciones.paraSpace || 8
      });
    }
  }

  // =========================================================================
  // DIAPOSITIVA 1: PORTADA OFICIAL (FONDO OSCURO ELEGANTE)
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: DARK };

  // Acento visual
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 1.0, y: 0.8, w: 2.5, h: 0.08,
    fill: { color: ORANGE }
  });

  slide1.addText('BACHILLERATO TÉCNICO HUMANÍSTICO (BTH) - SISTEMAS INFORMÁTICOS\nNÚCLEO EDUCATIVO "LAS GAMAS"', {
    x: 1.0, y: 1.1, w: 11.3, h: 0.8,
    fontSize: 14, fontFace: 'Arial', bold: true, color: ORANGE, align: 'left'
  });

  slide1.addText('EncuentraMiMascota', {
    x: 1.0, y: 1.9, w: 11.3, h: 1.1,
    fontSize: 46, fontFace: 'Arial', bold: true, color: WHITE, align: 'left'
  });

  slide1.addText('Plataforma Web Responsive para el Reporte y Búsqueda de Mascotas Perdidas', {
    x: 1.0, y: 3.0, w: 11.3, h: 0.6,
    fontSize: 20, fontFace: 'Arial', bold: true, color: TEAL, align: 'left'
  });

  // Caja de datos de los postulantes
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 1.0, y: 4.0, w: 11.3, h: 2.6,
    fill: { color: '2B3035' },
    line: { color: '343A40', width: 1 },
    roundRadius: 0.1
  });

  slide1.addText([
    { text: 'POSTULANTES:\n', options: { bold: true, color: ORANGE, fontSize: 13 } },
    { text: '• Leon Justiniano\n• Yimmy Lijeron Mejia\n\n', options: { bold: true, color: WHITE, fontSize: 14 } },
    { text: 'DOCENTE TUTOR: ', options: { bold: true, color: ORANGE, fontSize: 13 } },
    { text: 'Lic. Ronald Silver Quino Torrez\n', options: { color: WHITE, fontSize: 13 } },
    { text: 'DOCENTE DE ESPECIALIDAD: ', options: { bold: true, color: ORANGE, fontSize: 13 } },
    { text: 'Lic. Ana Gabriela Paz Arauz\n', options: { color: WHITE, fontSize: 13 } },
    { text: 'PRESIDENTE DE COMITÉ BTH: ', options: { bold: true, color: ORANGE, fontSize: 13 } },
    { text: 'Lic. Edwin Eliseo Huayllani Silvestre', options: { color: WHITE, fontSize: 13 } }
  ], {
    x: 1.3, y: 4.15, w: 10.7, h: 2.3,
    fontFace: 'Arial', align: 'left', valign: 'top'
  });

  // =========================================================================
  // DIAPOSITIVA 2: 1. PLANTEAMIENTO DEL PROBLEMA (1.1 y 1.2)
  // =========================================================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: GRAY_BG };
  agregarEncabezado(slide2, '1. Planteamiento del Problema', 'Capítulo 1');

  // Tarjeta 1.1: Diagnóstico y descripción de la realidad
  agregarTarjeta(slide2, 0.8, 1.4, 5.7, 5.5, '1.1. Diagnóstico y Descripción de la Realidad', [
    { text: 'Realidad Comunitaria:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: 'El extravío de animales domésticos en nuestro entorno urbano genera alta angustia y desmovilización familiar.\n\n', options: { color: MUTED, fontSize: 12.5 } },
    { text: 'Métodos Tradicionales Ineficaces:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: '• Afiches impresos en postes que se destruyen con la lluvia y tienen bajo alcance.\n• Publicaciones en grupos de Facebook/WhatsApp que se pierden en horas sin posibilidad de filtrado.\n\n', options: { color: MUTED, fontSize: 12.5 } },
    { text: '📊 Datos de Encuesta Local (40 vecinos):\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '• 65% sufrió la pérdida de una mascota en el último año.\n• 80% considera ineficiente buscar en redes sociales genéricas.', options: { bold: true, color: DARK, fontSize: 12.5 } }
  ], { paraSpace: 4 });

  // Tarjeta 1.2: Identificación del problema
  agregarTarjeta(slide2, 6.8, 1.4, 5.7, 5.5, '1.2. Identificación del Problema', [
    { text: 'Problema Central Detectado:\n', options: { bold: true, color: RED, fontSize: 14 } },
    { text: 'La dispersión, desorganización y caducidad inmediata de la información sobre mascotas perdidas en la comunidad.\n\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: 'Causas Principales:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: '• Ausencia de un portal web centralizado y especializado.\n• Falta de filtros de búsqueda por zona o estado de la mascota.\n• Pérdida de tiempo crítico en las primeras 48 horas de extravío.\n\n', options: { color: MUTED, fontSize: 12.5 } },
    { text: 'Efectos Directos:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: '• Baja tasa de reencuentro de mascotas con sus dueños.\n• Desesperación familiar y proliferación de animales en situación de calle.', options: { color: MUTED, fontSize: 12.5 } }
  ], { paraSpace: 4 });

  // =========================================================================
  // DIAPOSITIVA 3: 1.3 FORMULACIÓN Y 1.4 OBJETIVOS (1.4.1 y 1.4.2)
  // =========================================================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: GRAY_BG };
  agregarEncabezado(slide3, '1.3. Formulación y 1.4. Objetivos', 'Capítulo 1');

  // 1.3 Formulación del problema (Caja superior destacada)
  slide3.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 11.7, h: 1.4,
    fill: { color: WHITE },
    line: { color: ORANGE, width: 2 },
    roundRadius: 0.1
  });

  slide3.addText('1.3. FORMULACIÓN DEL PROBLEMA (PREGUNTA GUÍA):', {
    x: 1.0, y: 1.45, w: 11.3, h: 0.3,
    fontSize: 12, fontFace: 'Arial', bold: true, color: ORANGE
  });

  slide3.addText('¿De qué manera el desarrollo de una aplicación web responsive basada en una arquitectura cliente-servidor y base de datos relacional puede optimizar el tiempo de búsqueda, reporte y actualización de anuncios de mascotas perdidas en nuestra comunidad?', {
    x: 1.0, y: 1.75, w: 11.3, h: 0.9,
    fontSize: 14, fontFace: 'Arial', italic: true, bold: true, color: DARK
  });

  // 1.4.1 Objetivo General
  agregarTarjeta(slide3, 0.8, 2.95, 5.7, 4.0, '1.4.1. Objetivo General', [
    { text: 'Desarrollar una aplicación web responsive utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con SQLite en el backend, que permita reportar, buscar, comentar y actualizar publicaciones y fotografías de mascotas perdidas bajo un sistema controlado de roles de usuario, facilitando el reencuentro de animales domésticos en la comunidad.', options: { color: DARK, fontSize: 13, bold: true } }
  ]);

  // 1.4.2 Objetivos Específicos
  agregarTarjeta(slide3, 6.8, 2.95, 5.7, 4.0, '1.4.2. Objetivos Específicos', [
    { text: '1. Diagnosticar ', options: { bold: true, color: TEAL_DARK } },
    { text: 'las necesidades de la comunidad mediante encuestas de campo.\n', options: { color: MUTED } },
    { text: '2. Diseñar ', options: { bold: true, color: TEAL_DARK } },
    { text: 'una interfaz intuitiva y adaptada a móviles (UI/UX).\n', options: { color: MUTED } },
    { text: '3. Programar ', options: { bold: true, color: TEAL_DARK } },
    { text: 'la API REST segura en Node.js/Express y base de datos SQLite.\n', options: { color: MUTED } },
    { text: '4. Implementar ', options: { bold: true, color: TEAL_DARK } },
    { text: 'autenticación con tokens JWT y claves encriptadas en Bcrypt.\n', options: { color: MUTED } },
    { text: '5. Desarrollar ', options: { bold: true, color: TEAL_DARK } },
    { text: 'la edición activa de anuncios, fotos (FileReader) y limpieza de disco.\n', options: { color: MUTED } },
    { text: '6. Validar ', options: { bold: true, color: TEAL_DARK } },
    { text: 'el funcionamiento mediante pruebas piloto de usabilidad.', options: { color: MUTED } }
  ], { textSize: 11.5, paraSpace: 2 });

  // =========================================================================
  // DIAPOSITIVA 4: 2. PLANIFICACIÓN / 2.1 CRONOGRAMA DE ACTIVIDADES
  // =========================================================================
  const slide4 = pptx.addSlide();
  slide4.background = { color: GRAY_BG };
  agregarEncabezado(slide4, '2. Planificación / 2.1. Cronograma de Actividades', 'Capítulo 2');

  const cronogramaRows = [
    [
      { text: 'Fase / Actividad Desarrollada', options: { bold: true, fill: { color: TEAL }, color: WHITE, fontSize: 12 } },
      { text: 'Tiempo Estimado', options: { bold: true, fill: { color: TEAL }, color: WHITE, fontSize: 12 } },
      { text: 'Resultado Obtenido', options: { bold: true, fill: { color: TEAL }, color: WHITE, fontSize: 12 } }
    ],
    [{ text: '1. Reunión inicial con el tutor y definición del tema' }, { text: 'Semana 1' }, { text: 'Tema formalizado' }],
    [{ text: '2. Diagnóstico de la realidad y encuestas a vecinos' }, { text: 'Semana 2 – 3' }, { text: 'Datos estadísticos' }],
    [{ text: '3. Planteamiento del problema y redacción de objetivos' }, { text: 'Semana 4' }, { text: 'Alcance definido' }],
    [{ text: '4. Modelado y diseño de base de datos SQLite' }, { text: 'Semana 5 – 6' }, { text: 'Esquema relacional' }],
    [{ text: '5. Maquetación de interfaz gráfica responsive (HTML/CSS)' }, { text: 'Semana 7' }, { text: 'Vistas móviles listas' }],
    [{ text: '6. Programación del backend (Node.js, Express, Multer)' }, { text: 'Semana 8 – 9' }, { text: 'API REST operativa' }],
    [{ text: '7. Autenticación segura con JWT y encriptación Bcrypt' }, { text: 'Semana 10' }, { text: 'Seguridad y roles' }],
    [{ text: '8. Edición de anuncios, cambio de foto y limpieza de disco' }, { text: 'Semana 11 – 12' }, { text: 'Módulo multimedia' }],
    [{ text: '9. Pruebas piloto de usabilidad y corrección de errores' }, { text: 'Semana 13 – 14' }, { text: 'Sistema validado' }],
    [{ text: '10. Elaboración del documento final y presentación' }, { text: 'Semana 15' }, { text: 'Monografía completa' }]
  ];

  slide4.addTable(cronogramaRows, {
    x: 0.8, y: 1.35, w: 11.7, h: 5.5,
    colW: [5.5, 2.5, 3.7],
    fontSize: 10.5, fontFace: 'Arial',
    border: { pt: 1, color: GRAY_BORDER },
    fill: { color: WHITE },
    align: 'left', valign: 'middle'
  });

  // =========================================================================
  // DIAPOSITIVA 5: 2.2 RECURSOS (2.2.1, 2.2.2, 2.2.3)
  // =========================================================================
  const slide5 = pptx.addSlide();
  slide5.background = { color: GRAY_BG };
  agregarEncabezado(slide5, '2.2. Recursos del Proyecto', 'Capítulo 2');

  // 2.2.1 Humanos
  agregarTarjeta(slide5, 0.8, 1.4, 3.7, 5.5, '2.2.1. Recursos Humanos', [
    { text: 'Equipo Postulante:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '• Leon Justiniano\n  (Desarrollo Full-Stack y pruebas)\n• Yimmy Lijeron Mejia\n  (Diseño UI/UX y documentación)\n\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: 'Docentes Guía:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '• Lic. Ronald Silver Quino Torrez\n  (Docente Tutor metodológico)\n• Lic. Ana Gabriela Paz Arauz\n  (Docente de Especialidad BTH)\n\n', options: { color: MUTED, fontSize: 12 } },
    { text: 'Participación Comunitaria:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '• 40 vecinos encuestados.\n• 5 usuarios para pruebas piloto.', options: { color: MUTED, fontSize: 12 } }
  ]);

  // 2.2.2 Materiales
  agregarTarjeta(slide5, 4.8, 1.4, 3.7, 5.5, '2.2.2. Recursos Materiales', [
    { text: 'Hardware Utilizado:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '• 1 Computadora Portátil (Laptop Intel Core i5, 8GB RAM).\n• 1 Teléfono Móvil Android para pruebas de navegación responsive.\n\n', options: { color: MUTED, fontSize: 12 } },
    { text: 'Software y Herramientas:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '• Visual Studio Code (IDE).\n• Node.js runtime & Express.\n• SQLite3 (Base de datos local).\n• Git y GitHub (Control de versiones).\n• Navegador Google Chrome.\n• Paquete ofimático Microsoft Word.', options: { color: MUTED, fontSize: 12 } }
  ]);

  // 2.2.3 Financieros
  agregarTarjeta(slide5, 8.8, 1.4, 3.7, 5.5, '2.2.3. Recursos Financieros', [
    { text: 'Inversión en Software:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '0 Bs. (Cero Bolivianos)\n', options: { bold: true, color: GREEN, fontSize: 16 } },
    { text: 'Todas las herramientas de desarrollo y librerías utilizadas son de código abierto (Open Source) y de uso libre.\n\n', options: { color: MUTED, fontSize: 12 } },
    { text: 'Financiamiento Externo:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: 'No se requirió financiamiento externo ni patrocinio comercial.\n\n', options: { color: MUTED, fontSize: 12 } },
    { text: 'Los costos operativos fueron absorbidos por recursos propios domiciliarios.', options: { italic: true, color: MUTED, fontSize: 12 } }
  ]);

  // =========================================================================
  // DIAPOSITIVA 6: 2.3 CÁLCULO DE COSTOS (2.3.1, 2.3.2, 2.3.3, 2.3.4)
  // =========================================================================
  const slide6 = pptx.addSlide();
  slide6.background = { color: GRAY_BG };
  agregarEncabezado(slide6, '2.3. Cálculo de Costos del Proyecto', 'Capítulo 2');

  // 2.3.1 Costo de Inversión
  agregarTarjeta(slide6, 0.8, 1.4, 5.7, 2.65, '2.3.1. Costo de Inversión (Gasto Inicial)', [
    { text: '• Licencias de Software (VS Code, Node.js, SQLite): ', options: { color: MUTED, fontSize: 12 } },
    { text: '0 Bs.\n', options: { bold: true, color: GREEN, fontSize: 12 } },
    { text: '• Equipo de Computación (Laptop amortizada): ', options: { color: MUTED, fontSize: 12 } },
    { text: '0 Bs. (Recurso propio)\n\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: 'TOTAL COSTO DE INVERSIÓN: ', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '0 Bs. (Autosostenible)', options: { bold: true, color: GREEN, fontSize: 14 } }
  ]);

  // 2.3.2 Costo de Operación
  agregarTarjeta(slide6, 6.8, 1.4, 5.7, 2.65, '2.3.2. Costo de Operación (Mensual)', [
    { text: '• Consumo de energía eléctrica: ', options: { color: MUTED, fontSize: 12 } },
    { text: '20 Bs. / mes\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: '• Conexión a internet banda ancha: ', options: { color: MUTED, fontSize: 12 } },
    { text: '150 Bs. / mes\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: '• Servidor web en la nube (Plan libre): ', options: { color: MUTED, fontSize: 12 } },
    { text: '0 Bs.\n\n', options: { bold: true, color: GREEN, fontSize: 12 } },
    { text: 'TOTAL COSTO DE OPERACIÓN: ', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '170 Bs. / mes', options: { bold: true, color: ORANGE, fontSize: 14 } }
  ]);

  // 2.3.3 Costos Variables
  agregarTarjeta(slide6, 0.8, 4.25, 5.7, 2.65, '2.3.3. Costos Variables', [
    { text: '• Difusión digital local en redes sociales (Opcional): ', options: { color: MUTED, fontSize: 12 } },
    { text: '100 Bs.\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: '• Materiales de oficina e impresiones de prueba: ', options: { color: MUTED, fontSize: 12 } },
    { text: '50 Bs.\n\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: 'TOTAL COSTOS VARIABLES: ', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '150 Bs. (Flexibles)', options: { bold: true, color: DARK, fontSize: 14 } }
  ]);

  // 2.3.4 Costos Fijos
  agregarTarjeta(slide6, 6.8, 4.25, 5.7, 2.65, '2.3.4. Costos Fijos (Mano de Obra)', [
    { text: '• Estimación de horas de trabajo: ', options: { color: MUTED, fontSize: 12 } },
    { text: '120 Horas\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: '• Valor hora programador junior (simulado): ', options: { color: MUTED, fontSize: 12 } },
    { text: '20 Bs. / hora\n\n', options: { bold: true, color: DARK, fontSize: 12 } },
    { text: 'VALOR SIMULADO DE DESARROLLO: ', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: '2,400 Bs.', options: { bold: true, color: TEAL_DARK, fontSize: 16 } }
  ]);

  // =========================================================================
  // DIAPOSITIVA 7: 3. ¿CÓMO FUNCIONA? - ARQUITECTURA Y FLUJO DE ROLES
  // =========================================================================
  const slide7 = pptx.addSlide();
  slide7.background = { color: GRAY_BG };
  agregarEncabezado(slide7, '3. ¿Cómo Funciona? - Arquitectura y Flujo de Roles', 'Demostración');

  // Tarjeta Rol Invitado
  agregarTarjeta(slide7, 0.8, 1.4, 3.7, 5.5, '👤 Rol Invitado (Público)', [
    { text: 'Acceso Inmediato sin Registro:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: '• Navega por todas las publicaciones de mascotas perdidas y encontradas.\n• Utiliza el buscador interactivo para filtrar por zona o nombre en tiempo real.\n• Lee comentarios y pistas aportadas por la comunidad.\n• Visualiza teléfonos de contacto directo para avisar a los dueños.', options: { color: MUTED, fontSize: 12.5 } }
  ]);

  // Tarjeta Rol Usuario
  agregarTarjeta(slide7, 4.8, 1.4, 3.7, 5.5, '🐾 Rol Usuario Registrado', [
    { text: 'Gestión y Publicación:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: '• Registro seguro con contraseña encriptada y Token JWT.\n• Publica reportes con fotografía real, ubicación y recompensa.\n• Edita sus publicaciones y reemplaza la foto con vista previa en vivo.\n• Alterna estado entre "Perdido" y "Encontrado".\n• Comenta en los anuncios de otros vecinos.', options: { color: MUTED, fontSize: 12.5 } }
  ]);

  // Tarjeta Rol Administrador
  agregarTarjeta(slide7, 8.8, 1.4, 3.7, 5.5, '⚙️ Rol Administrador', [
    { text: 'Control y Moderación Total:\n', options: { bold: true, color: DARK, fontSize: 13 } },
    { text: '• Panel de administración protegido exclusivamente para moderadores.\n• Gestión completa (CRUD) de usuarios del sistema.\n• Poder para modificar cualquier anuncio con errores.\n• Elimina publicaciones falsas o inapropiadas para proteger la veracidad del sitio.', options: { color: MUTED, fontSize: 12.5 } }
  ]);

  // =========================================================================
  // DIAPOSITIVA 8: 3. ¿CÓMO FUNCIONA? - FUNCIONALIDADES CLAVE Y TÉCNICAS
  // =========================================================================
  const slide8 = pptx.addSlide();
  slide8.background = { color: GRAY_BG };
  agregarEncabezado(slide8, '3. ¿Cómo Funciona? - Innovaciones Técnicas Destacadas', 'Demostración');

  // Caja 1: Buscador en tiempo real
  agregarTarjeta(slide8, 0.8, 1.4, 5.7, 2.65, '🔍 Buscador Inteligente con Debounce', [
    { text: '• Filtrado Instantáneo: ', options: { bold: true, color: DARK } },
    { text: 'Busca por nombre de mascota, zona o descripción sin recargar la página.\n', options: { color: MUTED } },
    { text: '• Técnica de Debounce (300 ms): ', options: { bold: true, color: TEAL_DARK } },
    { text: 'Evita saturar el servidor con peticiones innecesarias mientras el usuario escribe.', options: { color: MUTED } }
  ], { textSize: 12 });

  // Caja 2: Edición activa y cambio de foto
  agregarTarjeta(slide8, 6.8, 1.4, 5.7, 2.65, '📸 Edición Activa y Cambio de Fotos', [
    { text: '• Previsualización en Tiempo Real: ', options: { bold: true, color: DARK } },
    { text: 'Uso de la API FileReader para verificar la imagen antes de subirla.\n', options: { color: MUTED } },
    { text: '• Limpieza de Servidor (fs.unlinkSync): ', options: { bold: true, color: TEAL_DARK } },
    { text: 'Al cambiar de foto o borrar un anuncio, se elimina físicamente la imagen anterior para no llenar el disco.', options: { color: MUTED } }
  ], { textSize: 12 });

  // Caja 3: Seguridad
  agregarTarjeta(slide8, 0.8, 4.25, 5.7, 2.65, '🔒 Seguridad Criptográfica y Roles', [
    { text: '• Hashing de Contraseñas: ', options: { bold: true, color: DARK } },
    { text: '10 rondas de salting con Bcrypt para proteger las claves.\n', options: { color: MUTED } },
    { text: '• Sesiones con JWT: ', options: { bold: true, color: TEAL_DARK } },
    { text: 'Tokens web firmados con vigencia de 24 horas y control estricto de permisos.', options: { color: MUTED } }
  ], { textSize: 12 });

  // Caja 4: Base de Datos Relacional
  agregarTarjeta(slide8, 6.8, 4.25, 5.7, 2.65, '🗄️ Base de Datos Relacional (SQLite3)', [
    { text: '• Integridad Referencial: ', options: { bold: true, color: DARK } },
    { text: 'Uso de ON DELETE CASCADE para evitar datos huérfanos.\n', options: { color: MUTED } },
    { text: '• Consultas Preparadas: ', options: { bold: true, color: TEAL_DARK } },
    { text: 'Consultas parametrizadas que previenen el 100% de ataques de inyección SQL.', options: { color: MUTED } }
  ], { textSize: 12 });

  // =========================================================================
  // DIAPOSITIVA 9: CONCLUSIONES Y PROYECCIÓN
  // =========================================================================
  const slide9 = pptx.addSlide();
  slide9.background = { color: GRAY_BG };
  agregarEncabezado(slide9, 'Conclusiones y Proyección Futura', 'Cierre');

  // Conclusiones
  agregarTarjeta(slide9, 0.8, 1.4, 5.7, 5.5, 'Conclusiones del Proyecto', [
    { text: '1. Cumplimiento Total de Objetivos:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: 'Se logró desarrollar una solución web completa, rápida (<100ms) y 100% responsiva para celulares y computadoras.\n\n', options: { color: MUTED, fontSize: 12.5 } },
    { text: '2. Impacto Social Solidario:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: 'La plataforma democratiza y centraliza la búsqueda de mascotas, reduciendo la angustia familiar y fortaleciendo la cooperación vecinal.\n\n', options: { color: MUTED, fontSize: 12.5 } },
    { text: '3. Formación Técnica BTH:\n', options: { bold: true, color: TEAL_DARK, fontSize: 13 } },
    { text: 'Demuestra las capacidades prácticas adquiridas en Sistemas Informáticos para crear software de nivel profesional a costo cero.', options: { color: MUTED, fontSize: 12.5 } }
  ]);

  // Proyección
  agregarTarjeta(slide9, 6.8, 1.4, 5.7, 5.5, 'Estrategia de Mejora y Proyección', [
    { text: 'Mejoras a Corto Plazo:\n', options: { bold: true, color: ORANGE, fontSize: 13 } },
    { text: '• Integración de mapas interactivos con geolocalización (Leaflet / Google Maps API) para colocar pines exactos de avistamiento.\n• Filtros avanzados por especie (perro, gato, ave) y color.\n\n', options: { color: MUTED, fontSize: 12.5 } },
    { text: 'Proyección a Mediano y Largo Plazo:\n', options: { bold: true, color: ORANGE, fontSize: 13 } },
    { text: '• Transformar la web en una Progressive Web App (PWA) instalable directamente en Android e iOS.\n• Implementar notificaciones push automáticas cuando se reporte una mascota perdida en el barrio del usuario.', options: { color: MUTED, fontSize: 12.5 } }
  ]);

  // =========================================================================
  // DIAPOSITIVA 10: CIERRE Y PREGUNTAS (FONDO OSCURO)
  // =========================================================================
  const slide10 = pptx.addSlide();
  slide10.background = { color: DARK };

  slide10.addText('¡Muchas Gracias por su Atención!', {
    x: 1.0, y: 1.8, w: 11.3, h: 1.0,
    fontSize: 40, fontFace: 'Arial', bold: true, color: WHITE, align: 'center'
  });

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 4.66, y: 2.9, w: 4.0, h: 0.08,
    fill: { color: ORANGE }
  });

  slide10.addText('¿Preguntas del Tribunal Evaluador?', {
    x: 1.0, y: 3.2, w: 11.3, h: 0.8,
    fontSize: 26, fontFace: 'Arial', bold: true, color: ORANGE, align: 'center'
  });

  slide10.addText([
    { text: 'Postulantes: ', options: { color: MUTED, fontSize: 15 } },
    { text: 'Leon Justiniano  |  Yimmy Lijeron Mejia\n', options: { bold: true, color: WHITE, fontSize: 16 } },
    { text: 'Especialidad: ', options: { color: MUTED, fontSize: 14 } },
    { text: 'Sistemas Informáticos — BTH Las Gamas\n', options: { color: TEAL, fontSize: 14 } },
    { text: 'Warnes – Santa Cruz – Bolivia | Gestión 2026', options: { italic: true, color: MUTED, fontSize: 13 } }
  ], {
    x: 1.0, y: 4.5, w: 11.3, h: 2.0,
    fontFace: 'Arial', align: 'center', valign: 'top'
  });

  // Guardar archivo PPTX
  const outputPath = path.join(__dirname, 'presentacion_defensa.pptx');
  pptx.writeFile({ fileName: outputPath }).then(fileName => {
    console.log(`Presentación PPTX generada exitosamente en:\n${outputPath}`);
  }).catch(err => {
    console.error('Error al generar PPTX:', err);
  });
}

generarPresentacion();
