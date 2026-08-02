import React, { useState, useRef, useEffect } from "react";

/* ============================================================
   DATOS — extraídos del capítulo "Historia" de la Guía Cancillería.
   Organizados en 6 eras; cada evento incluye lo relevante para el test.
   ============================================================ */
const ERAS = [
  { key: "precolombina", label: "Antes de Colombia", color: "#8A6D3B", soft: "#EFE6D5", rango: "16.000 a. p. – 1717" },
  { key: "borbonica", label: "Reformas Borbónicas", color: "#A0522D", soft: "#F0E0D6", rango: "1717 – 1808" },
  { key: "independencia", label: "Independencia y nación", color: "#1E7F8C", soft: "#DCEEF0", rango: "1809 – 1886" },
  { key: "modernizacion", label: "Modernización", color: "#4A7C3F", soft: "#E1EBDD", rango: "1886 – 1958" },
  { key: "violencia", label: "Violencia y conflicto", color: "#8C3B3B", soft: "#F0DADA", rango: "1946 – 1993" },
  { key: "contemporanea", label: "Historia contemporánea", color: "#5B4B8A", soft: "#E5E0F0", rango: "1991 – hoy" },
];

const EVENTOS = [
  // ---------- PRECOLOMBINA / CONQUISTA ----------
  {
    era: "precolombina", año: "Hace 16.000 años", orden: -16000,
    titulo: "Primeros pobladores",
    resumen: "Grupos nómadas provenientes de Asia llegan al actual territorio colombiano.",
    detalle: "Los humanos provenientes de Asia llegaron a América por el estrecho de Beringia (entre la península de Chukotka en Rusia y la de Seward en Alaska). Según hallazgos arqueológicos de hace unos 16.000 años, grupos nómadas ya habían cruzado el istmo de Panamá y la región del Darién hasta llegar a lo que hoy es Colombia. En aquella época glacial el Darién sí era transitable.",
  },
  {
    era: "precolombina", año: "Hace ~5.000 años", orden: -5000,
    titulo: "Pueblos indígenas prehispánicos",
    resumen: "Se establecen entre 80 y 100 grupos indígenas con lenguas y culturas propias.",
    detalle: "Los primeros pobladores se expandieron y se establecieron hace unos 5.000 años. Se estima que existieron entre 80 y 100 grupos, diferenciados por lengua, economía y creencias. Las lenguas predominantes fueron la chibcha, arawak y caribe. Entre los grupos: Muisca, Tayrona, Sinú, Quimbaya, Calima, Caribe, y otros de la Amazonía y el Orinoco.",
    destacado: "Lenguas madre: chibcha, arawak y caribe.",
  },
  {
    era: "precolombina", año: "≈1501", orden: 1501,
    titulo: "Primera expedición: Rodrigo de Bastidas",
    resumen: "Los españoles llegan por la costa Caribe y avanzan hacia el sur.",
    detalle: "Una de las primeras expediciones en llegar al territorio fue liderada por Rodrigo de Bastidas hacia 1501. Los españoles entraron por la costa Caribe y se movilizaron hacia el sur durante la conquista y colonización.",
  },
  {
    era: "precolombina", año: "1533", orden: 1533,
    titulo: "Se intensifica la conquista — Santa Marta",
    resumen: "Fundación de Santa Marta; se acelera la colonización del interior.",
    detalle: "A partir de 1533 la conquista se intensificó con la fundación de Santa Marta por Pedro de Heredia y la posterior expedición de Gonzalo Jiménez de Quesada hacia el interior. La minería de oro y plata fue la motivación principal de los españoles. Sistemas como las encomiendas y los repartimientos sometieron a los indígenas a trabajo forzado.",
    destacado: "Hoy se habla de \"encuentro de dos mundos\" o \"conquista\", no de \"descubrimiento\".",
  },
  {
    era: "precolombina", año: "1538", orden: 1538,
    titulo: "Fundación de Santa Fe de Bogotá",
    resumen: "Gonzalo Jiménez de Quesada funda la futura capital.",
    detalle: "La expedición de Gonzalo Jiménez de Quesada hacia el interior culminó con la fundación de Santa Fe de Bogotá (hoy Bogotá) en 1538. Las principales ciudades coloniales fueron Santa Fe de Bogotá, Cartagena de Indias, Popayán y Santa Marta.",
  },
  {
    era: "precolombina", año: "1549", orden: 1549,
    titulo: "Audiencia de Santafé",
    resumen: "Nueva división administrativa del imperio español.",
    detalle: "En 1549 se creó la Audiencia de Santafé, que abarcaba las provincias de Santa Marta, San Juan, Popayán, Guayana y Cartagena de Indias. Durante la Colonia, el territorio formó parte del Virreinato de Nueva Granada. La economía se basaba en la explotación del oro y la trata de esclavos africanos.",
  },
  // ---------- REFORMAS BORBÓNICAS ----------
  {
    era: "borbonica", año: "1717", orden: 1717,
    titulo: "Fundación del Virreinato de Nueva Granada",
    resumen: "Las Reformas Borbónicas reorganizan las colonias.",
    detalle: "En el siglo XVIII, los monarcas Carlos III y Carlos IV introdujeron las Reformas Borbónicas para fortalecer el control y la explotación de los virreinatos de Nueva Granada y Perú. Abarcaron lo político, económico, administrativo, cultural y religioso. El Virreinato de la Nueva Granada se fundó en 1717 con nuevas divisiones territoriales.",
  },
  {
    era: "borbonica", año: "1767", orden: 1767,
    titulo: "Expulsión de los jesuitas",
    resumen: "Se fortalece el Regalismo (autoridad del rey sobre la del Papa).",
    detalle: "Las reformas fortalecieron el Regalismo, que defendía la autoridad del rey sobre la del Papa en la administración de las colonias. Ello permitió la expulsión de la Compañía de Jesús en 1767, tanto de España como de las colonias. En lo económico se impulsó la producción agrícola, el libre comercio y un sistema tributario más eficiente para financiar los gastos de la Corona.",
  },
  {
    era: "borbonica", año: "1780–1781", orden: 1780,
    titulo: "Revolución de los Comuneros",
    resumen: "Agricultores y artesanos se rebelan contra el alza de impuestos.",
    detalle: "Los comuneros eran agricultores y artesanos de sectores medios y bajos que rechazaron el aumento de impuestos de las Reformas Borbónicas. La revuelta se desarrolló entre 1780 y 1781 en Socorro, Charalá, Simacota y Mogotes, entre otros. Aunque fue sofocada por las fuerzas coloniales, ayudó a sentar las bases del movimiento independentista.",
  },
  {
    era: "borbonica", año: "Finales s. XVIII", orden: 1790,
    titulo: "Los Criollos Ilustrados",
    resumen: "Intelectuales criollos influidos por la Ilustración europea.",
    detalle: "Los criollos ilustrados eran descendientes de europeos nacidos en las colonias, influidos por la Ilustración (razón, ciencia, libertad, progreso). Buscaban mayor autonomía y representación. Figuras: Francisco José de Caldas, Antonio Nariño, Camilo Torres, Francisco Antonio Zea y José Celestino Mutis. Mujeres: Petrona López Duro, María Águeda Gallardo, Manuela Beltrán, María Concepción Loperena y Mercedes Abrego, entre otras.",
    destacado: "Caldas y Nariño fueron claves en el movimiento independentista.",
  },
  // ---------- INDEPENDENCIA Y NACIÓN ----------
  {
    era: "independencia", año: "1809", orden: 1809,
    titulo: "Memorial de Agravios",
    resumen: "Camilo Torres redacta una queja formal contra la Corona.",
    detalle: "En 1809, Camilo Torres escribió la Representación del Cabildo de Santa Fe o Memorial de Agravios: una queja formal reclamando que los criollos tenían los mismos derechos que los españoles peninsulares y debían tener igual representación de diputados. Aunque se atribuye a Camilo Torres, fue firmado por varios miembros del Cabildo de Bogotá.",
  },
  {
    era: "independencia", año: "20 jul 1810", orden: 1810,
    titulo: "Grito de Independencia",
    resumen: "Se establece la Junta Suprema de Gobierno en Bogotá.",
    detalle: "El 20 de julio de 1810, en Bogotá, líderes criollos y patriotas se levantaron contra el dominio español y establecieron una Junta de Gobierno provisional (Junta Suprema). Se conmemora como el día de la Independencia, aunque no fue el momento exacto en que se logró de forma definitiva. Figuras clave: Simón Bolívar, Antonio Nariño, José María Carbonell, Camilo Torres, Policarpa Salavarrieta y Manuelita Sáenz, entre otras.",
    destacado: "El 20 de julio se conmemora, pero la independencia fue un proceso de años.",
  },
  {
    era: "independencia", año: "1810–1815", orden: 1811,
    titulo: "La Patria Boba",
    resumen: "Primera República; luego llega la reconquista española.",
    detalle: "\"La Patria Boba\" fue el nombre irónico que dio Antonio Nariño (en su periódico Los Toros de Fucha) al período entre 1810 y 1815. Entre 1811 y 1815 se estableció una primera República, luego abolida por el rey. Pablo Morillo llevó a cabo la reconquista española de la Nueva Granada.",
  },
  {
    era: "independencia", año: "7 ago 1819", orden: 1819,
    titulo: "Batalla de Boyacá",
    resumen: "Las tropas patriotas de Bolívar consolidan la independencia.",
    detalle: "La independencia se consolidó el 7 de agosto de 1819 con la victoria en la Batalla de Boyacá, de las tropas patriotas lideradas por Simón Bolívar. El proceso fue complejo, abarcó varios años e involucró a distintas regiones y líderes.",
    destacado: "Fecha clave: 7 de agosto de 1819.",
  },
  {
    era: "independencia", año: "17 dic 1819", orden: 1819.5,
    titulo: "Nace la Gran Colombia",
    resumen: "El Congreso de Angostura crea la República de Colombia.",
    detalle: "Tras Boyacá, el Congreso de Angostura creó la República de Colombia el 17 de diciembre de 1819, que comprendía los territorios de la actual Colombia, Ecuador, Panamá y Venezuela. Los historiadores del siglo XX la llaman \"Gran Colombia\". Su primer presidente fue Simón Bolívar; era una república centralizada con constitución propia.",
  },
  {
    era: "independencia", año: "1831", orden: 1831,
    titulo: "Disolución de la Gran Colombia",
    resumen: "Las tensiones regionales dividen la república en varios países.",
    detalle: "La Gran Colombia se disolvió en 1831 por las tensiones entre las regiones que la conformaban; su separación resultó en los países actuales.",
  },
  {
    era: "independencia", año: "1831–1858", orden: 1832,
    titulo: "La Nueva Granada",
    resumen: "Nacen los partidos Liberal y Conservador.",
    detalle: "La Nueva Granada fue el país formado por provincias de la actual Colombia y Panamá tras la disolución de la Gran Colombia. Su vida constitucional fue entre 1831 y 1858. En este período surgieron los partidos Liberal y Conservador, que gobernarían por más de un siglo y aún hoy tienen representación en el Congreso.",
  },
  {
    era: "independencia", año: "1863–1886", orden: 1863,
    titulo: "Olimpo Radical / Estados Unidos de Colombia",
    resumen: "Constitución de Rionegro (1863) y estado federal.",
    detalle: "El Olimpo Radical (1863–1886) impuso las ideas liberales en los \"Estados Unidos de Colombia\", nombre dado en 1863 tras la Constitución de Rionegro. Estableció un estado federal de nueve estados soberanos: Antioquia, Bolívar, Boyacá, Cauca, Cundinamarca, Magdalena, Panamá, Santander y Tolima. Un gobierno central manejaba relaciones exteriores y defensa; cada estado tenía autonomía interna.",
  },
  {
    era: "independencia", año: "1886", orden: 1886,
    titulo: "Constitución de 1886",
    resumen: "Vuelve el sistema centralizado y el nombre \"República de Colombia\".",
    detalle: "En 1886 una nueva constitución abolió el sistema federal e instauró el centralismo que se conserva hasta hoy. El país pasó a llamarse oficialmente República de Colombia. La Ley 124 del 13 de julio de 1887 declaró la bandera que usamos hoy (reemplazando la que tenía estrellas).",
    destacado: "La Constitución de 1886 rigió hasta la de 1991.",
  },
  // ---------- MODERNIZACIÓN ----------
  {
    era: "modernizacion", año: "1886–1930", orden: 1887,
    titulo: "Hegemonía Conservadora y la Regeneración",
    resumen: "Predominio conservador; proyecto de Rafael Núñez.",
    detalle: "La Hegemonía Conservadora (1886–1930) se debe al predominio del partido Conservador. Su primer proyecto fue la Regeneración, propuesta por Rafael Núñez: modernizar el país fortaleciendo el Estado-Nación y recuperando valores tradicionales, con la Iglesia católica como bastión. En 1887 Núñez escribió la letra del himno nacional y el italiano Oreste Síndici lo musicalizó (oficializado por Ley 33 de 1920).",
    destacado: "Himno: letra de Rafael Núñez, música de Oreste Síndici (1887).",
  },
  {
    era: "modernizacion", año: "1899–1902", orden: 1899,
    titulo: "Guerra de los Mil Días",
    resumen: "Conflicto entre liberales y conservadores.",
    detalle: "La Guerra de los Mil Días (1899–1902) precedió a la separación de Panamá y debilitó al país. Tras ella, Rafael Reyes sería elegido presidente.",
  },
  {
    era: "modernizacion", año: "1903", orden: 1903,
    titulo: "Separación de Panamá",
    resumen: "Panamá se independiza de Colombia.",
    detalle: "En 1903 se produjo la separación de Panamá. Más adelante, Estados Unidos entregó 25 millones de dólares como indemnización, que se emplearon en obras de infraestructura durante el gobierno de Pedro Nel Ospina.",
  },
  {
    era: "modernizacion", año: "1904–1909", orden: 1904,
    titulo: "Quinquenio de Rafael Reyes",
    resumen: "Modernización de infraestructura, economía y fuerzas armadas.",
    detalle: "Rafael Reyes (1904–1909) impulsó carreteras, vías férreas y puertos, la inversión extranjera y el cultivo de banano, café y algodón. En 1905 firmó el tratado Averbury-Holguín (crédito internacional para sanear la deuda). En 1907 fundó la Escuela Militar de Cadetes y la Escuela Naval. Su período fue controversial por la persecución a opositores.",
  },
  {
    era: "modernizacion", año: "1922–1926", orden: 1922,
    titulo: "Gobierno de Pedro Nel Ospina",
    resumen: "Se crea el Banco de la República.",
    detalle: "Durante el gobierno de Pedro Nel Ospina (1922–1926) se creó el Banco de la República, se ampliaron los ferrocarriles y se ejecutaron obras (canal del Dique, muelle de Buenaventura, Bocas de Ceniza, oleoducto Barrancabermeja–Cartagena). Llegaron las misiones pedagógicas alemanas.",
  },
  {
    era: "modernizacion", año: "1930–1946", orden: 1930,
    titulo: "República Liberal y la Revolución en Marcha",
    resumen: "Industrialización y reforma educativa (López Pumarejo).",
    detalle: "La República Liberal (1930–1946) impulsó la industrialización, el proteccionismo, políticas de vivienda y seguridad social. El segundo gobierno, la \"Revolución en Marcha\" de Alfonso López Pumarejo, incluyó la reforma educativa que, bajo la Ley 68 de 1935, inició la Ciudad Universitaria de la Universidad Nacional.",
  },
  {
    era: "modernizacion", año: "1953–1957", orden: 1953,
    titulo: "Dictadura de Gustavo Rojas Pinilla",
    resumen: "Junta militar; llega la televisión y el Aeropuerto El Dorado.",
    detalle: "Ante la Violencia, los partidos cedieron el poder a una junta militar liderada por el general Gustavo Rojas Pinilla (13 de junio de 1953 – 10 de mayo de 1957). Implementó reforma agraria, nacionalización del petróleo y obras como el Aeropuerto El Dorado; trajo la televisión al país. También fue autoritario y cometió violaciones de derechos humanos.",
  },
  {
    era: "modernizacion", año: "1 dic 1957", orden: 1957,
    titulo: "Plebiscito del Frente Nacional",
    resumen: "El 95% aprueba; las mujeres votan por primera vez.",
    detalle: "El 1 de diciembre de 1957 se realizó el plebiscito en el que el 95% votó a favor de los pactos del Frente Nacional. Fue la primera vez que las mujeres votaron en Colombia, tras años de lucha por el sufragio femenino.",
    destacado: "Primer voto femenino en Colombia: plebiscito de 1957.",
  },
  {
    era: "modernizacion", año: "1958–1974", orden: 1958,
    titulo: "Frente Nacional",
    resumen: "Liberales y conservadores se alternan el poder.",
    detalle: "El Frente Nacional (firmado en 1958) fue un acuerdo por el que liberales y conservadores se alternaban la presidencia cada cuatro años y repartían los cargos. Redujo la violencia bipartidista, pero fue criticado por excluir a otros movimientos, lo que trajo consecuencias políticas más adelante. En 1990, el gobierno de Virgilio Barco logró la paz con el M-19.",
  },
  // ---------- VIOLENCIA Y CONFLICTO ----------
  {
    era: "violencia", año: "1946–1958", orden: 1946,
    titulo: "La Era de la Violencia",
    resumen: "Violencia política, social, económica y religiosa.",
    detalle: "\"La Violencia\" (1946–1958) combinó violencias política, social, económica y religiosa, con raíz en el conflicto entre liberales y conservadores. Según la Comisión de la Verdad tuvo dos oleadas: el gobierno y dictadura conservadora (1946–1953) y la dictadura militar de Rojas Pinilla (1953–1957). El conservador Mariano Ospina ganó las elecciones de 1946.",
  },
  {
    era: "violencia", año: "9 abr 1948", orden: 1948,
    titulo: "El Bogotazo",
    resumen: "Asesinato de Jorge Eliécer Gaitán en Bogotá.",
    detalle: "El 9 de abril de 1948 fue asesinado el líder liberal Jorge Eliécer Gaitán en Bogotá (carrera séptima con avenida Jiménez). La rabia colectiva desató el \"Bogotazo\": destrucción de tranvías, edificios, iglesias y comercios. Se estima entre 500 y 3.000 muertos. La violencia se extendió por todo el país.",
    destacado: "El asesinato de Gaitán (1948) marcó el punto álgido de La Violencia.",
  },
  {
    era: "violencia", año: "1962–1967", orden: 1962,
    titulo: "Surgen las guerrillas",
    resumen: "ELN (1962), FARC (1965) y EPL (1967).",
    detalle: "Las autodefensas comunistas se transformaron en las FARC (fundadas en 1965), según su mito fundacional en respuesta a ataques del ejército a \"repúblicas independientes\" como Marquetalia (Tolima). También surgieron el Ejército de Liberación Nacional (ELN) en 1962 y el Ejército Popular de Liberación (EPL) en 1967.",
  },
  {
    era: "violencia", año: "1970–1974", orden: 1970,
    titulo: "Fraude electoral y nace el M-19",
    resumen: "Tras el fraude de 1970 se funda el Movimiento 19 de abril.",
    detalle: "En las elecciones de 1970, Gustavo Rojas Pinilla (candidato de la ANAPO) ganó, pero el gobierno otorgó la victoria a Misael Pastrana (Conservador). El fraude generó frustración y llevó a la fundación, en 1974, del Movimiento 19 de abril (M-19), que tomó su nombre de la fecha del fraude.",
  },
  {
    era: "violencia", año: "Años 70–80", orden: 1975,
    titulo: "Narcotráfico y paramilitarismo",
    resumen: "Carteles de Medellín y Cali; nacen las AUC.",
    detalle: "En los años 70 comenzó el tráfico de marihuana y luego la producción de cocaína. En los 80 surgieron los grandes carteles: el de Medellín (Pablo Escobar) y el de Cali (hermanos Rodríguez Orejuela). En paralelo, grupos paramilitares —originados como autodefensas para enfrentar a las guerrillas y proteger a terratenientes— se consolidaron en las Autodefensas Unidas de Colombia (AUC).",
  },
  {
    era: "violencia", año: "1985", orden: 1985,
    titulo: "Toma del Palacio de Justicia",
    resumen: "14 magistrados secuestrados murieron en la toma y retoma.",
    detalle: "En la década de 1980 hubo ataques terroristas del narcotráfico (bombas contra el DAS y centros comerciales). Ocurrió la toma y retoma del Palacio de Justicia, en la que 14 magistrados fueron secuestrados y posteriormente murieron.",
  },
  {
    era: "violencia", año: "1990", orden: 1990,
    titulo: "Desmovilización del M-19",
    resumen: "Proceso de paz con el gobierno de Virgilio Barco.",
    detalle: "Hacia finales de los 80 e inicios de los 90 se negoció la entrega de armas del M-19 y la guerrilla Quintín Lame. Su desmovilización condujo a la Unión Patriótica (UP), partido que sufrió un genocidio de sus miembros. El proceso con el M-19 (1990) fue un hito de paz.",
  },
  {
    era: "violencia", año: "1993", orden: 1993,
    titulo: "Muerte de Pablo Escobar",
    resumen: "Cae el líder del cartel de Medellín, pero el narcotráfico continúa.",
    detalle: "Con la muerte de Pablo Escobar en 1993 (y la captura de otros capos) los carteles de Medellín y Cali perdieron terreno. Pero el narcotráfico no se detuvo: guerrillas (FARC, ELN) y paramilitares (AUC) tomaron el control del negocio, con líderes de menor nivel.",
  },
  // ---------- CONTEMPORÁNEA ----------
  {
    era: "contemporanea", año: "1991", orden: 1991,
    titulo: "Constitución Política de 1991",
    resumen: "Nueva carta magna; reconoce derechos de grupos excluidos.",
    detalle: "La Constitución de 1991 reemplazó a la de 1886 y reconoció derechos de grupos antes excluidos: indígenas, afrocolombianos y mujeres. La Asamblea Constituyente tuvo tres presidentes: Álvaro Gómez Hurtado, Antonio Navarro Wolff y Horacio Serpa.",
    destacado: "La Constitución de 1991 es la que rige hoy.",
  },
  {
    era: "contemporanea", año: "1990–1994", orden: 1991.5,
    titulo: "Apertura económica (César Gaviria)",
    resumen: "Se abren el comercio exterior y la inversión extranjera.",
    detalle: "La apertura económica se consolidó con Virgilio Barco (1986–1990) y César Gaviria (1990–1994): se eliminaron barreras al comercio y a la inversión, se privatizaron empresas y se redujo el control estatal. La década de 1990, sin embargo, estuvo marcada por el conflicto armado y el narcotráfico. En el gobierno de Gaviria fue capturado y murió Pablo Escobar.",
  },
  {
    era: "contemporanea", año: "1997", orden: 1997,
    titulo: "Ley General de Cultura",
    resumen: "Ernesto Samper crea el Ministerio de Cultura.",
    detalle: "El 7 de agosto de 1997, el presidente Ernesto Samper (1994–1998) sancionó la Ley 397 o Ley General de Cultura, que creó el Ministerio de Cultura. Este asumió las funciones de Colcultura (que dependía del Ministerio de Educación).",
  },
  {
    era: "contemporanea", año: "1998–2002", orden: 1998,
    titulo: "Proceso de paz en El Caguán (Pastrana)",
    resumen: "Zona desmilitarizada para dialogar con las FARC.",
    detalle: "Andrés Pastrana (1998–2002) estableció una zona desmilitarizada en El Caguán (San Vicente del Caguán en Caquetá; La Uribe, Mesetas, La Macarena y Vista Hermosa en Meta) para dialogar con las FARC. Los diálogos no avanzaron y, tras hechos como secuestros y enfrentamientos, la zona de despeje terminó, con recrudecimiento de la violencia. También enfrentó la crisis del UPAC (créditos de vivienda).",
  },
  {
    era: "contemporanea", año: "2002–2010", orden: 2002,
    titulo: "Seguridad Democrática (Álvaro Uribe)",
    resumen: "Política contra los grupos armados ilegales.",
    detalle: "Álvaro Uribe Vélez (2002–2006 y 2006–2010) implementó la Seguridad Democrática: fuerte inversión militar para combatir a los grupos armados y recuperar el control territorial. En 2005 se inició un proceso de paz con paramilitares (AUC). Se redujo el impacto de estos grupos, aunque no se eliminaron por completo.",
  },
  {
    era: "contemporanea", año: "2016", orden: 2016,
    titulo: "Acuerdo de paz con las FARC",
    resumen: "Firma en La Habana; inicia el postconflicto.",
    detalle: "Bajo Juan Manuel Santos (2010–2018) se firmó el acuerdo de paz con las FARC en 2016 (negociado en La Habana, Cuba). Abordó justicia transicional, participación política, reforma agraria y lucha contra el narcotráfico. Miles de combatientes se desmovilizaron; las FARC se volvieron partido político (Fuerza Alternativa Revolucionaria del Común). Se crearon la Jurisdicción Especial para la Paz (JEP) y la Comisión de la Verdad.",
    destacado: "El postconflicto arranca en 2016 con la firma del acuerdo.",
  },
  {
    era: "contemporanea", año: "2020", orden: 2020,
    titulo: "Pandemia del COVID-19",
    resumen: "Primer caso el 6 de marzo de 2020 (gobierno de Iván Duque).",
    detalle: "El primer caso de COVID-19 en Colombia se anunció el 6 de marzo de 2020, bajo Iván Duque (2018–2022). Se decretó emergencia sanitaria y cuarentena (\"aislamiento preventivo obligatorio\"), que duró 150 días hasta el 30 de agosto. La emergencia sanitaria terminó el 30 de junio de 2022, con el 83% de la población con al menos una dosis y el 70% con esquema completo.",
  },
  {
    era: "contemporanea", año: "2022", orden: 2022,
    titulo: "Gustavo Petro y \"Potencia Mundial de la Vida\"",
    resumen: "Nuevo Plan Nacional de Desarrollo.",
    detalle: "El 7 de agosto de 2022, Gustavo Petro asumió la presidencia. El Congreso aprobó su Plan Nacional de Desarrollo \"Colombia, potencia mundial de la vida\", que busca cambios estructurales para el desarrollo sostenible. Se continúa la implementación de los acuerdos de paz y se propone la \"Paz total\".",
  },
];

/* ============================================================
   COMPONENTE DE EVENTO (tarjeta en la línea de tiempo)
   ============================================================ */
function EventoCard({ ev, era, expanded, onToggle, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative pl-12 pb-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .5s ease-out ${index * 0.03}s, transform .5s ease-out ${index * 0.03}s`,
      }}
    >
      {/* punto sobre la línea */}
      <span
        className="absolute left-[14px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white z-10"
        style={{ backgroundColor: era.color, boxShadow: `0 0 0 3px ${era.soft}` }}
      />
      <button
        onClick={onToggle}
        className="w-full text-left rounded-xl border bg-white px-4 py-3 transition-all hover:shadow-md active:scale-[.99]"
        style={{ borderColor: expanded ? era.color : "#e7e2d6", borderWidth: expanded ? 2 : 1 }}
      >
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: era.soft, color: era.color }}
          >
            {ev.año}
          </span>
        </div>
        <h3 className="font-bold text-stone-800 text-[15px] leading-snug" style={{ fontFamily: "Georgia, serif" }}>
          {ev.titulo}
        </h3>
        <p className="text-sm text-stone-500 mt-0.5 leading-snug">{ev.resumen}</p>

        {expanded && (
          <div className="mt-3 pt-3 border-t" style={{ borderColor: era.soft }}>
            <p className="text-sm text-stone-700 leading-relaxed">{ev.detalle}</p>
            {ev.destacado && (
              <div className="mt-2.5 rounded-lg px-3 py-2 text-sm flex gap-2" style={{ backgroundColor: era.soft, color: "#3a3327" }}>
                <span>📌</span><span>{ev.destacado}</span>
              </div>
            )}
          </div>
        )}
        <p className="text-xs mt-2 font-medium" style={{ color: era.color }}>
          {expanded ? "Ocultar ▲" : "Ver más ▼"}
        </p>
      </button>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function LineaTiempo() {
  const [filtroEra, setFiltroEra] = useState("todas");
  const [expandido, setExpandido] = useState(null);

  const erasMap = Object.fromEntries(ERAS.map((e) => [e.key, e]));
  const eventosOrdenados = [...EVENTOS].sort((a, b) => a.orden - b.orden);
  const eventosVisibles = filtroEra === "todas"
    ? eventosOrdenados
    : eventosOrdenados.filter((e) => e.era === filtroEra);

  return (
    <>
        <p className="text-stone-500 text-sm mb-4">
          Recorre la línea de tiempo. Toca cualquier evento para ver el detalle. Filtra por era para estudiar por partes.
        </p>

        {/* filtros de era */}
        <div className="flex flex-wrap gap-2 mb-5 sticky top-0 py-2 z-20" style={{ backgroundColor: "#FAF7EF" }}>
          <button
            onClick={() => setFiltroEra("todas")}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={filtroEra === "todas"
              ? { backgroundColor: "#3a3327", color: "white", borderColor: "#3a3327" }
              : { backgroundColor: "white", color: "#3a3327", borderColor: "#d8d1c2" }}
          >
            Todas
          </button>
          {ERAS.map((e) => (
            <button
              key={e.key}
              onClick={() => setFiltroEra(e.key)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={filtroEra === e.key
                ? { backgroundColor: e.color, color: "white", borderColor: e.color }
                : { backgroundColor: "white", color: e.color, borderColor: e.color }}
            >
              {e.label}
            </button>
          ))}
        </div>

        {/* encabezado de era (cuando se filtra) */}
        {filtroEra !== "todas" && (
          <div className="mb-4 rounded-xl px-4 py-3" style={{ backgroundColor: erasMap[filtroEra].soft }}>
            <p className="font-bold text-lg" style={{ color: erasMap[filtroEra].color, fontFamily: "Georgia, serif" }}>
              {erasMap[filtroEra].label}
            </p>
            <p className="text-sm text-stone-600">{erasMap[filtroEra].rango}</p>
          </div>
        )}

        {/* línea de tiempo */}
        <div className="relative">
          {/* línea vertical */}
          <div className="absolute left-[20px] top-1 bottom-1 w-0.5" style={{ backgroundColor: "#e0d9c8" }} />
          {eventosVisibles.map((ev, i) => (
            <EventoCard
              key={ev.titulo}
              ev={ev}
              era={erasMap[ev.era]}
              index={i}
              expanded={expandido === ev.titulo}
              onToggle={() => setExpandido(expandido === ev.titulo ? null : ev.titulo)}
            />
          ))}
        </div>

        <footer className="text-center text-xs text-stone-400 mt-6 pb-4">
          Contenido basado en la guía oficial de estudio · {EVENTOS.length} eventos
        </footer>
    </>
  );
}
