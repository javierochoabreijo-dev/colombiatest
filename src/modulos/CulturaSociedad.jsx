import React, { useState } from "react";

/* ============================================================
   ColombiaTest · Módulo Cultura y Sociedad
   Contenido extraído del capítulo "Cultura y Sociedad" de la
   Guía Cancillería (símbolos patrios, gastronomía, fiestas,
   música, arte, literatura, deporte, religión y turismo).
   Enfoque híbrido: Explorador (codificación) + Flashcards (retrieval).
   ============================================================ */

const CATS = [
  { key: "simbolos", label: "Símbolos", icono: "🇨🇴", color: "#B5892B", soft: "#F5EAD2" },
  { key: "gastronomia", label: "Gastronomía", icono: "🍽️", color: "#A0522D", soft: "#F0E0D6" },
  { key: "fiestas", label: "Fiestas", icono: "🎭", color: "#8C3B3B", soft: "#F0DADA" },
  { key: "arte", label: "Música y arte", icono: "🎶", color: "#5B4B8A", soft: "#E5E0F0" },
  { key: "deporte", label: "Deporte", icono: "🚴", color: "#1E7F8C", soft: "#DCEEF0" },
  { key: "turismo", label: "Turismo", icono: "🏖️", color: "#1F6E4A", soft: "#DCEFE3" },
];

/* ---------------- SÍMBOLOS PATRIOS ---------------- */
const SIMBOLOS = [
  {
    titulo: "Nombre oficial", icono: "📛",
    resumen: "República de Colombia.",
    detalle: "El nombre es un homenaje a Cristóbal Colón, dado por Simón Bolívar el 15 de febrero de 1819 en el Congreso de Angostura. Tras varios cambios de nombre en el siglo XIX, en 1886 el país volvió a llamarse República de Colombia, nombre que conserva hasta hoy.",
  },
  {
    titulo: "Bandera nacional", icono: "🎌", svg: "bandera",
    resumen: "Amarillo, azul y rojo, en tres franjas horizontales.",
    detalle: "El amarillo (la mitad superior) representa la riqueza del suelo, la armonía y la justicia. El azul representa el cielo, los ríos y los dos océanos. El rojo es la sangre derramada por los libertadores. Los colores fueron propuestos por Francisco Miranda, inspirado en la teoría de los colores de Goethe. La Ley 124 del 13 de julio de 1887 declaró la bandera actual.",
    destacado: "Amarillo = riqueza del suelo · Azul = mares y ríos · Rojo = sangre de los libertadores.",
  },
  {
    titulo: "Escudo nacional", icono: "🛡️", svg: "escudo",
    resumen: "Diseñado por Francisco de Paula Santander en 1834.",
    detalle: "Tiene tres franjas y está flanqueado por dos banderas. Arriba (fondo azul): una granada de oro (por la Nueva Granada) entre dos cornucopias (riqueza económica y frutos tropicales). Centro (platino): un gorro frigio, símbolo de libertad, sostenido por una lanza. Abajo: dos buques a ambos lados del Istmo de Panamá (los océanos Caribe y Pacífico y el comercio). Corona el escudo un cóndor con una cinta que dice el lema nacional.",
    destacado: "Lema nacional en la cinta del cóndor: \"Libertad y Orden\".",
  },
  {
    titulo: "Himno nacional", icono: "🎵",
    resumen: "Letra de Rafael Núñez, música de Oreste Síndici.",
    detalle: "Compuesto en 1887: la letra por el presidente Rafael Núñez y la música por el italiano Oreste Síndici. Se dio a conocer el 11 de noviembre de 1887. Fue oficialmente proclamado en 1920 por el presidente Marco Fidel Suárez. Consta de un coro y once estrofas; originalmente fue una oda a la independencia de Cartagena.",
    destacado: "Letra: Rafael Núñez · Música: Oreste Síndici · Oficial: 1920.",
  },
  {
    titulo: "Ave nacional", icono: "🦅",
    resumen: "El cóndor de los Andes.",
    detalle: "El cóndor andino es el ave voladora más grande del mundo; sus alas pueden cubrir hasta 300 km en un día. Plumaje negro con reflejos, franja blanca sobre las alas y collar blanco; los machos tienen una cresta carnosa roja. Vive en las cumbres más altas de los Andes y está en el escudo nacional desde 1834. Simboliza la libertad.",
  },
  {
    titulo: "Flor nacional", icono: "🌸",
    resumen: "La orquídea Cattleya trianae (\"flor de mayo\").",
    detalle: "Lleva su nombre en honor al naturalista colombiano José Jerónimo Triana. La Academia Colombiana de Historia estableció su relevancia como flor nacional en 1936. Es originaria de los pisos térmicos templados (1.000–2.000 m, 17–24 °C).",
    destacado: "Cattleya trianae, en honor a José Jerónimo Triana.",
  },
  {
    titulo: "Árbol nacional", icono: "🌴",
    resumen: "La Palma de Cera del Quindío.",
    detalle: "Científicamente Ceroxylon quindiuense, alcanza hasta 70 metros de altura. Fue elegida en 1949 durante la comisión preparatoria del III Congreso Suramericano de Botánica. La Ley 61 de 1985 le otorgó el estatus de Árbol Nacional y ordenó protegerla en su hábitat.",
    destacado: "Palma de Cera del Quindío (Ceroxylon quindiuense), hasta 70 m.",
  },
  {
    titulo: "Símbolo cultural", icono: "👒",
    resumen: "El sombrero vueltiao.",
    detalle: "Pieza artesanal de las sabanas del Caribe, con raíces en la cultura Zenú. Fue declarado Símbolo Cultural de la Nación por la Ley 908 del 8 de septiembre de 2004. Otros símbolos: la ruana cundiboyacense, el carriel antioqueño y las mochilas arhuacas y wayúu.",
    destacado: "Sombrero vueltiao, cultura Zenú, Ley 908 de 2004.",
  },
  {
    titulo: "Moneda", icono: "💵",
    resumen: "El peso colombiano (COP).",
    detalle: "Emitido y regulado por el Banco de la República (banco central). Desde 2016 circula una colección con personajes y paisajes: el billete de $100.000 (Carlos Lleras Restrepo y el Valle del Cocora), $50.000 (Gabriel García Márquez), $20.000 (Alfonso López Michelsen y el sombrero vueltiao), $10.000 (Virginia Gutiérrez de Pineda), $5.000 (José Asunción Silva) y $2.000 (Débora Arango).",
  },
];

/* ---------------- GASTRONOMÍA (por región) ---------------- */
const GASTRONOMIA = [
  { titulo: "Región Caribe", icono: "🦐", region: true,
    detalle: "Costa y tierras fértiles con gran variedad de frutos del mar y pescados (bacalao, pargo rojo, bocachico, camarones, ostras). Platos: pescado frito, arroz con coco, sancocho de rabo (cola) y carne en posta.",
    platos: [{ n: "Pargo rojo", i: "🐟" }, { n: "Arroz con coco", i: "🥥" }, { n: "Sancocho de rabo", i: "🍲" }] },
  { titulo: "Región Insular (San Andrés)", icono: "🏝️", region: true,
    detalle: "Cocina isleña con frutos de mar. El plato más típico es el Rondón, cuyo nombre viene de \"run down\": pescado, cangrejo, colita de cerdo, plátano, yuca, ñame y domplines cocidos en leche de coco.",
    platos: [{ n: "El Rondón", i: "🥘" }],
    destacado: "El plato típico del archipiélago de San Andrés es el Rondón." },
  { titulo: "Región Pacífica", icono: "🌊", region: true,
    detalle: "Herencia africana y biodiversidad de mar y ríos. Platos: sancocho de gallina, bocachico frito, chuleta de cerdo (valluna) y aborrajados.",
    platos: [{ n: "Sancocho de gallina", i: "🍲" }, { n: "Bocachico frito", i: "🐟" }, { n: "Aborrajados", i: "🍌" }] },
  { titulo: "Región Andina", icono: "⛰️", region: true,
    detalle: "La de mayor tradición gastronómica; base en la papa, legumbres, queso y carnes. Aquí nacieron la bandeja paisa (arroz, frijoles, carne, chorizo, huevo, plátano, arepa y aguacate; de Antioquia), el ajiaco (sopa de papas, pollo, mazorca y guascas; de Bogotá), el puchero santafereño, los tamales, la lechona tolimense y el mute santandereano.",
    platos: [{ n: "Bandeja paisa", i: "🍛" }, { n: "Ajiaco", i: "🥣" }, { n: "Mute", i: "🌽" }],
    destacado: "Bandeja paisa = Antioquia · Ajiaco = Bogotá · Mute = Santander." },
  { titulo: "Región Orinoquía (Llanos)", icono: "🐄", region: true,
    detalle: "Zona ganadera; carnes rojas de calidad. El plato insignia es la mamona (o ternera a la llanera / becerra asada): ternera joven asada al aire libre solo con sal y fuego lento.",
    platos: [{ n: "Mamona (ternera a la llanera)", i: "🥩" }],
    destacado: "El plato típico de los Llanos es la mamona o ternera a la llanera." },
  { titulo: "Región Amazónica", icono: "🌳", region: true,
    detalle: "Frutos exóticos (copoazú, arazá, camu-camu) y base en pescado y yuca. Plato típico: chicharrones de pirarucú (pez también llamado bacalao), servidos en hoja de plátano con fariña y cazabe.",
    platos: [{ n: "Chicharrones de pirarucú", i: "🐟" }] },
];

/* ---------------- FIESTAS Y FESTIVALES ---------------- */
const FIESTAS = [
  { titulo: "Carnaval de Barranquilla", icono: "🎭", lugar: "Barranquilla (Atlántico)", cuando: "Febrero",
    detalle: "Uno de los carnavales más importantes del mundo, declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Reúne música tradicional como la cumbia y el vallenato.",
    destacado: "Patrimonio de la Humanidad (UNESCO). Se celebra en febrero." },
  { titulo: "Carnaval de Negros y Blancos", icono: "🎨", lugar: "San Juan de Pasto (Nariño)", cuando: "Inicio de año",
    detalle: "Mezcla de tradiciones indígenas (Los Pastos y Quillacingas) y la evangelización europea. Se celebra en vísperas de año nuevo en el suroeste del país.",
    destacado: "Se celebra en Pasto (Nariño)." },
  { titulo: "Feria de las Flores", icono: "🌺", lugar: "Medellín (Antioquia)", cuando: "Agosto",
    detalle: "Festividad emblemática de Medellín, famosa por el desfile de silleteros, conciertos y ferias gastronómicas.",
    destacado: "Feria de las Flores = Medellín, con el desfile de silleteros." },
  { titulo: "Festival de la Leyenda Vallenata", icono: "🪗", lugar: "Valledupar (Cesar)", cuando: "Abril",
    detalle: "Resalta el género musical vallenato. Reúne a los mejores acordeoneros para coronar al Rey Vallenato, con conciertos y desfiles.",
    destacado: "Valledupar, capital del vallenato. Corona al Rey Vallenato." },
  { titulo: "Festival y Torneo Internacional del Joropo", icono: "🎻", lugar: "Villavicencio (Meta)", cuando: "Octubre",
    detalle: "Desde 1962, incentiva la música y el baile tradicional de los llanos orientales. Incluye el \"joropódromo\" con torneos de joropo, baile que comparte raíces con Venezuela.",
    destacado: "El Festival del Joropo se celebra en Villavicencio (Meta)." },
  { titulo: "Festival Petronio Álvarez", icono: "🥁", lugar: "Cali (Valle del Cauca)", cuando: "Agosto",
    detalle: "Desde 1997, en homenaje al músico Petronio Álvarez. Es el festival más importante de la música tradicional del Pacífico colombiano (chirimías, marimba, violines caucanos).",
    destacado: "El festival más importante de la música del Pacífico." },
  { titulo: "Feria de Manizales", icono: "☕", lugar: "Manizales (Caldas)", cuando: "Enero",
    detalle: "Su temática principal es el café. De origen español, se inspira en la Feria de Sevilla; ofrece formación en cata de café." },
  { titulo: "Semana Santa de Popayán", icono: "🕯️", lugar: "Popayán (Cauca)", cuando: "Semana Santa",
    detalle: "Una de las celebraciones religiosas más tradicionales del país: procesiones por las calles empedradas con música sacra." },
  { titulo: "Hay Festival", icono: "📚", lugar: "Cartagena (Bolívar)", cuando: "Enero",
    detalle: "\"La fiesta de las ideas y las palabras\": festival internacional de literatura, historia y pensamiento." },
];

/* ---------------- MÚSICA Y ARTE ---------------- */
const ARTE = [
  { titulo: "Música por región", icono: "🎼",
    detalle: "Caribe: vallenato y cumbia. Andina: bambuco y pasillo. Pacífica: currulao y marimba. Llanera (Orinoquía): joropo. Insular: calypso y tradiciones europeas (cuadrillas, schottish).",
    destacado: "Joropo = Llanos · Currulao = Pacífico · Bambuco = Andina · Cumbia/vallenato = Caribe." },
  { titulo: "Música popular", icono: "🎤",
    detalle: "En el siglo XX la música tradicional se fusionó con rock, salsa y pop. Artistas reconocidos mundialmente: Carlos Vives, Shakira, Totó la Momposina y Juanes." },
  { titulo: "Literatura", icono: "📖",
    detalle: "Gabriel García Márquez (\"Gabo\") ganó el Premio Nobel en 1982 con Cien años de soledad; también escribió El amor en los tiempos del cólera y Crónica de una muerte anunciada. Otros: Jorge Isaacs (La María), José Eustasio Rivera (La Vorágine, 1924) y Tomás Carrasquilla.",
    destacado: "García Márquez: Nobel de Literatura 1982, por Cien años de soledad." },
  { titulo: "Artes plásticas", icono: "🖼️",
    detalle: "En el siglo XX destacan Fernando Botero, Alejandro Obregón, Omar Rayo, Beatriz González y Débora Arango. En la época colonial sobresalió el pintor Gregorio Vásquez de Arce y Ceballos." },
  { titulo: "Cine y televisión", icono: "📺",
    detalle: "Una de las telenovelas colombianas más famosas del mundo es Yo soy Betty, la fea, creada por Fernando Gaitán en 1999." },
  { titulo: "Radio", icono: "📻",
    detalle: "Una de las emisoras más destacadas fue Radio Sutatenza, pionera de la educación a distancia por radio en el campo colombiano." },
];

/* ---------------- DEPORTE ---------------- */
const DEPORTE = [
  { titulo: "Ciclismo — el deporte rey", icono: "🚴",
    detalle: "El ciclismo es el deporte más importante del país; las montañas son ideales para entrenar a los \"escarabajos\". Grandes ciclistas: Lucho Herrera, Rigoberto Urán, Nairo Quintana y Egan Bernal (y de antaño Martín \"Cochise\" Rodríguez, Ramón Hoyos, Rafael Niño).",
    destacado: "El ciclismo es el \"deporte rey\" de Colombia." },
  { titulo: "Otras figuras del deporte", icono: "🏅",
    detalle: "Edgar Rentería (béisbol), Juan Pablo Montoya (automovilismo), Fabiola Zuluaga (tenis), María Isabel Urrutia (levantamiento de pesas) y Catherine Ibargüen (triple salto)." },
];

/* ---------------- TURISMO ---------------- */
const TURISMO = [
  { titulo: "Turismo litoral", icono: "🏖️",
    detalle: "Playas de ciudades como Santa Marta, donde está el Parque Nacional Natural Tayrona." },
  { titulo: "Turismo de naturaleza", icono: "🐋",
    detalle: "Senderismo, avistamiento de aves, buceo, rafting y avistamiento de ballenas. Incluye parques como Los Nevados." },
  { titulo: "Turismo rural", icono: "🚜",
    detalle: "Contacto con el campo, con parapente, escalada, canopy; incluye las haciendas y plantaciones de café." },
  { titulo: "Turismo académico y cultural", icono: "🏛️",
    detalle: "Museos, galerías de arte y sitios arqueológicos. Las ciudades más visitadas son Bogotá, Medellín y Cali." },
];

const DATA = { simbolos: SIMBOLOS, gastronomia: GASTRONOMIA, fiestas: FIESTAS, arte: ARTE, deporte: DEPORTE, turismo: TURISMO };

/* ---------------- FLASHCARDS (retrieval) ----------------
   Derivadas del mismo contenido; incluyen preguntas inversas. */
const FLASHCARDS = [
  { cat: "simbolos", p: "¿Qué representa el color amarillo de la bandera?", r: "La riqueza del suelo (también la armonía y la justicia)." },
  { cat: "simbolos", p: "¿Cuál es el lema nacional en el escudo?", r: "\"Libertad y Orden\"." },
  { cat: "simbolos", p: "¿Quién compuso la letra del himno nacional?", r: "El presidente Rafael Núñez (música de Oreste Síndici)." },
  { cat: "simbolos", p: "¿En qué año se proclamó oficialmente el himno?", r: "En 1920 (presidente Marco Fidel Suárez)." },
  { cat: "simbolos", p: "¿Cuál es el ave nacional de Colombia?", r: "El cóndor de los Andes." },
  { cat: "simbolos", p: "¿Cuál es la flor nacional?", r: "La orquídea Cattleya trianae (\"flor de mayo\")." },
  { cat: "simbolos", p: "¿Cuál es el árbol nacional?", r: "La Palma de Cera del Quindío." },
  { cat: "simbolos", p: "¿Cuál es el símbolo cultural de la nación?", r: "El sombrero vueltiao (cultura Zenú, Ley 908 de 2004)." },
  { cat: "simbolos", p: "¿Quién diseñó el escudo y en qué año?", r: "Francisco de Paula Santander, en 1834." },
  { cat: "gastronomia", p: "¿Cuál es el plato típico de San Andrés?", r: "El Rondón." },
  { cat: "gastronomia", p: "¿De qué región es la bandeja paisa?", r: "De la región Andina (Antioquia)." },
  { cat: "gastronomia", p: "¿De qué ciudad es típico el ajiaco?", r: "De Bogotá (región Andina)." },
  { cat: "gastronomia", p: "¿Cuál es el plato típico de los Llanos (Orinoquía)?", r: "La mamona o ternera a la llanera." },
  { cat: "gastronomia", p: "¿Qué pescado se usa en los chicharrones típicos del Amazonas?", r: "El pirarucú." },
  { cat: "gastronomia", p: "¿En qué región nació el mute?", r: "En la Andina (Santander)." },
  { cat: "fiestas", p: "¿Qué carnaval es Patrimonio de la Humanidad de la UNESCO?", r: "El Carnaval de Barranquilla." },
  { cat: "fiestas", p: "¿En qué ciudad se celebra el Carnaval de Negros y Blancos?", r: "En San Juan de Pasto (Nariño)." },
  { cat: "fiestas", p: "¿En qué ciudad es la Feria de las Flores?", r: "En Medellín (con el desfile de silleteros)." },
  { cat: "fiestas", p: "¿Dónde se celebra el Festival de la Leyenda Vallenata?", r: "En Valledupar (Cesar)." },
  { cat: "fiestas", p: "¿En qué ciudad se celebra el Festival del Joropo?", r: "En Villavicencio (Meta)." },
  { cat: "arte", p: "¿Qué música es típica de los Llanos Orientales?", r: "El joropo." },
  { cat: "arte", p: "¿Qué música es representativa del Pacífico?", r: "El currulao y la marimba." },
  { cat: "arte", p: "¿Quién ganó el Nobel de Literatura en 1982 y con qué obra?", r: "Gabriel García Márquez, con Cien años de soledad." },
  { cat: "arte", p: "¿Quién creó \"Yo soy Betty, la fea\"?", r: "Fernando Gaitán (1999)." },
  { cat: "deporte", p: "¿Cuál es el \"deporte rey\" de Colombia?", r: "El ciclismo." },
  { cat: "turismo", p: "¿En qué parque natural famoso está Santa Marta?", r: "El Parque Nacional Natural Tayrona." },
  { cat: "turismo", p: "¿Cuáles son las tres ciudades más visitadas?", r: "Bogotá, Medellín y Cali." },
];

/* ============================================================
   COMPONENTES VISUALES (SVG propios, sin copyright)
   ============================================================ */
function BanderaSVG() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-[220px] rounded-md border border-stone-200 shadow-sm">
      <rect x="0" y="0" width="300" height="100" fill="#FCD116" />
      <rect x="0" y="100" width="300" height="50" fill="#003893" />
      <rect x="0" y="150" width="300" height="50" fill="#CE1126" />
    </svg>
  );
}

function EscudoSVG() {
  return (
    <svg viewBox="0 0 200 240" className="w-full max-w-[150px]">
      {/* banderas cruzadas detrás */}
      <g opacity="0.9">
        <rect x="14" y="70" width="46" height="30" fill="#FCD116" transform="rotate(-18 37 85)" />
        <rect x="14" y="100" width="46" height="15" fill="#003893" transform="rotate(-18 37 85)" />
        <rect x="14" y="115" width="46" height="15" fill="#CE1126" transform="rotate(-18 37 85)" />
        <rect x="140" y="70" width="46" height="30" fill="#FCD116" transform="rotate(18 163 85)" />
        <rect x="140" y="100" width="46" height="15" fill="#003893" transform="rotate(18 163 85)" />
        <rect x="140" y="115" width="46" height="15" fill="#CE1126" transform="rotate(18 163 85)" />
      </g>
      {/* cóndor simplificado */}
      <g>
        <ellipse cx="100" cy="34" rx="10" ry="8" fill="#3a3327" />
        <path d="M60 40 Q100 20 140 40 Q100 34 60 40 Z" fill="#4a4237" />
        <path d="M88 48 Q100 60 112 48 Z" fill="#B5892B" />
      </g>
      {/* cuerpo del escudo: 3 franjas */}
      <g>
        <path d="M50 60 H150 V150 Q150 195 100 215 Q50 195 50 150 Z" fill="#f5f1e6" stroke="#3a3327" strokeWidth="2.5" />
        {/* franja superior azul con granada */}
        <path d="M50 60 H150 V95 H50 Z" fill="#003893" />
        <circle cx="100" cy="78" r="9" fill="#FCD116" />
        {/* cornucopias (puntos) */}
        <circle cx="72" cy="80" r="3.5" fill="#FCD116" /><circle cx="128" cy="80" r="3.5" fill="#2e7d32" />
        {/* franja media platino con gorro frigio */}
        <rect x="50" y="95" width="100" height="30" fill="#d9d4c7" />
        <path d="M94 118 Q100 100 106 118 Z" fill="#CE1126" />
        {/* franja inferior: istmo y dos mares */}
        <path d="M50 125 H150 V150 Q150 195 100 215 Q50 195 50 150 Z" fill="#1E7F8C" />
        <rect x="94" y="130" width="12" height="70" fill="#8A6D3B" />
      </g>
    </svg>
  );
}

/* ============================================================
   TARJETA DE EXPLORADOR
   ============================================================ */
function Tarjeta({ item, color, soft }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <button
      onClick={() => setAbierto(!abierto)}
      className="w-full text-left rounded-xl border bg-white px-4 py-3 transition-all hover:shadow-md active:scale-[.99]"
      style={{ borderColor: abierto ? color : "#e7e2d6", borderWidth: abierto ? 2 : 1 }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">{item.icono}</span>
        <div className="flex-1">
          <h3 className="font-bold text-stone-800 text-[15px] leading-snug" style={{ fontFamily: "Georgia, serif" }}>
            {item.titulo}
          </h3>
          {(item.resumen || item.lugar) && (
            <p className="text-sm text-stone-500 leading-snug">
              {item.resumen || `${item.lugar}${item.cuando ? " · " + item.cuando : ""}`}
            </p>
          )}
        </div>
        <span className="text-xs font-bold" style={{ color }}>{abierto ? "▲" : "▼"}</span>
      </div>

      {abierto && (
        <div className="mt-3 pt-3 border-t space-y-2.5" style={{ borderColor: soft }}>
          {item.svg === "bandera" && <div className="flex justify-center py-1"><BanderaSVG /></div>}
          {item.svg === "escudo" && <div className="flex justify-center py-1"><EscudoSVG /></div>}
          {item.lugar && (
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: soft, color }}>📍 {item.lugar}</span>
              {item.cuando && <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: soft, color }}>🗓️ {item.cuando}</span>}
            </div>
          )}
          <p className="text-sm text-stone-700 leading-relaxed">{item.detalle}</p>
          {item.platos && (
            <div className="grid grid-cols-3 gap-2">
              {item.platos.map((p) => (
                <div key={p.n} className="rounded-xl p-2 flex flex-col items-center text-center gap-1" style={{ backgroundColor: soft }}>
                  <span className="text-2xl">{p.i}</span>
                  <span className="text-xs font-medium text-stone-700 leading-tight">{p.n}</span>
                </div>
              ))}
            </div>
          )}
          {item.destacado && (
            <div className="rounded-lg px-3 py-2 text-sm flex gap-2" style={{ backgroundColor: soft, color: "#3a3327" }}>
              <span>📌</span><span>{item.destacado}</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

/* ============================================================
   MODO FLASHCARDS (retrieval practice)
   ============================================================ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Flashcards({ onSalir }) {
  const [mazo, setMazo] = useState(() => shuffle(FLASHCARDS));
  const [i, setI] = useState(0);
  const [revelada, setRevelada] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [falladas, setFalladas] = useState([]);
  const [terminado, setTerminado] = useState(false);

  const cat = CATS.find((c) => c.key === mazo[i]?.cat) || CATS[0];

  const responder = (acerto) => {
    if (acerto) setAciertos((n) => n + 1);
    else setFalladas((f) => [...f, mazo[i]]);
    if (i + 1 < mazo.length) {
      setI(i + 1);
      setRevelada(false);
    } else {
      setTerminado(true);
    }
  };

  const reiniciar = (soloFalladas) => {
    const base = soloFalladas && falladas.length ? falladas : FLASHCARDS;
    setMazo(shuffle(base));
    setI(0); setRevelada(false); setAciertos(0); setFalladas([]); setTerminado(false);
  };

  if (terminado) {
    const pct = Math.round((aciertos / mazo.length) * 100);
    return (
      <div className="rounded-2xl border-2 bg-white p-6 text-center" style={{ borderColor: "#B5892B" }}>
        <div className="text-4xl mb-2">{pct >= 70 ? "🎉" : "💪"}</div>
        <h3 className="text-xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
          {aciertos} de {mazo.length} ({pct}%)
        </h3>
        <p className="text-stone-500 text-sm mt-1">
          {pct >= 70 ? "¡Vas muy bien! Sigue repasando para afianzar." : "Repasa las que fallaste y vuelve a intentarlo."}
        </p>
        <div className="flex flex-col gap-2 mt-5">
          {falladas.length > 0 && (
            <button onClick={() => reiniciar(true)} className="px-4 py-2.5 rounded-xl font-semibold text-white" style={{ backgroundColor: "#8C3B3B" }}>
              Repasar solo las {falladas.length} falladas
            </button>
          )}
          <button onClick={() => reiniciar(false)} className="px-4 py-2.5 rounded-xl font-semibold text-white" style={{ backgroundColor: "#B5892B" }}>
            Repasar todo de nuevo
          </button>
          <button onClick={onSalir} className="px-4 py-2.5 rounded-xl font-semibold border" style={{ borderColor: "#d8d1c2", color: "#3a3327" }}>
            Volver al explorador
          </button>
        </div>
      </div>
    );
  }

  const tarjeta = mazo[i];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-stone-500">Tarjeta {i + 1} / {mazo.length}</span>
        <span className="text-sm font-semibold" style={{ color: "#1F6E4A" }}>✓ {aciertos}</span>
      </div>
      {/* barra de progreso */}
      <div className="w-full h-1.5 rounded-full mb-4" style={{ backgroundColor: "#e7e2d6" }}>
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${(i / mazo.length) * 100}%`, backgroundColor: cat.color }} />
      </div>

      <div
        onClick={() => setRevelada(true)}
        className="rounded-2xl border-2 bg-white px-5 py-8 min-h-[200px] flex flex-col items-center justify-center text-center cursor-pointer transition-all"
        style={{ borderColor: cat.color }}
      >
        <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-3" style={{ backgroundColor: cat.soft, color: cat.color }}>
          {cat.icono} {cat.label}
        </span>
        <p className="text-lg font-semibold text-stone-800 leading-snug" style={{ fontFamily: "Georgia, serif" }}>
          {tarjeta.p}
        </p>
        {revelada ? (
          <p className="mt-4 text-stone-700 leading-relaxed" style={{ animation: "fadeIn .25s ease-out" }}>
            {tarjeta.r}
          </p>
        ) : (
          <p className="mt-4 text-sm text-stone-400">Toca para ver la respuesta</p>
        )}
      </div>

      {revelada ? (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => responder(false)} className="px-4 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "#8C3B3B" }}>
            No la sabía
          </button>
          <button onClick={() => responder(true)} className="px-4 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "#1F6E4A" }}>
            ¡La sabía! ✓
          </button>
        </div>
      ) : (
        <button onClick={() => setRevelada(true)} className="w-full mt-4 px-4 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: cat.color }}>
          Ver respuesta
        </button>
      )}

      <button onClick={onSalir} className="w-full mt-2 text-sm text-stone-500 py-2">Salir del repaso</button>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function CulturaSociedad() {
  const [modo, setModo] = useState("explorar"); // explorar | flashcards
  const [cat, setCat] = useState("simbolos");
  const c = CATS.find((x) => x.key === cat);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7EF" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
              🎭 Cultura y Sociedad
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              {modo === "explorar"
                ? "Explora por categoría y toca cada tarjeta. Cuando te sientas listo, ponte a prueba."
                : "Retrieval practice: intenta responder antes de revelar."}
            </p>
          </div>
        </header>

        {/* conmutador de modo */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            onClick={() => setModo("explorar")}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border-2"
            style={modo === "explorar"
              ? { backgroundColor: "#3a3327", color: "white", borderColor: "#3a3327" }
              : { backgroundColor: "white", color: "#3a3327", borderColor: "#d8d1c2" }}
          >
            📖 Explorar
          </button>
          <button
            onClick={() => setModo("flashcards")}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border-2"
            style={modo === "flashcards"
              ? { backgroundColor: "#B5892B", color: "white", borderColor: "#B5892B" }
              : { backgroundColor: "white", color: "#B5892B", borderColor: "#B5892B" }}
          >
            🧠 Ponte a prueba
          </button>
        </div>

        {modo === "explorar" ? (
          <>
            {/* categorías */}
            <div className="flex flex-wrap gap-2 mb-5 sticky top-0 py-2 z-20" style={{ backgroundColor: "#FAF7EF" }}>
              {CATS.map((x) => (
                <button
                  key={x.key}
                  onClick={() => setCat(x.key)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1"
                  style={cat === x.key
                    ? { backgroundColor: x.color, color: "white", borderColor: x.color }
                    : { backgroundColor: "white", color: x.color, borderColor: x.color }}
                >
                  <span>{x.icono}</span> {x.label}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {DATA[cat].map((item) => (
                <Tarjeta key={item.titulo} item={item} color={c.color} soft={c.soft} />
              ))}
            </div>
          </>
        ) : (
          <Flashcards onSalir={() => setModo("explorar")} />
        )}

        <footer className="text-center text-xs text-stone-400 mt-6 pb-4">
          Contenido basado en la guía oficial de estudio · Cultura y Sociedad
        </footer>
      </div>
    </div>
  );
}
