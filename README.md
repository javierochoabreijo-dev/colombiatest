# 🇨🇴 ColombiaTest

App web para preparar el examen de conocimientos de la nacionalidad colombiana.
Cubre las 4 áreas oficiales (Geografía, Historia, Constitución y Cultura) con
módulos interactivos, tests de práctica de respuesta escrita y simulacros en
condiciones de examen.

Sin cuentas, sin servidor y sin llamadas a terceros: es un sitio estático.

## Requisitos

- Node.js 20 o superior

## Arranque

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto http://localhost:5173).

```bash
npm run build      # genera /dist
npm run preview    # sirve /dist, que es lo que se despliega
```

Para revisar antes de desplegar usa `preview`, no `dev`: `dev` sirve los módulos
sin empaquetar y no representa lo que verá el usuario.

## Estructura

```
├─ index.html              # aplica el tema antes del primer pintado
├─ vercel.json             # preset Vite + rewrite SPA
├─ vite.config.js          # Vite + React + Tailwind v4, sin inlining de assets
└─ src/
   ├─ main.jsx
   ├─ index.css            # tokens de color, tipografía y animaciones
   ├─ App.jsx              # hub, navegación y flujo de test/simulacro
   ├─ modulos/             # Geografía, Historia, Constitución, Cultura
   ├─ components/          # piezas compartidas entre módulos
   ├─ lib/                 # tema, progreso, imágenes, utilidades
   ├─ data/                # banco de 80 preguntas y catálogo de imágenes
   └─ assets/              # 70 fotos y la tipografía, servidas con la app
```

## Contenido

Todo sale de la [guía oficial de estudio de la
Cancillería](https://www.cancilleria.gov.co/sites/default/files/DOCUMENTOS-2026/naturalizacion/Guia_de_estudio_ajustada.pdf)
(PDF, 61 MB). El banco son 80 preguntas, 20 por área, en formato de respuesta
escrita con autoevaluación, acorde con el examen real (Resolución 3596 de 2020).

Reglas de contenido que no deben romperse: 5 regiones naturales (nunca 6); el
examen es de respuesta escrita (nunca opción múltiple en el simulacro); la
independencia se consolida en Boyacá (1819); 4 áreas × 20 preguntas = 80.

Historia cubre 44 eventos en 6 eras.

## Diseño

La dirección visual se llama **Vueltiao** y sale del tejido del sombrero: dos
fibras, caña flecha natural y caña teñida de negro, que son literalmente los dos
temas. `src/index.css` es la única fuente de verdad del color; ningún componente
escribe un hex.

Las decisiones y sus mediciones están en [AUDITORIA.md](AUDITORIA.md).

## Qué guarda en el navegador

Dos cosas, ninguna sale del dispositivo y no hay cuenta ni servidor detrás:

| Clave | Qué es |
|---|---|
| `vueltiao-tema` | el tema elegido, claro u oscuro |
| `colombiatest-progreso` | el mejor resultado de cada área |

El progreso se puede borrar desde el pie de la portada. Nada de la app depende
de él: si se pierde, se pierden unos números, no el acceso a nada.

## Sin dependencias externas

Las 70 imágenes y la tipografía viajan con la app en lugar de pedirse a
Wikimedia y a Google Fonts. El motivo está medido: las fotos originales pesaban
hasta 5,5 MB cada una y once peticiones en paralelo disparaban el límite por IP
de Wikimedia, que en una red móvil comparten miles de usuarios. Las imágenes
conservan su atribución CC o de dominio público.

## Despliegue

Repo conectado a Vercel: cada push a `main` despliega solo.

Para importarlo de cero: New Project → elegir el repo → no tocar nada (el
`vercel.json` ya fija framework, comando y salida) → Deploy. **No hace falta
ninguna variable de entorno.**

## Supabase (opcional, no en uso)

La app funciona con `src/data/bancoLocal.js`. Si algún día conviene servir las
preguntas desde una base de datos, el camino está hecho:

1. Crea un proyecto en supabase.com.
2. Ejecuta `supabase/schema.sql` en el SQL Editor (tablas `areas` y `preguntas`
   con RLS de lectura pública, y las 80 preguntas sembradas).
3. Copia `.env.example` a `.env.local` y rellena las dos variables. En Vercel,
   las mismas en Project Settings → Environment Variables.

`src/data/preguntas.js` detecta las variables y cambia de fuente solo. Sin
ellas, Vite descarta el SDK en tiempo de compilación y no pesa nada en el
bundle; en cuanto las definas, sí entrará.
