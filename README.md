# Plataforma Audiovisual - Graduación 2026 EETA
### Escuela de Especialidades Técnico Automotriz
**Producción Audiovisual:** BlueBerry Digital  
**Fecha del Evento:** 25 de Octubre de 2026  

---

## 📁 Carpeta de Despliegue: `eeta-web`

Esta carpeta contiene la solución completa, optimizada y lista para publicarse en **GitHub Pages** o en cualquier servidor web estático.

### Resumen de Ajustes y Optimizaciones Aplicadas:
1. **Título H1**: Actualizado a **"Graduación 2026 EETA"**.
2. **Encuadre de Retratos (Sin cortes de cabezas)**:
   - Se configuró la alineación superior de imagen (`object-position: top center !important;`) para las fotografías del catálogo, preservando los birretes y rostros de los graduados.
3. **Hero Cinematográfico**:
   - Integra de fondo el video conmemorativo (`Videos/video-fondo.mp4`) en reproducción fluida junto con la textura base de `fondo01.jpg`.
4. **Galería con Fondo Real**:
   - `fondo02.png` se renderiza al 100% real sin filtros de opacidad ni gradientes oscuros.
   - Subtítulo simplificado a: *"Haz clic en cualquier imagen para abrir el visor en alta resolución o descárgala en tu dispositivo."*
5. **Reproducción de Video en YouTube & Descarga desde Google Drive**:
   - Iframe adaptativo conectado a YouTube: `https://youtu.be/EZYzmsqlEFg`.
   - Botón directo para descargar el archivo Master en resolución original desde Google Drive.
   - Fondo de la sección de video aclarado para que los detalles de `fondo01.jpg` se distingan con nitidez.
   - **Aviso destacado**: Advertencia de consumo de datos sugiriendo descargar el archivo de 3 GB vía Wi-Fi en computadora.
6. **Sección de Contacto BlueBerry Digital**:
   - Ambientada con el archivo `fondo03.jpg` y un filtro sutil y tenue.
   - Enlace directo a WhatsApp (+52 618 210 3942) y correo (`luisblueberry@gmail.com`).
7. **Depuración del Menú de Navegación**:
   - Se eliminó la sección redundante de "Descargas" y sus accesos en el menú superior y pie de página. Las descargas se gestionan directamente en cada foto y en el reproductor de video.

---

## 🚀 Despliegue en GitHub Pages desde `eeta-web`

Si vas a inicializar el repositorio directamente dentro de `eeta-web`:
```bash
cd eeta-web
git init
git add .
git commit -m "feat: release graduacion 2026 EETA"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

*(El archivo `.gitignore` dentro de `eeta-web` se encarga de excluir `video-graduacion.mp4` para no rebasar el límite de 100 MB de GitHub).*

Luego ve a **Settings** > **Pages** en tu repositorio de GitHub y selecciona la rama `main` / `root`.
