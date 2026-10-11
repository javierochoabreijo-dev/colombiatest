# Video promocional

`escena.html` es el video: una página que se dibuja en función del tiempo
(`renderAt(t)`), sin transiciones CSS ni temporizadores, así que cada fotograma
sale idéntico en cada render. Usa las fuentes, fotos y logos de la app
(`../src/assets`, `../public/brand`) y el mapa real (`datos-mapa.js`, generado
desde `src/modulos/MapaRegiones.jsx`).

## Renderizar

```bash
npm install
npx playwright install chromium
npm run vertical
```

| Script | Salida |
|---|---|
| `npm run vertical` / `horizontal` | Con textos ES/EN, sin audio |
| `npm run vertical:limpio` / `horizontal:limpio` | Sin textos ni audio |
| `npm run qr` | Regenera `qr.svg` (si cambia la URL) |

Para añadir música: `node render.js --fmt v --texto 1 --musica out/pista.wav --out out/x.mp4`.
Con `--musica` el cierre añade el crédito de «Sunflower» (Sakura Girl, CC BY):
si se cambia de pista, hay que cambiar ese texto en `escena.html`.

Para revisar fotogramas sueltos sin renderizar todo:
`node render.js --fmt v --texto 1 --stills 2.5,14,28 --outdir out/fotogramas`.

Parámetros de la página: `?fmt=v` (1080×1920) o `h` (1920×1080), `?texto=1|0`, `?musica=1`.

## Qué no se versiona

Los videos y fotogramas (`out/`), las dependencias y cualquier audio: la música
de terceros no se puede redistribuir en el repositorio.
