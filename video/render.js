// Render determinista de video/escena.html. Ejecutar desde esta carpeta tras `npm install`.
//   node render.js --fmt v|h --texto 1|0 [--musica ruta.wav] --out salida.mp4
//   node render.js --fmt v --texto 1 --stills 1.5,5,10 --outdir carpeta   (solo fotogramas PNG)
const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");
const FFMPEG = require("ffmpeg-static");

// la raíz del proyecto: escena.html carga fuentes, fotos y logos desde src/ y public/
const RAIZ = path.resolve(__dirname, "..");
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith("--") ? [...acc, [a.slice(2), arr[i + 1]]] : acc), [])
);
const FMT = args.fmt === "h" ? "h" : "v";
const TEXTO = args.texto === "0" ? "0" : "1";
const FPS = +(args.fps || 30);
const W = FMT === "v" ? 1080 : 1920;
const H = FMT === "v" ? 1920 : 1080;

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2" };
const servidor = http.createServer((req, res) => {
  const ruta = path.join(RAIZ, decodeURIComponent(req.url.split("?")[0]));
  if (!ruta.startsWith(RAIZ) || !fs.existsSync(ruta)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": MIME[path.extname(ruta)] || "application/octet-stream" });
  fs.createReadStream(ruta).pipe(res);
});

(async () => {
  await new Promise((r) => servidor.listen(0, "127.0.0.1", r));
  const puerto = servidor.address().port;
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  pagina.on("pageerror", (e) => console.error("error en la página:", e.message));
  await pagina.goto(`http://127.0.0.1:${puerto}/video/escena.html?fmt=${FMT}&texto=${TEXTO}${args.musica ? "&musica=1" : ""}`);
  const info = await pagina.evaluate(() => window.listo);
  const DUR = await pagina.evaluate(() => window.DURACION);
  console.log("lista:", FMT, "texto=" + TEXTO, info);

  if (args.stills) {
    fs.mkdirSync(args.outdir, { recursive: true });
    for (const s of args.stills.split(",").map(Number)) {
      await pagina.evaluate((t) => window.renderAt(t), s);
      const f = path.join(args.outdir, `${FMT}${TEXTO}_${s.toFixed(2).padStart(5, "0")}.png`);
      await pagina.screenshot({ path: f });
      console.log("fotograma", f);
    }
  } else {
    const entrada = ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-"];
    if (args.musica) entrada.push("-i", args.musica);
    const salida = ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-r", String(FPS), "-movflags", "+faststart"];
    if (args.musica) salida.push("-c:a", "aac", "-b:a", "192k", "-shortest");
    const ff = spawn(FFMPEG, [...entrada, ...salida, args.out], { stdio: ["pipe", "ignore", "pipe"] });
    let log = "";
    ff.stderr.on("data", (d) => (log = (log + d).slice(-3000)));
    const total = Math.round(DUR * FPS);
    const t0 = Date.now();
    for (let i = 0; i < total; i++) {
      await pagina.evaluate((t) => window.renderAt(t), i / FPS);
      const img = await pagina.screenshot({ type: "jpeg", quality: 94 });
      if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once("drain", r));
      if (i % 150 === 0) console.log(`fotograma ${i}/${total} · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
    }
    ff.stdin.end();
    const codigo = await new Promise((r) => ff.on("close", r));
    if (codigo !== 0) { console.error(log); process.exitCode = 1; }
    else console.log("video listo:", args.out, (fs.statSync(args.out).size / 1e6).toFixed(1), "MB");
  }
  await navegador.close();
  servidor.close();
})();
