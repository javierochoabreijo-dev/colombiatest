# 🇨🇴 ColombiaTest

App web para preparar el examen de conocimientos de la nacionalidad colombiana.
Cubre las 4 áreas oficiales (Geografía, Historia, Constitución, Cultura) con
módulos interactivos + tests de práctica de respuesta escrita. Sin logins ni
datos personales.

## Requisitos
- Node.js 18+ (recomendado 20+)

## Arranque
```bash
npm install
npm run dev
```
Abre la URL que imprime Vite (por defecto http://localhost:5173).

## Build de producción
```bash
npm run build      # genera /dist
npm run preview    # sirve /dist localmente para revisar
```

## Estructura
```
colombiatest/
├─ index.html
├─ package.json
├─ vite.config.js          # Vite + React + Tailwind v4
├─ src/
│  ├─ main.jsx             # punto de entrada
│  ├─ index.css            # @import "tailwindcss"
│  ├─ App.jsx              # HUB: navegación + banco de 80 preguntas + simulacros
│  └─ modulos/
│     ├─ MapaRegiones.jsx      # Geografía (mapa interactivo DANE)
│     ├─ LineaTiempo.jsx       # Historia (38 eventos, 6 eras)
│     ├─ Constitucion.jsx      # Constitución (5 secciones)
│     └─ CulturaSociedad.jsx   # Cultura (explorador + flashcards)
```

## Contenido
Todo el contenido proviene de la guía oficial de estudio de la Cancillería.
El banco de preguntas usa formato de respuesta escrita / completar con
autoevaluación, acorde con el formato del examen real (Resolución 3596 de 2020).

## Despliegue en Vercel
1. Sube el repo a GitHub.
2. En Vercel: New Project → importa el repo.
3. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
4. Deploy.
