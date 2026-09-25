import React, { useState } from "react";

/* ============================================================
   BOTONES DE ÁREA
   ------------------------------------------------------------
   El relleno plano dejaba los colores opacos. Ahora la superficie
   tiene bisel (luz arriba, sombra abajo) y un barrido de brillo. El
   degradado es neutro en la franja central, que es donde vive el
   texto: así el relleno gana volumen sin tocar el contraste de la
   etiqueta.

   El barrido NO puede colgar solo de :hover: esta app es móvil
   primero y en un móvil no existe hover, así que el efecto no lo
   vería nadie. Se dispara en tres momentos:
     · al aparecer la pantalla, una vez y escalonado (prop `entrada`)
     · al pulsar, en cuanto baja el dedo
     · al pasar el ratón, en escritorio (eso lo hace el CSS)

   El barrido por pulsación se lleva en estado y no en :active para
   que complete el recorrido aunque el toque dure 80 ms.

   Los tres valores del área llegan como variables CSS, no como
   estilo inline, para que :hover pueda ganarles sin !important.
   ============================================================ */

const base =
  "boton-brillo tipo-display inline-flex items-center justify-center rounded-full text-[12.5px] min-h-[44px]";

function useBarrido(entrada) {
  // "entrada" solo la primera vez, y solo si quien usa el botón la pide
  const [fase, setFase] = useState(() => (entrada == null ? "reposo" : "entrada"));

  return {
    clase: fase === "entrada" ? " brillo-entrada" : fase === "pulsado" ? " brillo-pulsado" : "",
    estilo: fase === "entrada" ? { "--retardo": `${entrada.toFixed(2)}s` } : null,
    onPointerDown: () => setFase("pulsado"),
    // al acabar el barrido vuelve a reposo, para que el siguiente toque
    // pueda volver a lanzarlo desde cero
    onAnimationEnd: () => setFase("reposo"),
  };
}

function Boton({ area, variante, entrada, className = "", ...props }) {
  const barrido = useBarrido(entrada);

  return (
    <button
      type="button"
      className={`${base} ${variante}${barrido.clase} ${className}`}
      style={{
        "--f": area.color,
        "--s": area.sobre,
        "--t": area.texto,
        ...barrido.estilo,
      }}
      onPointerDown={barrido.onPointerDown}
      onAnimationEnd={barrido.onAnimationEnd}
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
