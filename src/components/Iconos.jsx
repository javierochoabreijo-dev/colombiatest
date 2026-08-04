import React from "react";

/* ============================================================
   ICONOGRAFÍA PROPIA
   ------------------------------------------------------------
   Los emoji de las 4 áreas los dibujaba el sistema operativo, así
   que la identidad la definía Apple/Google/Microsoft. Peor: la
   bandera 🇨🇴 se renderiza como las letras "CO" en Windows, porque
   Windows no dibuja banderas de país.

   Estos trazos heredan `currentColor`, así que toman el tono del
   área que los envuelve y cambian solos con el tema.
   ============================================================ */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  "aria-hidden": true,
};

function Geografia(props) {
  return (
    <svg {...base} strokeLinejoin="round" {...props}>
      <path d="M3 19 L9 8 L13 14 L16.5 10 L21 19 Z" />
    </svg>
  );
}

function Historia(props) {
  return (
    <svg {...base} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7 V12 L15.6 14.2" />
    </svg>
  );
}

function Constitucion(props) {
  return (
    <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5 V19 M5 9 H19 M5 9 L2.8 14 H7.2 Z M19 9 L16.8 14 H21.2 Z M8 19 H16" />
    </svg>
  );
}

function Cultura(props) {
  return (
    <svg {...base} strokeLinecap="round" {...props}>
      <path d="M3.5 16.5 H20.5 M6.5 16.5 A5.5 5.5 0 0 1 17.5 16.5" />
    </svg>
  );
}

function Simulacro(props) {
  return (
    <svg {...base} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 4 H17 A1.5 1.5 0 0 1 18.5 5.5 V19.5 A1.5 1.5 0 0 1 17 21 H7 A1.5 1.5 0 0 1 5.5 19.5 V5.5 A1.5 1.5 0 0 1 7 4 Z" />
      <path d="M9 3 H15 V5.5 H9 Z M9 10 H15 M9 14 H13" />
    </svg>
  );
}

export const ICONOS_AREA = {
  geografia: Geografia,
  historia: Historia,
  constitucion: Constitucion,
  cultura: Cultura,
  simulacro: Simulacro,
};

/* Proporción oficial 3:2, con la franja amarilla ocupando la mitad
   superior y azul y rojo un cuarto cada una. */
export function Bandera({ width = 36, className = "" }) {
  return (
    <svg
      width={width}
      height={(width * 2) / 3}
      viewBox="0 0 36 24"
      className={className}
      role="img"
      aria-label="Bandera de Colombia"
    >
      <rect width="36" height="12" fill="#FCD116" />
      <rect y="12" width="36" height="6" fill="#003893" />
      <rect y="18" width="36" height="6" fill="#CE1126" />
    </svg>
  );
}
