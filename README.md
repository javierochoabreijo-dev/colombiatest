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

## Infraestructura (preparada para Claude Code)

### Supabase
1. Crea un proyecto en supabase.com.
2. En el SQL Editor, ejecuta `supabase/schema.sql` (crea las tablas `areas` y
   `preguntas` con RLS de lectura pública, y siembra las 80 preguntas).
3. Copia `.env.example` a `.env.local` y rellena `VITE_SUPABASE_URL` y
   `VITE_SUPABASE_ANON_KEY` (Project Settings → API).

La app funciona **sin Supabase** usando `src/data/bancoLocal.js` como fallback.
En cuanto definas las variables de entorno, `src/data/preguntas.js` leerá de
Supabase automáticamente. (Falta cablear `cargarBanco()` en `App.jsx`: es la
primera tarea sugerida para Claude Code.)

### Estructura de datos añadida
```
src/
├─ lib/supabase.js        # cliente (null si no hay env → usa fallback)
├─ data/
│  ├─ bancoLocal.js       # las 80 preguntas como módulo JS (fallback)
│  └─ preguntas.js        # cargarBanco(): Supabase con fallback a local
supabase/
└─ schema.sql             # tablas + RLS + seed de 80 preguntas
```

### Despliegue en Vercel
- `vercel.json` ya incluye el preset Vite y el rewrite SPA.
- En Vercel, añade las mismas variables de entorno (`VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`) en Project Settings → Environment Variables.
