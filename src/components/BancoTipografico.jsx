import React, { useEffect, useState } from "react";

/* ============================================================
   BANCO DE PRUEBAS TIPOGRÁFICO — SOLO EN DESARROLLO
   ------------------------------------------------------------
   Comparar tipografías en una muestra estática no sirve: una
   familia se juzga en la app real, con sus botones de 11 px, sus
   párrafos largos y sus títulos cortos. Este panel cambia
   `--font-display` y `--font-body` en caliente sobre :root, así
   que se puede recorrer el hub, el mapa y el flujo de test con
   cada candidata puesta.

   No entra en el bundle de producción: App.jsx solo lo monta si
   import.meta.env.DEV. Cuando esté elegida la familia, este
   archivo y su import se borran.
   ============================================================ */

const CANDIDATAS = [
  {
    id: "archivo",
    nombre: "Archivo Black",
    registro: "Geométrica · la actual",
    display: '"Archivo Black", sans-serif',
    body: '"Archivo", sans-serif',
    peso: 400,
  },
  {
    id: "fraunces",
    nombre: "Fraunces",
    registro: "Serif editorial con carácter",
    display: '"Fraunces", serif',
    body: '"Archivo", sans-serif',
    peso: 700,
  },
  {
    id: "lora",
    nombre: "Lora",
    registro: "Serif clásica, la más cercana a Georgia",
    display: '"Lora", serif',
    body: '"Lora", serif',
    peso: 700,
  },
  {
    id: "sourceserif",
    nombre: "Source Serif 4",
    registro: "Serif de lectura, sobria",
    display: '"Source Serif 4", serif',
    body: '"Source Serif 4", serif',
    peso: 700,
  },
  {
    id: "instrument",
    nombre: "Instrument Sans",
    registro: "Grotesca neutra",
    display: '"Instrument Sans", sans-serif',
    body: '"Instrument Sans", sans-serif',
    peso: 700,
  },
  {
    id: "outfit",
    nombre: "Outfit",
    registro: "Geométrica ligera",
    display: '"Outfit", sans-serif',
    body: '"Outfit", sans-serif',
    peso: 600,
  },
  {
    id: "spacegrotesk",
    nombre: "Space Grotesk",
    registro: "Geométrica con rarezas",
    display: '"Space Grotesk", sans-serif',
    body: '"Space Grotesk", sans-serif',
    peso: 700,
  },
];

const FUENTES_DEV =
  "https://fonts.googleapis.com/css2" +
  "?family=Fraunces:opsz,wght@9..144,400;9..144,700" +
  "&family=Lora:wght@400;700" +
  "&family=Source+Serif+4:wght@400;700" +
  "&family=Instrument+Sans:wght@400;500;700" +
  "&family=Outfit:wght@400;600" +
  "&family=Space+Grotesk:wght@400;700" +
  "&display=swap";

export default function BancoTipografico() {
  const [abierto, setAbierto] = useState(false);
  const [elegida, setElegida] = useState("archivo");
  const [versalitas, setVersalitas] = useState(true);

  // las candidatas solo se descargan cuando se abre el panel
  useEffect(() => {
    if (!abierto || document.getElementById("fuentes-banco")) return;
    const l = document.createElement("link");
    l.id = "fuentes-banco";
    l.rel = "stylesheet";
    l.href = FUENTES_DEV;
    document.head.appendChild(l);
  }, [abierto]);

  useEffect(() => {
    const c = CANDIDATAS.find((x) => x.id === elegida);
    const raiz = document.documentElement;
    raiz.style.setProperty("--font-display", c.display);
    raiz.style.setProperty("--font-body", c.body);
    raiz.style.setProperty("--display-weight", String(c.peso));
  }, [elegida]);

  useEffect(() => {
    document.documentElement.classList.toggle("sin-versalitas", !versalitas);
  }, [versalitas]);

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="fixed bottom-4 left-4 z-[100] min-h-[44px] px-4 rounded-full border border-rule bg-surface text-ink text-xs shadow-lg"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        Aa · probar tipografías
      </button>
    );
  }

  const c = CANDIDATAS.find((x) => x.id === elegida);

  return (
    <div
      className="fixed bottom-4 left-4 z-[100] w-[286px] max-h-[80vh] overflow-y-auto rounded-2xl border border-rule bg-surface shadow-2xl p-3"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-ink">Banco tipográfico</span>
        <button
          onClick={() => setAbierto(false)}
          className="text-ink-soft text-lg leading-none w-8 h-8"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>

      <p className="text-[11px] text-ink-soft leading-snug mb-3">
        Solo en desarrollo. Recorre el hub y los módulos con cada una puesta.
      </p>

      <label className="flex items-center gap-2 mb-3 text-xs text-ink cursor-pointer">
        <input
          type="checkbox"
          checked={versalitas}
          onChange={(e) => setVersalitas(e.target.checked)}
        />
        Mayúsculas en títulos y controles
      </label>

      <div className="flex flex-col gap-1.5">
        {CANDIDATAS.map((x) => {
          const activa = x.id === elegida;
          return (
            <button
              key={x.id}
              onClick={() => setElegida(x.id)}
              className="text-left rounded-xl border px-3 py-2 transition-colors"
              style={{
                borderColor: activa ? "var(--cta)" : "var(--rule)",
                backgroundColor: activa ? "var(--raised)" : "transparent",
              }}
            >
              <span
                className="block text-[15px] text-ink leading-tight"
                style={{ fontFamily: x.display, fontWeight: x.peso }}
              >
                {x.nombre}
              </span>
              <span className="block text-[10.5px] text-ink-soft mt-0.5">{x.registro}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[10.5px] text-ink-soft mt-3 leading-snug">
        Puesta ahora: <b className="text-ink">{c.nombre}</b>
        {versalitas ? " en mayúsculas" : " en caja baja"}.
      </p>
    </div>
  );
}
