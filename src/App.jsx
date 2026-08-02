import React, { useEffect, useState } from "react";
import MapaRegiones from "./modulos/MapaRegiones";
import LineaTiempo from "./modulos/LineaTiempo";
import Constitucion from "./modulos/Constitucion";
import CulturaSociedad from "./modulos/CulturaSociedad";
import { cargarBanco } from "./data/preguntas";

/* ============================================================
   ColombiaTest · HUB / SHELL DE NAVEGACIÓN
   ------------------------------------------------------------
   Une los 4 módulos de contenido + el sistema de tests de
   práctica (respuesta escrita / completar, autoevaluada).
   Sin logins ni perfiles: el estado vive solo en la sesión.

   CÓMO INTEGRAR LOS MÓDULOS (Vite / producción):
   1. Copia cada módulo a su archivo:
        src/modulos/MapaRegiones.jsx      (export default)
        src/modulos/LineaTiempo.jsx
        src/modulos/Constitucion.jsx
        src/modulos/CulturaSociedad.jsx
   2. Impórtalos arriba:
        import MapaRegiones from "./modulos/MapaRegiones";
        ...
   3. En MODULOS[].component, reemplaza el Placeholder por el
      componente real. Nada más cambia.
   ============================================================ */

/* ============================================================
   DEFINICIÓN DE LAS 4 ÁREAS OFICIALES
   ============================================================ */
const MODULOS = [
  {
    key: "geografia", nombre: "Geografía", icono: "🗺️", color: "#1E7F8C", soft: "#DCEEF0",
    desc: "Regiones, relieve, clima, flora, fauna y demografía.",
    // el mapa + panel necesitan más ancho que el resto de vistas
    ancho: "64rem",
    component: <MapaRegiones />,
  },
  {
    key: "historia", nombre: "Historia", icono: "🕰️", color: "#8A6D3B", soft: "#EFE6D5",
    desc: "Del poblamiento indígena al postconflicto.",
    component: <LineaTiempo />,
  },
  {
    key: "constitucion", nombre: "Constitución", icono: "⚖️", color: "#5B4B8A", soft: "#E5E0F0",
    desc: "Principios, derechos, mecanismos y estructura del Estado.",
    component: <Constitucion />,
  },
  {
    key: "cultura", nombre: "Cultura", icono: "🎭", color: "#B5892B", soft: "#F5EAD2",
    desc: "Símbolos, gastronomía, fiestas, arte, deporte y turismo.",
    component: <CulturaSociedad />,
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================================================
   TEST DE PRÁCTICA (respuesta escrita autoevaluada)
   ============================================================ */
function Test({ area, banco, onSalir }) {
  const esSimulacro = area === "simulacro20" || area === "simulacro80";
  const areaInfo = esSimulacro
    ? { nombre: area === "simulacro80" ? "Simulacro completo" : "Simulacro breve", icono: "📋", color: "#3a3327", soft: "#EDE9DE" }
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
    return (
      <div className="rounded-2xl border-2 bg-white p-6" style={{ borderColor: areaInfo.color }}>
        <div className="text-center">
          <div className="text-4xl mb-2">{pct >= 70 ? "🎉" : "💪"}</div>
          <h3 className="text-xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
            {aciertos} de {preguntas.length} ({pct}%)
          </h3>
          <p className="text-sm text-stone-500 mt-1">
            {pct >= 70 ? "¡Buen resultado! Estás en el rango de aprobación." : "Sigue repasando; el umbral de referencia es 70%."}
          </p>
        </div>

        {esSimulacro && (
          <div className="mt-5">
            <p className="text-sm font-semibold text-stone-700 mb-2">Resultado por área:</p>
            <div className="space-y-1.5">
              {MODULOS.map((m) => {
                const r = porArea[m.key];
                if (!r) return null;
                const p = Math.round((r.ok / r.total) * 100);
                return (
                  <div key={m.key} className="flex items-center gap-2">
                    <span className="text-sm w-28 text-stone-600">{m.icono} {m.nombre}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "#eee7d8" }}>
                      <div className="h-2 rounded-full" style={{ width: `${p}%`, backgroundColor: p >= 70 ? "#1F6E4A" : "#8C3B3B" }} />
                    </div>
                    <span className="text-xs text-stone-500 w-10 text-right">{p}%</span>
                  </div>
                );
              })}
            </div>
            {(() => {
              const debiles = MODULOS.filter((m) => porArea[m.key] && (porArea[m.key].ok / porArea[m.key].total) < 0.7);
              return debiles.length > 0 ? (
                <p className="text-sm mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: "#F0DADA", color: "#3a3327" }}>
                  📌 Áreas para reforzar: {debiles.map((d) => d.nombre).join(", ")}.
                </p>
              ) : null;
            })()}
          </div>
        )}

        <button onClick={onSalir} className="w-full mt-5 px-4 py-2.5 rounded-xl font-semibold text-white" style={{ backgroundColor: areaInfo.color }}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-stone-500">Pregunta {i + 1} / {preguntas.length}</span>
        {!esSimulacro && <span className="text-sm font-semibold" style={{ color: "#1F6E4A" }}>✓ {aciertos}</span>}
      </div>
      <div className="w-full h-1.5 rounded-full mb-4" style={{ backgroundColor: "#e7e2d6" }}>
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${(i / preguntas.length) * 100}%`, backgroundColor: areaInfo.color }} />
      </div>

      <div className="rounded-2xl border-2 bg-white p-5" style={{ borderColor: areaInfo.color }}>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: areaInfo.soft, color: areaInfo.color }}>
          {areaInfo.icono} {esSimulacro ? MODULOS.find((m) => m.key === actual.area)?.nombre : areaInfo.nombre}
        </span>
        <p className="text-lg font-semibold text-stone-800 leading-snug mt-3" style={{ fontFamily: "Georgia, serif" }}>
          {actual.q}
        </p>

        <textarea
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Escribe tu respuesta…"
          rows={3}
          disabled={fase === "comparar"}
          className="w-full mt-3 rounded-xl border p-3 text-sm text-stone-700 outline-none focus:border-stone-400"
          style={{ borderColor: "#d8d1c2", backgroundColor: fase === "comparar" ? "#f7f4ec" : "white" }}
        />

        {fase === "comparar" && (
          <div className="mt-3 rounded-lg px-3 py-2.5 text-sm" style={{ backgroundColor: areaInfo.soft, color: "#3a3327", animation: "fadeIn .2s ease-out" }}>
            <span className="font-semibold">Respuesta esperada:</span> {actual.a}
          </div>
        )}
      </div>

      {fase === "responder" ? (
        <button
          onClick={revelar}
          disabled={!entrada.trim()}
          className="w-full mt-4 px-4 py-3 rounded-xl font-semibold text-white disabled:opacity-40"
          style={{ backgroundColor: areaInfo.color }}
        >
          Comprobar
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-center text-sm text-stone-500 mb-2">¿Tu respuesta coincidía con lo esperado?</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => evaluar(false)} className="px-4 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "#8C3B3B" }}>
              No acerté
            </button>
            <button onClick={() => evaluar(true)} className="px-4 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "#1F6E4A" }}>
              Sí acerté ✓
            </button>
          </div>
        </div>
      )}

      <button onClick={onSalir} className="w-full mt-2 text-sm text-stone-500 py-2">Salir del test</button>
    </div>
  );
}

/* ============================================================
   PANTALLA DE INICIO
   ============================================================ */
function Inicio({ irAModulo, irATest, irASimulacro }) {
  return (
    <div>
      <header className="mb-5 text-center">
        <div className="text-4xl mb-1">🇨🇴</div>
        <h1 className="text-3xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
          ColombiaTest
        </h1>
        <p className="text-stone-500 text-sm mt-1">
          Prepárate para el examen de conocimientos de la nacionalidad colombiana.
        </p>
      </header>

      <p className="text-sm font-semibold text-stone-700 mb-2">Explora las 4 áreas</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {MODULOS.map((m) => (
          <div key={m.key} className="rounded-2xl border bg-white p-4 flex flex-col" style={{ borderColor: m.soft }}>
            <span className="text-3xl">{m.icono}</span>
            <h2 className="font-bold text-stone-800 mt-1.5 text-[15px]" style={{ fontFamily: "Georgia, serif" }}>{m.nombre}</h2>
            <p className="text-xs text-stone-500 mt-0.5 flex-1 leading-snug">{m.desc}</p>
            <div className="flex gap-1.5 mt-3">
              <button onClick={() => irAModulo(m.key)} className="flex-1 min-h-[44px] flex items-center justify-center text-sm font-semibold px-3 rounded-lg text-white" style={{ backgroundColor: m.color }}>
                Estudiar
              </button>
              <button onClick={() => irATest(m.key)} className="min-h-[44px] min-w-[44px] flex items-center justify-center text-sm font-semibold px-4 rounded-lg border" style={{ borderColor: m.color, color: m.color }}>
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "#3a3327" }}>
        <div className="text-2xl mb-1">📋</div>
        <h3 className="font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Simulacro</h3>
        <p className="text-white/70 text-sm mt-1 mb-4">
          Practica en condiciones de examen: sin respuestas hasta el final y con diagnóstico por área.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => irASimulacro("simulacro20")} className="px-3 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#B5892B", color: "white" }}>
            Breve · 20
            <span className="block text-[11px] font-normal text-white/80 mt-0.5">5 por área, rotan</span>
          </button>
          <button onClick={() => irASimulacro("simulacro80")} className="px-3 py-3 rounded-xl font-semibold text-sm border" style={{ backgroundColor: "transparent", color: "white", borderColor: "#B5892B" }}>
            Completo · 80
            <span className="block text-[11px] font-normal text-white/70 mt-0.5">como el examen real</span>
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-stone-400 mt-5">
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
      <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: "#FAF7EF" }}>
        <div className="text-center">
          <div className="text-4xl mb-2">🇨🇴</div>
          <p className="text-stone-500 text-sm">Cargando banco de preguntas…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7EF" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="mx-auto px-4 py-6" style={{ maxWidth: ancho }}>

        {/* barra superior de navegación (excepto en inicio) */}
        {vista.tipo !== "inicio" && (
          <button onClick={volver} className="mb-4 text-sm font-semibold text-stone-500 flex items-center gap-1">
            ← Inicio
          </button>
        )}

        {vista.tipo === "inicio" && (
          <Inicio
            irAModulo={(k) => setVista({ tipo: "modulo", area: k })}
            irATest={(k) => setVista({ tipo: "test", area: k })}
            irASimulacro={(k) => setVista({ tipo: "test", area: k })}
          />
        )}

        {vista.tipo === "modulo" && (() => {
          const m = MODULOS.find((x) => x.key === vista.area);
          return (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{m.icono}</span>
                <h1 className="text-xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>{m.nombre}</h1>
                <button onClick={() => setVista({ tipo: "test", area: m.key })} className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: m.color }}>
                  Hacer test
                </button>
              </div>
              {m.component}
            </div>
          );
        })()}

        {vista.tipo === "test" && <Test area={vista.area} banco={banco} onSalir={volver} />}
      </div>
    </div>
  );
}
