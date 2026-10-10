import React, { useState } from "react";
import TarjetaExpandible from "../components/TarjetaExpandible";
import Pill, { BarraPills } from "../components/Pill";
import EnlaceGuia from "../components/EnlaceGuia";

/* ============================================================
   DATOS — extraídos del capítulo "Constitución Política"
   de la Guía Cancillería (Constitución de 1991).
   ============================================================ */

/* Las secciones ya NO llevan color propio. Antes cada una traía el suyo y
   acababa chocando: el mismo morado significaba "Constitución", "Principios",
   "Rama Judicial", "Música y arte" e "Historia contemporánea" a la vez. El
   color identifica el área; dentro del módulo la sección se distingue por
   estado (rellena si está activa, contorno si no). */
const SECCIONES = [
  { key: "principios", label: "Principios", icono: "🏛️" },
  { key: "derechos", label: "Derechos", icono: "🛡️" },
  { key: "proteccion", label: "Protección", icono: "⚖️" },
  { key: "participacion", label: "Participación", icono: "🗳️" },
  { key: "estado", label: "Estado", icono: "🏢" },
];

const PRINCIPIOS = [
  {
    titulo: "Estado social de derecho", icono: "🏛️",
    resumen: "Colombia asegura la efectividad de los derechos humanos.",
    detalle: "La Constitución de 1991 caracteriza a Colombia como un Estado social de derecho. Significa que el Estado: (i) respeta los derechos absteniéndose de interferir o discriminar; (ii) los protege evitando intromisiones de terceros; y (iii) los garantiza mediante autoridades e instituciones que investigan, juzgan y sancionan las violaciones graves a los derechos humanos y al derecho internacional humanitario.",
  },
  {
    titulo: "Descentralización", icono: "🗺️",
    resumen: "Distribuye funciones entre la administración central y los territorios.",
    detalle: "Puede ser de tres tipos: (1) Territorial: competencias a departamentos y municipios, que las ejecutan en su propio nombre y responsabilidad. (2) Por servicios: funciones asignadas a entidades especializadas (establecimientos públicos, corporaciones autónomas regionales, empresas industriales y comerciales del Estado, sociedades de economía mixta). (3) Por colaboración: personas privadas ejercen funciones administrativas, p. ej. las Cámaras de Comercio y la Federación Nacional de Cafeteros.",
    destacado: "3 tipos: territorial, por servicios y por colaboración.",
  },
  {
    titulo: "Soberanía popular", icono: "🙋",
    resumen: "La autoridad reside exclusivamente en el pueblo.",
    detalle: "La autoridad en Colombia reside exclusivamente en el pueblo y se expresa a través del voto, el cual permite tomar decisiones de interés público y elegir a los representantes del gobierno nacional.",
  },
  {
    titulo: "Supremacía de la Constitución", icono: "📜",
    resumen: "La Constitución es \"norma de normas\".",
    detalle: "La Constitución Política de 1991 es la ley que rige a las demás: en caso de incompatibilidad entre la Constitución y otras normas jurídicas, priman las disposiciones constitucionales.",
    destacado: "Frase clave para el test: la Constitución es \"norma de normas\".",
  },
];

const DERECHOS = [
  { titulo: "Vida", icono: "❤️", detalle: "Posibilidad de existir y garantía de una existencia digna. Es inviolable: la pena de muerte NO está permitida en Colombia. Proteger la vida y la integridad personal es responsabilidad esencial del Estado." },
  { titulo: "Igualdad", icono: "🤝", detalle: "Tres dimensiones: (i) formal — la ley se aplica en condiciones de equidad a todos; (ii) material — paridad de oportunidades; (iii) prohibición de discriminación por sexo, raza, origen étnico, identidad de género, religión u opinión política." },
  { titulo: "Libre desarrollo de la personalidad", icono: "🌱", detalle: "El ciudadano tiene autonomía para tomar decisiones y llevar su vida según sus creencias y pensamientos, definiendo las opciones vitales que guían su existencia." },
  { titulo: "Libertad de conciencia", icono: "🧠", detalle: "Tres garantías: (i) nadie será objeto de acoso o persecución por sus convicciones; (ii) nadie está obligado a revelarlas; (iii) nadie será obligado a actuar contra su conciencia." },
  { titulo: "Libertad de cultos", icono: "🕊️", detalle: "Derecho a profesar y difundir libremente la religión, individual o colectivamente. Se basa en la separación entre el Estado y las iglesias y la neutralidad religiosa." },
  { titulo: "Prohibición de la esclavitud", icono: "⛓️", detalle: "Prohíbe la esclavitud, la servidumbre, los trabajos forzosos y la trata de seres humanos. Protege la libertad física y la dignidad de la persona." },
  { titulo: "Libertad de opinión, prensa e información", icono: "📰", detalle: "Todo ciudadano es libre de expresar su opinión. Es un derecho de doble vía: protege a quien emite y a quien recibe la información. Los medios deben emitir noticias veraces e imparciales; si no, procede el derecho de rectificación." },
  { titulo: "Honra", icono: "🎖️", detalle: "Se refiere al valor interno de un ciudadano y garantiza su valía propia y ante la sociedad." },
  { titulo: "Paz", icono: "🕊️", detalle: "Supone la convivencia ordenada entre los ciudadanos. La tranquilidad individual es un derecho derivado de la vida digna, en aras del interés general." },
  { titulo: "Libertad de locomoción", icono: "🚶", detalle: "Posibilidad de transitar libremente por el territorio del país, incluidas vías y espacios públicos. No es absoluto, pero se vulnera cuando se impide el tránsito en espacios públicos." },
  { titulo: "Trabajo", icono: "💼", detalle: "Actividad libremente escogida, con esfuerzo intelectual o material. Es un derecho y una obligación social con especial protección del Estado. Toda persona tiene derecho a un trabajo en condiciones dignas y justas." },
  { titulo: "Asociación", icono: "👥", detalle: "Derecho a unirse voluntariamente con fines ideológicos, religiosos, económicos, laborales o deportivos. El artículo 39 consagra la asociación sindical: trabajadores y empleadores pueden constituir sindicatos sin intervención estatal." },
  { titulo: "Libertad", icono: "🔓", detalle: "Ausencia de aprehensión, retención, captura o detención arbitraria. Es presupuesto para ejercer los demás derechos (trabajo, educación, familia, intimidad)." },
];

const PROTECCION = [
  {
    titulo: "Acción de Tutela", icono: "🛡️",
    quien: "Toda persona",
    para: "Proteger derechos fundamentales amenazados por el Estado o un tercero",
    detalle: "Toda persona puede solicitar por escrito al juez que proteja sus derechos fundamentales cuando estén amenazados por el Estado o por un tercero. Es un procedimiento especial, rápido, expedito y contundente.",
    destacado: "El mecanismo estrella para proteger derechos fundamentales de forma inmediata.",
  },
  {
    titulo: "Acción Popular", icono: "🌍",
    quien: "Una sola persona (sin identificar un grupo)",
    para: "PREVENIR daños a derechos colectivos (comunidades, medio ambiente)",
    detalle: "Es una acción PREVENTIVA: busca evitar que se cause un daño o la vulneración de un derecho colectivo. Requiere: (i) acción u omisión de autoridades o particulares; (ii) daño contingente, peligro o amenaza a derechos colectivos; (iii) nexo de causalidad entre ambos. Una sola persona puede interponerla.",
  },
  {
    titulo: "Acción de Grupo", icono: "👥",
    quien: "Mínimo 20 personas afectadas",
    para: "REPARAR (indemnizar) un daño ya causado a un grupo",
    detalle: "Es una acción INDEMNIZATORIA: busca la reparación de daños producidos a un grupo de personas por acción u omisión de una autoridad pública o de particulares. La indemnización se hace en proporción al daño causado. Requiere un conjunto de mínimo 20 personas afectadas.",
    destacado: "Popular = prevenir (1 persona). Grupo = indemnizar (mínimo 20 personas).",
  },
  {
    titulo: "Acción de Cumplimiento", icono: "📋",
    quien: "Cualquier persona",
    para: "Hacer efectivo el cumplimiento de una ley o acto administrativo",
    detalle: "Mecanismo judicial que permite a cualquier persona acudir ante la autoridad competente para hacer efectivo el cumplimiento de una ley o acto administrativo, buscando la vigencia material de las normas.",
  },
  {
    titulo: "Habeas Corpus", icono: "🔓",
    quien: "Cualquier persona privada de la libertad ilegalmente",
    para: "Tutelar la libertad personal",
    detalle: "Es un derecho fundamental y a la vez una acción constitucional que tutela la libertad personal cuando alguien es privado de la libertad violando garantías constitucionales o legales. Es intangible y de aplicación inmediata; se puede invocar ante cualquier autoridad judicial.",
  },
  {
    titulo: "Derecho de Petición", icono: "✉️",
    quien: "Toda persona natural o jurídica",
    para: "Presentar peticiones respetuosas y obtener pronta respuesta",
    detalle: "Consagrado en el artículo 23 de la Constitución. Es gratuito, puede ser verbal o escrito, y no requiere abogado. La Ley 1755 de 2015 fijó plazos: 10 días hábiles para información/documentos y 30 días hábiles para consultas.",
    destacado: "Artículo 23. Plazos: 10 días (documentos) y 30 días (consultas).",
  },
];

const PARTICIPACION = [
  {
    titulo: "Voto", icono: "🗳️",
    detalle: "Es un derecho y un deber ciudadano, y el principal mecanismo de participación democrática. El sufragio es universal, libre, igual, directo y secreto.",
    destacado: "El mecanismo de mayor trascendencia (art. 103).",
  },
  {
    titulo: "Plebiscito", icono: "📢",
    detalle: "El pueblo es convocado por el Presidente de la República para apoyar o rechazar una decisión del Ejecutivo. Requiere la firma de todos los ministros y concepto previo favorable del Congreso. NO puede usarse para tratados internacionales, leyes de presupuesto ni materias fiscales o tributarias.",
  },
  {
    titulo: "Consulta popular", icono: "❓",
    detalle: "Se acude a la ciudadanía para que se pronuncie sobre una decisión; una vez tomada por el pueblo, es de obligatorio cumplimiento para la administración. La pregunta debe redactarse de forma clara, para responder Sí o No.",
  },
  {
    titulo: "Cabildo abierto", icono: "🏘️",
    detalle: "Reunión pública donde la comunidad toma decisiones consensuadas sobre intereses generales, por ejemplo la construcción de una calle o el arreglo de un parque. Participación directa.",
  },
  {
    titulo: "Revocatoria del mandato", icono: "↩️",
    detalle: "Los ciudadanos expresan su voluntad de terminar el mandato de un gobernador o alcalde elegido popularmente. Se interpone ante la Registraduría, con firmas mínimas: igual o superior al 40% de los votos que obtuvo el elegido.",
    destacado: "Aplica a gobernadores y alcaldes. Firmas: ≥ 40% de los votos del elegido.",
  },
  {
    titulo: "Referendo", icono: "📄",
    detalle: "Convoca al pueblo a aprobar o rechazar un proyecto de norma jurídica, o a derogar una norma vigente. Puede ser de origen ciudadano o de autoridad pública.",
  },
  {
    titulo: "Iniciativa legislativa", icono: "✍️",
    detalle: "Los ciudadanos pueden presentar proyectos normativos ante corporaciones públicas: Congreso, Asambleas Departamentales, Concejos Municipales o Distritales, o Juntas Administradoras Locales. La corporación los debate y los aprueba, modifica o niega.",
  },
];

const RAMAS = [
  {
    key: "ejecutiva", titulo: "Rama Ejecutiva", icono: "🏛️",
    cabeza: "Presidente de la República",
    funcion: "Ejecuta las actividades administrativas al servicio de los intereses generales; gestiona las políticas y administra los recursos de la nación.",
    detalle: "Está en cabeza del Presidente de la República, quien simboliza la unidad nacional y es a la vez jefe de Estado, jefe de Gobierno y suprema autoridad administrativa. El gobierno nacional lo conforman el Presidente, los ministros y los directores de departamentos administrativos. Tiene tres niveles: nacional, departamental y municipal.",
    destacado: "El Presidente es 3 cosas a la vez: jefe de Estado, jefe de Gobierno y suprema autoridad administrativa.",
  },
  {
    key: "legislativa", titulo: "Rama Legislativa", icono: "📜",
    cabeza: "Congreso de la República (Senado + Cámara)",
    funcion: "Reformar la Constitución, hacer las leyes y ejercer control político sobre el Gobierno.",
    detalle: "Está en cabeza del Congreso de la República, sistema bicameral: cámara alta (Senado) y cámara baja (Cámara de Representantes). Funciones: (1) reformar la Constitución mediante actos legislativos; (2) elaborar, interpretar, reformar y derogar leyes y códigos; (3) convocar a ministros y autoridades para conocer acusaciones contra funcionarios. El Senado tramita proyectos de ley, hace control político y elige altos dignatarios. La Cámara elige al Defensor del Pueblo y examina la cuenta general del presupuesto que presenta el Contralor.",
    destacado: "Sistema bicameral: Senado (alta) + Cámara de Representantes (baja).",
  },
  {
    key: "judicial", titulo: "Rama Judicial", icono: "⚖️",
    cabeza: "Altas cortes y jueces",
    funcion: "Administrar justicia: resolver conflictos entre ciudadanos y entre estos y el Estado.",
    detalle: "Resuelve conflictos mediante sentencias, fallos o autos, con base en la Constitución. Jurisdicción Ordinaria: Corte Suprema de Justicia, Tribunales Superiores de Distrito Judicial y juzgados (civiles, laborales, penales, de familia, etc.). Jurisdicción de lo Contencioso Administrativo: Consejo de Estado, Tribunales y Juzgados Administrativos. Jurisdicción Constitucional: Corte Constitucional. También: Jurisdicción de Paz (jueces de paz), Fiscalía General de la Nación y Consejo Superior de la Judicatura.",
    destacado: "7 integrantes clave: Corte Constitucional, Corte Suprema, Consejo de Estado, Consejo Superior de la Judicatura, Fiscalía, Tribunales y Jueces.",
  },
];

const CONTROL = [
  {
    titulo: "Contraloría General de la República", icono: "💰",
    detalle: "Máximo órgano de control FISCAL del Estado: vigila el buen uso de los recursos y bienes públicos.",
  },
  {
    titulo: "Procuraduría General de la Nación", icono: "🔍",
    detalle: "Inicia, adelanta y falla las investigaciones DISCIPLINARIAS contra servidores públicos y particulares que ejercen funciones públicas o manejan dineros del Estado. Forma parte del Ministerio Público, junto con la Defensoría del Pueblo.",
  },
  {
    titulo: "Organización electoral", icono: "🗳️",
    detalle: "Conformada por el Consejo Nacional Electoral y la Registraduría Nacional del Estado Civil. Estructura, dirige y controla las elecciones.",
  },
  {
    titulo: "Órganos autónomos e independientes", icono: "🏦",
    detalle: "Con régimen especial y autonomía propia: el Banco de la República (banca central: regula la moneda, los cambios y el crédito; emite la moneda legal; administra las reservas internacionales), las Corporaciones Autónomas Regionales (administran el medio ambiente en su jurisdicción), los entes universitarios autónomos (universidades estatales) y la Comisión Nacional del Servicio Civil (garantiza el mérito en el empleo público).",
  },
];

/* ============================================================
   COMPONENTES
   ============================================================ */
const ACENTO = "var(--text-con)";
const RELLENO = "var(--area-con)";
const SOBRE = "var(--on-con)";

function Tarjeta({ item, defaultCampos }) {
  return (
    <TarjetaExpandible item={item} acento={ACENTO} cabecera={item.resumen}>
      {defaultCampos && item.quien && (
        <div className="grid grid-cols-1 gap-1.5 text-sm">
          <p>
            <span className="tipo-display text-[12px]" style={{ color: ACENTO }}>
              ¿Quién la interpone?
            </span>{" "}
            <span className="text-ink">{item.quien}</span>
          </p>
          <p>
            <span className="tipo-display text-[12px]" style={{ color: ACENTO }}>
              ¿Para qué sirve?
            </span>{" "}
            <span className="text-ink">{item.para}</span>
          </p>
        </div>
      )}
    </TarjetaExpandible>
  );
}

function DiagramaRamas({ ramaActiva, setRamaActiva }) {
  return (
    <div>
      {/* nodo raíz */}
      <div className="text-center mb-2">
        <div className="tipo-display inline-block rounded-card px-4 py-2.5 text-[12px] bg-raised text-ink border border-rule">
          Estado colombiano · República unitaria
        </div>
        <div className="w-0.5 h-4 mx-auto bg-rule" />
      </div>

      {/* Las tres ramas: solo una está activa a la vez, así que se distinguen
          por estado y no por tres colores distintos. */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {RAMAS.map((r) => {
          const activa = ramaActiva === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setRamaActiva(activa ? null : r.key)}
              aria-pressed={activa}
              className="rounded-card p-3 min-h-[44px] text-center transition-[transform,background-color,border-color,color] duration-[160ms] active:scale-[.97] border-[1.5px]"
              style={{
                backgroundColor: activa ? RELLENO : "transparent",
                borderColor: activa ? RELLENO : "var(--rule)",
                color: activa ? SOBRE : ACENTO,
              }}
            >
              <span className="text-2xl block">{r.icono}</span>
              <span className="tipo-display text-[12px] leading-tight block mt-1">
                {r.titulo.replace("Rama ", "")}
              </span>
            </button>
          );
        })}
      </div>

      {/* detalle de la rama activa */}
      {ramaActiva && (() => {
        const r = RAMAS.find((x) => x.key === ramaActiva);
        return (
          <div
            className="rounded-card border-2 bg-surface p-4 mb-4"
            style={{ borderColor: ACENTO, animation: "fadeIn .25s ease-out" }}
          >
            <h3 className="tipo-display text-[17px]" style={{ color: ACENTO }}>
              {r.icono} {r.titulo}
            </h3>
            <p className="text-sm mt-1.5">
              <span className="tipo-display text-[12px] text-ink-soft">En cabeza de</span>{" "}
              <span className="text-ink">{r.cabeza}</span>
            </p>
            <p className="text-sm mt-1">
              <span className="tipo-display text-[12px] text-ink-soft">Función</span>{" "}
              <span className="text-ink">{r.funcion}</span>
            </p>
            <p className="text-sm text-ink leading-relaxed mt-2">{r.detalle}</p>
            {r.destacado && (
              <div className="mt-2 rounded-lg px-3 py-2 text-sm flex gap-2 bg-raised text-ink border-l-2" style={{ borderColor: ACENTO }}>
                <span aria-hidden="true">📌</span><span>{r.destacado}</span>
              </div>
            )}
          </div>
        );
      })()}

      {/* organismos de control */}
      <p className="tipo-display text-[12px] text-ink-soft mb-2 mt-2">
        Además de las 3 ramas — organismos de control y otros
      </p>
      <div className="space-y-2">
        {CONTROL.map((c) => (
          <Tarjeta key={c.titulo} item={c} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
const ENCABEZADOS = {
  principios: ["Principios constitucionales", "Los cimientos del ordenamiento jurídico (artículos 1 y 3)."],
  derechos: ["Derechos fundamentales", "Consagrados en los artículos 11 al 44. Son inalienables: inherentes a toda persona, inviolables e irrenunciables, sin distinción de raza, condición, sexo o religión."],
  proteccion: ["Mecanismos de protección de derechos", "Acciones constitucionales para defender tus derechos ante la justicia."],
  participacion: ["Mecanismos de participación ciudadana", "Herramientas del artículo 103 para incidir en las decisiones colectivas."],
  estado: ["Estructura del Estado", "República unitaria con tres ramas del poder público y órganos autónomos. Toca cada rama."],
};

export default function Constitucion() {
  const [seccion, setSeccion] = useState("principios");
  const [ramaActiva, setRamaActiva] = useState(null);
  const [titulo, bajada] = ENCABEZADOS[seccion];

  return (
    <>
        <p className="text-ink-soft text-sm mb-4">
          Explora los principios, derechos, mecanismos y la estructura del Estado. Toca cualquier tarjeta para ver el detalle.
        </p>

        {/* navegación de secciones */}
        <BarraPills>
          {SECCIONES.map((s) => (
            <Pill
              key={s.key}
              activa={seccion === s.key}
              relleno={RELLENO}
              sobre={SOBRE}
              acento={ACENTO}
              onClick={() => setSeccion(s.key)}
            >
              <span aria-hidden="true">{s.icono}</span> {s.label}
            </Pill>
          ))}
        </BarraPills>

        {/* encabezado de sección */}
        <div className="mb-4 rounded-card px-4 py-3 bg-raised border-l-2" style={{ borderColor: ACENTO }}>
          <p className="tipo-display text-[13px]" style={{ color: ACENTO }}>{titulo}</p>
          <p className="text-sm text-ink-soft mt-0.5">{bajada}</p>
        </div>

        {/* contenido */}
        {seccion === "principios" && (
          <div className="space-y-2.5">
            {PRINCIPIOS.map((p) => <Tarjeta key={p.titulo} item={p} />)}
          </div>
        )}

        {seccion === "derechos" && (
          <div className="grid grid-cols-1 gap-2.5">
            {DERECHOS.map((d) => <Tarjeta key={d.titulo} item={d} />)}
          </div>
        )}

        {seccion === "proteccion" && (
          <div className="space-y-2.5">
            {PROTECCION.map((p) => <Tarjeta key={p.titulo} item={p} defaultCampos />)}
          </div>
        )}

        {seccion === "participacion" && (
          <div className="space-y-2.5">
            {PARTICIPACION.map((p) => <Tarjeta key={p.titulo} item={p} />)}
          </div>
        )}

        {seccion === "estado" && <DiagramaRamas ramaActiva={ramaActiva} setRamaActiva={setRamaActiva} />}

        <footer className="text-center text-xs text-ink-soft mt-6 pb-4">
          <EnlaceGuia> · Constitución Política de 1991</EnlaceGuia>
        </footer>
    </>
  );
}
