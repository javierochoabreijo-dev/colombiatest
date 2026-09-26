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
      {/* Esta sí sale a Commons: se abre de una en una. Si no llega, la
          figura entera se oculta y queda la ficha sin foto, en vez del
          hueco roto del navegador. */}
      <img
        src={urlAncho(url, ancho)}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full max-h-56 object-cover rounded-lg border border-rule"
        onError={(e) => { const f = e.currentTarget.closest("figure"); if (f) f.style.display = "none"; }}
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
