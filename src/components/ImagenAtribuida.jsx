import React from "react";
import { imagenLocal } from "../lib/imagenes";

/* ============================================================
   Imagen libre (Wikimedia Commons) con atribución al pie.
   Se usa en las fichas de fauna y cultura. Si la entrada no trae
   fichero, no renderiza nada.

   La foto se sirve CON la app (ver src/lib/imagenes.js). La `url`
   de Commons sigue en los datos como procedencia, pero ya no se
   pide en tiempo de uso: la atribución se apoya en `fuente`.
   ============================================================ */
export default function ImagenAtribuida({ imagen, alt, className = "" }) {
  const src = imagenLocal(imagen);
  if (!src) return null;

  const { autor, licencia, fuente } = imagen;

  return (
    <figure className={className}>
      {/* Si el fichero faltara, se oculta la figura entera en vez de dejar
          el hueco roto del navegador. */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full max-h-56 object-cover rounded-lg border border-rule"
        onError={(e) => {
          const f = e.currentTarget.closest("figure");
          if (f) f.style.display = "none";
        }}
      />
      <figcaption className="text-[10px] text-ink-soft mt-1 leading-snug">
        {autor && `Foto: ${autor}`}
        {licencia && ` · ${licencia}`}
        {fuente && (
          <>
            {" · "}
            <a href={fuente} target="_blank" rel="noopener noreferrer" className="underline">
              Wikimedia Commons
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
