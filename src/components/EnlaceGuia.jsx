import React from "react";

/* ============================================================
   ENLACE A LA GUÍA OFICIAL
   ------------------------------------------------------------
   Todo el contenido de la app sale de la Guía de estudio de la
   Cancillería, así que el pie de cada sección enlaza a la fuente.

   Se avisa del peso: son 61 MB, y esta app la usa sobre todo gente
   en móvil. Un PDF de ese tamaño abierto sin querer sobre datos
   móviles es un destrozo, y el navegador no pregunta.
   ============================================================ */

const URL_GUIA =
  "https://www.cancilleria.gov.co/sites/default/files/DOCUMENTOS-2026/naturalizacion/Guia_de_estudio_ajustada.pdf";

export default function EnlaceGuia({ children }) {
  return (
    <>
      Contenido basado en la{" "}
      <a
        href={URL_GUIA}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-ink transition-colors"
      >
        guía oficial de estudio
      </a>{" "}
      <span className="opacity-75">(PDF · 61 MB)</span>
      {children}
    </>
  );
}
