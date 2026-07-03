import React, { useState } from "react";
import MapaRegiones from "./modulos/MapaRegiones";
import LineaTiempo from "./modulos/LineaTiempo";
import Constitucion from "./modulos/Constitucion";
import CulturaSociedad from "./modulos/CulturaSociedad";

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

/* ============================================================
   BANCO DE PREGUNTAS (respuesta escrita / completar)
   ------------------------------------------------------------
   Cada pregunta: área, enunciado, respuesta(s) aceptada(s) y
   una explicación breve para autoevaluarse. La calificación es
   por autoevaluación (como el examen real: no es opción múltiple).
   'aceptadas' se usa solo como ayuda de comparación / pista.
   ============================================================ */
const BANCO = [
  // ============ GEOGRAFÍA (20) ============
  { area: "geografia", q: "¿Cuántas regiones naturales (biogeográficas) tiene Colombia y cuáles son?", a: "5: Caribe, Andina, Pacífica, Orinoquía y Amazónica.", aceptadas: ["5", "cinco"] },
  { area: "geografia", q: "¿Cuál es el pico más alto de Colombia y dónde está?", a: "El Pico Cristóbal Colón (5.775 m), en la Sierra Nevada de Santa Marta (región Caribe).", aceptadas: ["cristóbal colón", "cristobal colon"] },
  { area: "geografia", q: "¿Cuántas cordilleras atraviesan el territorio y cómo se llaman?", a: "Tres: Occidental, Central y Oriental.", aceptadas: ["3", "tres"] },
  { area: "geografia", q: "Completa: la región ___ ocupa cerca del 42% del territorio y es la más biodiversa.", a: "Amazónica (Amazonía).", aceptadas: ["amazónica", "amazonia", "amazonía"] },
  { area: "geografia", q: "¿Qué región es la más poblada del país (≈40%)?", a: "La región Andina.", aceptadas: ["andina"] },
  { area: "geografia", q: "¿Qué región es una de las más lluviosas del mundo?", a: "La región Pacífica (el Chocó puede superar los 10.000 mm de lluvia al año).", aceptadas: ["pacífica", "pacifica"] },
  { area: "geografia", q: "¿Cómo se llaman las llanuras planas de la Orinoquía?", a: "Los Llanos Orientales.", aceptadas: ["llanos"] },
  { area: "geografia", q: "¿Qué piso térmico corresponde a temperaturas entre 18 y 24 °C?", a: "El piso térmico templado (entre 1.000 y 2.000 m).", aceptadas: ["templado"] },
  { area: "geografia", q: "¿Cómo se llama el piso térmico de más de 3.000 m con temperaturas bajo 10 °C?", a: "El páramo.", aceptadas: ["páramo", "paramo"] },
  { area: "geografia", q: "¿Cuál es la capital y ciudad más poblada de Colombia?", a: "Bogotá.", aceptadas: ["bogotá", "bogota"] },
  { area: "geografia", q: "¿En qué región están las tres cordilleras y los grandes nevados?", a: "En la región Andina.", aceptadas: ["andina"] },
  { area: "geografia", q: "¿Qué formación aislada de la Orinoquía alberga a Caño Cristales?", a: "La Serranía de La Macarena.", aceptadas: ["macarena"] },
  { area: "geografia", q: "¿Qué archipiélago del Caribe forma parte del territorio colombiano?", a: "San Andrés, Providencia y Santa Catalina.", aceptadas: ["san andrés", "san andres", "providencia"] },
  { area: "geografia", q: "Completa: los páramos son considerados las \"fábricas de ___\" del país.", a: "Agua.", aceptadas: ["agua"] },
  { area: "geografia", q: "¿Qué pueblos indígenas habitan la Sierra Nevada de Santa Marta?", a: "Los kogui, arhuaco, wiwa y kankuamo.", aceptadas: ["kogui", "arhuaco", "wiwa", "kankuamo"] },
  { area: "geografia", q: "¿Cuál es el roedor más grande del mundo, típico de la Orinoquía?", a: "El capibara (chigüiro).", aceptadas: ["capibara", "chigüiro", "chiguiro"] },
  { area: "geografia", q: "¿Qué región tiene clima ecuatorial húmedo y frontera con Ecuador, Perú y Brasil?", a: "La región Amazónica.", aceptadas: ["amazónica", "amazonica", "amazonía", "amazonia"] },
  { area: "geografia", q: "¿Qué piso térmico corresponde a menos de 1.000 m y 24–28 °C?", a: "El piso térmico cálido.", aceptadas: ["cálido", "calido"] },
  { area: "geografia", q: "¿Qué región es reconocida por sus manglares, sabanas y la Sierra Nevada?", a: "La región Caribe.", aceptadas: ["caribe"] },
  { area: "geografia", q: "¿Cómo se llama el ecosistema de alta montaña con frailejones?", a: "El páramo.", aceptadas: ["páramo", "paramo"] },

  // ============ HISTORIA (20) ============
  { area: "historia", q: "¿Por dónde llegaron los primeros pobladores a América hace ~16.000 años?", a: "Por el estrecho de Beringia y luego el Darién.", aceptadas: ["beringia"] },
  { area: "historia", q: "¿Cuáles fueron las tres lenguas madre de los pueblos prehispánicos?", a: "Chibcha, arawak y caribe.", aceptadas: ["chibcha", "arawak", "caribe"] },
  { area: "historia", q: "¿Quién fundó Santa Fe de Bogotá en 1538?", a: "Gonzalo Jiménez de Quesada.", aceptadas: ["jiménez de quesada", "jimenez de quesada", "quesada"] },
  { area: "historia", q: "¿En qué año se fundó el Virreinato de la Nueva Granada?", a: "En 1717.", aceptadas: ["1717"] },
  { area: "historia", q: "¿Cómo se llamó la rebelión de 1780–1781 contra el alza de impuestos?", a: "La Revolución de los Comuneros.", aceptadas: ["comuneros"] },
  { area: "historia", q: "¿Quién escribió el Memorial de Agravios en 1809?", a: "Camilo Torres.", aceptadas: ["camilo torres", "torres"] },
  { area: "historia", q: "¿Qué se conmemora el 20 de julio de 1810?", a: "El Grito de Independencia y la Junta Suprema de Gobierno en Bogotá.", aceptadas: ["grito de independencia", "junta"] },
  { area: "historia", q: "¿Con qué batalla se consolidó la independencia y en qué fecha?", a: "La Batalla de Boyacá, el 7 de agosto de 1819.", aceptadas: ["boyacá", "boyaca", "1819"] },
  { area: "historia", q: "Completa: la República creada en Angostura (1819), hoy llamada ___ Colombia.", a: "Gran Colombia.", aceptadas: ["gran"] },
  { area: "historia", q: "¿En qué año se disolvió la Gran Colombia?", a: "En 1831.", aceptadas: ["1831"] },
  { area: "historia", q: "¿Qué dos partidos surgieron en la etapa de la Nueva Granada?", a: "El Liberal y el Conservador.", aceptadas: ["liberal", "conservador"] },
  { area: "historia", q: "¿En qué año se promulgó la Constitución centralista anterior a la de 1991?", a: "En 1886.", aceptadas: ["1886"] },
  { area: "historia", q: "¿Qué conflicto ocurrió entre 1899 y 1902?", a: "La Guerra de los Mil Días.", aceptadas: ["mil días", "mil dias"] },
  { area: "historia", q: "¿Qué territorio se separó de Colombia en 1903?", a: "Panamá.", aceptadas: ["panamá", "panama"] },
  { area: "historia", q: "¿Qué ocurrió el 9 de abril de 1948?", a: "El asesinato de Jorge Eliécer Gaitán, que desató el Bogotazo.", aceptadas: ["gaitán", "gaitan", "bogotazo"] },
  { area: "historia", q: "¿En qué año votaron por primera vez las mujeres en Colombia?", a: "En el plebiscito de 1957.", aceptadas: ["1957"] },
  { area: "historia", q: "¿Cómo se llamó el acuerdo de alternancia entre liberales y conservadores (1958–1974)?", a: "El Frente Nacional.", aceptadas: ["frente nacional"] },
  { area: "historia", q: "¿En qué años se fundaron el ELN, las FARC y el EPL?", a: "ELN en 1962, FARC en 1965 y EPL en 1967.", aceptadas: ["1962", "1965", "1967"] },
  { area: "historia", q: "¿En qué año se firmó el acuerdo de paz con las FARC?", a: "En 2016 (negociado en La Habana).", aceptadas: ["2016"] },
  { area: "historia", q: "¿Qué mecanismos de justicia transicional creó el acuerdo de 2016?", a: "La JEP (Jurisdicción Especial para la Paz) y la Comisión de la Verdad.", aceptadas: ["jep", "comisión de la verdad", "comision de la verdad"] },

  // ============ CONSTITUCIÓN (20) ============
  { area: "constitucion", q: "¿En qué año fue promulgada la Constitución vigente?", a: "En 1991.", aceptadas: ["1991"] },
  { area: "constitucion", q: "Completa: la Constitución define a Colombia como un Estado ___ de derecho.", a: "Social.", aceptadas: ["social"] },
  { area: "constitucion", q: "¿Cuáles son los tres tipos de descentralización?", a: "Territorial, por servicios y por colaboración.", aceptadas: ["territorial", "servicios", "colaboración", "colaboracion"] },
  { area: "constitucion", q: "Se dice que la Constitución es \"norma de ___\".", a: "Normas.", aceptadas: ["normas"] },
  { area: "constitucion", q: "¿En qué artículos están los derechos fundamentales?", a: "Del artículo 11 al 44.", aceptadas: ["11", "44"] },
  { area: "constitucion", q: "¿Qué mecanismo protege los derechos fundamentales de forma inmediata?", a: "La acción de tutela.", aceptadas: ["tutela"] },
  { area: "constitucion", q: "¿Qué acción es PREVENTIVA y la puede interponer una sola persona?", a: "La acción popular (protege derechos colectivos).", aceptadas: ["popular"] },
  { area: "constitucion", q: "¿Qué acción es INDEMNIZATORIA y requiere mínimo 20 personas?", a: "La acción de grupo.", aceptadas: ["grupo"] },
  { area: "constitucion", q: "¿Qué acción tutela la libertad personal ante una detención ilegal?", a: "El habeas corpus.", aceptadas: ["habeas corpus", "hábeas corpus"] },
  { area: "constitucion", q: "¿En qué artículo está el derecho de petición?", a: "En el artículo 23.", aceptadas: ["23"] },
  { area: "constitucion", q: "¿Cuál es el principal mecanismo de participación ciudadana?", a: "El voto.", aceptadas: ["voto", "sufragio"] },
  { area: "constitucion", q: "¿Qué mecanismo permite terminar el mandato de un alcalde o gobernador?", a: "La revocatoria del mandato.", aceptadas: ["revocatoria"] },
  { area: "constitucion", q: "¿Cuáles son las tres ramas del poder público?", a: "Ejecutiva, Legislativa y Judicial.", aceptadas: ["ejecutiva", "legislativa", "judicial"] },
  { area: "constitucion", q: "¿Quién está a la cabeza de la rama ejecutiva?", a: "El Presidente de la República.", aceptadas: ["presidente"] },
  { area: "constitucion", q: "¿Qué dos cámaras integran el Congreso?", a: "El Senado y la Cámara de Representantes.", aceptadas: ["senado", "cámara", "camara"] },
  { area: "constitucion", q: "¿Qué órgano ejerce el control fiscal del Estado?", a: "La Contraloría General de la República.", aceptadas: ["contraloría", "contraloria"] },
  { area: "constitucion", q: "¿Qué órgano ejerce el control disciplinario de los servidores públicos?", a: "La Procuraduría General de la Nación.", aceptadas: ["procuraduría", "procuraduria"] },
  { area: "constitucion", q: "¿Qué entidades conforman la organización electoral?", a: "El Consejo Nacional Electoral y la Registraduría Nacional del Estado Civil.", aceptadas: ["consejo nacional electoral", "registraduría", "registraduria"] },
  { area: "constitucion", q: "¿Cuál es el banco central y órgano autónomo del Estado?", a: "El Banco de la República.", aceptadas: ["banco de la república", "banco de la republica"] },
  { area: "constitucion", q: "¿Qué tribunal integra la Jurisdicción Constitucional?", a: "La Corte Constitucional.", aceptadas: ["corte constitucional"] },

  // ============ CULTURA (20) ============
  { area: "cultura", q: "¿Cuáles son los colores de la bandera, de arriba a abajo?", a: "Amarillo, azul y rojo.", aceptadas: ["amarillo", "azul", "rojo"] },
  { area: "cultura", q: "¿Qué representa el color amarillo de la bandera?", a: "La riqueza del suelo (también armonía y justicia).", aceptadas: ["riqueza", "suelo", "oro"] },
  { area: "cultura", q: "¿Cuál es el lema nacional que aparece en el escudo?", a: "\"Libertad y Orden\".", aceptadas: ["libertad y orden"] },
  { area: "cultura", q: "¿Quién diseñó el escudo nacional y en qué año?", a: "Francisco de Paula Santander, en 1834.", aceptadas: ["santander", "1834"] },
  { area: "cultura", q: "¿Quién escribió la letra del himno nacional?", a: "El presidente Rafael Núñez (música de Oreste Síndici).", aceptadas: ["núñez", "nuñez", "nunez"] },
  { area: "cultura", q: "¿En qué año se proclamó oficialmente el himno nacional?", a: "En 1920.", aceptadas: ["1920"] },
  { area: "cultura", q: "¿Cuál es el ave nacional de Colombia?", a: "El cóndor de los Andes.", aceptadas: ["cóndor", "condor"] },
  { area: "cultura", q: "¿Cuál es la flor nacional de Colombia?", a: "La orquídea Cattleya trianae.", aceptadas: ["cattleya", "trianae"] },
  { area: "cultura", q: "¿Cuál es el árbol nacional de Colombia?", a: "La Palma de Cera del Quindío.", aceptadas: ["palma de cera", "quindío", "quindio"] },
  { area: "cultura", q: "¿Cuál es el símbolo cultural de la nación (Ley 908 de 2004)?", a: "El sombrero vueltiao (cultura Zenú).", aceptadas: ["sombrero vueltiao", "vueltiao"] },
  { area: "cultura", q: "¿Cuál es la moneda oficial de Colombia?", a: "El peso colombiano (COP).", aceptadas: ["peso"] },
  { area: "cultura", q: "¿Cuál es el plato típico del archipiélago de San Andrés?", a: "El Rondón.", aceptadas: ["rondón", "rondon"] },
  { area: "cultura", q: "¿De qué región es originaria la bandeja paisa?", a: "De la región Andina (Antioquia).", aceptadas: ["andina", "antioquia"] },
  { area: "cultura", q: "¿Cuál es el plato típico de los Llanos (Orinoquía)?", a: "La mamona o ternera a la llanera.", aceptadas: ["mamona", "ternera a la llanera"] },
  { area: "cultura", q: "¿Qué carnaval es Patrimonio de la Humanidad de la UNESCO?", a: "El Carnaval de Barranquilla.", aceptadas: ["barranquilla"] },
  { area: "cultura", q: "¿En qué ciudad se celebra el Carnaval de Negros y Blancos?", a: "En San Juan de Pasto (Nariño).", aceptadas: ["pasto"] },
  { area: "cultura", q: "¿En qué ciudad es la Feria de las Flores con el desfile de silleteros?", a: "En Medellín.", aceptadas: ["medellín", "medellin"] },
  { area: "cultura", q: "¿Qué música tradicional es característica de los Llanos Orientales?", a: "El joropo.", aceptadas: ["joropo"] },
  { area: "cultura", q: "¿Quién ganó el Nobel de Literatura en 1982 y con qué obra?", a: "Gabriel García Márquez, con Cien años de soledad.", aceptadas: ["garcía márquez", "garcia marquez", "cien años de soledad"] },
  { area: "cultura", q: "¿Cuál es considerado el \"deporte rey\" de Colombia?", a: "El ciclismo.", aceptadas: ["ciclismo"] },
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
function Test({ area, onSalir }) {
  const esSimulacro = area === "simulacro20" || area === "simulacro80";
  const areaInfo = esSimulacro
    ? { nombre: area === "simulacro80" ? "Simulacro completo" : "Simulacro breve", icono: "📋", color: "#3a3327", soft: "#EDE9DE" }
    : MODULOS.find((m) => m.key === area);

  const preguntas = React.useMemo(() => {
    if (area === "simulacro80") {
      // réplica del examen: las 80 preguntas (20 por área), barajadas
      return shuffle(BANCO);
    }
    if (area === "simulacro20") {
      // versión breve: 5 aleatorias por área (rotan entre intentos)
      return shuffle(
        MODULOS.flatMap((m) => shuffle(BANCO.filter((b) => b.area === m.key)).slice(0, 5))
      );
    }
    return shuffle(BANCO.filter((b) => b.area === area));
  }, [area]);

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
              <button onClick={() => irAModulo(m.key)} className="flex-1 text-xs font-semibold py-1.5 rounded-lg text-white" style={{ backgroundColor: m.color }}>
                Estudiar
              </button>
              <button onClick={() => irATest(m.key)} className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border" style={{ borderColor: m.color, color: m.color }}>
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

  const volver = () => setVista({ tipo: "inicio" });

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7EF" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-2xl mx-auto px-4 py-6">

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

        {vista.tipo === "test" && <Test area={vista.area} onSalir={volver} />}
      </div>
    </div>
  );
}
