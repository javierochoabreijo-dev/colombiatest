/* ============================================================
   IMÁGENES
   ------------------------------------------------------------
   La rejilla de fauna pinta once miniaturas a la vez. Pedírselas a
   Wikimedia en paralelo es frágil por dos motivos, y los dos pesan
   más en móvil:

   · Special:FilePath vive en el servidor de la wiki, no en su CDN.
     Cada imagen son dos saltos (302 + descarga) y es el endpoint
     que aplica el límite por IP. Con CGNAT —el NAT de cualquier
     operadora móvil— miles de usuarios comparten IP, así que el
     límite lo puede disparar un desconocido.
   · Sin parámetros devuelve el ORIGINAL: varias de estas fotos
     pasan de 5 MB, sobre datos móviles.

   Por eso las miniaturas viajan CON la app, desde src/assets/fauna,
   servidas por el mismo CDN que el resto del sitio: mismo origen,
   misma conexión HTTP/2, sin DNS ni TLS extra y sin depender de
   nadie. Son 47 ficheros y 884 KB, y Vite les pone hash para que se
   cacheen para siempre.

   Las fichas ampliadas sí salen a Commons: se abren de una en una,
   no hay concurrencia que rompa nada, y así el repositorio no carga
   con las versiones grandes.

   La licencia CC de estas fotos permite redistribuirlas mientras se
   mantenga la atribución, que es lo que pinta ImagenAtribuida.
   ============================================================ */

// Vite resuelve el glob en build y deja las urls con hash ya puestas.
const LOCALES = import.meta.glob("../assets/fauna/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const porArchivo = Object.fromEntries(
  Object.entries(LOCALES).map(([ruta, url]) => [ruta.split("/").pop(), url])
);

/* Miniatura servida con la app. null si esa especie no tiene fichero:
   quien llama decide qué pintar en su lugar. */
export function miniaturaLocal(imagen) {
  if (!imagen?.archivo) return null;
  return porArchivo[imagen.archivo] || null;
}

/* Pide a Wikimedia la versión ya redimensionada en su servidor, en vez
   del original. Solo para las fichas ampliadas. */
export function urlAncho(url, ancho) {
  if (!url) return url;
  const separador = url.includes("?") ? "&" : "?";
  return `${url}${separador}width=${ancho}`;
}
