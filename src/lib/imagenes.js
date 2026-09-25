/* ============================================================
   MINIATURAS DE WIKIMEDIA
   ------------------------------------------------------------
   Special:FilePath sin parámetros devuelve el ORIGINAL: varias de
   las fotos de fauna pesan entre 3 y 5 MB, y se estaban pintando
   en avatares de 36 px. Peor: al pedir veinte originales a la vez,
   Wikimedia responde 429 y deja de servir, así que no cargaba
   ninguna — ni las que sí habrían entrado.

   `?width=` pide la miniatura ya redimensionada en su servidor.
   A 96 px la misma foto baja de 5,5 MB a 4 KB.
   ============================================================ */

export function urlAncho(url, ancho) {
  if (!url) return url;
  const separador = url.includes("?") ? "&" : "?";
  return `${url}${separador}width=${ancho}`;
}
