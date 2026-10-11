import React from "react";
import { imagenLocal, imagenGrande } from "../lib/imagenes";

/* ============================================================
   Imagen libre (Wikimedia Commons) con atribución al pie.
   Se usa en las fichas de fauna y cultura. Si la entrada no trae
   fichero, no renderiza nada.

   La foto se sirve CON la app (ver src/lib/imagenes.js). La `url`
   de Commons sigue en los datos como procedencia, pero ya no se
   pide en tiempo de uso: la atribución se apoya en `fuente`.
   ============================================================ */
export default function ImagenAtribuida({ imagen, alt, className = "" }) {
  // Ficha ampliada: la versión grande si existe; si no, la local de siempre.
  const src = imagenGrande(imagen) || imagenLocal(imagen);
  if (!src) return null;

  const { autor, licencia, fuente, ajuste } = imagen;

  // Los emblemas (escudo) no se recortan como una foto: se muestran enteros y
  // sobre una placa clara, porque llevan trazo oscuro y en tema oscuro se
  // perderían contra el fondo. Es como se presenta la heráldica.
  const esEmblema = ajuste === "contain";

  return (
    <figure className={className}>
      {/* Si el fichero faltara, se oculta la figura entera en vez de dejar
          el hueco roto del navegador. */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={
          esEmblema
            ? "w-full max-h-56 object-contain rounded-lg border border-rule p-3"
            : "w-full max-h-56 object-cover rounded-lg border border-rule"
        }
        style={esEmblema ? { backgroundColor: "#F7F4EC" } : undefined}
        onError={(e) => {
          const f = e.currentTarget.closest("figure");
          if (f) f.style.display = "none";
        }}
      />
      {/* Se monta por partes: si falta el autor —el escudo es de dominio
          público y no lo tiene— no debe quedar un separador suelto delante. */}
      <figcaption className="text-[10px] text-ink-soft mt-1 leading-snug">
        {[autor && (esEmblema ? autor : `Foto: ${autor}`), licencia]
          .filter(Boolean)
          .join(" · ")}
        {fuente && (
          <>
            {(autor || licencia) && " · "}
            <a href={fuente} target="_blank" rel="noopener noreferrer" className="underline">
              Wikimedia Commons
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
