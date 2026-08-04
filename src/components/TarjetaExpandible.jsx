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
        <span className="text-xs" style={{ color: acento }}>{abierto ? "▲" : "▼"}</span>
      </div>

      {abierto && (
        <div className="mt-3 pt-3 border-t border-rule space-y-2.5">
          {children}
          <p className="text-sm text-ink leading-relaxed">{item.detalle}</p>
          {item.destacado && (
            <div className="rounded-lg px-3 py-2 text-sm flex gap-2 bg-raised text-ink border-l-2" style={{ borderColor: acento }}>
              <span aria-hidden="true">📌</span>
              <span>{item.destacado}</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}
