import React from "react";

/* ============================================================
   BOTONES DE ÁREA
   ------------------------------------------------------------
   El relleno plano dejaba los colores opacos. Ahora la superficie
   tiene bisel (luz arriba, sombra abajo) y un barrido de brillo al
   pasar por encima. El degradado es neutro en la franja central, que
   es donde vive el texto: así el relleno gana volumen sin tocar el
   contraste de la etiqueta.

   Los tres valores del área llegan como variables CSS, no como
   estilo inline, para que :hover pueda ganarles sin !important.
   ============================================================ */

const base =
  "boton-brillo tipo-display inline-flex items-center justify-center rounded-full text-[12.5px] min-h-[44px]";

export function BotonRelleno({ area, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`${base} boton-relleno ${className}`}
      style={{ "--f": area.color, "--s": area.sobre, "--t": area.texto }}
      {...props}
    />
  );
}

export function BotonFantasma({ area, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`${base} boton-fantasma ${className}`}
      style={{ "--f": area.color, "--s": area.sobre, "--t": area.texto }}
      {...props}
    />
  );
}
