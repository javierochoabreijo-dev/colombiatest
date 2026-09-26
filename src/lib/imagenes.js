/* ============================================================
   IMÁGENES
   ------------------------------------------------------------
   Todas las fotos del proyecto viajan CON la app, desde
   src/assets/. Ninguna se pide a Wikimedia en tiempo de uso.

   El motivo es doble, y los dos pesan más en móvil:

   · Special:FilePath vive en el servidor de la wiki, no en su CDN.
     Cada imagen son dos saltos (302 + descarga) y es el endpoint
     que aplica el límite por IP. Con el CGNAT de cualquier
     operadora, miles de usuarios comparten IP: el límite lo puede
     disparar un desconocido y dejar sin fotos a tu usuario.
   · Sin parámetros devuelve el ORIGINAL. Varias de estas fotos
     pasan de 5 MB, sobre datos móviles.

   Servidas con la app son mismo origen, misma conexión HTTP/2, sin
   DNS ni TLS extra y sin depender de nadie. Vite les pone hash, así
   que se cachean para siempre, y `loading="lazy"` hace que solo se
   pidan las que se ven.

   La licencia CC de estas fotos permite redistribuirlas mientras se
   mantenga la atribución, que es lo que pinta ImagenAtribuida. Por
   eso cada entrada conserva autor, licencia y enlace a Commons.

   Para añadir una foto nueva: descargarla a src/assets/<carpeta>/ y
   poner `archivo: "<carpeta>/<fichero>.jpg"` en su entrada.
   ============================================================ */

// Vite resuelve los globs en build y deja las urls con hash ya puestas.
const FAUNA = import.meta.glob("../assets/fauna/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const CULTURA = import.meta.glob("../assets/cultura/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

// Clave = "<carpeta>/<fichero>", para que dos carpetas puedan compartir nombre.
const POR_RUTA = Object.fromEntries(
  Object.entries({ ...FAUNA, ...CULTURA }).map(([ruta, url]) => [
    ruta.split("/").slice(-2).join("/"),
    url,
  ])
);

/* La imagen servida con la app. null si esa entrada no tiene fichero:
   quien llama decide qué pintar en su lugar. */
export function imagenLocal(imagen) {
  if (!imagen?.archivo) return null;
  return POR_RUTA[imagen.archivo] || null;
}
