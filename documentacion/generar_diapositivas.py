import subprocess
import sys
import os

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN
except ImportError:
    print("Instalando 'python-pptx' necesario para generar la presentación...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "python-pptx"])
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN

def crear_presentacion():
    prs = Presentation()
    
    # Configurar dimensiones a Widescreen (16:9)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    # Paleta de Colores
    TEAL = RGBColor(16, 152, 173)       # Color Primario
    TEAL_DARK = RGBColor(11, 114, 133)  # Teal oscuro
    DARK = RGBColor(33, 37, 41)         # Texto oscuro
    MUTED = RGBColor(73, 80, 87)        # Gris
    ORANGE = RGBColor(255, 146, 43)     # Acento
    WHITE = RGBColor(255, 255, 255)
    GREEN = RGBColor(43, 138, 62)
    RED = RGBColor(250, 82, 82)
    
    blank_layout = prs.slide_layouts[6]
    
    def pintar_fondo(slide, rgb_color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = rgb_color

    def agregar_titulo(slide, texto, seccion=""):
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.9))
        tf = title_box.text_frame
        tf.word_wrap = True
        
        if seccion:
            p_sec = tf.paragraphs[0]
            p_sec.text = seccion.upper()
            p_sec.font.name = 'Arial'
            p_sec.font.size = Pt(12)
            p_sec.font.bold = True
            p_sec.font.color.rgb = ORANGE
            p_sec.space_after = Pt(2)
            
            p_tit = tf.add_paragraph()
            p_tit.text = texto
            p_tit.font.name = 'Arial'
            p_tit.font.size = Pt(28)
            p_tit.font.bold = True
            p_tit.font.color.rgb = DARK
        else:
            p = tf.paragraphs[0]
            p.text = texto
            p.font.name = 'Arial'
            p.font.size = Pt(32)
            p.font.bold = True
            p.font.color.rgb = TEAL
        return title_box

    # ==========================================
    # DIAPOSITIVA 1: PORTADA (Fondo Oscuro)
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)
    pintar_fondo(slide1, DARK)
    
    portada_box = slide1.shapes.add_textbox(Inches(1.0), Inches(1.0), Inches(11.3), Inches(5.5))
    tf1 = portada_box.text_frame
    tf1.word_wrap = True
    
    p1 = tf1.paragraphs[0]
    p1.text = "BACHILLERATO TÉCNICO HUMANÍSTICO (BTH) - SISTEMAS INFORMÁTICOS\nNÚCLEO EDUCATIVO \"LAS GAMAS\""
    p1.font.name = 'Arial'
    p1.font.size = Pt(14)
    p1.font.color.rgb = ORANGE
    p1.font.bold = True
    p1.space_after = Pt(15)
    
    p2 = tf1.add_paragraph()
    p2.text = "EncuentraMiMascota"
    p2.font.name = 'Arial'
    p2.font.size = Pt(48)
    p2.font.bold = True
    p2.font.color.rgb = WHITE
    p2.space_after = Pt(10)
    
    p3 = tf1.add_paragraph()
    p3.text = "Plataforma Web Responsive para el Reporte y Búsqueda de Mascotas Perdidas"
    p3.font.name = 'Arial'
    p3.font.size = Pt(20)
    p3.font.bold = True
    p3.font.color.rgb = TEAL
    p3.space_after = Pt(30)
    
    p4 = tf1.add_paragraph()
    p4.text = "Postulantes: Leon Justiniano  |  Yimmy Lijeron Mejia\nDocente Tutor: Lic. Ronald Silver Quino Torrez\nDocente de Especialidad: Lic. Ana Gabriela Paz Arauz\nPresidente Comité BTH: Lic. Edwin Eliseo Huayllani Silvestre\nWarnes – Santa Cruz – Bolivia | Gestión 2026"
    p4.font.name = 'Arial'
    p4.font.size = Pt(14)
    p4.font.color.rgb = WHITE

    # ==========================================
    # DIAPOSITIVA 2: 1. PLANTEAMIENTO DEL PROBLEMA (1.1 y 1.2)
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide2, "1. Planteamiento del Problema", "Capítulo 1")
    
    box2_1 = slide2.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.4))
    tf2_1 = box2_1.text_frame
    tf2_1.word_wrap = True
    
    p = tf2_1.paragraphs[0]
    p.text = "1.1. Diagnóstico y Descripción de la Realidad"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = TEAL_DARK
    p.space_after = Pt(10)
    
    bullets2_1 = [
        "El extravío de animales domésticos genera angustia y desmovilización familiar.",
        "Los métodos tradicionales (afiches en postes) se destruyen con el clima y tienen bajo alcance.",
        "Los grupos de Facebook y WhatsApp se saturan rápidamente y carecen de filtros de búsqueda.",
        "📊 Encuesta Local (40 vecinos): El 65% ha perdido una mascota y el 80% califica de ineficientes las redes sociales para búsquedas rápidas."
    ]
    for b in bullets2_1:
        p_b = tf2_1.add_paragraph()
        p_b.text = "• " + b
        p_b.font.name = 'Arial'
        p_b.font.size = Pt(13)
        p_b.font.color.rgb = MUTED
        p_b.space_after = Pt(8)

    box2_2 = slide2.shapes.add_textbox(Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.4))
    tf2_2 = box2_2.text_frame
    tf2_2.word_wrap = True
    
    p = tf2_2.paragraphs[0]
    p.text = "1.2. Identificación del Problema"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = RED
    p.space_after = Pt(10)
    
    bullets2_2 = [
        "Problema Central: Dispersión, desorganización y caducidad inmediata de los avisos de mascotas perdidas.",
        "Falta de una base de datos centralizada accesible desde dispositivos móviles.",
        "Demora crítica en la difusión durante las primeras 48 horas de extravío.",
        "Efecto: Baja tasa de reencuentro y aumento de animales desprotegidos en las calles."
    ]
    for b in bullets2_2:
        p_b = tf2_2.add_paragraph()
        p_b.text = "• " + b
        p_b.font.name = 'Arial'
        p_b.font.size = Pt(13)
        p_b.font.color.rgb = MUTED
        p_b.space_after = Pt(8)

    # ==========================================
    # DIAPOSITIVA 3: 1.3 FORMULACIÓN Y 1.4 OBJETIVOS
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide3, "1.3. Formulación y 1.4. Objetivos", "Capítulo 1")
    
    box3 = slide3.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(5.5))
    tf3 = box3.text_frame
    tf3.word_wrap = True
    
    p = tf3.paragraphs[0]
    p.text = "1.3. Formulación del Problema (Pregunta Guía):"
    p.font.name = 'Arial'
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ORANGE
    
    p_q = tf3.add_paragraph()
    p_q.text = "¿De qué manera el desarrollo de una aplicación web responsive basada en una arquitectura cliente-servidor y base de datos relacional puede optimizar el tiempo de búsqueda, reporte y actualización de anuncios de mascotas perdidas en nuestra comunidad?"
    p_q.font.name = 'Arial'
    p_q.font.size = Pt(14)
    p_q.font.italic = True
    p_q.font.bold = True
    p_q.font.color.rgb = DARK
    p_q.space_after = Pt(15)
    
    p_og = tf3.add_paragraph()
    p_og.text = "1.4.1. Objetivo General:"
    p_og.font.name = 'Arial'
    p_og.font.size = Pt(16)
    p_og.font.bold = True
    p_og.font.color.rgb = TEAL_DARK
    
    p_og_val = tf3.add_paragraph()
    p_og_val.text = "Desarrollar una aplicación web responsive utilizando HTML5, CSS3, JavaScript Vanilla en el frontend y Node.js con SQLite en el backend, que permita reportar, buscar, comentar y actualizar publicaciones y fotografías de mascotas perdidas bajo un sistema controlado de roles de usuario."
    p_og_val.font.name = 'Arial'
    p_og_val.font.size = Pt(13)
    p_og_val.font.color.rgb = MUTED
    p_og_val.space_after = Pt(15)

    p_oe = tf3.add_paragraph()
    p_oe.text = "1.4.2. Objetivos Específicos:"
    p_oe.font.name = 'Arial'
    p_oe.font.size = Pt(16)
    p_oe.font.bold = True
    p_oe.font.color.rgb = TEAL_DARK
    
    bullets_oe = [
        "1. Diagnosticar necesidades de la comunidad mediante encuestas.",
        "2. Diseñar una interfaz gráfica intuitiva y adaptable a móviles (UI/UX).",
        "3. Programar la API REST en Node.js/Express y la base de datos relacional SQLite.",
        "4. Implementar autenticación con JWT y encriptación de claves con Bcrypt.",
        "5. Desarrollar la edición de anuncios, fotos (FileReader) y limpieza de almacenamiento en servidor.",
        "6. Validar el funcionamiento mediante pruebas piloto de usabilidad."
    ]
    for b in bullets_oe:
        p_b = tf3.add_paragraph()
        p_b.text = "• " + b
        p_b.font.name = 'Arial'
        p_b.font.size = Pt(12.5)
        p_b.font.color.rgb = MUTED
        p_b.space_after = Pt(3)

    # ==========================================
    # DIAPOSITIVA 4: 2. PLANIFICACIÓN / 2.1 CRONOGRAMA
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide4, "2. Planificación / 2.1. Cronograma de Actividades", "Capítulo 2")
    
    box4 = slide4.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(5.5))
    tf4 = box4.text_frame
    tf4.word_wrap = True
    
    p = tf4.paragraphs[0]
    p.text = "Cronograma de Ejecución (15 Semanas de Desarrollo):"
    p.font.name = 'Arial'
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = DARK
    p.space_after = Pt(10)
    
    crono = [
        "Semana 1: Reunión inicial con el tutor y definición del tema.",
        "Semana 2 – 3: Diagnóstico de la realidad y aplicación de encuestas a vecinos.",
        "Semana 4: Planteamiento del problema y definición de objetivos.",
        "Semana 5 – 6: Modelado y diseño de la base de datos SQLite relacional.",
        "Semana 7: Maquetación de la interfaz gráfica responsive en HTML5 y CSS3.",
        "Semana 8 – 9: Programación del backend (servidor Node.js, Express y Multer).",
        "Semana 10: Implementación del módulo de autenticación JWT y seguridad Bcrypt.",
        "Semana 11 – 12: Programación del módulo de edición, cambio de fotos y limpieza de disco.",
        "Semana 13 – 14: Pruebas piloto de usabilidad y corrección de errores.",
        "Semana 15: Elaboración del documento final de monografía y presentación de defensa."
    ]
    for c in crono:
        p_c = tf4.add_paragraph()
        p_c.text = "• " + c
        p_c.font.name = 'Arial'
        p_c.font.size = Pt(13)
        p_c.font.color.rgb = MUTED
        p_c.space_after = Pt(5)

    # ==========================================
    # DIAPOSITIVA 5: 2.2 RECURSOS (Humanos, Materiales, Financieros)
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide5, "2.2. Recursos del Proyecto", "Capítulo 2")
    
    # 2.2.1 Humanos
    box5_1 = slide5.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(3.7), Inches(5.4))
    tf5_1 = box5_1.text_frame
    tf5_1.word_wrap = True
    p = tf5_1.paragraphs[0]
    p.text = "2.2.1. Humanos"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = TEAL_DARK
    p.space_after = Pt(10)
    
    rec_h = [
        "Postulantes: Leon Justiniano y Yimmy Lijeron Mejia.",
        "Docente Tutor: Lic. Ronald Silver Quino Torrez.",
        "Docente de Especialidad: Lic. Ana Gabriela Paz Arauz.",
        "Comunidad: 40 vecinos encuestados y 5 usuarios para pruebas piloto."
    ]
    for r in rec_h:
        p_r = tf5_1.add_paragraph()
        p_r.text = "• " + r
        p_r.font.name = 'Arial'
        p_r.font.size = Pt(13)
        p_r.font.color.rgb = MUTED
        p_r.space_after = Pt(8)

    # 2.2.2 Materiales
    box5_2 = slide5.shapes.add_textbox(Inches(4.8), Inches(1.5), Inches(3.7), Inches(5.4))
    tf5_2 = box5_2.text_frame
    tf5_2.word_wrap = True
    p = tf5_2.paragraphs[0]
    p.text = "2.2.2. Materiales"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = TEAL_DARK
    p.space_after = Pt(10)
    
    rec_m = [
        "1 Computadora portátil (Laptop Intel Core i5, 8GB RAM).",
        "1 Teléfono inteligente para pruebas móviles.",
        "Visual Studio Code, Git, GitHub, Node.js y SQLite3.",
        "Navegador Google Chrome y paquete ofimático."
    ]
    for r in rec_m:
        p_r = tf5_2.add_paragraph()
        p_r.text = "• " + r
        p_r.font.name = 'Arial'
        p_r.font.size = Pt(13)
        p_r.font.color.rgb = MUTED
        p_r.space_after = Pt(8)

    # 2.2.3 Financieros
    box5_3 = slide5.shapes.add_textbox(Inches(8.8), Inches(1.5), Inches(3.7), Inches(5.4))
    tf5_3 = box5_3.text_frame
    tf5_3.word_wrap = True
    p = tf5_3.paragraphs[0]
    p.text = "2.2.3. Financieros"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = GREEN
    p.space_after = Pt(10)
    
    rec_f = [
        "Inversión en Software: 0 Bs. (Herramientas Open Source gratuitas).",
        "Financiamiento Externo: No se requirió financiamiento externo.",
        "Sostenibilidad: El proyecto es autosostenible y de costo cero para la comunidad."
    ]
    for r in rec_f:
        p_r = tf5_3.add_paragraph()
        p_r.text = "• " + r
        p_r.font.name = 'Arial'
        p_r.font.size = Pt(13)
        p_r.font.color.rgb = MUTED
        p_r.space_after = Pt(8)

    # ==========================================
    # DIAPOSITIVA 6: 2.3 CÁLCULO DE COSTOS
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide6, "2.3. Cálculo de Costos", "Capítulo 2")
    
    box6 = slide6.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(5.5))
    tf6 = box6.text_frame
    tf6.word_wrap = True
    
    costos = [
        ("2.3.1. Costo de Inversión (Gasto Inicial):", "0 Bs. (Software libre, equipo propio preexistente amortizado)."),
        ("2.3.2. Costo de Operación (Mensual):", "170 Bs. / mes (Energía eléctrica: 20 Bs. + Conexión a internet banda ancha: 150 Bs.)."),
        ("2.3.3. Costos Variables:", "150 Bs. (Publicidad digital en redes sociales: 100 Bs. + Material de oficina: 50 Bs.)."),
        ("2.3.4. Costos Fijos (Mano de Obra):", "2,400 Bs. (120 horas de programación simuladas a 20 Bs. / hora).")
    ]
    
    for i, (titulo, desc) in enumerate(costos):
        p_t = tf6.paragraphs[0] if i == 0 else tf6.add_paragraph()
        p_t.text = titulo
        p_t.font.name = 'Arial'
        p_t.font.size = Pt(16)
        p_t.font.bold = True
        p_t.font.color.rgb = TEAL_DARK
        
        p_d = tf6.add_paragraph()
        p_d.text = "• " + desc
        p_d.font.name = 'Arial'
        p_d.font.size = Pt(13.5)
        p_d.font.color.rgb = MUTED
        p_d.space_after = Pt(12)

    # ==========================================
    # DIAPOSITIVA 7: 3. CÓMO FUNCIONA - ARQUITECTURA Y ROLES
    # ==========================================
    slide7 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide7, "3. ¿Cómo Funciona? - Arquitectura y Roles", "Demostración")
    
    box7 = slide7.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(5.5))
    tf7 = box7.text_frame
    tf7.word_wrap = True
    
    roles = [
        ("Arquitectura Cliente-Servidor Desacoplada:", "Frontend nativo en HTML5/CSS3/JS conectado mediante API REST a un backend en Node.js/Express y SQLite."),
        ("👤 Rol Invitado (Público):", "Acceso al catálogo de mascotas, uso del buscador en tiempo real por nombre/zona y lectura de comentarios sin registrarse."),
        ("🐾 Rol Usuario Registrado:", "Publica avisos con foto y recompensa, edita anuncios y reemplaza fotos en vivo, alterna a 'Encontrado' y comenta en la comunidad."),
        ("⚙️ Rol Administrador:", "Panel protegido para gestionar usuarios (CRUD) y moderar o eliminar publicaciones falsas o inapropiadas.")
    ]
    for i, (titulo, desc) in enumerate(roles):
        p_t = tf7.paragraphs[0] if i == 0 else tf7.add_paragraph()
        p_t.text = titulo
        p_t.font.name = 'Arial'
        p_t.font.size = Pt(16)
        p_t.font.bold = True
        p_t.font.color.rgb = TEAL_DARK
        
        p_d = tf7.add_paragraph()
        p_d.text = "• " + desc
        p_d.font.name = 'Arial'
        p_d.font.size = Pt(13.5)
        p_d.font.color.rgb = MUTED
        p_d.space_after = Pt(12)

    # ==========================================
    # DIAPOSITIVA 8: 3. CÓMO FUNCIONA - INNOVACIONES TÉCNICAS
    # ==========================================
    slide8 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide8, "3. ¿Cómo Funciona? - Innovaciones Técnicas", "Demostración")
    
    box8 = slide8.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(5.5))
    tf8 = box8.text_frame
    tf8.word_wrap = True
    
    tech_points = [
        ("🔍 Buscador Inteligente con Debounce (300 ms):", "Filtrado en tiempo real sin recargas de página, optimizando el consumo de red."),
        ("📸 Edición Activa y Cambio de Fotos en Vivo:", "Previsualización instantánea con la API FileReader y eliminación automática de fotos obsoletas en servidor (fs.unlinkSync)."),
        ("🔒 Seguridad y Criptografía Web:", "Hashing de contraseñas con Bcrypt (10 rondas de salt) y sesiones sin estado protegidas con Tokens JWT (24h)."),
        ("🗄️ Base de Datos Relacional Segura:", "Consultas parametrizadas (anti SQL Injection) e integridad referencial con ON DELETE CASCADE.")
    ]
    for i, (titulo, desc) in enumerate(tech_points):
        p_t = tf8.paragraphs[0] if i == 0 else tf8.add_paragraph()
        p_t.text = titulo
        p_t.font.name = 'Arial'
        p_t.font.size = Pt(16)
        p_t.font.bold = True
        p_t.font.color.rgb = TEAL_DARK
        
        p_d = tf8.add_paragraph()
        p_d.text = "• " + desc
        p_d.font.name = 'Arial'
        p_d.font.size = Pt(13.5)
        p_d.font.color.rgb = MUTED
        p_d.space_after = Pt(12)

    # ==========================================
    # DIAPOSITIVA 9: CONCLUSIONES Y PROYECCIÓN
    # ==========================================
    slide9 = prs.slides.add_slide(blank_layout)
    agregar_titulo(slide9, "Conclusiones y Proyección Futura", "Cierre")
    
    box9_1 = slide9.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.4))
    tf9_1 = box9_1.text_frame
    tf9_1.word_wrap = True
    p = tf9_1.paragraphs[0]
    p.text = "Conclusiones del Proyecto"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = TEAL_DARK
    p.space_after = Pt(10)
    
    conc = [
        "100% de los objetivos funcionales cumplidos.",
        "Tiempos de respuesta ultra rápidos (<100ms) y diseño totalmente responsivo para celulares.",
        "Demuestra las competencias técnicas de desarrollo Full-Stack adquiridas en el BTH Las Gamas."
    ]
    for c in conc:
        p_c = tf9_1.add_paragraph()
        p_c.text = "• " + c
        p_c.font.name = 'Arial'
        p_c.font.size = Pt(13)
        p_c.font.color.rgb = MUTED
        p_c.space_after = Pt(8)

    box9_2 = slide9.shapes.add_textbox(Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.4))
    tf9_2 = box9_2.text_frame
    tf9_2.word_wrap = True
    p = tf9_2.paragraphs[0]
    p.text = "Estrategia de Mejora y Proyección"
    p.font.name = 'Arial'
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ORANGE
    p.space_after = Pt(10)
    
    proy = [
        "Corto Plazo: Integración de mapas con geolocalización (Leaflet / Google Maps API).",
        "Mediano Plazo: Transformar la plataforma en una PWA (Progressive Web App) instalable en Android e iOS.",
        "Largo Plazo: Notificaciones push automáticas cuando se reporte una mascota perdida en el barrio del usuario."
    ]
    for pr in proy:
        p_pr = tf9_2.add_paragraph()
        p_pr.text = "• " + pr
        p_pr.font.name = 'Arial'
        p_pr.font.size = Pt(13)
        p_pr.font.color.rgb = MUTED
        p_pr.space_after = Pt(8)

    # ==========================================
    # DIAPOSITIVA 10: CIERRE (Fondo Oscuro)
    # ==========================================
    slide10 = prs.slides.add_slide(blank_layout)
    pintar_fondo(slide10, DARK)
    
    cierre_box = slide10.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(11.3), Inches(3.5))
    tf10 = cierre_box.text_frame
    tf10.word_wrap = True
    
    p_thx = tf10.paragraphs[0]
    p_thx.text = "¡Muchas Gracias por su Atención!"
    p_thx.alignment = PP_ALIGN.CENTER
    p_thx.font.name = 'Arial'
    p_thx.font.size = Pt(40)
    p_thx.font.bold = True
    p_thx.font.color.rgb = WHITE
    p_thx.space_after = Pt(20)
    
    p_ask = tf10.add_paragraph()
    p_ask.text = "¿Preguntas del Tribunal Evaluador?"
    p_ask.alignment = PP_ALIGN.CENTER
    p_ask.font.name = 'Arial'
    p_ask.font.size = Pt(26)
    p_ask.font.bold = True
    p_ask.font.color.rgb = ORANGE
    p_ask.space_after = Pt(25)
    
    p_aut = tf10.add_paragraph()
    p_aut.text = "Postulantes: Leon Justiniano  |  Yimmy Lijeron Mejia\nSistemas Informáticos — BTH Las Gamas\nWarnes – Santa Cruz – Bolivia | Gestión 2026"
    p_aut.alignment = PP_ALIGN.CENTER
    p_aut.font.name = 'Arial'
    p_aut.font.size = Pt(14)
    p_aut.font.color.rgb = MUTED

    dir_path = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(dir_path, "presentacion_defensa.pptx")
    prs.save(output_path)
    print(f"Presentación PPTX guardada exitosamente en:\n{output_path}")

if __name__ == "__main__":
    crear_presentacion()
