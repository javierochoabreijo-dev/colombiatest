import React from "react";
import { urlAncho } from "../lib/imagenes";

/* ============================================================
   Imagen libre (Wikimedia Commons) con atribución al pie.
   Se usa en las fichas de fauna y cultura. Si no hay imagen
   (imagen es null/undefined), no renderiza nada.
   ============================================================ */
export default function ImagenAtribuida({ imagen, alt, className = "", ancho = 640 }) {
  if (!imagen?.url) return null;
  const { url, autor, licencia, fuente } = imagen;

  return (
    <figure className={className}>
      <img
        src={urlAncho(url, ancho)}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full max-h-56 object-cover rounded-lg border border-rule"
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
