import React from "react";

/* ============================================================
   BOTONES DE ÁREA
   ------------------------------------------------------------
   El relleno plano dejaba los colores opacos. Ahora la superficie
   tiene bisel (luz arriba, sombra abajo) y, en escritorio, un
   barrido de brillo al pasar el ratón. El degradado es neutro en la
   franja central, que es donde vive el texto: así el relleno gana
   volumen sin tocar el contraste de la etiqueta.

   El barrido ya no se lanza al montar la pantalla ni en cada
   pulsación: estos botones se tocan decenas de veces al día y el
   Inicio se remonta cada vez que se vuelve a él, así que era
   decoración repetida. En móvil el feedback lo da el :active
   (scale .975 en 140 ms).

   Los tres valores del área llegan como variables CSS, no como
   estilo inline, para que :hover pueda ganarles sin !important.
   ============================================================ */

const base =
  "boton-brillo tipo-display inline-flex items-center justify-center whitespace-nowrap rounded-full text-[12.5px] min-h-[44px]";

function Boton({ area, variante, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`${base} ${variante} ${className}`}
      style={{
        "--f": area.color,
        "--s": area.sobre,
        "--t": area.texto,
      }}
      {...props}
    />
  );
}

export function BotonRelleno(props) {
  return <Boton variante="boton-relleno" {...props} />;
}

export function BotonFantasma(props) {
  return <Boton variante="boton-fantasma" {...props} />;
}
