import React from "react";

/* ============================================================
   PILL DE FILTRO
   ------------------------------------------------------------
   Estaba copiada en los 4 módulos. Rellena cuando está activa,
   contorno cuando no; el hueco se apoya en el tono de TEXTO del
   área, que es el que sí se lee sobre el fondo en tema oscuro.

   44 px de alto: son la navegación principal dentro de cada módulo.
   ============================================================ */
export default function Pill({ activa, relleno, sobre, acento, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className="tipo-display inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-full text-[11px] tracking-[0.08em] border-[1.5px] transition-colors"
      style={
        activa
          ? { backgroundColor: relleno, color: sobre, borderColor: relleno }
          : { backgroundColor: "transparent", color: acento, borderColor: "var(--rule)" }
      }
    >
      {children}
    </button>
  );
}

/* La barra que agrupa las pills. Se pega arriba al hacer scroll, con el
   fondo del tema debajo para que el contenido no se transparente. */
export function BarraPills({ children }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5 sticky top-0 py-2 z-20 bg-ground">
      {children}
    </div>
  );
}
