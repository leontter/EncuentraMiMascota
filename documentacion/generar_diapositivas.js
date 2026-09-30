const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

function generarPresentacionOptimizada() {
  const pptx = new pptxgen();

  // Dimensiones Widescreen (16:9) -> 13.33" x 7.5"
  pptx.layout = 'LAYOUT_16x9';

  // =========================================================================
  // PALETA DE COLORES PROFESIONAL Y TOKENS DE DISEÑO
  // =========================================================================
  const C_DARK = '1A1D20';          // Fondo oscuro principal
  const C_DARK_CARD = '252A2E';     // Tarjetas sobre fondo oscuro
  const C_TEAL = '1098AD';          // Color primario de acento
  const C_TEAL_DARK = '0B7285';     // Títulos principales
  const C_TEAL_LIGHT = 'E6FCF5';    // Fondos suaves
  const C_ORANGE = 'FF922B';        // Acento secundario y alertas
  const C_ORANGE_BG = 'FFF4E6';     // Fondo suave naranja
  const C_GREEN = '2B8A3E';         // Verde éxitos / costos 0
  const C_GREEN_BG = 'EBFBEE';      // Fondo suave verde
  const C_RED = 'E03131';           // Rojo problemas
  const C_RED_BG = 'FFF5F5';        // Fondo suave rojo
  const C_TEXT_DARK = '212529';     // Texto principal
  const C_TEXT_MUTED = '495057';    // Texto secundario
  const C_TEXT_LIGHT = '868E96';    // Texto terciario
  const C_BG_SLIDE = 'F4F6F8';      // Fondo general de diapositivas
  const C_WHITE = 'FFFFFF';         // Blanco puro
  const C_BORDER = 'E2E8F0';        // Bordes limpios

  // =========================================================================
  // COMPONENTES REUTILIZABLES DE DISEÑO
  // =========================================================================

  // 1. Encabezado moderno con píldora de sección y título principal
  function renderHeader(slide, title, sectionTag) {
    // Fondo superior blanco continuo
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0, y: 0, w: 13.333, h: 1.15,
      fill: { color: C_WHITE },
      line: { color: C_BORDER, width: 1 }
    });

    // Píldora decorativa lateral
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8, y: 0.28, w: 0.1, h: 0.58,
      fill: { color: C_TEAL }
    });

    if (sectionTag) {
      slide.addText(sectionTag.toUpperCase(), {
        x: 1.05, y: 0.22, w: 11.0, h: 0.25,
        fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_ORANGE
      });
    }

    slide.addText(title, {
      x: 1.05, y: sectionTag ? 0.47 : 0.32, w: 11.0, h: 0.5,
      fontSize: 22, fontFace: 'Arial', bold: true, color: C_TEXT_DARK
    });
  }

  // 2. Tarjeta con borde decorativo superior y espaciado perfecto
  function renderCard(slide, { x, y, w, h, title, topBorderColor = C_TEAL, bgColor = C_WHITE, subtitle = null }) {
    // Tarjeta base
    slide.addShape(pptx.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: bgColor },
      line: { color: C_BORDER, width: 1 },
      roundRadius: 0.12
    });

    // Borde superior de color acento
    if (topBorderColor) {
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.05, y: y, w: w - 0.1, h: 0.08,
        fill: { color: topBorderColor },
        roundRadius: 0.05
      });
    }

    let nextY = y + 0.22;

    if (title) {
      slide.addText(title, {
        x: x + 0.3, y: nextY, w: w - 0.6, h: 0.38,
        fontSize: 14.5, fontFace: 'Arial', bold: true,
        color: topBorderColor === C_RED ? C_RED : (topBorderColor === C_GREEN ? C_GREEN : C_TEAL_DARK)
      });
      nextY += 0.4;
    }

    if (subtitle) {
      slide.addText(subtitle, {
        x: x + 0.3, y: nextY, w: w - 0.6, h: 0.28,
        fontSize: 11, fontFace: 'Arial', italic: true, color: C_TEXT_MUTED
      });
      nextY += 0.3;
    }

    return nextY;
  }

  // =========================================================================
  // DIAPOSITIVA 1: PORTADA OFICIAL (FONDO OSCURO MODERNO)
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: C_DARK };

  // Badge institucional superior
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.9, y: 0.8, w: 5.8, h: 0.36,
    fill: { color: '2D3238' },
    line: { color: C_ORANGE, width: 1 },
    roundRadius: 0.08
  });
  slide1.addText('BACHILLERATO TÉCNICO HUMANÍSTICO • SISTEMAS INFORMÁTICOS', {
    x: 1.0, y: 0.82, w: 5.6, h: 0.32,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_ORANGE, align: 'center'
  });

  // Título gigante y subtítulo
  slide1.addText('EncuentraMiMascota', {
    x: 0.9, y: 1.35, w: 11.5, h: 1.1,
    fontSize: 46, fontFace: 'Arial', bold: true, color: C_WHITE
  });

  slide1.addText('Plataforma Web Responsive para el Reporte y Búsqueda de Mascotas Perdidas', {
    x: 0.9, y: 2.45, w: 11.5, h: 0.5,
    fontSize: 18, fontFace: 'Arial', bold: true, color: C_TEAL
  });

  // Bloque inferior dividido en 2 columnas equilibradas
  // Columna Izquierda: Postulantes
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.9, y: 3.4, w: 5.6, h: 2.8,
    fill: { color: C_DARK_CARD },
    line: { color: '343A40', width: 1 },
    roundRadius: 0.1
  });
  slide1.addText('👥 EQUIPO DE POSTULANTES:', {
    x: 1.2, y: 3.6, w: 5.0, h: 0.3,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C_ORANGE
  });
  slide1.addText([
    { text: '• Leon Justiniano\n', options: { fontSize: 15, bold: true, color: C_WHITE } },
    { text: '  Desarrollo Full-Stack y Pruebas Técnicas\n\n', options: { fontSize: 11.5, color: C_TEXT_LIGHT } },
    { text: '• Yimmy Lijeron Mejia\n', options: { fontSize: 15, bold: true, color: C_WHITE } },
    { text: '  Diseño UI/UX, Análisis y Documentación', options: { fontSize: 11.5, color: C_TEXT_LIGHT } }
  ], {
    x: 1.2, y: 4.0, w: 5.0, h: 2.0, fontFace: 'Arial'
  });

  // Columna Derecha: Autoridades y Colegio
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 3.4, w: 5.6, h: 2.8,
    fill: { color: C_DARK_CARD },
    line: { color: '343A40', width: 1 },
    roundRadius: 0.1
  });
  slide1.addText('🏛️ ASESORÍA Y UNIDAD EDUCATIVA:', {
    x: 7.1, y: 3.6, w: 5.0, h: 0.3,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C_ORANGE
  });
  slide1.addText([
    { text: 'Docente Tutor: ', options: { bold: true, color: C_TEAL, fontSize: 12.5 } },
    { text: 'Lic. Ronald Silver Quino Torrez\n', options: { color: C_WHITE, fontSize: 12.5 } },
    { text: 'Docente de Especialidad: ', options: { bold: true, color: C_TEAL, fontSize: 12.5 } },
    { text: 'Lic. Ana Gabriela Paz Arauz\n', options: { color: C_WHITE, fontSize: 12.5 } },
    { text: 'Presidente Comité BTH: ', options: { bold: true, color: C_TEAL, fontSize: 12.5 } },
    { text: 'Lic. Edwin Eliseo Huayllani Silvestre\n\n', options: { color: C_WHITE, fontSize: 12.5 } },
    { text: 'Núcleo Educativo Las Gamas • Warnes, Santa Cruz (2026)', options: { bold: true, color: C_TEXT_LIGHT, fontSize: 11 } }
  ], {
    x: 7.1, y: 4.0, w: 5.0, h: 2.0, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 2: 1. PLANTEAMIENTO DEL PROBLEMA (1.1 y 1.2)
  // =========================================================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: C_BG_SLIDE };
  renderHeader(slide2, '1. Planteamiento del Problema', 'Capítulo 1');

  // Columna Izquierda: 1.1 Diagnóstico
  renderCard(slide2, {
    x: 0.8, y: 1.45, w: 5.7, h: 5.45,
    title: '1.1. Diagnóstico y Descripción de la Realidad',
    topBorderColor: C_TEAL
  });

  slide2.addText([
    { text: 'Contexto Comunitario:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12.5 } },
    { text: 'En Warnes y nuestra comunidad escolar, el extravío de mascotas causa gran angustia y pérdidas económicas familiares.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: 'Canales Actuales Deficientes:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12.5 } },
    { text: '• Afiches físicos que se destruyen con la lluvia y tienen bajo alcance.\n• Grupos de redes sociales donde los avisos se pierden en horas.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '📊 Sondeo Diagnóstico (40 Familias del Barrio):', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } }
  ], {
    x: 1.1, y: 2.1, w: 5.1, h: 2.8, fontFace: 'Arial'
  });

  // 2 Callouts estadísticos visuales limpios
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 1.1, y: 5.1, w: 2.4, h: 1.45,
    fill: { color: C_TEAL_LIGHT }, line: { color: C_TEAL, width: 1 }, roundRadius: 0.08
  });
  slide2.addText('65%', {
    x: 1.1, y: 5.18, w: 2.4, h: 0.6,
    fontSize: 26, fontFace: 'Arial', bold: true, color: C_TEAL_DARK, align: 'center'
  });
  slide2.addText('Perdió una mascota en el último año', {
    x: 1.2, y: 5.75, w: 2.2, h: 0.7,
    fontSize: 10, fontFace: 'Arial', color: C_TEXT_MUTED, align: 'center'
  });

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 3.8, y: 5.1, w: 2.4, h: 1.45,
    fill: { color: C_ORANGE_BG }, line: { color: C_ORANGE, width: 1 }, roundRadius: 0.08
  });
  slide2.addText('80%', {
    x: 3.8, y: 5.18, w: 2.4, h: 0.6,
    fontSize: 26, fontFace: 'Arial', bold: true, color: C_ORANGE, align: 'center'
  });
  slide2.addText('Afirma que redes sociales no son efectivas', {
    x: 3.9, y: 5.75, w: 2.2, h: 0.7,
    fontSize: 10, fontFace: 'Arial', color: C_TEXT_MUTED, align: 'center'
  });

  // Columna Derecha: 1.2 Identificación del Problema
  renderCard(slide2, {
    x: 6.8, y: 1.45, w: 5.7, h: 5.45,
    title: '1.2. Identificación del Problema',
    topBorderColor: C_RED
  });

  // Banner rojo destacado para el problema central
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 7.1, y: 2.1, w: 5.1, h: 1.2,
    fill: { color: C_RED_BG }, line: { color: C_RED, width: 1 }, roundRadius: 0.08
  });
  slide2.addText('🚨 PROBLEMA CENTRAL:', {
    x: 7.25, y: 2.18, w: 4.8, h: 0.25,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C_RED
  });
  slide2.addText('Dispersión, desorganización y caducidad inmediata de los reportes de mascotas extraviadas en la comunidad.', {
    x: 7.25, y: 2.45, w: 4.8, h: 0.75,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C_TEXT_DARK
  });

  slide2.addText([
    { text: 'Causas Directas:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12.5 } },
    { text: '• Carencia de un repositorio digital centralizado y especializado.\n• Imposibilidad de buscar por palabra clave, zona o fecha.\n• Falta de actualización cuando una mascota ya fue hallada.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: 'Efectos Negativos:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12.5 } },
    { text: '• Demora crítica durante las primeras 48 horas de búsqueda.\n• Baja probabilidad de reencuentro y aumento de animales desprotegidos.', options: { color: C_TEXT_MUTED, fontSize: 11.5 } }
  ], {
    x: 7.1, y: 3.5, w: 5.1, h: 3.1, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 3: 1.3 FORMULACIÓN Y 1.4 OBJETIVOS (1.4.1 y 1.4.2)
  // =========================================================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: C_BG_SLIDE };
  renderHeader(slide3, '1.3. Formulación y 1.4. Objetivos', 'Capítulo 1');

  // 1.3 Formulación (Card superior)
  slide3.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.4, w: 11.7, h: 1.4,
    fill: { color: C_WHITE },
    line: { color: C_ORANGE, width: 1.5 },
    roundRadius: 0.1
  });
  slide3.addText('1.3. FORMULACIÓN DEL PROBLEMA (PREGUNTA GUÍA):', {
    x: 1.1, y: 1.52, w: 11.1, h: 0.28,
    fontSize: 11.5, fontFace: 'Arial', bold: true, color: C_ORANGE
  });
  slide3.addText('“¿De qué manera el desarrollo de una aplicación web responsive basada en una arquitectura cliente-servidor y base de datos relacional puede optimizar el tiempo de búsqueda, reporte y actualización de anuncios de mascotas perdidas en nuestra comunidad?”', {
    x: 1.1, y: 1.82, w: 11.1, h: 0.85,
    fontSize: 13, fontFace: 'Arial', italic: true, bold: true, color: C_TEXT_DARK
  });

  // 1.4.1 Objetivo General (Columna Izquierda)
  renderCard(slide3, {
    x: 0.8, y: 3.0, w: 5.7, h: 3.9,
    title: '1.4.1. Objetivo General',
    topBorderColor: C_TEAL
  });
  slide3.addText('Desarrollar una aplicación web responsive utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con SQLite en el backend, que permita reportar, buscar, comentar y actualizar publicaciones y fotografías de mascotas perdidas bajo un sistema controlado de roles de usuario, facilitando el reencuentro de animales domésticos en la comunidad.', {
    x: 1.1, y: 3.75, w: 5.1, h: 2.9,
    fontSize: 12.5, fontFace: 'Arial', bold: true, color: C_TEXT_DARK
  });

  // 1.4.2 Objetivos Específicos (Columna Derecha)
  renderCard(slide3, {
    x: 6.8, y: 3.0, w: 5.7, h: 3.9,
    title: '1.4.2. Objetivos Específicos',
    topBorderColor: C_TEAL_DARK
  });

  slide3.addText([
    { text: '1. Diagnosticar ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'las necesidades comunitarias mediante encuestas directas.\n', options: { color: C_TEXT_MUTED } },
    { text: '2. Diseñar ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'una interfaz web intuitiva, ágil y adaptada a móviles (UI/UX).\n', options: { color: C_TEXT_MUTED } },
    { text: '3. Programar ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'la API REST en Node.js/Express con subida de archivos Multer.\n', options: { color: C_TEXT_MUTED } },
    { text: '4. Construir ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'la base de datos relacional SQLite con integridad referencial.\n', options: { color: C_TEXT_MUTED } },
    { text: '5. Implementar ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'autenticación segura con JWT y contraseñas Bcrypt.\n', options: { color: C_TEXT_MUTED } },
    { text: '6. Desarrollar ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'edición de anuncios, cambio de foto y limpieza en servidor.\n', options: { color: C_TEXT_MUTED } },
    { text: '7. Validar ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'el sistema mediante pruebas de usabilidad y rendimiento móvil.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 7.1, y: 3.65, w: 5.1, h: 3.1,
    fontSize: 11, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 4: 2. PLANIFICACIÓN / 2.1 CRONOGRAMA DE ACTIVIDADES
  // =========================================================================
  const slide4 = pptx.addSlide();
  slide4.background = { color: C_BG_SLIDE };
  renderHeader(slide4, '2. Planificación / 2.1. Cronograma de Actividades', 'Capítulo 2');

  const cronoData = [
    [
      { text: 'Fase / Actividad del Proyecto', options: { bold: true, fill: { color: C_TEAL_DARK }, color: C_WHITE, fontSize: 11 } },
      { text: 'Tiempo', options: { bold: true, fill: { color: C_TEAL_DARK }, color: C_WHITE, fontSize: 11, align: 'center' } },
      { text: 'Entregable / Logro Alcanzado', options: { bold: true, fill: { color: C_TEAL_DARK }, color: C_WHITE, fontSize: 11 } }
    ],
    [{ text: '1. Reunión inicial con tutor y definición del tema' }, { text: 'Semana 1', options: { align: 'center', bold: true } }, { text: 'Idea y alcance del proyecto formalizados' }],
    [{ text: '2. Diagnóstico de la realidad y encuestas a vecinos' }, { text: 'Semana 2 – 3', options: { align: 'center', bold: true } }, { text: 'Muestra estadística (40 familias encuestadas)' }],
    [{ text: '3. Redacción del planteamiento del problema y objetivos' }, { text: 'Semana 4', options: { align: 'center', bold: true } }, { text: 'Capítulo 1 y 2 de monografía aprobados' }],
    [{ text: '4. Modelado y diseño de base de datos SQLite relacional' }, { text: 'Semana 5 – 6', options: { align: 'center', bold: true } }, { text: 'Diagrama Entidad-Relación y script db.js' }],
    [{ text: '5. Maquetación UI/UX responsive (HTML5 semántico y CSS3)' }, { text: 'Semana 7', options: { align: 'center', bold: true } }, { text: 'Vistas móviles y de escritorio maquetadas' }],
    [{ text: '6. Programación del backend API REST (Node.js + Express)' }, { text: 'Semana 8 – 9', options: { align: 'center', bold: true } }, { text: 'Endpoints CRUD de publicaciones y usuarios' }],
    [{ text: '7. Implementación de autenticación JWT y Bcrypt' }, { text: 'Semana 10', options: { align: 'center', bold: true } }, { text: 'Control de acceso por roles y contraseñas cifradas' }],
    [{ text: '8. Módulo de edición de anuncios, fotos y limpieza de disco' }, { text: 'Semana 11 – 12', options: { align: 'center', bold: true } }, { text: 'FileReader en cliente y fs.unlinkSync en backend' }],
    [{ text: '9. Pruebas piloto de usabilidad y corrección de errores' }, { text: 'Semana 13 – 14', options: { align: 'center', bold: true } }, { text: 'Validación con usuarios y optimización móvil' }],
    [{ text: '10. Documento final de monografía y presentación PPTX' }, { text: 'Semana 15', options: { align: 'center', bold: true } }, { text: 'Monografía completa y material para defensa' }]
  ];

  slide4.addTable(cronoData, {
    x: 0.8, y: 1.4, w: 11.7, h: 5.5,
    colW: [5.2, 2.0, 4.5],
    fontSize: 10, fontFace: 'Arial',
    border: { pt: 0.8, color: C_BORDER },
    fill: { color: C_WHITE },
    valign: 'middle'
  });

  // =========================================================================
  // DIAPOSITIVA 5: 2.2 RECURSOS (2.2.1, 2.2.2, 2.2.3)
  // =========================================================================
  const slide5 = pptx.addSlide();
  slide5.background = { color: C_BG_SLIDE };
  renderHeader(slide5, '2.2. Recursos del Proyecto', 'Capítulo 2');

  const cardW = 3.68;
  const gap = 0.33;

  // 2.2.1 Humanos (Col 1)
  renderCard(slide5, {
    x: 0.8, y: 1.45, w: cardW, h: 5.45,
    title: '2.2.1. Recursos Humanos',
    topBorderColor: C_TEAL
  });
  slide5.addText([
    { text: 'Estudiantes Postulantes:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: '• Leon Justiniano\n  (Programación Full-Stack y base de datos)\n• Yimmy Lijeron Mejia\n  (Diseño UI/UX, pruebas y documentación)\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: 'Docentes Guía BTH:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: '• Lic. Ronald Silver Quino Torrez\n  (Docente Tutor metodológico)\n• Lic. Ana Gabriela Paz Arauz\n  (Docente de Especialidad Técnica)\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: 'Comunidad Participante:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: '• 40 vecinos para encuestas.\n• 5 usuarios para pruebas de usabilidad.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 1.05, y: 2.1, w: cardW - 0.5, h: 4.6, fontFace: 'Arial'
  });

  // 2.2.2 Materiales (Col 2)
  renderCard(slide5, {
    x: 0.8 + cardW + gap, y: 1.45, w: cardW, h: 5.45,
    title: '2.2.2. Recursos Materiales',
    topBorderColor: C_ORANGE
  });
  slide5.addText([
    { text: 'Equipos de Hardware:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: '• 1 Computadora portátil Laptop Intel Core i5 con 8GB de memoria RAM.\n• 1 Teléfono inteligente para pruebas en navegadores móviles.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: 'Software y Herramientas:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: '• Visual Studio Code (Entorno de desarrollo).\n• Node.js runtime & Express framework.\n• SQLite3 (Motor relacional local).\n• Git y GitHub (Control de versiones).\n• Navegador Google Chrome.\n• Paquete ofimático Microsoft Word.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 0.8 + cardW + gap + 0.25, y: 2.1, w: cardW - 0.5, h: 4.6, fontFace: 'Arial'
  });

  // 2.2.3 Financieros (Col 3)
  renderCard(slide5, {
    x: 0.8 + (cardW + gap) * 2, y: 1.45, w: cardW, h: 5.45,
    title: '2.2.3. Recursos Financieros',
    topBorderColor: C_GREEN
  });

  // Stat callout de costo cero
  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8 + (cardW + gap) * 2 + 0.25, y: 2.1, w: cardW - 0.5, h: 1.2,
    fill: { color: C_GREEN_BG }, line: { color: C_GREEN, width: 1 }, roundRadius: 0.08
  });
  slide5.addText('0 Bs.', {
    x: 0.8 + (cardW + gap) * 2 + 0.25, y: 2.18, w: cardW - 0.5, h: 0.55,
    fontSize: 28, fontFace: 'Arial', bold: true, color: C_GREEN, align: 'center'
  });
  slide5.addText('Inversión en Licencias de Software', {
    x: 0.8 + (cardW + gap) * 2 + 0.25, y: 2.75, w: cardW - 0.5, h: 0.45,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_TEXT_DARK, align: 'center'
  });

  slide5.addText([
    { text: 'Tecnologías de Código Abierto:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: 'Todas las herramientas y librerías empleadas son Open Source y de uso gratuito.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: 'Sostenibilidad:\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 12 } },
    { text: 'El proyecto no requirió financiamiento externo ni genera costos de mantenimiento para la comunidad.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 0.8 + (cardW + gap) * 2 + 0.25, y: 3.5, w: cardW - 0.5, h: 3.2, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 6: 2.3 CÁLCULO DE COSTOS (2.3.1, 2.3.2, 2.3.3, 2.3.4)
  // =========================================================================
  const slide6 = pptx.addSlide();
  slide6.background = { color: C_BG_SLIDE };
  renderHeader(slide6, '2.3. Cálculo de Costos del Proyecto', 'Capítulo 2');

  const gridW = 5.7;
  const gridH = 2.65;

  // 2.3.1 Costo de Inversión (Top-Left)
  renderCard(slide6, {
    x: 0.8, y: 1.45, w: gridW, h: gridH,
    title: '2.3.1. Costo de Inversión (Gasto Inicial)',
    topBorderColor: C_GREEN
  });
  slide6.addText([
    { text: '• Licencias de software (VS Code, Node.js, SQLite): ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '0 Bs. (Gratis)\n', options: { bold: true, color: C_GREEN, fontSize: 11.5 } },
    { text: '• Equipo portátil preexistente (Amortizado): ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '0 Bs. (Recurso propio)\n\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: 'TOTAL INVERSIÓN INICIAL: ', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: '0 Bs. (Autosostenible)', options: { bold: true, color: C_GREEN, fontSize: 13 } }
  ], {
    x: 1.1, y: 2.15, w: 5.1, h: 1.8, fontFace: 'Arial'
  });

  // 2.3.2 Costo de Operación (Top-Right)
  renderCard(slide6, {
    x: 6.8, y: 1.45, w: gridW, h: gridH,
    title: '2.3.2. Costo de Operación (Mensual)',
    topBorderColor: C_ORANGE
  });
  slide6.addText([
    { text: '• Consumo de energía eléctrica: ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '20 Bs. / mes\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Conexión a internet banda ancha: ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '150 Bs. / mes\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Servidor web en la nube (Plan gratuito): ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '0 Bs.\n\n', options: { bold: true, color: C_GREEN, fontSize: 11.5 } },
    { text: 'TOTAL OPERACIÓN MENSUAL: ', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: '170 Bs. / mes', options: { bold: true, color: C_ORANGE, fontSize: 13 } }
  ], {
    x: 7.1, y: 2.15, w: 5.1, h: 1.8, fontFace: 'Arial'
  });

  // 2.3.3 Costos Variables (Bottom-Left)
  renderCard(slide6, {
    x: 0.8, y: 4.25, w: gridW, h: gridH,
    title: '2.3.3. Costos Variables',
    topBorderColor: C_TEAL
  });
  slide6.addText([
    { text: '• Difusión digital en redes sociales (Opcional): ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '100 Bs.\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Materiales de oficina e impresiones de prueba: ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '50 Bs.\n\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: 'TOTAL COSTOS VARIABLES: ', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: '150 Bs. (Opcionales)', options: { bold: true, color: C_TEXT_DARK, fontSize: 13 } }
  ], {
    x: 1.1, y: 4.95, w: 5.1, h: 1.8, fontFace: 'Arial'
  });

  // 2.3.4 Costos Fijos (Bottom-Right)
  renderCard(slide6, {
    x: 6.8, y: 4.25, w: gridW, h: gridH,
    title: '2.3.4. Costos Fijos (Mano de Obra)',
    topBorderColor: C_TEAL_DARK
  });
  slide6.addText([
    { text: '• Horas de trabajo estimadas: ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '120 Horas\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Valor hora desarrollador junior (simulado): ', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '20 Bs. / hora\n\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: 'VALOR SIMULADO DE DESARROLLO: ', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: '2,400 Bs.', options: { bold: true, color: C_TEAL_DARK, fontSize: 15 } }
  ], {
    x: 7.1, y: 4.95, w: 5.1, h: 1.8, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 7: 3. ¿CÓMO FUNCIONA? - ARQUITECTURA Y ROLES
  // =========================================================================
  const slide7 = pptx.addSlide();
  slide7.background = { color: C_BG_SLIDE };
  renderHeader(slide7, '3. ¿Cómo Funciona? - Arquitectura y Roles', 'Demostración');

  // Banner superior de arquitectura desacoplada
  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.38, w: 11.7, h: 1.05,
    fill: { color: C_WHITE },
    line: { color: C_TEAL, width: 1.5 },
    roundRadius: 0.08
  });
  slide7.addText('ARQUITECTURA CLIENTE-SERVIDOR DESACOPLADA (FULL-STACK):', {
    x: 1.1, y: 1.48, w: 11.1, h: 0.25,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C_TEAL_DARK
  });
  slide7.addText('Frontend nativo (HTML5 / CSS3 / JS) ⟷ API REST segura (JSON / multipart) ⟷ Backend (Node.js + Express) ⟷ Base de Datos (SQLite3)', {
    x: 1.1, y: 1.74, w: 11.1, h: 0.55,
    fontSize: 11.5, fontFace: 'Arial', bold: true, color: C_TEXT_DARK
  });

  // 3 Roles en tarjetas verticales
  const roleW = 3.68;
  const roleY = 2.6;
  const roleH = 4.3;

  // Rol 1: Invitado
  renderCard(slide7, {
    x: 0.8, y: roleY, w: roleW, h: roleH,
    title: '👤 Rol Invitado (Público)',
    topBorderColor: C_TEAL
  });
  slide7.addText([
    { text: 'Modo Observador sin Registro:\n\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Explora el catálogo de mascotas perdidas y encontradas.\n• Utiliza el buscador en tiempo real por zona o nombre.\n• Visualiza teléfonos de contacto directo para avisar a familias.\n• Lee comentarios y pistas de la comunidad.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 1.05, y: roleY + 0.65, w: roleW - 0.5, h: roleH - 0.8, fontFace: 'Arial'
  });

  // Rol 2: Usuario Registrado
  renderCard(slide7, {
    x: 0.8 + roleW + gap, y: roleY, w: roleW, h: roleH,
    title: '🐾 Usuario Registrado',
    topBorderColor: C_ORANGE
  });
  slide7.addText([
    { text: 'Publicación y Colaboración:\n\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Registro seguro con token JWT y clave encriptada.\n• Publica reportes con foto real, zona y recompensa.\n• Edita sus publicaciones y cambia fotos en vivo.\n• Alterna estado a "Encontrado" (insignia verde).\n• Comenta y aporta pistas en otros anuncios.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 0.8 + roleW + gap + 0.25, y: roleY + 0.65, w: roleW - 0.5, h: roleH - 0.8, fontFace: 'Arial'
  });

  // Rol 3: Administrador
  renderCard(slide7, {
    x: 0.8 + (roleW + gap) * 2, y: roleY, w: roleW, h: roleH,
    title: '⚙️ Administrador',
    topBorderColor: C_RED
  });
  slide7.addText([
    { text: 'Control Total y Moderación:\n\n', options: { bold: true, color: C_TEXT_DARK, fontSize: 11.5 } },
    { text: '• Panel de administración protegido con rol admin.\n• Gestión completa (CRUD) de usuarios del sistema.\n• Modifica cualquier publicación con errores de datos.\n• Elimina anuncios falsos o inapropiados para proteger la veracidad del sitio.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 0.8 + (roleW + gap) * 2 + 0.25, y: roleY + 0.65, w: roleW - 0.5, h: roleH - 0.8, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 8: 3. ¿CÓMO FUNCIONA? - INNOVACIONES TÉCNICAS
  // =========================================================================
  const slide8 = pptx.addSlide();
  slide8.background = { color: C_BG_SLIDE };
  renderHeader(slide8, '3. ¿Cómo Funciona? - Innovaciones Técnicas', 'Demostración');

  // 4 Cajas técnicas en cuadrícula limpia 2x2
  // Caja 1: Buscador Debounce
  renderCard(slide8, {
    x: 0.8, y: 1.45, w: gridW, h: gridH,
    title: '🔍 Buscador Inteligente con Debounce (300 ms)',
    topBorderColor: C_TEAL
  });
  slide8.addText([
    { text: '• Filtrado Instantáneo: ', options: { bold: true, color: C_TEXT_DARK } },
    { text: 'Filtra mascotas por nombre, zona o descripción sin recargar la página.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Técnica Debounce: ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'Espera 300ms tras teclear antes de consultar a la API, reduciendo la carga del servidor en un 70%.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 1.1, y: 2.15, w: 5.1, h: 1.8, fontSize: 11, fontFace: 'Arial'
  });

  // Caja 2: Edición activa y cambio de foto
  renderCard(slide8, {
    x: 6.8, y: 1.45, w: gridW, h: gridH,
    title: '📸 Edición Activa y Limpieza en Servidor',
    topBorderColor: C_ORANGE
  });
  slide8.addText([
    { text: '• Previsualización en Vivo: ', options: { bold: true, color: C_TEXT_DARK } },
    { text: 'Uso de la API FileReader para verificar la imagen antes de subirla.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Limpieza de Disco (fs.unlinkSync): ', options: { bold: true, color: C_ORANGE } },
    { text: 'Al cambiar de foto o borrar un anuncio, se elimina físicamente la imagen anterior para no llenar el disco.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 7.1, y: 2.15, w: 5.1, h: 1.8, fontSize: 11, fontFace: 'Arial'
  });

  // Caja 3: Seguridad Bcrypt + JWT
  renderCard(slide8, {
    x: 0.8, y: 4.25, w: gridW, h: gridH,
    title: '🔒 Seguridad Criptográfica (Bcrypt + JWT)',
    topBorderColor: C_GREEN
  });
  slide8.addText([
    { text: '• Hashing de Contraseñas: ', options: { bold: true, color: C_TEXT_DARK } },
    { text: '10 rondas de salting con Bcrypt para proteger las claves.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Tokens Web JSON (JWT): ', options: { bold: true, color: C_GREEN } },
    { text: 'Sesiones sin estado firmadas digitalmente con 24 horas de vigencia y control de roles.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 1.1, y: 4.95, w: 5.1, h: 1.8, fontSize: 11, fontFace: 'Arial'
  });

  // Caja 4: SQLite Relacional
  renderCard(slide8, {
    x: 6.8, y: 4.25, w: gridW, h: gridH,
    title: '🗄️ Base de Datos Relacional (SQLite3)',
    topBorderColor: C_TEAL_DARK
  });
  slide8.addText([
    { text: '• Integridad Referencial: ', options: { bold: true, color: C_TEXT_DARK } },
    { text: 'Uso de ON DELETE CASCADE para evitar datos huérfanos.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Consultas Parametrizadas: ', options: { bold: true, color: C_TEAL_DARK } },
    { text: 'Prepared Statements con marcadores (?) que bloquean el 100% de ataques SQL Injection.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 7.1, y: 4.95, w: 5.1, h: 1.8, fontSize: 11, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 9: CONCLUSIONES Y PROYECCIÓN FUTURA
  // =========================================================================
  const slide9 = pptx.addSlide();
  slide9.background = { color: C_BG_SLIDE };
  renderHeader(slide9, 'Conclusiones y Proyección Futura', 'Cierre');

  // Columna Izquierda: Conclusiones
  renderCard(slide9, {
    x: 0.8, y: 1.45, w: 5.7, h: 5.45,
    title: 'Conclusiones del Proyecto',
    topBorderColor: C_TEAL_DARK
  });
  slide9.addText([
    { text: '1. Cumplimiento Total de Objetivos:\n', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: 'Se logró una plataforma web completa, rápida (<100ms) y 100% adaptada a celulares y computadoras.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '2. Impacto Social Positivo:\n', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: 'Centraliza la búsqueda de mascotas en la comunidad, reduciendo la angustia familiar y fomentando la cooperación vecinal.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: '3. Formación Técnica BTH:\n', options: { bold: true, color: C_TEAL_DARK, fontSize: 12.5 } },
    { text: 'Demuestra las competencias adquiridas en Sistemas Informáticos para crear software profesional a costo cero.', options: { color: C_TEXT_MUTED, fontSize: 11.5 } }
  ], {
    x: 1.1, y: 2.15, w: 5.1, h: 4.4, fontFace: 'Arial'
  });

  // Columna Derecha: Proyección
  renderCard(slide9, {
    x: 6.8, y: 1.45, w: 5.7, h: 5.45,
    title: 'Estrategia de Mejora y Proyección',
    topBorderColor: C_ORANGE
  });
  slide9.addText([
    { text: 'Mejoras a Corto Plazo:\n', options: { bold: true, color: C_ORANGE, fontSize: 12.5 } },
    { text: '• Integración de mapas interactivos con geolocalización (Leaflet / Google Maps API) para ubicar el sitio exacto de extravío.\n• Filtros avanzados por especie (perro, gato, ave) y color.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11.5 } },
    { text: 'Proyección a Mediano y Largo Plazo:\n', options: { bold: true, color: C_ORANGE, fontSize: 12.5 } },
    { text: '• Transformar la web en una Progressive Web App (PWA) instalable directamente en Android e iOS.\n• Sistema de notificaciones push automáticas cuando se reporte una mascota perdida en el barrio del usuario.', options: { color: C_TEXT_MUTED, fontSize: 11.5 } }
  ], {
    x: 7.1, y: 2.15, w: 5.1, h: 4.4, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 10: CIERRE Y PREGUNTAS (FONDO OSCURO ELEGANTE)
  // =========================================================================
  const slide10 = pptx.addSlide();
  slide10.background = { color: C_DARK };

  slide10.addText('¡Muchas Gracias por su Atención!', {
    x: 1.0, y: 1.8, w: 11.33, h: 1.0,
    fontSize: 38, fontFace: 'Arial', bold: true, color: C_WHITE, align: 'center'
  });

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 4.66, y: 2.9, w: 4.0, h: 0.08,
    fill: { color: C_ORANGE }
  });

  slide10.addText('¿Preguntas del Tribunal Evaluador?', {
    x: 1.0, y: 3.2, w: 11.33, h: 0.8,
    fontSize: 26, fontFace: 'Arial', bold: true, color: C_ORANGE, align: 'center'
  });

  slide10.addText([
    { text: 'Postulantes: ', options: { color: C_TEXT_LIGHT, fontSize: 15 } },
    { text: 'Leon Justiniano   |   Yimmy Lijeron Mejia\n', options: { bold: true, color: C_WHITE, fontSize: 16 } },
    { text: 'Especialidad: ', options: { color: C_TEXT_LIGHT, fontSize: 13.5 } },
    { text: 'Sistemas Informáticos — BTH Núcleo Las Gamas\n', options: { color: C_TEAL, fontSize: 14 } },
    { text: 'Warnes – Santa Cruz – Bolivia | Gestión 2026', options: { italic: true, color: C_TEXT_LIGHT, fontSize: 12.5 } }
  ], {
    x: 1.0, y: 4.5, w: 11.33, h: 2.0,
    fontFace: 'Arial', align: 'center', valign: 'top'
  });

  // Guardar archivo PPTX
  const outputPath = path.join(__dirname, 'presentacion_defensa.pptx');
  pptx.writeFile({ fileName: outputPath }).then(fileName => {
    console.log(`Presentación PPTX rediseñada y guardada con éxito en:\n${outputPath}`);
  }).catch(err => {
    console.error('Error al generar PPTX:', err);
  });
}

generarPresentacionOptimizada();
