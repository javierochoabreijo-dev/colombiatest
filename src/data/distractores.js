// Opciones falsas para el modo de selección simple.
// Clave: el enunciado EXACTO de la pregunta (así el banco puede venir de
// Supabase en otro orden y seguir emparejando). Una pregunta sin entrada aquí
// cae al modo de respuesta escrita.
//   falsas: 2 opciones incorrectas, de la misma forma que la correcta.
//   corta:  versión breve de la correcta cuando `a` lleva una explicación entre
//           paréntesis que la delataría por largo.
//
// Respuestas que se evitaron como opción falsa porque son defendibles:
//   · Virreinato de la Nueva Granada (1717): no usar 1739, cuando se restableció.
//   · Voto de la mujer (plebiscito de 1957): no usar 1954, cuando se reconoció el derecho.
//   · Himno nacional (proclamado en 1920): no usar 1887, cuando se compuso.
//   · Carnaval patrimonio de la UNESCO: el de Pasto (Negros y Blancos) también lo es,
//     así que no sirve de falsa; se usaron dos ferias que no lo son.
//   · "Deporte rey" (la guía dice ciclismo): no usar el fútbol, que en el mundo
//     también lleva ese título y confundiría.
//   · Región más lluviosa (Pacífica): la Amazonía también llueve mucho; las falsas
//     son Caribe y Orinoquía.
// Toda falsa debe ser incorrecta según la guía oficial, nunca defendible.
export const DISTRACTORES = {
  "¿Cuántas regiones naturales (biogeográficas) tiene Colombia y cuáles son?": { falsas: ["6: Caribe, Andina, Pacífica, Orinoquía, Amazónica e Insular.", "4: Caribe, Andina, Pacífica y Amazónica."] },
  "¿Cuál es el pico más alto de Colombia y dónde está?": { falsas: ["El Nevado del Huila, en la cordillera Central (región Andina).", "El Nevado del Tolima, en la cordillera Central (región Andina)."] },
  "¿Cuántas cordilleras atraviesan el territorio y cómo se llaman?": { falsas: ["Dos: Occidental y Oriental.", "Cuatro: Occidental, Central, Oriental y Costera."] },
  "Completa: la región ___ ocupa cerca del 42% del territorio y es la más biodiversa.": { falsas: ["Orinoquía (Llanos).", "Andina."] },
  "¿Qué región es la más poblada del país (≈40%)?": { falsas: ["La región Caribe.", "La región Pacífica."] },
  "¿Qué región es una de las más lluviosas del mundo?": { falsas: ["La región Caribe.", "La región Orinoquía."], corta: "La región Pacífica." },
  "¿Cómo se llaman las llanuras planas de la Orinoquía?": { falsas: ["Las Sabanas del Caribe.", "La Llanura del Pacífico."] },
  "¿Qué piso térmico corresponde a temperaturas entre 18 y 24 °C?": { falsas: ["El piso térmico cálido (menos de 1.000 m).", "El piso térmico frío (entre 2.000 y 3.000 m)."] },
  "¿Cómo se llama el piso térmico de más de 3.000 m con temperaturas bajo 10 °C?": { falsas: ["El piso frío.", "El piso cálido."] },
  "¿Cuál es la capital y ciudad más poblada de Colombia?": { falsas: ["Medellín.", "Cali."] },
  "¿En qué región están las tres cordilleras y los grandes nevados?": { falsas: ["En la región Caribe.", "En la región Pacífica."] },
  "¿Qué formación aislada de la Orinoquía alberga a Caño Cristales?": { falsas: ["La Serranía de San Lucas.", "La Serranía del Perijá."] },
  "¿Qué archipiélago del Caribe forma parte del territorio colombiano?": { falsas: ["Las Islas Galápagos.", "El archipiélago de Los Roques."] },
  "Completa: los páramos son considerados las \"fábricas de ___\" del país.": { falsas: ["Oxígeno.", "Energía."] },
  "¿Qué pueblos indígenas habitan la Sierra Nevada de Santa Marta?": { falsas: ["Los wayuu, embera, nasa y misak.", "Los tikuna, huitoto, muisca y pijao."] },
  "¿Cuál es el roedor más grande del mundo, típico de la Orinoquía?": { falsas: ["El agutí.", "La guagua (paca)."] },
  "¿Qué región tiene clima ecuatorial húmedo y frontera con Ecuador, Perú y Brasil?": { falsas: ["La región Pacífica.", "La región Orinoquía."] },
  "¿Qué piso térmico corresponde a menos de 1.000 m y 24–28 °C?": { falsas: ["El piso térmico templado.", "El piso térmico frío."] },
  "¿Qué región es reconocida por sus manglares, sabanas y la Sierra Nevada?": { falsas: ["La región Orinoquía.", "La región Andina."] },
  "¿Cómo se llama el ecosistema de alta montaña con frailejones?": { falsas: ["El bosque seco tropical.", "El manglar."] },
  "¿Por dónde llegaron los primeros pobladores a América hace ~16.000 años?": { falsas: ["Por el océano Atlántico, desde África.", "Por el estrecho de Magallanes, desde el sur."] },
  "¿Cuáles fueron las tres lenguas madre de los pueblos prehispánicos?": { falsas: ["Quechua, aimara y guaraní.", "Chibcha, náhuatl y maya."] },
  "¿Quién fundó Santa Fe de Bogotá en 1538?": { falsas: ["Sebastián de Belalcázar.", "Pedro de Heredia."] },
  "¿En qué año se fundó el Virreinato de la Nueva Granada?": { falsas: ["En 1689.", "En 1763."] },
  "¿Cómo se llamó la rebelión de 1780–1781 contra el alza de impuestos?": { falsas: ["La Conspiración Septembrina.", "La Guerra de los Supremos."] },
  "¿Quién escribió el Memorial de Agravios en 1809?": { falsas: ["Antonio Nariño.", "Francisco José de Caldas."] },
  "¿Qué se conmemora el 20 de julio de 1810?": { falsas: ["La firma del Acta de Independencia de Cartagena.", "La Batalla del Pantano de Vargas."] },
  "¿Con qué batalla se consolidó la independencia y en qué fecha?": { falsas: ["La Batalla de Ayacucho, el 9 de diciembre de 1824.", "La Batalla de Carabobo, el 24 de junio de 1821."] },
  "Completa: la República creada en Angostura (1819), hoy llamada ___ Colombia.": { falsas: ["Nueva Colombia.", "Alta Colombia."] },
  "¿En qué año se disolvió la Gran Colombia?": { falsas: ["En 1824.", "En 1850."] },
  "¿Qué dos partidos surgieron en la etapa de la Nueva Granada?": { falsas: ["El Liberal y el Republicano.", "El Conservador y el Demócrata."] },
  "¿En qué año se promulgó la Constitución centralista anterior a la de 1991?": { falsas: ["En 1863.", "En 1905."] },
  "¿Qué conflicto ocurrió entre 1899 y 1902?": { falsas: ["La Guerra de los Supremos.", "La Guerra con el Perú."] },
  "¿Qué territorio se separó de Colombia en 1903?": { falsas: ["Venezuela.", "Ecuador."] },
  "¿Qué ocurrió el 9 de abril de 1948?": { falsas: ["El asesinato de Luis Carlos Galán, que desató una ola de violencia.", "La toma del Palacio de Justicia por el M-19."] },
  "¿En qué año votaron por primera vez las mujeres en Colombia?": { falsas: ["En las elecciones de 1930.", "En el plebiscito de 1968."] },
  "¿Cómo se llamó el acuerdo de alternancia entre liberales y conservadores (1958–1974)?": { falsas: ["La Unión Patriótica.", "La Regeneración."] },
  "¿En qué años se fundaron el ELN, las FARC y el EPL?": { falsas: ["ELN en 1970, FARC en 1974 y EPL en 1978.", "ELN en 1958, FARC en 1962 y EPL en 1964."] },
  "¿En qué año se firmó el acuerdo de paz con las FARC?": { falsas: ["En 2014.", "En 2018."], corta: "En 2016." },
  "¿Qué mecanismos de justicia transicional creó el acuerdo de 2016?": { falsas: ["El Tribunal de Garantías y la Comisión de Paz.", "La Corte Penal Internacional y la Defensoría del Pueblo."] },
  "¿En qué año fue promulgada la Constitución vigente?": { falsas: ["En 1886.", "En 1997."] },
  "Completa: la Constitución define a Colombia como un Estado ___ de derecho.": { falsas: ["Federal.", "Popular."] },
  "¿Cuáles son los tres tipos de descentralización?": { falsas: ["Territorial, por servicios y por regiones.", "Territorial, administrativa y por colaboración."] },
  "Se dice que la Constitución es \"norma de ___\".": { falsas: ["Leyes.", "Justicia."] },
  "¿En qué artículos están los derechos fundamentales?": { falsas: ["Del artículo 1 al 10.", "Del artículo 45 al 77."] },
  "¿Qué mecanismo protege los derechos fundamentales de forma inmediata?": { falsas: ["La acción de cumplimiento.", "La acción de nulidad."] },
  "¿Qué acción es PREVENTIVA y la puede interponer una sola persona?": { falsas: ["La acción de cumplimiento (hace efectivas leyes y actos administrativos).", "La acción de grupo (repara daños a un grupo de personas)."] },
  "¿Qué acción es INDEMNIZATORIA y requiere mínimo 20 personas?": { falsas: ["La acción popular.", "La acción de cumplimiento."] },
  "¿Qué acción tutela la libertad personal ante una detención ilegal?": { falsas: ["La acción de cumplimiento.", "La acción popular."] },
  "¿En qué artículo está el derecho de petición?": { falsas: ["En el artículo 13.", "En el artículo 86."] },
  "¿Cuál es el principal mecanismo de participación ciudadana?": { falsas: ["La tutela.", "El derecho de petición."] },
  "¿Qué mecanismo permite terminar el mandato de un alcalde o gobernador?": { falsas: ["El cabildo abierto.", "La consulta popular."] },
  "¿Cuáles son las tres ramas del poder público?": { falsas: ["Ejecutiva, Legislativa y Electoral.", "Ejecutiva, Judicial y Militar."] },
  "¿Quién está a la cabeza de la rama ejecutiva?": { falsas: ["El Presidente del Congreso.", "El Vicepresidente de la República."] },
  "¿Qué dos cámaras integran el Congreso?": { falsas: ["El Senado y el Consejo de Estado.", "La Cámara de Representantes y la Asamblea Nacional."] },
  "¿Qué órgano ejerce el control fiscal del Estado?": { falsas: ["La Procuraduría General de la Nación.", "La Fiscalía General de la Nación."] },
  "¿Qué órgano ejerce el control disciplinario de los servidores públicos?": { falsas: ["La Contraloría General de la República.", "La Defensoría del Pueblo."] },
  "¿Qué entidades conforman la organización electoral?": { falsas: ["El Consejo de Estado y la Registraduría Nacional del Estado Civil.", "El Consejo Nacional Electoral y la Procuraduría General de la Nación."] },
  "¿Cuál es el banco central y órgano autónomo del Estado?": { falsas: ["El Banco Agrario de Colombia.", "El Ministerio de Hacienda."] },
  "¿Qué tribunal integra la Jurisdicción Constitucional?": { falsas: ["El Consejo de Estado.", "La Corte Suprema de Justicia."] },
  "¿Cuáles son los colores de la bandera, de arriba a abajo?": { falsas: ["Amarillo, rojo y azul.", "Rojo, azul y amarillo."] },
  "¿Qué representa el color amarillo de la bandera?": { falsas: ["La sangre de los héroes.", "Los mares que bañan el territorio."], corta: "La riqueza del suelo." },
  "¿Cuál es el lema nacional que aparece en el escudo?": { falsas: ["\"Orden y Progreso\".", "\"Unidad y Libertad\"."] },
  "¿Quién diseñó el escudo nacional y en qué año?": { falsas: ["Simón Bolívar, en 1819.", "Antonio Nariño, en 1810."] },
  "¿Quién escribió la letra del himno nacional?": { falsas: ["El poeta José Asunción Silva.", "El presidente Rafael Reyes."], corta: "El presidente Rafael Núñez." },
  "¿En qué año se proclamó oficialmente el himno nacional?": { falsas: ["En 1819.", "En 1946."] },
  "¿Cuál es el ave nacional de Colombia?": { falsas: ["La guacamaya roja.", "El tucán pico iris."] },
  "¿Cuál es la flor nacional de Colombia?": { falsas: ["La heliconia.", "El frailejón."] },
  "¿Cuál es el árbol nacional de Colombia?": { falsas: ["La ceiba.", "El guayacán amarillo."] },
  "¿Cuál es el símbolo cultural de la nación (Ley 908 de 2004)?": { falsas: ["La ruana.", "La mochila arhuaca."], corta: "El sombrero vueltiao." },
  "¿Cuál es la moneda oficial de Colombia?": { falsas: ["El bolívar colombiano.", "El real colombiano."], corta: "El peso colombiano." },
  "¿Cuál es el plato típico del archipiélago de San Andrés?": { falsas: ["La bandeja paisa.", "El ajiaco santafereño."] },
  "¿De qué región es originaria la bandeja paisa?": { falsas: ["De la región Caribe (Atlántico).", "De la región Pacífica (Chocó)."] },
  "¿Cuál es el plato típico de los Llanos (Orinoquía)?": { falsas: ["El cuy asado.", "La cazuela de mariscos."] },
  "¿Qué carnaval es Patrimonio de la Humanidad de la UNESCO?": { falsas: ["La Feria de Manizales.", "La Feria de las Flores."] },
  "¿En qué ciudad se celebra el Carnaval de Negros y Blancos?": { falsas: ["En Barranquilla (Atlántico).", "En Popayán (Cauca)."] },
  "¿En qué ciudad es la Feria de las Flores con el desfile de silleteros?": { falsas: ["En Manizales.", "En Cali."] },
  "¿Qué música tradicional es característica de los Llanos Orientales?": { falsas: ["El vallenato.", "La cumbia."] },
  "¿Quién ganó el Nobel de Literatura en 1982 y con qué obra?": { falsas: ["Jorge Isaacs, con María.", "Álvaro Mutis, con La nieve del almirante."] },
  "¿Cuál es considerado el \"deporte rey\" de Colombia?": { falsas: ["El béisbol.", "El atletismo."] },
};
