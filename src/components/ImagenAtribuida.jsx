import React from "react";

/* ============================================================
   Imagen libre (Wikimedia Commons) con atribución al pie.
   Se usa en las fichas de fauna y cultura. Si no hay imagen
   (imagen es null/undefined), no renderiza nada.
   ============================================================ */
export default function ImagenAtribuida({ imagen, alt, className = "" }) {
  if (!imagen?.url) return null;
  const { url, autor, licencia, fuente } = imagen;

  return (
    <figure className={className}>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="w-full max-h-56 object-cover rounded-lg border border-stone-200"
      />
      <figcaption className="text-[10px] text-stone-400 mt-1 leading-snug">
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
