import React, { useState } from "react";
import { ICONOS_AREA } from "./Iconos";
import { BotonRelleno, BotonFantasma } from "./BotonArea";
import { mediaProgreso, borrarProgreso, haceCuanto } from "../lib/progreso";

/* ============================================================
   PANEL DE PROGRESO
   ------------------------------------------------------------
   La rejilla de 4 tarjetas no puede contestar "¿por dónde voy?",
   así que la respuesta vive aquí: una fila por área, con su mejor
   resultado y cuándo se hizo. Plegado por defecto para no empujar
   las tarjetas fuera de pantalla en móvil.

   Se despliega con grid-template-rows 0fr → 1fr, que es la forma
   de animar hacia alto automático sin medir nada en JS.

   Nada de la app depende de estos datos: son una comodidad, no una
   cuenta. Si se pierden —y en iPhone se pierden solos, porque
   Safari borra el almacenamiento de los sitios que no visitas en
   una semana— se van unos números, no el acceso a nada. Por eso se
   dice en pantalla dónde viven y se puede borrarlos.
   ============================================================ */

function Chevron({ abierto }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: abierto ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform .22s ease",
      }}
    >
      <path d="M6 9 L12 15 L18 9" />
    </svg>
  );
}

export default function PanelProgreso({ modulos, progreso, onProgreso, irAModulo, irATest }) {
  const [abierto, setAbierto] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const resumen = mediaProgreso(progreso, modulos.map((m) => m.key));

  const borrar = () => {
    onProgreso(borrarProgreso());
    setConfirmando(false);
  };

  return (
    <div className="rounded-card border border-rule bg-surface overflow-hidden mb-6">
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="w-full min-h-[56px] px-4 flex items-center gap-3 text-left transition-colors hover:bg-raised"
      >
        <span className="tipo-display text-[14px] text-ink flex-1">Tu progreso</span>
        <span className="text-[12px] text-ink-soft">
          {resumen
            ? `media ${resumen.media}% · ${resumen.areas} de ${modulos.length} áreas`
            : "sin datos todavía"}
        </span>
        <span className="text-ink-soft flex items-center">
          <Chevron abierto={abierto} />
        </span>
      </button>

      <div
        className="grid"
        style={{
          gridTemplateRows: abierto ? "1fr" : "0fr",
          transition: "grid-template-rows .28s cubic-bezier(.22,.61,.36,1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 flex flex-col gap-2.5 border-t border-rule">
            {!resumen && (
              <p className="text-[13px] text-ink-soft leading-snug pt-3">
                Haz un test de cualquier área o un simulacro y aquí verás tu mejor
                resultado en cada una.
              </p>
            )}

            {modulos.map((m) => {
              const p = progreso[m.key];
              const Icono = ICONOS_AREA[m.key];
              const cuando = p && haceCuanto(p.fecha);
              return (
                <div key={m.key} className="pt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="shrink-0 w-[28px] h-[28px] rounded-full grid place-items-center bg-raised"
                      style={{ color: m.texto }}
                    >
                      <Icono className="w-[15px] h-[15px]" />
                    </span>
                    <span className="tipo-display text-[14px] text-ink flex-1">{m.nombre}</span>
                    {p ? (
                      <span className="text-right leading-tight">
                        <span
                          className="block text-[12.5px] font-semibold"
                          style={{ color: p.pct >= 70 ? "var(--text-ok)" : "var(--text-danger)" }}
                        >
                          {p.ok} / {p.total}
                        </span>
                        {/* sin esto un 16/20 de hace un mes parece de hoy */}
                        {cuando && <span className="block text-[11px] text-ink-soft">{cuando}</span>}
                      </span>
                    ) : (
                      <span className="text-[12.5px] text-ink-soft">sin empezar</span>
                    )}
                  </div>

                  <div className="h-1.5 rounded-full bg-raised overflow-hidden">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${p ? p.pct : 0}%`,
                        backgroundColor: m.color,
                        transition: "width .5s cubic-bezier(.22,.61,.36,1)",
                      }}
                    />
                  </div>

                  <div className="flex gap-1.5">
                    <BotonRelleno area={m} className="flex-1 px-3" onClick={() => irAModulo(m.key)}>
                      Estudiar
                    </BotonRelleno>
                    <BotonFantasma area={m} className="min-w-[72px] px-4" onClick={() => irATest(m.key)}>
                      Test
                    </BotonFantasma>
                  </div>
                </div>
              );
            })}

            <div className="pt-3 mt-1 border-t border-rule">
              <p className="text-[11.5px] text-ink-soft leading-snug">
                Se guarda solo en este dispositivo y en este navegador. No hay cuenta
                ni copia en ningún servidor, así que no viaja contigo a otro móvil y
                puede borrarse si limpias los datos del navegador.
              </p>

              {resumen &&
                (confirmando ? (
                  <div className="flex gap-1.5 mt-2.5">
                    <button
                      type="button"
                      onClick={borrar}
                      className="tipo-display flex-1 min-h-[44px] px-3 rounded-full text-[12.5px]"
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
                    className="tipo-display mt-2.5 min-h-[44px] px-4 rounded-full text-[12.5px] border-[1.5px] border-rule"
                    style={{ color: "var(--text-danger)" }}
                  >
                    Borrar mi progreso
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
