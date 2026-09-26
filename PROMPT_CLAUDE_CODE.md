# Prompt inicial para Claude Code

Copia y pega lo siguiente como primer mensaje al abrir este proyecto en Claude Code.

---

Estás trabajando en **ColombiaTest**, una web app para preparar el examen de
conocimientos de la nacionalidad colombiana. El proyecto ya está construido y
funciona; tu trabajo es llevarlo a producción. Lee el `README.md` completo antes
de empezar.

## Contexto del proyecto

- **Stack:** Vite + React 18 + Tailwind v4. Supabase (datos), Vercel (deploy).
- **Sin logins ni perfiles.** No hay datos de usuario. No añadas autenticación.
- **4 áreas oficiales:** Geografía, Historia, Constitución, Cultura. Cada una es
  un módulo interactivo en `src/modulos/`. El hub y los tests están en `src/App.jsx`.
- **Contenido:** proviene solo de la guía oficial de la Cancillería. No inventes
  datos ni añadas preguntas sin fuente.

## Reglas de contenido que NO debes romper (ya validadas)

1. Colombia tiene **5 regiones** naturales (Caribe, Andina, Pacífica, Orinoquía,
   Amazónica). Nunca 6.
2. El examen real es de **respuesta escrita / completar** (Resolución 3596 de
   2020). La opción múltiple solo vale como práctica, **nunca en el simulacro**.
3. La independencia se consolida en la **Batalla de Boyacá (1819)**; el 20 de
   julio de 1810 es el Grito/Junta Suprema, no el acta final.
4. Estructura del examen: **4 áreas × 20 preguntas = 80**.

## Estado actual

- Los 4 módulos + hub + banco de 80 preguntas funcionan (build verificado).
- El banco vive incrustado en `src/App.jsx` (`const BANCO`) y también, ya
  extraído, en `src/data/bancoLocal.js`.
- Ya existe la infraestructura de datos **sin cablear**:
  - `supabase/schema.sql` — tablas `areas` y `preguntas` + RLS + seed de 80.
  - `src/lib/supabase.js` — cliente (es `null` si no hay variables de entorno).
  - `src/data/preguntas.js` — `cargarBanco()`: lee de Supabase o cae al local.

## Primera tarea

Cablea `cargarBanco()` en `src/App.jsx`:

1. Reemplaza el uso del `const BANCO` incrustado por una carga con `useEffect` +
   `useState` que llame a `cargarBanco()` (async) al montar la app.
2. Muestra un estado de carga mientras resuelve.
3. Elimina el `const BANCO` duplicado de `App.jsx` (la fuente pasa a ser
   `src/data/bancoLocal.js` / Supabase). Verifica que los tests y ambos
   simulacros (20 y 80) sigan funcionando igual.
4. Corre `npm run build` y confirma que compila sin errores.

No configures aún mis claves de Supabase: la app debe seguir funcionando con el
fallback local mientras yo no defina el `.env.local`.

## Tareas siguientes (no las hagas hasta que te lo pida)

- Conectar imágenes libres (Wikimedia Commons) en las fichas de fauna y cultura,
  usando un campo `imagen_url` con atribución al pie.
- ~~Integración de pagos con Wompi para un tier premium~~ — descartado el 25/09/2026:
  la app va a ser gratuita entera.
- Despliegue en Vercel con las variables de entorno.

Empieza confirmando que entiendes el estado del proyecto y muéstrame tu plan para
la primera tarea antes de escribir código.
