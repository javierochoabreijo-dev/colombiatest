# Auditoría estética · ColombiaTest

**Fecha:** 2 de agosto de 2026
**Alcance:** hub, los 4 módulos, flujo de test y simulacro.
**Método:** medición directa en el DOM sobre el dev server (`npm run dev`), en viewport
móvil (375×812) y escritorio (903×694). Las cifras que aparecen abajo están medidas,
no estimadas.

**Estado:** los puntos **1 a 5 están resueltos**, y del 6 quedan dos detalles menores.
Ver «Estado al 4 de agosto» al final.

---

## Resumen

El problema de fondo no es cosmético: los 4 módulos repiten el envoltorio de página
completo dentro del shell que ya pone `App`. Eso estrangula el mapa interactivo hasta
266 px y come 32 px de ancho útil en móvil. Después de eso, lo más rentable son las
áreas táctiles (los CTAs principales miden 30 px) y la falta de un sistema de color
(36 hex sueltos, con el mismo color significando cinco cosas distintas).

Prioridad sugerida: **1 → 2 → 3 → 4 → 5**. Los puntos 1 y 2 afectan a función, no solo
a apariencia.

---

## 1. Shell duplicado — el problema de fondo · ✅ RESUELTO

> Resuelto en `47c7980`. Los módulos ya no traen envoltorio propio; el ancho lo decide
> `App` vía `MODULOS[].ancho`. Medido: mapa 266×282 → **458×485 px**, contenido móvil
> 311 → **343 px**, `min-h-screen` 2 → **1**, scroll anidado 1 → **0**, cabecera
> duplicada eliminada. Lo de abajo queda como registro del diagnóstico original.

`App` ya define el envoltorio de página (`min-h-screen` + fondo + `max-w-2xl` + `px-4 py-6`)
en `src/App.jsx:310-312`. Cada módulo vuelve a definir el suyo dentro:

| Archivo | Línea | Envoltorio que repite |
|---|---|---|
| `src/modulos/MapaRegiones.jsx` | 527, 530 | `min-h-screen` + `max-w-5xl mx-auto px-4 py-6` |
| `src/modulos/LineaTiempo.jsx` | 383, 384 | `min-h-screen` + `max-w-2xl mx-auto px-4 py-6` |
| `src/modulos/Constitucion.jsx` | 294, 296 | `min-h-screen` + `max-w-2xl mx-auto px-4 py-6` |
| `src/modulos/CulturaSociedad.jsx` | 571, 573 | `min-h-screen` + `max-w-2xl mx-auto px-4 py-6` |

### Consecuencias medidas

- **El mapa interactivo se renderiza a 266×282 px** en una ventana de 903 px.
  `MapaRegiones` pide `max-w-5xl` (1024 px) pero el `max-w-2xl` (672 px) del padre
  lo recorta a 640 px, y dentro de eso el grid de 2 columnas deja 292 px por columna.
  La pieza central del módulo estrella acaba con tamaño de sello.
- **Doble padding.** En móvil el contenido útil baja de 375 px a 343 px porque `px-4`
  se aplica dos veces.
- **Cabeceras duplicadas.** `App` pinta "🗺️ Geografía" y justo debajo el módulo pinta
  "🗺️ Regiones de Colombia". Mismo patrón en Cultura ("🎭 Cultura" → "🎭 Cultura y Sociedad").
- **Dos `min-h-screen` apilados** y el fondo `#FAF7EF` pintado dos veces.
- **Scroll anidado.** El panel de detalle del mapa es un contenedor de 360 px de alto
  con 518 px de contenido dentro (`max-h-[360px] overflow-y-auto`), metido a su vez
  dentro del scroll de la página.

### Cómo se arregla

Quitar de los 4 módulos el `min-h-screen`, el fondo, el `max-w-*`, el `px-4 py-6` y su
`<header>` propio: que rendericen solo su contenido y hereden el shell de `App`. Para
que el mapa respire, `App` debería permitir un ancho mayor cuando la vista es un módulo
(p. ej. `max-w-2xl` por defecto y `max-w-5xl` en la vista de Geografía), en lugar de que
lo declare el hijo.

Las barras de categoría `sticky top-0` de LineaTiempo (línea 395), Constitucion (307) y
CulturaSociedad (612) hay que revisarlas al mover el shell: quedan pegadas al borde
superior del viewport sin margen.

---

## 2. Áreas táctiles por debajo del mínimo · ✅ RESUELTO

> Resuelto en `47c7980`. Los 8 CTAs del hub pasan a 44 px de alto y "Test" a 51 px de
> ancho; cero objetivos por debajo de 44 px en el hub.

Medido en móvil (375 px) en el hub:

| Botón | Tamaño | Mínimo recomendado |
|---|---|---|
| "Estudiar" (×4) | 83×**30** px | 44×44 |
| "Test" (×4) | **43**×**30** px | 44×44 |

Son los 8 accesos principales de toda la app. Están en `src/App.jsx:249-253`
(`py-1.5` + `text-xs`).

Los botones del bloque Simulacro sí cumplen (148×63 px).

---

## 3. La paleta no es un sistema

**36 valores hex hardcodeados** repartidos por el código, cero tokens. `src/index.css`
contiene únicamente `@import "tailwindcss"`.

### 3a. Cremas redundantes

Once tonos casi indistinguibles conviviendo:

```
#FAF7EF  #FFFDF8  #F5F1E6  #F7F4EC  #EEE7D8  #EDE9DE
#EDE7DA  #E7E2D6  #E0D9C8  #D9D4C7  #D8D1C2
```

Deberían colapsar a una escala de 4-5 pasos (fondo / superficie / superficie elevada /
borde suave / borde).

### 3b. Colisiones semánticas (lo más grave de este punto)

El color no codifica nada porque el mismo valor significa cosas distintas según dónde:

| Color | Significados simultáneos |
|---|---|
| `#1E7F8C` | Geografía (área) · Caribe (región) · Derechos (Constitución) · Deporte (Cultura) · Independencia (Historia) |
| `#B5892B` | Cultura (área) · **CTA de Simulacro** · Símbolos (Cultura) · Orinoquía (región) · modo Flashcards |
| `#8C3B3B` | Protección · Fiestas · Violencia · **botón "No acerté"** |
| `#5B4B8A` | Constitución (área) · Principios · Rama Judicial · Música y arte · Historia contemporánea |

Dos casos concretos que confunden al usuario:

- El **CTA global principal** (Simulacro, `src/App.jsx:267`) usa exactamente el mismo
  dorado que el área Cultura. El botón más importante de la app parece una categoría más.
- El **rojo de acción destructiva** ("No acerté", `src/App.jsx:210`) es también color de
  categoría de contenido. Rojo debería significar una sola cosa.

Lo mínimo: reservar un color para CTA primario, uno para acción destructiva, y dejar los
colores de área solo para identificar áreas.

---

## 4. La tipografía "editorial" no existe en Windows/Android

`fontFamily: "Georgia, serif"` aparece inline en ~30 sitios, pero **no se carga ninguna
webfont**. Donde no hay Georgia instalada (Windows sin Office, Android) cae a una serif
genérica y el carácter editorial —que es la mejor decisión estética actual del proyecto—
se pierde justo en la mayor parte del parque de dispositivos.

Arreglo: cargar una serif real (Lora, Bitter, Source Serif) y declararla una sola vez
como token en `index.css`, no inline en 30 componentes.

---

## 5. Emoji como iconografía

- **La bandera 🇨🇴 del título se renderiza como las letras "CO" en Windows.** Verificado
  en captura: el hub muestra "CO" encima de "ColombiaTest". Windows no dibuja emoji de
  banderas de país. Está en `src/App.jsx` (header del hub) y en `CulturaSociedad.jsx:13`
  (categoría "Símbolos").
- El resto de emoji (🗺️ 🕰️ ⚖️ 🎭 y los ~40 de fauna/categorías) cambian de estilo según
  el SO, así que la identidad visual la define Apple/Google/Microsoft, no el proyecto.

Arreglo mínimo: sustituir la bandera por un SVG propio (ya hay uno hecho,
`BanderaSVG` en `CulturaSociedad.jsx:349`). Arreglo completo: set de iconos SVG.

---

## 6. Puntos menores

- **Contraste.** Mayormente correcto. Tres casos por debajo de 4.5:1, todos a 3.19:
  el dorado `#B5892B` sobre blanco (pill "Orinoquía"), el tagline `text-white/85` sobre
  la cabecera del panel, y la "×" de cerrar.
- **Texto a 11 px** en los subtítulos del bloque Simulacro ("5 por área, rotan",
  "como el examen real"), `src/App.jsx:268-273`.
- **Alineación mixta en el hub**: cabecera centrada, "Explora las 4 áreas" alineado a la
  izquierda justo debajo.
- **Escala de radios** (8/12/16 px) sí es consistente. No hace falta tocarla.

---

## Opciones de mejora

### Opción A — Solo fundaciones · ✅ HECHA (`47c7980`)
Arreglar el punto 1 (shell duplicado, mapa a ancho real, cabeceras, scroll anidado) y el
punto 2 (CTAs a 44 px). Sin tocar color ni tipografía: el look queda igual pero deja de
estar roto. Riesgo bajo y es lo que más se nota.

### Opción B — Fundaciones + sistema de color y tipo
A, más: tokens CSS reales, colapsar los 11 cremas, romper las colisiones semánticas
(un color para CTA, uno para destructivo, uno por área), cargar webfont y sustituir los
emoji críticos empezando por la bandera.

### Opción C — Rediseño visual completo
B, más una dirección estética nueva: jerarquía del hub, tratamiento de tarjetas, densidad,
bloque de Simulacro y pantalla de resultados. Requiere elegir entre 2-3 direcciones
visuales antes de implementar.

---

## Contexto para retomar

- El proyecto vive en `colombiatest/` (subcarpeta). `npm run dev` y `npm run build` se
  ejecutan desde ahí.
- Trabajo ya completado antes de esta auditoría, todo verificado con `npm run build`:
  - `cargarBanco()` cableado en `App.jsx` con `useEffect`/`useState` + estado de carga;
    el `const BANCO` duplicado quedó eliminado (fuente: `src/data/bancoLocal.js` o Supabase).
  - Imágenes libres de Wikimedia Commons con atribución: 47 claves de fauna en
    `src/data/faunaImagenes.js` + 22 fichas de cultura, vía el componente
    `src/components/ImagenAtribuida.jsx`.
- Tarea pendiente del plan original: despliegue en Vercel. (La integración de pagos con
  Wompi se descartó el 25 de septiembre: la app va a ser gratuita entera.)
- Reglas de contenido que no deben romperse: 5 regiones naturales (nunca 6); el examen real
  es de respuesta escrita (nunca opción múltiple en el simulacro); la independencia se
  consolida en Boyacá (1819); 4 áreas × 20 preguntas = 80.

---

## Estado al 2 de agosto de 2026

Todo el trabajo vive en la rama **`feat/datos-imagenes-layout`** (4 commits, working tree
limpio). No está pusheada ni fusionada a `master`.

### Dirección visual: decidida

Se compararon tres direcciones y **se eligió «Vueltiao»**, con el requisito añadido de
tema claro + oscuro y botón de cambio en una esquina.

- Comparativa de las tres: https://claude.ai/code/artifact/05b317b4-91f7-45e3-ba1f-bd4e1d7a4523
- Espécimen de Vueltiao con los dos temas: https://claude.ai/code/artifact/d7159e49-5e10-43d6-8906-759ff71f1029

Decisiones de color ya cerradas (los valores completos están en la tabla del segundo enlace):

- Los dos temas salen del propio tejido: oscuro `#17120E` (fibra negra), claro `#F2EADB`
  (caña flecha). No es una inversión mecánica.
- **La acción primaria cambia de tono entre temas**: amarillo `#F2B705` en oscuro, negro
  tejido `#1F1712` en claro. El amarillo rellena bien sobre oscuro pero pierde contraste
  sobre caña.
- **Cada área necesita tres valores, no uno**: relleno, texto sobre el relleno, y tono para
  texto sobre el fondo. En claro los tres coinciden; en oscuro divergen. Salió de medir: el
  magenta de Cultura con texto oscuro daba 3,22:1 y los contornos de Constitución y Cultura
  2,88 y 4,07 sobre superficie oscura.
- Verificado por medición: paridad exacta de 28 tokens en los tres bloques de tema y los
  16 pares de contraste por encima de 4,5:1.

**Sin verificar visualmente.** El panel de navegador dejó de responder durante la sesión, así
que el espécimen no se ha visto renderizado. Falta comprobar a ojo el peso de la tipografía
en mayúsculas y si el tema claro conserva la energía del oscuro.

### Siguiente paso

Extraer tokens y componentes sobre Vueltiao y subirlos a un proyecto nuevo de Claude Design
(la cuenta ya tiene acceso; existe otro proyecto, «JaviFinance Design System», que no se toca).
Componentes candidatos, varios ya duplicados en el código: pill de filtro (copiado en 4
módulos), tarjeta expandible, barra de progreso, botón, modal/lightbox y pantalla de
resultados. `shuffle()` también está definido dos veces.

Decisión pendiente: guardar el tema elegido sería lo único que la app almacenaría en el
navegador. Sigue sin haber cuentas ni datos personales, pero conviene confirmarlo.

Ojo: el sistema vive como HTML en Claude Design, así que portar las decisiones a los
componentes React es un paso manual.

---

## Estado al 4 de agosto de 2026

La dirección Vueltiao **está implementada en el código React**. Se descartó pasar antes
por Claude Design: el sistema habría vivido como HTML y portarlo a los componentes seguía
siendo un paso manual, así que se fue directo al código.

### Lo que se implementó

**Punto 3 — la paleta ya es un sistema.** 37 tokens en `src/index.css`, en tres bloques de
tema (oscuro por defecto, `@media prefers-color-scheme: light`, y `:root[data-theme]` que
manda sobre los dos). Los 11 cremas redundantes colapsan a `--ground` / `--surface` /
`--raised` / `--rule`. Las colisiones semánticas están rotas:

- El CTA (`--cta`) ya no es el dorado del área Cultura. Cambia de tono entre temas:
  amarillo `#F2B705` en oscuro, negro tejido `#1F1712` en claro.
- El destructivo (`--danger`) ya no es color de categoría.
- Las secciones internas de Constitución (5), las eras de Historia (6) y las categorías de
  Cultura (6) **perdieron su color propio**: 17 hues sueltos que chocaban con los de área.
  Dentro de un módulo la sección se distingue por estado (rellena/contorno), no por tono.
- Las 5 regiones del mapa sí conservan escala categórica propia (`--reg-*`). Es el único
  sitio donde cinco cosas se ven a la vez, así que es la única excepción del sistema.

**Punto 4 — la tipografía ya existe.** Se carga una webfont real desde Google Fonts en
`index.html`. El `fontFamily: "Georgia, serif"` inline de ~30 sitios desaparece: ahora es la
clase `.tipo-display`, declarada una sola vez.

> Corregido después: esta sección se escribió con Archivo Black + Archivo, que fue la primera
> elección. En `b6fd223` se sustituyeron por **Instrument Sans** y se quitaron las versalitas.
> Ver «Estado al 25 de septiembre» al final.

**Punto 5 — la bandera ya no es emoji.** `Bandera` en `src/components/Iconos.jsx` (SVG,
proporción 3:2). Los 4 iconos de área también son SVG propios que heredan `currentColor`.
Verificado: `document.body.innerText` ya no contiene 🇨🇴. Los ~40 emoji de fauna y
categorías siguen siendo emoji — fuera de alcance.

**Punto 6 — resueltos** el tagline del panel de región (era `text-white/85`, 3,19:1) y la ×
de cerrar (ahora 44×44 y a color pleno). El dorado `#B5892B` ya no existe. **Quedan** el
texto a 11 px de los subtítulos del Simulacro y la alineación mixta del hub.

**Tema claro/oscuro.** Botón en la barra superior (no fijo en la esquina: en móvil taparía
contenido al hacer scroll). El tema se guarda en `localStorage` bajo `vueltiao-tema` —
confirmado, y sigue siendo lo único que la app guarda. Un script en `index.html` lo aplica
antes del primer pintado para que no haya parpadeo al montar React.

**Componentes extraídos** (estaban duplicados): `TarjetaExpandible`, `Pill` + `BarraPills`,
`Bandera` + `ICONOS_AREA`, `BotonTema`. `shuffle()` vive ahora en `src/lib/util.js`.

### Verificación

Medida sobre el dev server, no estimada:

- **104 pares de contraste, todos ≥ 4,5:1** (52 por tema). Mínimos: 4,51 en oscuro y 4,59
  en claro. Los 37 tokens están definidos en los tres bloques, ninguno vacío.
- El espécimen tenía **7 pares por debajo del umbral** que la sesión anterior no detectó
  porque midió contra la superficie, no contra el fondo. Corregidos midiendo, no a ojo:
  - El panel de Simulacro daba 3,45:1 en los dos temas. `--sim-bg` pasa de `#E4572E` a
    `#B03A1A` (5,68:1).
  - En claro, geo e his no llegaban sobre `--ground`: `#147A6E`→`#13766A`, `#C0431F`→`#B9401E`.
  - El destructivo y el acierto necesitaban tono de texto propio en oscuro, igual que las
    áreas: nacen `--text-danger` y `--text-ok`.
  - Orinoquía en claro (4,07) y Amazonía en oscuro (4,31) subieron un paso.
- Cero botones por debajo de 44×44 en hub, los 4 módulos y el flujo de test, en móvil
  (375×812) y escritorio (1280×720).
- Mapa a 458×485. Un solo `min-h-screen`, cero scroll anidado, cero scroll horizontal,
  ancho útil 343 px en móvil, una sola cabecera por vista.
- Archivo y Archivo Black cargan (`document.fonts.check`). Consola sin errores.
  `npm run build` pasa.
- El botón de tema alterna, escribe `localStorage` y sobrevive a la recarga.

**Sin captura.** El panel de navegador volvió a no componer frames, así que sigue sin haber
verificación *a ojo* — solo medida. Falta mirar el peso de Archivo Black en mayúsculas y si
el tema claro conserva la energía del oscuro. El dev server queda en `localhost:5173`.

### Siguiente paso

Despliegue en Vercel, la tarea del plan original que sigue aparcada.


---

## Estado al 25 de septiembre de 2026

Sin cambios de código desde el 4 de agosto. La rama `feat/datos-imagenes-layout` sigue con
**9 commits por delante de `master`**, árbol limpio, sin push (el repo no tiene remoto).

### Lo que cambió respecto a la sección anterior

Tras revisar la implementación a ojo:

- **Tipografía: Instrument Sans, en caja baja.** Archivo Black se descartó por demasiado
  pesada y las versalitas por cambiar demasiado el carácter. Con ellas cayó el tracking
  abierto de las ~30 utilidades `tracking-[…]`, que en minúsculas separaba las letras.
- **El Simulacro dejó de ser un panel naranja a sangre**, que competía con su propio CTA.
  Ahora es superficie con borde y una franja de tejido; la jerarquía la lleva el botón.
  Mueren los tokens `--sim-bg` y `--sim-ink`: el simulacro hereda los del CTA.
- **El botón «Test» parecía deshabilitado** en contorno sobre transparente. Ahora se apoya
  en la superficie elevada y al pasar por encima se rellena con el color del área.
- **Las etiquetas del mapa salían al 53%**: el SVG vive en un `viewBox` de 860 que se
  renderiza a ~458 px, así que los 13 px del nombre del departamento eran 6,9 px reales.
  Escalan a 13,3 y 11,2 px. El recuadro de San Andrés se movió al margen izquierdo del
  lienzo, vacío, para poder crecer sin pisar el continente.
- **Departamentos y capitales** pasan de dos listas separadas por comas a una tabla
  emparejada con cabeceras.
- Cerrados los dos puntos menores que quedaban del punto 6: ningún cuerpo baja de 12 px
  y «← Inicio» llega a 44 px de ancho.

### Verificación visual: hecha

La captura de pantalla, pendiente en las dos sesiones anteriores, **ya funciona**. Revisado
el hub, Geografía y el flujo de test en los dos temas. La dirección se sostiene.

Medido de nuevo tras los cambios: **102 pares de contraste, todos ≥ 4,5:1** (mínimos 4,51
en oscuro y 4,59 en claro), cero mayúsculas forzadas, cero botones por debajo de 44×44 en
las seis vistas, y `npm run build` pasa.

### La app está publicada como artifact

Build estático, con las rutas de `dist/` pasadas a relativas:
https://claude.ai/artifact/VCVDAKya2fmY559anhrxNt

Es privado y funciona sin servidor. Sin variables de Supabase en el build, `cargarBanco()`
cae al banco local (`src/data/bancoLocal.js`), que es el comportamiento previsto. Ojo: es
una foto del build, no se actualiza solo — hay que republicarlo tras cada cambio.

Los otros dos artifacts (comparativa de tres direcciones y espécimen de Vueltiao) son de la
fase de diseño y **están desfasados**: siguen mostrando Archivo Black en mayúsculas y el
panel naranja del Simulacro.

### Siguiente paso

Despliegue en Vercel. El proyecto no tiene remoto git, así que pide primero crear el
repo y subir la rama (o fusionarla a `master`).

La integración de pagos con Wompi queda **descartada**: la app va a ser gratuita entera,
sin tier premium. Eso simplifica el despliegue —no hay backend, ni claves, ni webhooks—
y refuerza las decisiones ya tomadas: sin cuentas, sin datos personales y con todo el
contenido y las imágenes servidos como estáticos.
