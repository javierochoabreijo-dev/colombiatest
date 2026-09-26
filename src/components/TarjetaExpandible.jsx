import React, { useState } from "react";

/* ============================================================
   TARJETA EXPANDIBLE
   ------------------------------------------------------------
   Estaba copiada en Constitucion.jsx y CulturaSociedad.jsx con
   pequeñas divergencias. El armazón (cabecera, chevron, separador,
   destacado) vive aquí; lo que cambia entre módulos entra por
   `children`, que se renderiza dentro del cuerpo abierto.

   `acento` es el tono de TEXTO del área (no el de relleno): se usa
   sobre superficie, donde el relleno no tendría contraste.
   ============================================================ */
export default function TarjetaExpandible({ item, acento, cabecera, children }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <button
      onClick={() => setAbierto(!abierto)}
      aria-expanded={abierto}
      className="w-full text-left rounded-card border bg-surface px-4 py-3 transition-all hover:shadow-md active:scale-[.99]"
      style={{ borderColor: abierto ? acento : "var(--rule)", borderWidth: abierto ? 2 : 1 }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">{item.icono}</span>
        <div className="flex-1">
          <h3 className="tipo-display text-[14px] text-ink leading-snug">{item.titulo}</h3>
          {cabecera && <p className="text-sm text-ink-soft leading-snug">{cabecera}</p>}
        </div>
        {/* el chevron gira en vez de cambiar de glifo: el giro dice hacia
            dónde va la tarjeta, ▲/▼ solo dicen en qué estado está */}
        <span className="text-xs shrink-0" style={{ color: acento }}>
          <svg
            viewBox="0 0 24 24" width="14" height="14" fill="none"
            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
            style={{
              transform: abierto ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform .22s cubic-bezier(.22,.61,.36,1)",
            }}
          >
            <path d="M6 9 L12 15 L18 9" />
          </svg>
        </span>
      </div>

      {/* Se queda montada siempre, plegada a alto cero: si se desmontara no
          habría nada que animar al cerrar. `inert` la saca del foco y del
          lector de pantalla mientras está plegada. */}
      <div className="desplegable" data-abierto={abierto}>
        <div>
          <div className="mt-3 pt-3 border-t border-rule space-y-2.5" inert={abierto ? undefined : ""}>
            {children}
            <p className="text-sm text-ink leading-relaxed">{item.detalle}</p>
            {item.destacado && (
              <div className="rounded-lg px-3 py-2 text-sm flex gap-2 bg-raised text-ink border-l-2" style={{ borderColor: acento }}>
                <span aria-hidden="true">📌</span>
                <span>{item.destacado}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
