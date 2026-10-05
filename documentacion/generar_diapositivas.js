const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

function generarPresentacionUltraProfesional() {
  const pptx = new pptxgen();

  // Configuración Widescreen 16:9 (13.33" x 7.5")
  pptx.layout = 'LAYOUT_16x9';

  // =========================================================================
  // DESIGN TOKENS & EXECUTIVE COLOR PALETTE
  // =========================================================================
  const C_NAVY = '0F172A';         // Deep Slate Navy (Fondo Portada/Cierre)
  const C_NAVY_CARD = '1E293B';    // Tarjetas en fondos oscuros
  const C_CANVAS = 'F8FAFC';       // Fondo general limpio (Slate 50)
  const C_CARD = 'FFFFFF';         // Blanco puro de tarjetas
  const C_BORDER = 'E2E8F0';       // Bordes sutiles (Slate 200)
  const C_BORDER_DARK = '334155';  // Bordes oscuros (Slate 700)
  
  // Acentos cromáticos
  const C_CYAN = '0284C7';         // Cyan Corporativo Primario
  const C_CYAN_LIGHT = 'E0F2FE';   // Cyan suave para fondos
  const C_AMBER = 'D97706';        // Ámbar para alertas/secciones
  const C_AMBER_LIGHT = 'FEF3C7';  // Ámbar suave
  const C_EMERALD = '059669';      // Verde éxito / 0 Bs.
  const C_EMERALD_LIGHT = 'D1FAE5';// Verde suave
  const C_ROSE = 'E11D48';         // Rojo problemas
  const C_ROSE_LIGHT = 'FFE4E6';   // Rojo suave
  
  // Tipografía
  const C_TEXT_MAIN = '0F172A';    // Slate 900
  const C_TEXT_MUTED = '475569';   // Slate 600
  const C_TEXT_LIGHT = '94A3B8';   // Slate 400
  const C_WHITE = 'FFFFFF';

  // =========================================================================
  // HELPER COMPONENTS
  // =========================================================================

  // 1. Header Ejecutivo Minimalista
  function renderHeader(slide, title, sectionTag) {
    // Fondo superior blanco continuo
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0, y: 0, w: 13.333, h: 1.15,
      fill: { color: C_CARD },
      line: { color: C_BORDER, width: 1 }
    });

    // Píldora de color del acento
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8, y: 0.28, w: 0.09, h: 0.58,
      fill: { color: C_CYAN }
    });

    if (sectionTag) {
      slide.addText(sectionTag.toUpperCase(), {
        x: 1.05, y: 0.22, w: 11.0, h: 0.25,
        fontSize: 10, fontFace: 'Arial', bold: true, color: C_AMBER
      });
    }

    slide.addText(title, {
      x: 1.05, y: sectionTag ? 0.47 : 0.32, w: 11.0, h: 0.5,
      fontSize: 21, fontFace: 'Arial', bold: true, color: C_TEXT_MAIN
    });
  }

  // 2. Tarjeta Ejecutiva con Borde Acento Superior
  function renderCard(slide, { x, y, w, h, title, topBorderColor = C_CYAN, bgColor = C_CARD }) {
    slide.addShape(pptx.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: bgColor },
      line: { color: C_BORDER, width: 1 },
      roundRadius: 0.1
    });

    if (topBorderColor) {
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: x + 0.04, y: y, w: w - 0.08, h: 0.07,
        fill: { color: topBorderColor },
        roundRadius: 0.04
      });
    }

    if (title) {
      slide.addText(title, {
        x: x + 0.28, y: y + 0.22, w: w - 0.56, h: 0.38,
        fontSize: 13.5, fontFace: 'Arial', bold: true,
        color: topBorderColor === C_ROSE ? C_ROSE : (topBorderColor === C_EMERALD ? C_EMERALD : (topBorderColor === C_AMBER ? C_AMBER : C_CYAN))
      });
    }
  }

  // =========================================================================
  // DIAPOSITIVA 1: PORTADA OFICIAL EJECUTIVA (DARK LUXURY SLATE)
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: C_NAVY };

  // Badge institucional superior
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.9, y: 0.8, w: 6.2, h: 0.36,
    fill: { color: C_NAVY_CARD },
    line: { color: C_AMBER, width: 1 },
    roundRadius: 0.08
  });
  slide1.addText('BACHILLERATO TÉCNICO HUMANÍSTICO • SISTEMAS INFORMÁTICOS', {
    x: 1.0, y: 0.82, w: 6.0, h: 0.32,
    fontSize: 10, fontFace: 'Arial', bold: true, color: C_AMBER, align: 'center'
  });

  // Título del proyecto
  slide1.addText('EncuentraMiMascota', {
    x: 0.9, y: 1.35, w: 11.5, h: 1.0,
    fontSize: 44, fontFace: 'Arial', bold: true, color: C_WHITE
  });

  slide1.addText('Plataforma Web Responsive para el Reporte y Búsqueda de Mascotas Perdidas mediante ByCoding', {
    x: 0.9, y: 2.4, w: 11.5, h: 0.5,
    fontSize: 16.5, fontFace: 'Arial', bold: true, color: '38BDF8'
  });

  // 2 Tarjetas inferiores: Postulantes y Autoridades
  // Tarjeta Izquierda: Postulantes
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.9, y: 3.3, w: 5.6, h: 3.0,
    fill: { color: C_NAVY_CARD },
    line: { color: C_BORDER_DARK, width: 1 },
    roundRadius: 0.1
  });
  slide1.addText('👥 EQUIPO DE POSTULANTES:', {
    x: 1.2, y: 3.5, w: 5.0, h: 0.3,
    fontSize: 11.5, fontFace: 'Arial', bold: true, color: C_AMBER
  });
  slide1.addText([
    { text: '• Dietter Leon Justiniano\n', options: { fontSize: 14.5, bold: true, color: C_WHITE } },
    { text: '  Desarrollo Full-Stack, Base de Datos y Pruebas Técnicas\n\n', options: { fontSize: 11, color: C_TEXT_LIGHT } },
    { text: '• Yimmy Lijeron Mejias\n', options: { fontSize: 14.5, bold: true, color: C_WHITE } },
    { text: '  Análisis de Requerimientos, Diseño UI/UX y Documentación', options: { fontSize: 11, color: C_TEXT_LIGHT } }
  ], {
    x: 1.2, y: 3.9, w: 5.0, h: 2.2, fontFace: 'Arial'
  });

  // Tarjeta Derecha: Asesoría y Unidad Educativa
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 3.3, w: 5.6, h: 3.0,
    fill: { color: C_NAVY_CARD },
    line: { color: C_BORDER_DARK, width: 1 },
    roundRadius: 0.1
  });
  slide1.addText('🏛️ ASESORÍA DOCENTE Y UNIDAD EDUCATIVA:', {
    x: 7.1, y: 3.5, w: 5.0, h: 0.3,
    fontSize: 11.5, fontFace: 'Arial', bold: true, color: C_AMBER
  });
  slide1.addText([
    { text: 'Docente Tutor: ', options: { bold: true, color: '38BDF8', fontSize: 12 } },
    { text: 'Lic. Ivanna Leminka López Sanabria\n', options: { color: C_WHITE, fontSize: 12 } },
    { text: 'Docente de Especialidad: ', options: { bold: true, color: '38BDF8', fontSize: 12 } },
    { text: 'Lic. Ana Gabriela Paz Arauz\n', options: { color: C_WHITE, fontSize: 12 } },
    { text: 'Presidente Comité BTH: ', options: { bold: true, color: '38BDF8', fontSize: 12 } },
    { text: 'Lic. Edwin Eliseo Huayllani Silvestre\n\n', options: { color: C_WHITE, fontSize: 12 } },
    { text: 'Núcleo Educativo "Las Gamas" • Warnes, Santa Cruz | 2026', options: { bold: true, color: C_TEXT_LIGHT, fontSize: 10.5 } }
  ], {
    x: 7.1, y: 3.9, w: 5.0, h: 2.2, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 2: 1. PLANTEAMIENTO DEL PROBLEMA (Diagnóstico + Matriz FODA)
  // =========================================================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: C_CANVAS };
  renderHeader(slide2, '1. Planteamiento del Problema', 'Capítulo 1');

  // Columna Izquierda: 1.1 Diagnóstico
  renderCard(slide2, {
    x: 0.8, y: 1.4, w: 5.4, h: 5.5,
    title: '1.1. Diagnóstico de la Realidad',
    topBorderColor: C_CYAN
  });

  slide2.addText([
    { text: 'Problemática en la Comunidad:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 12 } },
    { text: 'En Warnes y Santa Cruz, la pérdida de animales domésticos genera angustia familiar y falta de medios organizados para su búsqueda.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: 'Canales Tradicionales Ineficientes:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 12 } },
    { text: '• Afiches en postes perecederos ante el clima y de corto alcance.\n• Redes sociales saturadas donde los reportes expiran en horas.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '📊 Datos de Encuesta Local (40 Familias):', options: { bold: true, color: C_CYAN, fontSize: 12 } }
  ], {
    x: 1.05, y: 2.05, w: 4.9, h: 2.7, fontFace: 'Arial'
  });

  // 2 KPI Stat Badges
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 1.05, y: 4.9, w: 2.35, h: 1.6,
    fill: { color: C_CYAN_LIGHT }, line: { color: C_CYAN, width: 1 }, roundRadius: 0.08
  });
  slide2.addText('65%', {
    x: 1.05, y: 4.98, w: 2.35, h: 0.6,
    fontSize: 28, fontFace: 'Arial', bold: true, color: C_CYAN, align: 'center'
  });
  slide2.addText('Ha perdido una mascota en el último año', {
    x: 1.15, y: 5.6, w: 2.15, h: 0.8,
    fontSize: 10, fontFace: 'Arial', color: C_TEXT_MUTED, align: 'center'
  });

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 3.6, y: 4.9, w: 2.35, h: 1.6,
    fill: { color: C_AMBER_LIGHT }, line: { color: C_AMBER, width: 1 }, roundRadius: 0.08
  });
  slide2.addText('80%', {
    x: 3.6, y: 4.98, w: 2.35, h: 0.6,
    fontSize: 28, fontFace: 'Arial', bold: true, color: C_AMBER, align: 'center'
  });
  slide2.addText('Afirma que redes sociales no son efectivas', {
    x: 3.7, y: 5.6, w: 2.15, h: 0.8,
    fontSize: 10, fontFace: 'Arial', color: C_TEXT_MUTED, align: 'center'
  });

  // Columna Derecha: 1.2 Identificación y Matriz FODA (Cuadrícula 2x2 Ejecutiva)
  renderCard(slide2, {
    x: 6.5, y: 1.4, w: 6.0, h: 5.5,
    title: '1.2. Identificación del Problema (Matriz FODA)',
    topBorderColor: C_ROSE
  });

  const fodaW = 2.65;
  const fodaH = 2.15;
  const fodaGapX = 0.2;
  const fodaGapY = 0.2;

  // Fortalezas (Top-Left)
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 6.75, y: 2.1, w: fodaW, h: fodaH,
    fill: { color: C_EMERALD_LIGHT }, line: { color: C_EMERALD, width: 1 }, roundRadius: 0.06
  });
  slide2.addText('💪 FORTALEZAS (Internas)', {
    x: 6.85, y: 2.18, w: fodaW - 0.2, h: 0.25,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_EMERALD
  });
  slide2.addText('• Centraliza datos en un solo lugar.\n• Fotos reales, ubicación y recompensas.\n• Edición activa con vista previa.\n• Diseño responsive para celulares.', {
    x: 6.85, y: 2.45, w: fodaW - 0.2, h: 1.7,
    fontSize: 9.5, fontFace: 'Arial', color: C_TEXT_MAIN
  });

  // Oportunidades (Top-Right)
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 6.75 + fodaW + fodaGapX, y: 2.1, w: fodaW, h: fodaH,
    fill: { color: C_CYAN_LIGHT }, line: { color: C_CYAN, width: 1 }, roundRadius: 0.06
  });
  slide2.addText('🚀 OPORTUNIDADES (Externas)', {
    x: 6.75 + fodaW + fodaGapX + 0.1, y: 2.18, w: fodaW - 0.2, h: 0.25,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_CYAN
  });
  slide2.addText('• Adopción masiva comunitaria.\n• Ampliación a otros municipios.\n• Alianzas con veterinarias y albergues.\n• Integración futura con mapas GPS.', {
    x: 6.75 + fodaW + fodaGapX + 0.1, y: 2.45, w: fodaW - 0.2, h: 1.7,
    fontSize: 9.5, fontFace: 'Arial', color: C_TEXT_MAIN
  });

  // Debilidades (Bottom-Left)
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 6.75, y: 2.1 + fodaH + fodaGapY, w: fodaW, h: fodaH,
    fill: { color: C_AMBER_LIGHT }, line: { color: C_AMBER, width: 1 }, roundRadius: 0.06
  });
  slide2.addText('⚠️ DEBILIDADES (Internas)', {
    x: 6.85, y: 2.1 + fodaH + fodaGapY + 0.08, w: fodaW - 0.2, h: 0.25,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_AMBER
  });
  slide2.addText('• Dependencia de conexión a internet.\n• Alcance inicial en fase de difusión.\n• Volumen depende del uso vecinal.\n• SQLite para escala comunitaria.', {
    x: 6.85, y: 2.1 + fodaH + fodaGapY + 0.35, w: fodaW - 0.2, h: 1.7,
    fontSize: 9.5, fontFace: 'Arial', color: C_TEXT_MAIN
  });

  // Amenazas (Bottom-Right)
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 6.75 + fodaW + fodaGapX, y: 2.1 + fodaH + fodaGapY, w: fodaW, h: fodaH,
    fill: { color: C_ROSE_LIGHT }, line: { color: C_ROSE, width: 1 }, roundRadius: 0.06
  });
  slide2.addText('🛑 AMENAZAS (Externas)', {
    x: 6.75 + fodaW + fodaGapX + 0.1, y: 2.1 + fodaH + fodaGapY + 0.08, w: fodaW - 0.2, h: 0.25,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_ROSE
  });
  slide2.addText('• Publicaciones informales en Facebook.\n• Riesgo de publicaciones falsas.\n• Requerimiento de moderación activa.\n• Caídas temporales de hosting web.', {
    x: 6.75 + fodaW + fodaGapX + 0.1, y: 2.1 + fodaH + fodaGapY + 0.35, w: fodaW - 0.2, h: 1.7,
    fontSize: 9.5, fontFace: 'Arial', color: C_TEXT_MAIN
  });

  // =========================================================================
  // DIAPOSITIVA 3: 1.3 FORMULACIÓN Y 1.4 OBJETIVOS
  // =========================================================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: C_CANVAS };
  renderHeader(slide3, '1.3. Formulación y 1.4. Objetivos', 'Capítulo 1');

  // 1.3 Formulación (Callout Superior)
  slide3.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.38, w: 11.7, h: 1.35,
    fill: { color: C_CARD },
    line: { color: C_AMBER, width: 1.5 },
    roundRadius: 0.08
  });
  slide3.addText('1.3. FORMULACIÓN DEL PROBLEMA (PREGUNTA GUÍA):', {
    x: 1.05, y: 1.5, w: 11.2, h: 0.25,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C_AMBER
  });
  slide3.addText('“¿De qué manera el desarrollo e implementación de una plataforma web responsive de reporte y búsqueda de mascotas permitirá centralizar, organizar y gestionar de forma eficiente los avisos de animales extraviados en la comunidad, reduciendo los tiempos de búsqueda y optimizando la comunicación vecinal?”', {
    x: 1.05, y: 1.78, w: 11.2, h: 0.85,
    fontSize: 12.5, fontFace: 'Arial', italic: true, bold: true, color: C_TEXT_MAIN
  });

  // 1.4.1 Objetivo General (Columna Izquierda)
  renderCard(slide3, {
    x: 0.8, y: 2.95, w: 5.6, h: 3.95,
    title: '1.4.1. Objetivo General',
    topBorderColor: C_CYAN
  });
  slide3.addText('Desarrollar una plataforma web responsive de reporte y búsqueda de mascotas perdidas para nuestra comunidad, utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con base de datos relacional SQLite en el backend, que permita centralizar y gestionar de forma ágil y segura la información de los animales extraviados facilitando su reencuentro.', {
    x: 1.05, y: 3.65, w: 5.1, h: 3.0,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C_TEXT_MAIN
  });

  // 1.4.2 Objetivos Específicos (Columna Derecha)
  renderCard(slide3, {
    x: 6.7, y: 2.95, w: 5.8, h: 3.95,
    title: '1.4.2. Objetivos Específicos',
    topBorderColor: C_EMERALD
  });
  slide3.addText([
    { text: '1. Diagnosticar ', options: { bold: true, color: C_CYAN } },
    { text: 'el extravío de mascotas y medios utilizados mediante encuestas.\n', options: { color: C_TEXT_MUTED } },
    { text: '2. Diseñar ', options: { bold: true, color: C_CYAN } },
    { text: 'la base de datos y la interfaz gráfica responsive (UI/UX).\n', options: { color: C_TEXT_MUTED } },
    { text: '3. Programar ', options: { bold: true, color: C_CYAN } },
    { text: 'registro, publicación, buscador en tiempo real y comentarios.\n', options: { color: C_TEXT_MUTED } },
    { text: '4. Implementar ', options: { bold: true, color: C_CYAN } },
    { text: 'módulo multimedia con Multer y limpieza física de archivos.\n', options: { color: C_TEXT_MUTED } },
    { text: '5. Incorporar ', options: { bold: true, color: C_CYAN } },
    { text: 'seguridad con Bcrypt y JWT bajo 3 roles de acceso.\n', options: { color: C_TEXT_MUTED } },
    { text: '6. Validar ', options: { bold: true, color: C_CYAN } },
    { text: 'el sistema mediante pruebas de usabilidad con vecinos.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 6.95, y: 3.6, w: 5.3, h: 3.2,
    fontSize: 10.5, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 4: 2. PLANIFICACIÓN / 2.1 CRONOGRAMA DE ACTIVIDADES (Enero - Noviembre)
  // =========================================================================
  const slide4 = pptx.addSlide();
  slide4.background = { color: C_CANVAS };
  renderHeader(slide4, '2. Planificación / 2.1. Cronograma de Actividades', 'Capítulo 2');

  const cronoRows = [
    [
      { text: 'Fase / Actividad Desarrollada', options: { bold: true, fill: { color: C_NAVY }, color: C_WHITE, fontSize: 10.5 } },
      { text: 'Periodo (Meses)', options: { bold: true, fill: { color: C_NAVY }, color: C_WHITE, fontSize: 10.5, align: 'center' } },
      { text: 'Resultado / Entregable Oficial', options: { bold: true, fill: { color: C_NAVY }, color: C_WHITE, fontSize: 10.5 } }
    ],
    [{ text: '1. Identificación del problema y justificación' }, { text: 'Enero – Febrero', options: { align: 'center', bold: true } }, { text: 'Diagnóstico inicial' }],
    [{ text: '2. Revisión del perfil de trabajo con el tutor' }, { text: 'Febrero – Marzo', options: { align: 'center', bold: true } }, { text: 'Tema formalizado' }],
    [{ text: '3. Aplicación de encuestas a vecinos y diagnóstico' }, { text: 'Marzo', options: { align: 'center', bold: true } }, { text: 'Datos estadísticos' }],
    [{ text: '4. Redacción del planteamiento del problema y objetivos' }, { text: 'Abril', options: { align: 'center', bold: true } }, { text: 'Perfil aprobado' }],
    [{ text: '5. Diseño de base de datos SQLite (db.js)' }, { text: 'Mayo', options: { align: 'center', bold: true } }, { text: 'Esquema relacional' }],
    [{ text: '6. Maquetación UI/UX responsive (HTML5/CSS3)' }, { text: 'Junio', options: { align: 'center', bold: true } }, { text: 'Vistas móviles listas' }],
    [{ text: '7. Programación del backend (Node.js/Express)' }, { text: 'Julio', options: { align: 'center', bold: true } }, { text: 'API REST operativa' }],
    [{ text: '8. Autenticación con JWT y seguridad Bcrypt' }, { text: 'Agosto', options: { align: 'center', bold: true } }, { text: 'Control por roles' }],
    [{ text: '9. Módulo multimedia, edición y cambio de fotos' }, { text: 'Agosto – Septiembre', options: { align: 'center', bold: true } }, { text: 'Multer y fs.unlinkSync' }],
    [{ text: '10. Pruebas piloto de usabilidad con vecinos' }, { text: 'Septiembre', options: { align: 'center', bold: true } }, { text: 'Validación en campo' }],
    [{ text: '11. Corrección de observaciones y optimización' }, { text: 'Octubre', options: { align: 'center', bold: true } }, { text: 'Sistema depurado' }],
    [{ text: '12. Elaboración de monografía final y defensa BTH' }, { text: 'Noviembre', options: { align: 'center', bold: true } }, { text: 'Monografía completa' }]
  ];

  slide4.addTable(cronoRows, {
    x: 0.8, y: 1.38, w: 11.7, h: 5.5,
    colW: [5.1, 2.3, 4.3],
    fontSize: 9.5, fontFace: 'Arial',
    border: { pt: 0.8, color: C_BORDER },
    fill: { color: C_CARD },
    valign: 'middle'
  });

  // =========================================================================
  // DIAPOSITIVA 5: 2.2 RECURSOS (Humanos, Materiales, Financieros)
  // =========================================================================
  const slide5 = pptx.addSlide();
  slide5.background = { color: C_CANVAS };
  renderHeader(slide5, '2.2. Recursos del Proyecto', 'Capítulo 2');

  const colW = 3.68;
  const colGap = 0.33;

  // 2.2.1 Humanos
  renderCard(slide5, {
    x: 0.8, y: 1.4, w: colW, h: 5.5,
    title: '2.2.1. Recursos Humanos',
    topBorderColor: C_CYAN
  });
  slide5.addText([
    { text: 'Estudiantes Postulantes:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: '• Dietter Leon Justiniano\n  (Desarrollo Full-Stack y pruebas del sistema)\n• Yimmy Lijeron Mejias\n  (Análisis y diseño UI/UX de la página web)\n\n', options: { color: C_TEXT_MUTED, fontSize: 10.5 } },
    { text: 'Docentes Asesores BTH:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: '• Lic. Ivanna Leminka López Sanabria\n  (Docente Tutor metodológico y técnico)\n• Lic. Ana Gabriela Paz Arauz\n  (Docente de Especialidad BTH)\n\n', options: { color: C_TEXT_MUTED, fontSize: 10.5 } },
    { text: 'Comunidad Participante:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: '• 40 vecinos para encuestas.\n• 5 usuarios para pruebas de usabilidad.', options: { color: C_TEXT_MUTED, fontSize: 10.5 } }
  ], {
    x: 1.05, y: 2.05, w: colW - 0.5, h: 4.6, fontFace: 'Arial'
  });

  // 2.2.2 Materiales
  renderCard(slide5, {
    x: 0.8 + colW + colGap, y: 1.4, w: colW, h: 5.5,
    title: '2.2.2. Recursos Materiales',
    topBorderColor: C_AMBER
  });
  slide5.addText([
    { text: 'Hardware Utilizado:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: '• 1 Computadora portátil (Laptop Intel Core i5, 8GB RAM).\n• 1 Teléfono inteligente para pruebas de navegación móvil.\n\n', options: { color: C_TEXT_MUTED, fontSize: 10.5 } },
    { text: 'Software y Herramientas:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: '• Visual Studio Code (IDE de desarrollo).\n• Node.js runtime & Express framework.\n• SQLite3 (Base de datos relacional).\n• Git y GitHub (Control de versiones).\n• Navegador Google Chrome.\n• Paquete Microsoft Word para monografía.', options: { color: C_TEXT_MUTED, fontSize: 10.5 } }
  ], {
    x: 0.8 + colW + colGap + 0.25, y: 2.05, w: colW - 0.5, h: 4.6, fontFace: 'Arial'
  });

  // 2.2.3 Financieros
  renderCard(slide5, {
    x: 0.8 + (colW + colGap) * 2, y: 1.4, w: colW, h: 5.5,
    title: '2.2.3. Recursos Financieros',
    topBorderColor: C_EMERALD
  });
  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8 + (colW + colGap) * 2 + 0.25, y: 2.05, w: colW - 0.5, h: 1.25,
    fill: { color: C_EMERALD_LIGHT }, line: { color: C_EMERALD, width: 1 }, roundRadius: 0.08
  });
  slide5.addText('0 Bs.', {
    x: 0.8 + (colW + colGap) * 2 + 0.25, y: 2.12, w: colW - 0.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', bold: true, color: C_EMERALD, align: 'center'
  });
  slide5.addText('Inversión en Software de Desarrollo', {
    x: 0.8 + (colW + colGap) * 2 + 0.25, y: 2.7, w: colW - 0.5, h: 0.45,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_TEXT_MAIN, align: 'center'
  });

  slide5.addText([
    { text: 'Herramientas Open Source:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: 'Todas las tecnologías empleadas son de código abierto y libres de costo de licencias.\n\n', options: { color: C_TEXT_MUTED, fontSize: 10.5 } },
    { text: 'Autosostenibilidad:\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11.5 } },
    { text: 'No requirió financiamiento externo, asegurando costo cero para los vecinos de la comunidad.', options: { color: C_TEXT_MUTED, fontSize: 10.5 } }
  ], {
    x: 0.8 + (colW + colGap) * 2 + 0.25, y: 3.5, w: colW - 0.5, h: 3.2, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 6: 2.3 CÁLCULO DE COSTOS (Inversión, Operación, Variables, Fijos)
  // =========================================================================
  const slide6 = pptx.addSlide();
  slide6.background = { color: C_CANVAS };
  renderHeader(slide6, '2.3. Cálculo de Costos del Proyecto', 'Capítulo 2');

  const gW = 5.7;
  const gH = 2.65;

  // 2.3.1 Inversión
  renderCard(slide6, {
    x: 0.8, y: 1.4, w: gW, h: gH,
    title: '2.3.1. Costo de Inversión (Gasto Inicial)',
    topBorderColor: C_EMERALD
  });
  slide6.addText([
    { text: '• Licencias de software (VS Code, Node.js, SQLite): ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '0 Bs. (Gratis)\n', options: { bold: true, color: C_EMERALD, fontSize: 11 } },
    { text: '• Equipo portátil preexistente (Amortizado): ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '0 Bs. (Recurso propio)\n\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: 'TOTAL INVERSIÓN MATERIAL DIRECTA: ', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: '0 Bs. (Autosostenible)', options: { bold: true, color: C_EMERALD, fontSize: 13 } }
  ], {
    x: 1.05, y: 2.1, w: 5.2, h: 1.8, fontFace: 'Arial'
  });

  // 2.3.2 Operación
  renderCard(slide6, {
    x: 6.8, y: 1.4, w: gW, h: gH,
    title: '2.3.2. Costo de Operación (Mensual)',
    topBorderColor: C_AMBER
  });
  slide6.addText([
    { text: '• Consumo de energía eléctrica: ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '20 Bs. / mes\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Conexión a internet ilimitado banda ancha: ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '150 Bs. / mes\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Servidor web en la nube (Plan libre): ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '0 Bs.\n\n', options: { bold: true, color: C_EMERALD, fontSize: 11 } },
    { text: 'TOTAL COSTO OPERACIÓN MENSUAL: ', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: '170 Bs. / mes', options: { bold: true, color: C_AMBER, fontSize: 13 } }
  ], {
    x: 7.05, y: 2.1, w: 5.2, h: 1.8, fontFace: 'Arial'
  });

  // 2.3.3 Variables
  renderCard(slide6, {
    x: 0.8, y: 4.25, w: gW, h: gH,
    title: '2.3.3. Costos Variables',
    topBorderColor: C_CYAN
  });
  slide6.addText([
    { text: '• Materiales de impresión y encuadernación: ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '80 Bs.\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Publicidad digital en redes sociales (Opcional): ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '50 Bs.\n\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: 'TOTAL COSTOS VARIABLES: ', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: '130 Bs. (Flexibles)', options: { bold: true, color: C_TEXT_MAIN, fontSize: 13 } }
  ], {
    x: 1.05, y: 4.95, w: 5.2, h: 1.8, fontFace: 'Arial'
  });

  // 2.3.4 Fijos / Mano de Obra
  renderCard(slide6, {
    x: 6.8, y: 4.25, w: gW, h: gH,
    title: '2.3.4. Costos Fijos (Mano de Obra)',
    topBorderColor: C_CYAN
  });
  slide6.addText([
    { text: '• Estimación de tiempo técnico invertido: ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '120 Horas\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Valor hora de desarrollador junior (Simulado): ', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '20 Bs. / hora\n\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: 'VALOR SIMULADO DE DESARROLLO: ', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: '2,400 Bs.', options: { bold: true, color: C_CYAN, fontSize: 15 } }
  ], {
    x: 7.05, y: 4.95, w: 5.2, h: 1.8, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 7: 3. ¿CÓMO FUNCIONA? - ARQUITECTURA Y ROLES
  // =========================================================================
  const slide7 = pptx.addSlide();
  slide7.background = { color: C_CANVAS };
  renderHeader(slide7, '3. ¿Cómo Funciona? - Arquitectura y Roles', 'Demostración');

  // Banner superior de arquitectura desacoplada
  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 11.7, h: 1.05,
    fill: { color: C_CARD },
    line: { color: C_CYAN, width: 1.5 },
    roundRadius: 0.08
  });
  slide7.addText('ARQUITECTURA CLIENTE-SERVIDOR DESACOPLADA (FULL-STACK):', {
    x: 1.05, y: 1.45, w: 11.2, h: 0.25,
    fontSize: 10.5, fontFace: 'Arial', bold: true, color: C_CYAN
  });
  slide7.addText('Frontend nativo (HTML5 / CSS3 / JS)  ⟷  API REST segura (JSON / Multipart)  ⟷  Servidor Node.js + Express  ⟷  Base de Datos SQLite3', {
    x: 1.05, y: 1.72, w: 11.2, h: 0.55,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C_TEXT_MAIN
  });

  const rW = 3.68;
  const rY = 2.6;
  const rH = 4.3;

  // Rol 1: Invitado
  renderCard(slide7, {
    x: 0.8, y: rY, w: rW, h: rH,
    title: '👤 Rol Invitado (Público)',
    topBorderColor: C_CYAN
  });
  slide7.addText([
    { text: 'Acceso Directo sin Registro:\n\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Explora el catálogo de mascotas perdidas y encontradas.\n• Utiliza el buscador en tiempo real por zona o nombre.\n• Visualiza teléfonos de contacto directo para avisar a familias.\n• Lee comentarios y pistas de la comunidad.', options: { color: C_TEXT_MUTED, fontSize: 10.5 } }
  ], {
    x: 1.05, y: rY + 0.65, w: rW - 0.5, h: rH - 0.8, fontFace: 'Arial'
  });

  // Rol 2: Usuario Registrado
  renderCard(slide7, {
    x: 0.8 + rW + colGap, y: rY, w: rW, h: rH,
    title: '🐾 Usuario Registrado',
    topBorderColor: C_AMBER
  });
  slide7.addText([
    { text: 'Publicación y Colaboración:\n\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Registro seguro con token JWT y clave encriptada.\n• Publica reportes con foto real, zona y recompensa.\n• Edita sus publicaciones y cambia fotos en vivo.\n• Alterna estado a "Encontrado" (insignia verde).\n• Comenta y aporta pistas en otros anuncios.', options: { color: C_TEXT_MUTED, fontSize: 10.5 } }
  ], {
    x: 0.8 + rW + colGap + 0.25, y: rY + 0.65, w: rW - 0.5, h: rH - 0.8, fontFace: 'Arial'
  });

  // Rol 3: Administrador
  renderCard(slide7, {
    x: 0.8 + (rW + colGap) * 2, y: rY, w: rW, h: rH,
    title: '⚙️ Administrador',
    topBorderColor: C_ROSE
  });
  slide7.addText([
    { text: 'Control Total y Moderación:\n\n', options: { bold: true, color: C_TEXT_MAIN, fontSize: 11 } },
    { text: '• Panel de administración protegido con rol admin.\n• Gestión completa (CRUD) de usuarios del sistema.\n• Modifica cualquier publicación con errores de datos.\n• Elimina anuncios falsos o inapropiados para proteger la veracidad del sitio.', options: { color: C_TEXT_MUTED, fontSize: 10.5 } }
  ], {
    x: 0.8 + (rW + colGap) * 2 + 0.25, y: rY + 0.65, w: rW - 0.5, h: rH - 0.8, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 8: 3. ¿CÓMO FUNCIONA? - INNOVACIONES TÉCNICAS
  // =========================================================================
  const slide8 = pptx.addSlide();
  slide8.background = { color: C_CANVAS };
  renderHeader(slide8, '3. ¿Cómo Funciona? - Innovaciones Técnicas', 'Demostración');

  // 4 Cajas técnicas 2x2
  // Caja 1: Buscador Debounce
  renderCard(slide8, {
    x: 0.8, y: 1.4, w: gW, h: gH,
    title: '🔍 Buscador Inteligente con Debounce (300 ms)',
    topBorderColor: C_CYAN
  });
  slide8.addText([
    { text: '• Filtrado Instantáneo: ', options: { bold: true, color: C_TEXT_MAIN } },
    { text: 'Filtra mascotas por nombre, zona o descripción sin recargar la página.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Técnica Debounce: ', options: { bold: true, color: C_CYAN } },
    { text: 'Espera 300ms tras teclear antes de consultar a la API, reduciendo la carga del servidor en un 70%.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 1.05, y: 2.1, w: 5.2, h: 1.8, fontSize: 10.5, fontFace: 'Arial'
  });

  // Caja 2: Edición activa y cambio de foto
  renderCard(slide8, {
    x: 6.8, y: 1.4, w: gW, h: gH,
    title: '📸 Edición Activa y Limpieza en Servidor',
    topBorderColor: C_AMBER
  });
  slide8.addText([
    { text: '• Previsualización en Vivo: ', options: { bold: true, color: C_TEXT_MAIN } },
    { text: 'Uso de la API FileReader para verificar la imagen antes de subirla.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Limpieza de Disco (fs.unlinkSync): ', options: { bold: true, color: C_AMBER } },
    { text: 'Al cambiar de foto o borrar un anuncio, se elimina físicamente la imagen anterior para no saturar el disco.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 7.05, y: 2.1, w: 5.2, h: 1.8, fontSize: 10.5, fontFace: 'Arial'
  });

  // Caja 3: Seguridad
  renderCard(slide8, {
    x: 0.8, y: 4.25, w: gW, h: gH,
    title: '🔒 Seguridad Criptográfica (Bcrypt + JWT)',
    topBorderColor: C_EMERALD
  });
  slide8.addText([
    { text: '• Hashing de Contraseñas: ', options: { bold: true, color: C_TEXT_MAIN } },
    { text: '10 rondas de salting con Bcrypt para proteger las claves.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Tokens Web JSON (JWT): ', options: { bold: true, color: C_EMERALD } },
    { text: 'Sesiones sin estado firmadas digitalmente con 24 horas de vigencia y control estricto de roles.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 1.05, y: 4.95, w: 5.2, h: 1.8, fontSize: 10.5, fontFace: 'Arial'
  });

  // Caja 4: Base de Datos Relacional
  renderCard(slide8, {
    x: 6.8, y: 4.25, w: gW, h: gH,
    title: '🗄️ Base de Datos Relacional (SQLite3)',
    topBorderColor: C_CYAN
  });
  slide8.addText([
    { text: '• Integridad Referencial: ', options: { bold: true, color: C_TEXT_MAIN } },
    { text: 'Uso de ON DELETE CASCADE para evitar datos huérfanos.\n\n', options: { color: C_TEXT_MUTED } },
    { text: '• Consultas Parametrizadas: ', options: { bold: true, color: C_CYAN } },
    { text: 'Prepared Statements con marcadores (?) que bloquean el 100% de ataques SQL Injection.', options: { color: C_TEXT_MUTED } }
  ], {
    x: 7.05, y: 4.95, w: 5.2, h: 1.8, fontSize: 10.5, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 9: CONCLUSIONES Y PROYECCIÓN FUTURA
  // =========================================================================
  const slide9 = pptx.addSlide();
  slide9.background = { color: C_CANVAS };
  renderHeader(slide9, 'Conclusiones y Proyección Futura', 'Cierre');

  // Columna Izquierda: Conclusiones
  renderCard(slide9, {
    x: 0.8, y: 1.4, w: 5.6, h: 5.5,
    title: 'Conclusiones del Proyecto',
    topBorderColor: C_CYAN
  });
  slide9.addText([
    { text: '1. Cumplimiento Total de Objetivos:\n', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: 'Se logró una plataforma web completa, rápida (<100ms) y 100% adaptada a celulares y computadoras.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '2. Impacto Social Positivo:\n', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: 'Centraliza la búsqueda de mascotas en la comunidad, reduciendo la angustia familiar y fomentando la cooperación vecinal.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: '3. Formación Técnica BTH:\n', options: { bold: true, color: C_CYAN, fontSize: 12 } },
    { text: 'Demuestra las competencias adquiridas en Sistemas Informáticos para crear software profesional a costo cero.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 1.05, y: 2.05, w: 5.1, h: 4.5, fontFace: 'Arial'
  });

  // Columna Derecha: Proyección Futura
  renderCard(slide9, {
    x: 6.7, y: 1.4, w: 5.8, h: 5.5,
    title: 'Estrategia de Mejora y Proyección',
    topBorderColor: C_AMBER
  });
  slide9.addText([
    { text: 'Mejoras a Corto Plazo:\n', options: { bold: true, color: C_AMBER, fontSize: 12 } },
    { text: '• Integración de mapas interactivos con geolocalización (Leaflet / Google Maps API) para ubicar el sitio exacto de extravío.\n• Filtros avanzados por especie (perro, gato, ave) y color.\n\n', options: { color: C_TEXT_MUTED, fontSize: 11 } },
    { text: 'Proyección a Mediano y Largo Plazo:\n', options: { bold: true, color: C_AMBER, fontSize: 12 } },
    { text: '• Transformar la web en una Progressive Web App (PWA) instalable directamente en Android e iOS.\n• Sistema de notificaciones push automáticas cuando se reporte una mascota perdida en el barrio del usuario.', options: { color: C_TEXT_MUTED, fontSize: 11 } }
  ], {
    x: 6.95, y: 2.05, w: 5.3, h: 4.5, fontFace: 'Arial'
  });

  // =========================================================================
  // DIAPOSITIVA 10: CIERRE Y PREGUNTAS (DARK LUXURY SLATE)
  // =========================================================================
  const slide10 = pptx.addSlide();
  slide10.background = { color: C_NAVY };

  slide10.addText('¡Muchas Gracias por su Atención!', {
    x: 1.0, y: 1.8, w: 11.33, h: 1.0,
    fontSize: 38, fontFace: 'Arial', bold: true, color: C_WHITE, align: 'center'
  });

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 4.66, y: 2.9, w: 4.0, h: 0.08,
    fill: { color: C_AMBER }
  });

  slide10.addText('¿Preguntas del Tribunal Evaluador?', {
    x: 1.0, y: 3.2, w: 11.33, h: 0.8,
    fontSize: 26, fontFace: 'Arial', bold: true, color: C_AMBER, align: 'center'
  });

  slide10.addText([
    { text: 'Postulantes: ', options: { color: C_TEXT_LIGHT, fontSize: 15 } },
    { text: 'Dietter Leon Justiniano   |   Yimmy Lijeron Mejias\n', options: { bold: true, color: C_WHITE, fontSize: 16 } },
    { text: 'Especialidad: ', options: { color: C_TEXT_LIGHT, fontSize: 13.5 } },
    { text: 'Sistemas Informáticos — BTH Núcleo Las Gamas\n', options: { color: '38BDF8', fontSize: 14 } },
    { text: 'Warnes – Santa Cruz – Bolivia | Gestión 2026', options: { italic: true, color: C_TEXT_LIGHT, fontSize: 12.5 } }
  ], {
    x: 1.0, y: 4.5, w: 11.33, h: 2.0,
    fontFace: 'Arial', align: 'center', valign: 'top'
  });

  // Guardar archivo PPTX
  const outputPath = path.join(__dirname, 'presentacion_defensa.pptx');
  pptx.writeFile({ fileName: outputPath }).then(fileName => {
    console.log(`Presentación PPTX ultra profesional guardada exitosamente en:\n${outputPath}`);
  }).catch(err => {
    console.error('Error al generar PPTX:', err);
  });
}

generarPresentacionUltraProfesional();
