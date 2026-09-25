import React, { useEffect, useState } from "react";
import MapaRegiones from "./modulos/MapaRegiones";
import LineaTiempo from "./modulos/LineaTiempo";
import Constitucion from "./modulos/Constitucion";
import CulturaSociedad from "./modulos/CulturaSociedad";
import { cargarBanco } from "./data/preguntas";
import { shuffle } from "./lib/util";
import { ICONOS_AREA, Bandera } from "./components/Iconos";
import BotonTema from "./components/BotonTema";
import { BotonRelleno, BotonFantasma } from "./components/BotonArea";
import PanelProgreso from "./components/PanelProgreso";
import Anillo from "./components/Anillo";
import { leerProgreso, registrarResultado } from "./lib/progreso";

/* ============================================================
   ColombiaTest · HUB / SHELL DE NAVEGACIÓN
   ------------------------------------------------------------
   Une los 4 módulos de contenido + el sistema de tests de
   práctica (respuesta escrita / completar, autoevaluada).
   Sin logins ni perfiles: el estado vive solo en la sesión.

   El color no se escribe aquí: cada área nombra sus tokens y el
   valor lo resuelve el tema activo (ver src/index.css).
   ============================================================ */

/* ============================================================
   DEFINICIÓN DE LAS 4 ÁREAS OFICIALES
   ------------------------------------------------------------
   Tres valores por área, no uno: `color` rellena, `sobre` es el
   texto que va ENCIMA del relleno y `texto` es el tono legible
   sobre el fondo. En claro los tres coinciden; en oscuro no.
   ============================================================ */
const MODULOS = [
  {
    key: "geografia", nombre: "Geografía",
    color: "var(--area-geo)", sobre: "var(--on-geo)", texto: "var(--text-geo)",
    desc: "Regiones, relieve, clima, flora, fauna y demografía.",
    // el mapa + panel necesitan más ancho que el resto de vistas
    ancho: "64rem",
    component: <MapaRegiones />,
  },
  {
    key: "historia", nombre: "Historia",
    color: "var(--area-his)", sobre: "var(--on-his)", texto: "var(--text-his)",
    desc: "Del poblamiento indígena al postconflicto.",
    component: <LineaTiempo />,
  },
  {
    key: "constitucion", nombre: "Constitución",
    color: "var(--area-con)", sobre: "var(--on-con)", texto: "var(--text-con)",
    desc: "Principios, derechos, mecanismos y estructura del Estado.",
    component: <Constitucion />,
  },
  {
    key: "cultura", nombre: "Cultura",
    color: "var(--area-cul)", sobre: "var(--on-cul)", texto: "var(--text-cul)",
    desc: "Símbolos, gastronomía, fiestas, arte, deporte y turismo.",
    component: <CulturaSociedad />,
  },
];

/* ============================================================
   TEST DE PRÁCTICA (respuesta escrita autoevaluada)
   ============================================================ */
function Test({ area, banco, onSalir, onRepasar, onProgreso }) {
  const esSimulacro = area === "simulacro20" || area === "simulacro80";
  const areaInfo = esSimulacro
    ? {
        key: "simulacro",
        nombre: area === "simulacro80" ? "Simulacro completo" : "Simulacro breve",
        color: "var(--cta)", sobre: "var(--on-cta)", texto: "var(--cta)",
      }
    : MODULOS.find((m) => m.key === area);

  const preguntas = React.useMemo(() => {
    if (area === "simulacro80") {
      // réplica del examen: las 80 preguntas (20 por área), barajadas
      return shuffle(banco);
    }
    if (area === "simulacro20") {
      // versión breve: 5 aleatorias por área (rotan entre intentos)
      return shuffle(
        MODULOS.flatMap((m) => shuffle(banco.filter((b) => b.area === m.key)).slice(0, 5))
      );
    }
    return shuffle(banco.filter((b) => b.area === area));
  }, [area, banco]);

  const [i, setI] = useState(0);
  const [entrada, setEntrada] = useState("");
  const [fase, setFase] = useState("responder"); // responder | comparar
  const [aciertos, setAciertos] = useState(0);
  const [porArea, setPorArea] = useState({});
  const [terminado, setTerminado] = useState(false);

  const actual = preguntas[i];

  // Al terminar se guarda el mejor resultado de cada área tocada. El efecto
  // corre después del render que fija `terminado`, así que porArea y aciertos
  // ya están al día.
  useEffect(() => {
    if (!terminado) return;
    let ultimo = null;
    if (esSimulacro) {
      MODULOS.forEach((m) => {
        const r = porArea[m.key];
        if (r) ultimo = registrarResultado(m.key, r.ok, r.total);
      });
    } else {
      ultimo = registrarResultado(area, aciertos, preguntas.length);
    }
    if (ultimo) onProgreso(ultimo);
  }, [terminado]);

  const revelar = () => setFase("comparar");

  const evaluar = (acerto) => {
    setPorArea((prev) => {
      const k = actual.area;
      const cur = prev[k] || { ok: 0, total: 0 };
      return { ...prev, [k]: { ok: cur.ok + (acerto ? 1 : 0), total: cur.total + 1 } };
    });
    if (acerto) setAciertos((n) => n + 1);
    if (i + 1 < preguntas.length) {
      setI(i + 1); setEntrada(""); setFase("responder");
    } else {
      setTerminado(true);
    }
  };

  if (terminado) {
    const pct = Math.round((aciertos / preguntas.length) * 100);
    const aprueba = pct >= 70;

    // De peor a mejor: lo primero que se lee es lo que hay que repasar.
    const filas = esSimulacro
      ? MODULOS.map((m) => ({ area: m, r: porArea[m.key] }))
          .filter((x) => x.r)
          .sort((a, b) => a.r.ok / a.r.total - b.r.ok / b.r.total)
      : [];

    return (
      <div className="flex flex-col gap-5" style={{ animation: "fadeIn .3s ease-out" }}>

        <div className="flex flex-col items-center pt-1">
          <Anillo pct={pct} color={aprueba ? "var(--text-ok)" : "var(--text-danger)"} />
          <p className="text-[13.5px] text-ink-soft mt-3.5">
            {aciertos} de {preguntas.length} · el umbral es 70%
          </p>
        </div>

        <div className="tejido h-2.5 rounded-full" aria-hidden="true" />

        {esSimulacro ? (
          <div>
            <h3 className="tipo-display text-[20px] text-ink">Qué repasar</h3>
            <p className="text-[12.5px] text-ink-soft mt-0.5 mb-3">
              De lo más flojo a lo que ya dominas.
            </p>

            <div className="flex flex-col gap-2">
              {filas.map(({ area: m, r }) => {
                const Icono = ICONOS_AREA[m.key];
                const falladas = r.total - r.ok;
                const perfecta = falladas === 0;
                const floja = r.ok / r.total < 0.7;
                return (
                  <div
                    key={m.key}
                    className="rounded-xl border border-rule bg-surface px-3.5 py-3 flex items-center gap-3"
                    style={floja ? { borderLeft: `3px solid ${m.color}` } : undefined}
                  >
                    <span className="shrink-0 flex items-center" style={{ color: perfecta ? "var(--text-ok)" : m.texto }}>
                      {perfecta ? (
                        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 12.5 L9.5 18 L20 6.5" />
                        </svg>
                      ) : (
                        <Icono className="w-[19px] h-[19px]" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`tipo-display text-[14.5px] ${perfecta ? "text-ink-soft" : "text-ink"}`}>
                        {m.nombre}
                      </p>
                      <p
                        className="text-[12.5px] mt-px"
                        style={{ color: perfecta ? "var(--text-ok)" : floja ? "var(--text-danger)" : "var(--ink-soft)" }}
                      >
                        {r.ok} de {r.total} · {perfecta ? "sin fallos" : `${falladas} ${falladas === 1 ? "fallada" : "falladas"}`}
                      </p>
                    </div>
                    {!perfecta &&
                      (floja ? (
                        <BotonRelleno area={m} className="shrink-0 px-4" onClick={() => onRepasar(m.key)}>
                          Repasar
                        </BotonRelleno>
                      ) : (
                        <BotonFantasma area={m} className="shrink-0 px-4" onClick={() => onRepasar(m.key)}>
                          Repasar
                        </BotonFantasma>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-[13.5px] text-ink-soft text-center -mt-1">
            {aprueba
              ? `Vas bien en ${areaInfo.nombre}. Prueba un simulacro para verte las cuatro áreas a la vez.`
              : `Repasa ${areaInfo.nombre} y vuelve a intentarlo.`}
          </p>
        )}

        <button
          onClick={onSalir}
          className="boton-brillo tipo-display w-full min-h-[48px] px-4 rounded-full text-[13px] border-[1.5px] bg-raised text-ink border-rule hover:border-cta"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // en simulacro cada pregunta se etiqueta con SU área, no con la del test
  const areaPregunta = esSimulacro ? MODULOS.find((m) => m.key === actual.area) : areaInfo;
  const Icono = ICONOS_AREA[areaPregunta.key];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-ink-soft">Pregunta {i + 1} / {preguntas.length}</span>
        {!esSimulacro && (
          <span className="tipo-display text-xs" style={{ color: "var(--text-ok)" }}>✓ {aciertos}</span>
        )}
      </div>
      <div className="w-full h-1.5 rounded-full mb-4 bg-raised">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${(i / preguntas.length) * 100}%`, backgroundColor: "var(--cta)" }}
        />
      </div>

      <div className="rounded-card border border-rule bg-surface p-5">
        <span className="tipo-display inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-full bg-raised" style={{ color: areaPregunta.texto }}>
          {Icono && <Icono className="w-3.5 h-3.5" />}
          {areaPregunta.nombre}
        </span>
        <p className="tipo-display text-[17px] text-ink leading-tight mt-3">
          {actual.q}
        </p>

        <textarea
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Escribe tu respuesta…"
          rows={3}
          disabled={fase === "comparar"}
          className="w-full mt-3 rounded-xl border border-rule bg-raised p-3 text-sm text-ink placeholder:text-ink-soft outline-none focus:border-cta"
        />

        {fase === "comparar" && (
          <div
            className="mt-3 rounded-lg px-3 py-2.5 text-sm bg-raised text-ink border-l-[3px]"
            style={{ borderColor: "var(--text-ok)", animation: "fadeIn .2s ease-out" }}
          >
            <span className="tipo-display block text-[12px] mb-1" style={{ color: "var(--text-ok)" }}>
              Respuesta esperada
            </span>
            {actual.a}
          </div>
        )}
      </div>

      {fase === "responder" ? (
        <button
          onClick={revelar}
          disabled={!entrada.trim()}
          className="tipo-display w-full mt-4 min-h-[48px] px-4 rounded-full text-[12.5px] disabled:opacity-40"
          style={{ backgroundColor: "var(--cta)", color: "var(--on-cta)" }}
        >
          Comprobar
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-center text-sm text-ink-soft mb-2">¿Tu respuesta coincidía con lo esperado?</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => evaluar(false)}
              className="tipo-display min-h-[48px] px-4 rounded-full text-[12.5px]"
              style={{ backgroundColor: "var(--danger)", color: "var(--on-danger)" }}
            >
              No acerté
            </button>
            <button
              onClick={() => evaluar(true)}
              className="tipo-display min-h-[48px] px-4 rounded-full text-[12.5px]"
              style={{ backgroundColor: "var(--ok)", color: "var(--on-ok)" }}
            >
              Sí acerté
            </button>
          </div>
        </div>
      )}

      <button onClick={onSalir} className="w-full mt-2 text-sm text-ink-soft min-h-[44px]">
        Salir del test
      </button>
    </div>
  );
}

/* ============================================================
   PANTALLA DE INICIO
   ============================================================ */
function Inicio({ irAModulo, irATest, irASimulacro, progreso }) {
  return (
    <div>
      <header className="mb-6 text-center">
        <Bandera width={40} className="mx-auto" />
        <h1 className="tipo-display text-4xl text-ink mt-2">ColombiaTest</h1>
        <p className="text-ink-soft text-sm mt-1">
          Prepárate para el examen de conocimientos de la nacionalidad colombiana.
        </p>
        <div className="tejido h-2.5 rounded-full mt-4" aria-hidden="true" />
      </header>

      <PanelProgreso
        modulos={MODULOS}
        progreso={progreso}
        irAModulo={irAModulo}
        irATest={irATest}
      />

      <p className="tipo-display text-[12px] text-ink-soft mb-2.5">Explora las 4 áreas</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {MODULOS.map((m) => {
          const Icono = ICONOS_AREA[m.key];
          return (
            <div key={m.key} className="rounded-card border border-rule bg-surface p-3.5 flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <span className="shrink-0 w-[30px] h-[30px] rounded-full grid place-items-center bg-raised" style={{ color: m.texto }}>
                  <Icono className="w-[17px] h-[17px]" />
                </span>
                <h2 className="tipo-display text-[15px] text-ink">{m.nombre}</h2>
              </div>
              <p className="text-xs text-ink-soft leading-snug flex-1">{m.desc}</p>
              {/* El relleno plano dejaba el color opaco: ahora lleva bisel y
                  un barrido de brillo al pasar por encima. Ver .boton-brillo
                  y .boton-relleno en index.css. */}
              <div className="flex gap-1.5">
                <BotonRelleno area={m} className="flex-1 px-3" onClick={() => irAModulo(m.key)}>
                  Estudiar
                </BotonRelleno>
                <BotonFantasma area={m} className="min-w-[44px] px-4" onClick={() => irATest(m.key)}>
                  Test
                </BotonFantasma>
              </div>
            </div>
          );
        })}
      </div>

      {/* El bloque era un panel naranja a sangre y competía con su propio CTA:
          el botón más importante de la app quedaba dentro de una mancha del
          mismo peso. Ahora la jerarquía la lleva el botón; el panel solo lo
          enmarca y el tejido —el galón del vueltiao— lo señala sin gritar. */}
      <div className="rounded-card border border-rule bg-surface overflow-hidden">
        <div className="tejido h-1.5" aria-hidden="true" />
        <div className="p-5 text-center">
          <h3 className="tipo-display text-[19px] text-ink">Simulacro</h3>
          <p className="text-[13px] leading-snug mt-1.5 mb-4 text-ink-soft max-w-[42ch] mx-auto">
            Practica en condiciones de examen: sin respuestas hasta el final y con diagnóstico por área.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => irASimulacro("simulacro20")}
              className="tipo-display min-h-[56px] px-3 rounded-full text-[13px] flex flex-col items-center justify-center leading-tight transition-transform active:scale-[.97]"
              style={{ backgroundColor: "var(--cta)", color: "var(--on-cta)" }}
            >
              Breve · 20
              <span className="block text-[12px] font-normal opacity-75 mt-0.5">5 por área, rotan</span>
            </button>
            <button
              onClick={() => irASimulacro("simulacro80")}
              className="tipo-display min-h-[56px] px-3 rounded-full text-[13px] flex flex-col items-center justify-center leading-tight border-[1.5px] bg-raised text-ink border-rule transition-colors hover:border-cta active:scale-[.97]"
            >
              Completo · 80
              <span className="block text-[12px] font-normal text-ink-soft mt-0.5">como el examen real</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-ink-soft mt-5">
        Contenido basado en la guía oficial · Sin registro ni datos personales
      </p>
    </div>
  );
}

/* ============================================================
   APP (router de estado, sin librerías)
   ============================================================ */
export default function App() {
  const [vista, setVista] = useState({ tipo: "inicio" });
  const [banco, setBanco] = useState(null);
  const [progreso, setProgreso] = useState(leerProgreso);

  useEffect(() => {
    cargarBanco().then(setBanco);
  }, []);

  const volver = () => setVista({ tipo: "inicio" });

  // El ancho lo decide el shell, no cada módulo: solo Geografía necesita más.
  // Va como estilo inline (no clase) porque es un valor dirigido por datos.
  const ancho =
    (vista.tipo === "modulo" && MODULOS.find((m) => m.key === vista.area)?.ancho) || "42rem";

  if (!banco) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-ground">
        <div className="text-center">
          <Bandera width={40} className="mx-auto" />
          <p className="text-ink-soft text-sm mt-2">Cargando banco de preguntas…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-ground text-ink">
      <div className="mx-auto px-4 py-6" style={{ maxWidth: ancho }}>

        {/* barra superior: navegación a la izquierda, tema a la derecha */}
        <div className="flex items-center justify-between mb-4 gap-3">
          {vista.tipo !== "inicio" ? (
            <button
              onClick={volver}
              className="tipo-display text-[12px] text-ink-soft min-h-[44px] min-w-[44px] px-1 flex items-center gap-1.5"
            >
              ← Inicio
            </button>
          ) : (
            <span className="tipo-display text-[12px] text-ink-soft">ColombiaTest</span>
          )}
          <BotonTema />
        </div>

        {vista.tipo === "inicio" && (
          <Inicio
            progreso={progreso}
            irAModulo={(k) => setVista({ tipo: "modulo", area: k })}
            irATest={(k) => setVista({ tipo: "test", area: k })}
            irASimulacro={(k) => setVista({ tipo: "test", area: k })}
          />
        )}

        {vista.tipo === "modulo" && (() => {
          const m = MODULOS.find((x) => x.key === vista.area);
          const Icono = ICONOS_AREA[m.key];
          return (
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center bg-raised" style={{ color: m.texto }}>
                  <Icono className="w-[18px] h-[18px]" />
                </span>
                <h1 className="tipo-display text-xl text-ink">{m.nombre}</h1>
                <button
                  onClick={() => setVista({ tipo: "test", area: m.key })}
                  className="tipo-display ml-auto text-[12px] min-h-[44px] px-4 rounded-full"
                  style={{ backgroundColor: m.color, color: m.sobre }}
                >
                  Hacer test
                </button>
              </div>
              {m.component}
            </div>
          );
        })()}

        {vista.tipo === "test" && (
          <Test
            area={vista.area}
            banco={banco}
            onSalir={volver}
            onRepasar={(k) => setVista({ tipo: "modulo", area: k })}
            onProgreso={setProgreso}
          />
        )}
      </div>
    </div>
  );
}
