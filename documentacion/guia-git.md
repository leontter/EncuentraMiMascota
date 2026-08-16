# Guía Básica de Git y GitHub para la Defensa 🐾

Esta guía te ayudará a subir tu proyecto **EncuentraMiMascota** a GitHub paso a paso. Recuerda que el jurado valora muchísimo ver que has versionado tu código.

---

## 1. Configuración Inicial de Git (Solo se hace una vez)
Abre la terminal de tu computadora (PowerShell o Git Bash) y ejecuta los siguientes comandos con tu información:

```bash
# Configura tu nombre de forma global (opcional)
git config --global user.name "Leon Justiniano"

# Configura tu correo electrónico de forma global (opcional)
git config --global user.email "leonjustinianodietter@gmail.com"
```

> [!NOTE]
> **¡Ya lo hice por ti!** He inicializado el repositorio Git en la carpeta del proyecto y he configurado localmente tu correo `leonjustinianodietter@gmail.com` y tu nombre `Leon Justiniano`. Si haces commits en este proyecto, se registrarán con tus credenciales automáticamente.

---

## 2. Inicializar Git en el Proyecto
Entra a la carpeta de tu proyecto en la terminal (donde está el archivo `server.js`) y ejecuta:

```bash
# 1. Inicializar el repositorio local
git init

# 2. Agregar todos los archivos para el seguimiento (excepto las dependencias pesadas de node_modules)
# Nota: Si no tienes un archivo .gitignore, Git subirá todo. Nosotros crearemos uno automático.
git add .

# 3. Guardar tu primer commit (una foto del estado actual del código)
git commit -m "Primer commit: Estructura completa de EncuentraMiMascota"
```

---

## 3. Subir el Proyecto a GitHub (En la Nube)
Sigue estos pasos en tu navegador:
1. Ve a [GitHub](https://github.com) e inicia sesión.
2. Haz clic en el botón **New** (Nuevo repositorio) en la parte superior izquierda.
3. Rellena los datos:
   - **Repository name:** `EncuentraMiMascota`
   - **Description:** `Proyecto de Tecnología BTH - Sistemas Informáticos`
   - Déjalo como **Public** o **Private** (según prefieras).
   - **¡IMPORTANTE!** No marques las casillas de agregar README, .gitignore o licencia (ya los tenemos en el código).
4. Haz clic en **Create repository**.
5. Copia las tres líneas de comando que te da GitHub bajo el título **"…or push an existing repository from the command line"**. Deberían verse así:

```bash
# Renombrar la rama principal a 'main'
git branch -M main

# Conectar tu carpeta local con el servidor de GitHub
git remote add origin https://github.com/TU_USUARIO/EncuentraMiMascota.git

# Subir los archivos por primera vez
git push -u origin main
```

*(Si es la primera vez que usas Git, te aparecerá una ventana pidiéndote iniciar sesión en tu navegador para dar permisos a tu computadora. Solo dale aceptar).*

---

## 4. Preguntas Frecuentes que el Jurado te puede hacer en la Defensa

*   **P: ¿Qué es Git?**
    *   *R:* Es un sistema de control de versiones. Sirve para registrar todos los cambios que hacemos en los archivos de nuestro código, permitiendo volver a versiones anteriores y trabajar en equipo sin sobreescribir el trabajo de otros.
*   **P: ¿Qué es GitHub?**
    *   *R:* Es una plataforma en la nube (un servidor en internet) que aloja repositorios de Git. Sirve para guardar copias de seguridad del código y compartirlo con otros desarrolladores.
*   **P: ¿Para qué sirve el archivo `.gitignore`?**
    *   *R:* Sirve para decirle a Git qué archivos o carpetas debe ignorar y no subir a internet. Por ejemplo, la carpeta `node_modules` es muy pesada y no se sube porque cualquier programador la puede descargar ejecutando `npm install`.
*   **P: ¿Qué es un "commit"?**
    *   *R:* Un commit es un guardado de cambios con un mensaje descriptivo. Es como guardar una partida en un videojuego en un punto específico.
*   **P: ¿Cómo verías el historial de cambios en tu terminal?**
    *   *R:* Usando el comando `git log` o `git log --oneline` para ver una lista simplificada de todos los commits que he realizado en el proyecto.
