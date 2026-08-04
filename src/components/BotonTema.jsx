import React from "react";
import { useTema } from "../lib/tema";

/* Va en la barra superior, no fijo en la esquina: fijo taparía
   contenido al hacer scroll en móvil, que es el viewport principal. */
export default function BotonTema() {
  const { tema, alternar } = useTema();
  const esOscuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={esOscuro}
      aria-label={esOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="tipo-display inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-full border border-rule bg-surface text-ink text-[12px] transition-colors hover:border-cta"
    >
      <span
        className="w-[13px] h-[13px] rounded-full bg-cta shrink-0"
        style={{ border: "2px solid var(--ground)", boxShadow: "0 0 0 1.5px var(--cta)" }}
        aria-hidden="true"
      />
      {esOscuro ? "Oscuro" : "Claro"}
    </button>
  );
}
