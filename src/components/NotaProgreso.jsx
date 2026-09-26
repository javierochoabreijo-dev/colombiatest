import React, { useState } from "react";
import { borrarProgreso } from "../lib/progreso";

/* ============================================================
   NOTA DE PRIVACIDAD DEL PROGRESO
   ------------------------------------------------------------
   Vivía dentro del panel de progreso. Al fundirse el progreso en
   las tarjetas, el panel desapareció y esto se quedó sin casa:
   pasa al pie, junto a "sin registro ni datos personales", que
   dice lo mismo con otras palabras.

   No es opcional. Si la app guarda algo en el navegador tiene que
   decir qué guarda y dejar quitarlo, sin que haya que buscarlo en
   los ajustes del navegador.
   ============================================================ */
export default function NotaProgreso({ hayDatos, onProgreso }) {
  const [confirmando, setConfirmando] = useState(false);

  if (!hayDatos) return null;

  return (
    <div className="mt-4 pt-4 border-t border-rule text-center">
      <p className="text-[11.5px] text-ink-soft leading-snug max-w-[46ch] mx-auto">
        Tu progreso se guarda solo en este dispositivo y en este navegador. No hay
        cuenta ni copia en ningún servidor.
      </p>

      {confirmando ? (
        <div className="flex gap-1.5 justify-center mt-2.5">
          <button
            type="button"
            onClick={() => { onProgreso(borrarProgreso()); setConfirmando(false); }}
            className="tipo-display min-h-[44px] px-4 rounded-full text-[12.5px]"
            style={{ backgroundColor: "var(--danger)", color: "var(--on-danger)" }}
          >
            Sí, borrar
          </button>
          <button
            type="button"
            onClick={() => setConfirmando(false)}
            className="tipo-display min-h-[44px] px-4 rounded-full text-[12.5px] border-[1.5px] border-rule text-ink-soft"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmando(true)}
          className="tipo-display mt-2 min-h-[44px] px-4 rounded-full text-[12.5px] underline underline-offset-2 text-ink-soft hover:text-ink transition-colors"
        >
          Borrar mi progreso
        </button>
      )}
    </div>
  );
}
