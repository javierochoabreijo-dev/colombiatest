import React, { useState, useRef, useLayoutEffect } from "react";

/* ============================================================
   DATOS — extraídos y resumidos de la Guía Cancillería (cap. Geografía)
   ============================================================ */
const REGIONS = {
  caribe: {
    name: "Región Caribe",
    tagline: "1.600 km de costa entre manglares, sabanas y sierra",
    color: "#1E7F8C",
    soft: "#DCEEF0",
    departamentos: ["La Guajira", "Magdalena", "Cesar", "Atlántico", "Bolívar", "Sucre", "Córdoba"],
    capitales: ["Riohacha", "Santa Marta", "Valledupar", "Barranquilla", "Cartagena", "Sincelejo", "Montería"],
    dato: "Aquí está el punto más alto de Colombia: el Pico Cristóbal Colón (5.775 m), en la Sierra Nevada de Santa Marta.",
    geografia:
      "Franja norte del país, entre el golfo de Urabá y el golfo de Venezuela. Limita al norte con el mar Caribe y al sur con la región Andina.",
    relieve: [
      { titulo: "Llanuras costeras", texto: "Bajas y fértiles, formadas por los ríos Magdalena, Cesar y Sinú. Base de la agricultura y ganadería regional." },
      { titulo: "Sierra Nevada de Santa Marta", texto: "La montaña costera más alta del mundo. Sagrada para los pueblos indígenas kogui, arhuaco, wiwa y kankuamo." },
      { titulo: "Serranía de Perijá", texto: "En la frontera con Venezuela, rica en especies endémicas." },
      { titulo: "Archipiélago de San Andrés, Providencia y Santa Catalina", texto: "Islas coralinas en el Caribe suroccidental, famosas por sus playas y arrecifes." },
    ],
    clima: "Ecuatorial cálido: temperaturas altas todo el año, con estación seca y lluviosa marcadas.",
    flora: [
      { nombre: "Manglares", icono: "🌳", texto: "Mangle rojo, blanco y negro protegen la costa y son criadero de vida marina." },
      { nombre: "Bosque tropical seco y húmedo", icono: "🌴", texto: "Ceiba, almendro, caucho y roble." },
    ],
    fauna: [
      { categoria: "Reptiles", icono: "🐊", items: [
        { nombre: "Tortuga carey", icono: "🐢" }, { nombre: "Tortuga verde", icono: "🐢" },
        { nombre: "Caimán americano", icono: "🐊" }, { nombre: "Serpiente coral", icono: "🐍" },
      ] },
      { categoria: "Aves", icono: "🦅", items: [
        { nombre: "Flamenco rosado", icono: "🦩" }, { nombre: "Pelícano", icono: "🐦" },
        { nombre: "Guacamayo", icono: "🦜" }, { nombre: "Águila arpía", icono: "🦅" },
      ] },
      { categoria: "Marina", icono: "🐬", items: [
        { nombre: "Delfines", icono: "🐬" }, { nombre: "Manatíes", icono: "🦭" },
        { nombre: "Tiburones", icono: "🦈" }, { nombre: "Arrecifes de coral", icono: "🪸" },
      ] },
    ],
    gente: "Cerca del 22,5% de la población nacional. Mezcla de afrocolombianos, mestizos e indígenas wayúu, kogui y arhuaco. Barranquilla, Cartagena y Santa Marta son los grandes centros urbanos.",
  },
  andina: {
    name: "Región Andina",
    tagline: "Tres cordilleras, el corazón poblado de Colombia",
    color: "#6B5B3E",
    soft: "#EDE7DA",
    departamentos: ["Antioquia", "Caldas", "Risaralda", "Quindío", "Tolima", "Huila", "Boyacá", "Cundinamarca", "Santander", "Norte de Santander"],
    capitales: ["Medellín", "Manizales", "Pereira", "Armenia", "Ibagué", "Neiva", "Tunja", "Bogotá", "Bucaramanga", "Cúcuta"],
    dato: "Con ~18 millones de habitantes (40,5% del país), es la región más poblada. Aquí vive un colombiano de cada dos.",
    geografia:
      "Centro-occidente del país, atravesada por las cordilleras Occidental, Central y Oriental. Clima variado: templado en las alturas, cálido en los valles.",
    relieve: [
      { titulo: "Tres cordilleras", texto: "Occidental, Central y Oriental, separadas por profundos valles interandinos." },
      { titulo: "Picos y nevados", texto: "Nevado del Ruiz, del Tolima, del Huila y del Cocuy superan los 5.000 m." },
      { titulo: "Valles interandinos", texto: "Valle del Cauca, del Magdalena y de Aburrá — allí se concentran las grandes ciudades." },
      { titulo: "Páramos", texto: "Ecosistemas de alta montaña, las 'fábricas de agua' del país." },
    ],
    clima: "Va desde templado en los valles hasta frío de alta montaña y páramo en las cumbres.",
    flora: [
      { nombre: "Bosque de niebla", icono: "🌲", texto: "Bromelias, orquídeas y musgos en las laderas cubiertas de neblina." },
      { nombre: "Frailejones", icono: "🌿", texto: "Especie emblemática de los páramos, junto a las espeletias." },
      { nombre: "Cultivos", icono: "🌾", texto: "Café, maíz, papa y trigo en las laderas templadas." },
    ],
    fauna: [
      { categoria: "Aves", icono: "🦅", items: [
        { nombre: "Cóndor de los Andes", icono: "🦅" }, { nombre: "Águila arpía", icono: "🦅" },
        { nombre: "Colibrí", icono: "🐦" }, { nombre: "Tangara (+1.900 especies)", icono: "🐦" },
      ] },
      { categoria: "Mamíferos", icono: "🐻", items: [
        { nombre: "Oso de anteojos", icono: "🐻" }, { nombre: "Puma", icono: "🐆" },
        { nombre: "Tapir de montaña", icono: "🐗" }, { nombre: "Mono aullador", icono: "🐒" },
      ] },
      { categoria: "Anfibios", icono: "🐸", items: [
        { nombre: "Rana arlequín", icono: "🐸" }, { nombre: "Salamandras", icono: "🦎" },
        { nombre: "Lagarto esmeralda", icono: "🦎" },
      ] },
    ],
    gente: "La más densamente poblada; Bogotá, Medellín, Bucaramanga y Pereira concentran migración interna. Mezcla mestiza e indígena.",
  },
  pacifica: {
    name: "Región Pacífica",
    tagline: "Selva húmeda, la franja más lluviosa del planeta",
    color: "#1F6E4A",
    soft: "#DCEFE3",
    departamentos: ["Chocó", "Valle del Cauca", "Cauca", "Nariño"],
    capitales: ["Quibdó", "Cali", "Popayán", "Pasto"],
    dato: "Una de las regiones con mayor precipitación del mundo — el Chocó puede recibir más de 10.000 mm de lluvia al año.",
    geografia:
      "Franja costera estrecha y larga desde Chocó (norte) hasta Nariño (sur), entre la cordillera Occidental y el océano Pacífico.",
    relieve: [
      { titulo: "Cordillera Occidental", texto: "Barrera montañosa paralela a la costa, hasta 4.000 m." },
      { titulo: "Llanuras y valles fluviales", texto: "Recorridos por los ríos San Juan y Atrato." },
      { titulo: "Estuarios y manglares", texto: "Protegen la costa y son vitales para la biodiversidad marina." },
      { titulo: "Playas de arena negra", texto: "Paisaje costero característico del litoral pacífico." },
    ],
    clima: "Ecuatorial húmedo: altas temperaturas y lluvias abundantes todo el año.",
    flora: [
      { nombre: "Selva tropical húmeda", icono: "🌴", texto: "Chontaduro, balso, caucho, ceibo y sangre de drago." },
      { nombre: "Orquídeas", icono: "🌸", texto: "Cattleya trianae, warscewiczii y percivaliana, entre otras." },
    ],
    fauna: [
      { categoria: "Mamíferos", icono: "🐆", items: [
        { nombre: "Jaguar", icono: "🐆" }, { nombre: "Oso hormiguero gigante", icono: "🐾" },
        { nombre: "Tapir", icono: "🐗" }, { nombre: "Delfín rosado", icono: "🐬" },
      ] },
      { categoria: "Aves", icono: "🦜", items: [
        { nombre: "Águila arpía", icono: "🦅" }, { nombre: "Guacamayo rojo", icono: "🦜" },
        { nombre: "Tucán pico iris", icono: "🦜" }, { nombre: "Colibrí cola de espátula", icono: "🐦" },
      ] },
      { categoria: "Anfibios", icono: "🐸", nota: "Alta tasa de endemismo en la región.", items: [
        { nombre: "Rana dorada", icono: "🐸" }, { nombre: "Rana de cristal", icono: "🐸" },
      ] },
    ],
    gente: "Mosaico multicultural: afrocolombianos y pueblos emberá, wounaan y awá. Ciudades clave: Quibdó, Buenaventura, Cali y Tumaco. Folclore de currulao y marimba de chonta.",
  },
  orinoquia: {
    name: "Región Orinoquía",
    tagline: "Los Llanos Orientales: horizonte abierto y sabana",
    color: "#B5892B",
    soft: "#F5EAD2",
    departamentos: ["Arauca", "Casanare", "Meta", "Vichada"],
    capitales: ["Arauca", "Yopal", "Villavicencio", "Puerto Carreño"],
    dato: "Ocupa cerca del 28% del territorio colombiano, pero es una de las regiones menos densamente pobladas.",
    geografia:
      "Centro-este del país, al este de la cordillera Oriental. Limita con Venezuela, Brasil, la Amazonía y la región Andina.",
    relieve: [
      { titulo: "Llanos Orientales", texto: "Extensas llanuras planas cubiertas de pastizales y sabana." },
      { titulo: "Ríos Meta y Orinoco", texto: "Ejes de una red hidrográfica clave para riego y navegación." },
      { titulo: "Serranía de La Macarena", texto: "Formación aislada, hogar del famoso Caño Cristales." },
      { titulo: "Humedales", texto: "El Tuparro y otros ecosistemas de gran valor ecológico." },
    ],
    clima: "Cálido tropical, con una marcada temporada de lluvias y otra seca que define el ciclo ganadero.",
    flora: [
      { nombre: "Sabana", icono: "🌾", texto: "Pastizales y matorrales que sostienen la ganadería llanera." },
      { nombre: "Bosques de galería", icono: "🌳", texto: "Vegetación densa a lo largo de ríos y caños." },
    ],
    fauna: [
      { categoria: "Mamíferos", icono: "🐹", items: [
        { nombre: "Capibara", icono: "🐹" }, { nombre: "Delfín de río", icono: "🐬" },
        { nombre: "Oso hormiguero", icono: "🐾" }, { nombre: "Jaguar", icono: "🐆" },
      ], nota: "El capibara es el roedor más grande del mundo." },
      { categoria: "Aves", icono: "🦜", items: [
        { nombre: "Águila arpía", icono: "🦅" }, { nombre: "Guacamaya roja", icono: "🦜" },
        { nombre: "Garza real", icono: "🦢" }, { nombre: "Martín pescador verde", icono: "🐦" },
      ] },
      { categoria: "Reptiles", icono: "🐊", items: [
        { nombre: "Caimán del Orinoco", icono: "🐊" }, { nombre: "Anaconda verde", icono: "🐍" },
        { nombre: "Tortuga charapa", icono: "🐢" },
      ], nota: "El caimán del Orinoco está en peligro de extinción." },
    ],
    gente: "Pueblos sikuani, piapoco, puinave y guahibo. Economía ganadera, petrolera y agrícola. Villavicencio es el gran centro urbano.",
  },
  amazonia: {
    name: "Región Amazónica",
    tagline: "42% del territorio nacional, la selva más biodiversa",
    color: "#2D5B2E",
    soft: "#E1EBDD",
    departamentos: ["Putumayo", "Caquetá", "Guaviare", "Vaupés", "Guainía", "Amazonas"],
    capitales: ["Mocoa", "Florencia", "San José del Guaviare", "Mitú", "Puerto Inírida", "Leticia"],
    dato: "Se estiman 30.000 especies de plantas en la región — cerca del 10% de todas las especies vegetales del planeta.",
    geografia:
      "Sur del país, al sur de la línea ecuatorial. Frontera con Ecuador, Perú y Brasil. Clima húmedo y cálido todo el año.",
    relieve: [
      { titulo: "Mesetas y colinas", texto: "Mesetas de Yapacaní y colinas de Mocoa, contraste con la llanura selvática." },
      { titulo: "Ríos y llanuras inundables", texto: "'Várzeas' e 'igapós' que se inundan en época de lluvias, sosteniendo la biodiversidad." },
      { titulo: "Serranía de La Macarena", texto: "Cadena montañosa baja compartida con la Orinoquía." },
    ],
    clima: "Ecuatorial húmedo: calor y humedad constantes, sin estaciones marcadas.",
    flora: [
      { nombre: "Selva ecuatorial", icono: "🌴", texto: "Ceiba, caucho, cedro — dosel denso y sombreado." },
      { nombre: "Plantas medicinales", icono: "🌿", texto: "Ayahuasca, sangre de grado, uña de gato, usadas ancestralmente." },
      { nombre: "Endemismo", icono: "🍃", texto: "Se estima que el 60% de las especies vegetales son endémicas de la región." },
    ],
    fauna: [
      { categoria: "Mamíferos", icono: "🐆", items: [
        { nombre: "Jaguar", icono: "🐆" }, { nombre: "Delfín rosado", icono: "🐬" },
        { nombre: "Mono araña", icono: "🐒" }, { nombre: "Nutria gigante", icono: "🦦" },
      ] },
      { categoria: "Aves", icono: "🦜", items: [
        { nombre: "Guacamayo escarlata", icono: "🦜" }, { nombre: "Águila arpía", icono: "🦅" },
        { nombre: "Tucán", icono: "🦜" }, { nombre: "Hoatzin", icono: "🐦" },
      ] },
      { categoria: "Reptiles y peces", icono: "🐍", items: [
        { nombre: "Anaconda verde", icono: "🐍" }, { nombre: "Caimán negro", icono: "🐊" },
        { nombre: "Pirarucú", icono: "🐟" },
      ], nota: "El pirarucú es uno de los peces de agua dulce más grandes del mundo." },
    ],
    gente: "Pueblos tikuna, uitoto, cubeo, desano y tucano, junto a población mestiza y afrodescendiente. Leticia y Mocoa son los centros urbanos principales.",
  },
};

const TABS = [
  { key: "geografia", label: "Geografía" },
  { key: "relieve", label: "Relieve" },
  { key: "flora", label: "Flora" },
  { key: "fauna", label: "Fauna" },
  { key: "gente", label: "Gente" },
];

/* ============================================================
   MAPA — geometría real de los 32 departamentos (DANE 2018),
   proyectada y simplificada, coloreada por región.
   Fuente de geometría: Geoportal DANE (dominio público),
   vía caticoa3/colombia_mapa (topojson→geojson).
   ============================================================ */
const DEPTS = [{"name": "Caquetá", "region": "amazonia", "capital": "Florencia", "cx": 200.8, "cy": 506.1, "d": "M248.8,484.6 L256.7,495.3 L260.2,504.5 L273.7,515.4 L283.2,509.0 L282.6,504.6 L292.0,503.5 L298.1,507.9 L299.9,507.2 L308.3,521.0 L316.4,523.5 L320.7,526.8 L320.3,529.5 L322.9,530.4 L323.2,534.0 L326.0,534.2 L327.0,539.2 L329.7,539.7 L337.7,546.7 L343.4,547.8 L346.6,546.3 L351.8,551.2 L342.3,554.2 L339.1,552.8 L332.5,556.6 L331.1,560.8 L332.2,563.7 L328.9,565.4 L319.0,565.0 L317.2,567.7 L313.7,568.7 L310.0,574.9 L309.5,579.7 L306.3,581.7 L301.3,578.1 L294.5,583.5 L288.0,577.8 L282.3,580.3 L275.2,576.7 L272.2,579.7 L268.1,580.5 L262.7,575.5 L252.7,575.9 L252.2,573.3 L234.3,568.5 L229.6,563.9 L227.6,564.9 L221.8,562.2 L219.2,558.3 L215.5,557.0 L211.1,558.9 L204.1,552.2 L205.9,551.4 L205.2,546.9 L202.7,544.8 L193.0,543.2 L190.1,533.0 L183.1,533.2 L181.4,529.5 L182.6,527.9 L177.0,520.8 L173.4,522.1 L164.2,516.1 L159.0,517.8 L153.2,513.6 L149.7,508.2 L145.0,508.4 L136.7,504.9 L135.7,500.7 L140.0,495.7 L141.4,485.6 L147.2,485.9 L152.8,480.1 L160.0,477.1 L168.6,462.9 L172.4,461.8 L175.0,454.4 L185.8,442.4 L185.2,436.9 L188.5,436.0 L195.8,426.6 L196.7,428.7 L199.9,427.8 L201.7,430.5 L205.6,429.9 L207.0,437.5 L209.1,439.5 L205.1,444.2 L205.5,448.7 L202.5,456.3 L206.4,457.5 L208.9,462.1 L206.7,463.8 L210.3,469.5 L210.2,474.5 L220.5,477.0 L234.5,483.4 L248.8,484.6 Z"}, {"name": "Cauca", "region": "pacifica", "capital": "Popayán", "cx": 111.4, "cy": 461.2, "d": "M146.3,415.4 L144.8,416.5 L147.5,427.6 L156.3,432.1 L159.5,437.1 L155.5,444.0 L156.3,447.2 L154.5,449.6 L149.6,446.3 L147.2,450.7 L143.3,451.6 L143.5,458.3 L139.8,459.4 L135.7,455.8 L132.2,456.4 L130.5,462.4 L125.0,461.9 L123.5,463.3 L123.6,467.9 L121.9,469.1 L123.5,473.7 L132.8,479.4 L132.4,482.2 L138.2,481.5 L141.4,485.6 L140.0,495.7 L135.7,500.7 L136.7,504.9 L145.0,508.4 L139.5,511.8 L130.6,512.6 L124.6,507.7 L125.6,502.1 L122.9,493.1 L118.9,491.8 L109.3,496.0 L109.0,490.1 L113.0,484.5 L108.6,479.6 L95.6,482.6 L91.8,481.4 L93.9,473.9 L97.2,470.0 L91.7,465.8 L92.1,458.4 L86.2,455.7 L85.0,459.6 L74.5,462.2 L70.1,460.4 L66.6,450.3 L66.2,440.4 L74.4,434.2 L77.2,427.8 L76.3,425.0 L81.8,418.1 L87.5,414.1 L91.0,419.0 L92.3,417.6 L95.9,420.4 L101.6,417.1 L108.5,420.1 L109.8,416.4 L114.0,416.1 L119.7,420.8 L125.3,420.5 L129.2,411.0 L138.9,413.2 L140.5,415.3 L146.3,415.4 Z"}, {"name": "Putumayo", "region": "amazonia", "capital": "Mocoa", "cx": 145.9, "cy": 534.2, "d": "M145.0,508.4 L149.7,508.2 L153.2,513.6 L159.0,517.8 L164.2,516.1 L173.4,522.1 L177.0,520.8 L182.6,527.9 L181.4,529.5 L183.1,533.2 L190.1,533.0 L193.0,543.2 L202.7,544.8 L205.2,546.9 L205.9,551.4 L204.1,552.2 L211.1,558.9 L215.5,557.0 L219.2,558.3 L221.8,562.2 L227.6,564.9 L229.6,563.9 L234.3,568.5 L241.1,570.8 L217.6,577.5 L211.3,573.6 L209.6,570.7 L203.2,568.8 L201.0,562.7 L194.6,563.6 L188.5,557.8 L182.8,555.7 L179.7,559.2 L167.1,555.0 L164.4,551.8 L159.8,552.4 L150.6,545.1 L148.2,541.0 L135.3,535.2 L134.3,537.2 L131.1,537.5 L131.1,543.4 L123.7,544.3 L117.3,541.4 L112.4,543.5 L102.5,541.4 L100.4,527.9 L97.9,526.7 L100.9,515.1 L104.7,511.1 L102.3,508.2 L102.1,503.0 L106.7,501.3 L109.3,496.0 L118.9,491.8 L122.9,493.1 L125.6,502.1 L124.6,507.7 L130.6,512.6 L139.5,511.8 L145.0,508.4 Z"}, {"name": "Valle del Cauca", "region": "pacifica", "capital": "Cali", "cx": 143.3, "cy": 379.1, "d": "M160.9,351.5 L161.2,353.9 L156.2,353.7 L154.4,356.0 L153.5,363.6 L157.1,365.1 L157.8,369.5 L155.5,377.8 L159.3,378.8 L149.0,398.9 L146.0,409.8 L146.3,415.4 L140.5,415.3 L138.9,413.2 L129.2,411.0 L125.3,420.5 L119.7,420.8 L114.0,416.1 L109.8,416.4 L108.5,420.1 L101.6,417.1 L95.9,420.4 L92.3,417.6 L91.0,419.0 L87.5,414.1 L82.3,415.1 L91.5,405.8 L90.2,404.3 L93.0,400.6 L96.1,400.0 L98.0,396.9 L98.2,389.3 L93.8,388.9 L92.3,384.3 L96.8,381.7 L95.5,378.5 L90.5,385.3 L86.6,380.5 L90.8,373.6 L92.8,375.0 L99.1,374.3 L103.8,378.1 L106.1,376.9 L109.5,378.0 L111.6,380.7 L119.5,383.6 L123.5,382.4 L127.3,379.4 L129.6,374.6 L124.6,366.3 L132.2,361.5 L136.5,351.6 L135.3,349.9 L142.5,346.2 L145.4,337.2 L151.4,347.4 L157.6,351.3 L160.9,351.5 Z"}, {"name": "Guainía", "region": "amazonia", "capital": "Puerto Inírida", "cx": 441.0, "cy": 442.9, "d": "M412.1,480.2 L403.1,477.5 L397.7,472.8 L400.5,468.0 L401.1,462.9 L405.6,458.3 L402.4,455.4 L397.3,458.0 L394.7,456.6 L392.2,459.0 L387.2,456.4 L384.2,457.9 L378.5,454.5 L372.7,444.8 L366.2,443.9 L365.1,441.9 L390.4,431.0 L390.2,429.2 L393.5,427.8 L394.5,423.4 L393.3,419.5 L394.9,417.5 L400.0,416.3 L398.7,412.9 L400.6,408.5 L404.0,407.1 L405.5,409.0 L410.9,406.5 L410.9,402.0 L415.1,400.8 L418.7,401.7 L423.5,399.1 L424.3,395.9 L434.5,395.2 L445.9,397.6 L447.7,395.8 L471.6,389.1 L473.0,385.3 L476.2,385.4 L477.6,383.1 L489.2,381.6 L496.2,385.7 L503.5,380.2 L507.6,392.6 L512.4,392.1 L516.6,404.4 L520.5,408.1 L519.5,410.7 L496.9,430.8 L498.7,432.5 L507.3,433.0 L509.5,439.3 L513.0,439.3 L525.8,452.9 L524.4,457.2 L526.9,462.2 L528.9,462.2 L528.6,468.8 L530.8,470.8 L537.6,492.5 L540.0,495.0 L539.9,501.1 L530.0,503.7 L529.5,499.7 L527.2,497.2 L530.6,494.8 L529.0,485.3 L527.7,484.9 L528.1,476.7 L524.1,471.7 L520.9,472.2 L519.0,468.6 L519.7,461.7 L518.0,458.7 L508.7,462.7 L508.1,466.1 L500.7,467.4 L496.0,472.5 L495.0,476.3 L482.3,468.5 L478.9,475.0 L484.0,479.6 L431.4,479.7 L425.4,477.5 L412.1,480.2 Z"}, {"name": "Vichada", "region": "orinoquia", "capital": "Puerto Carreño", "cx": 428.6, "cy": 351.6, "d": "M503.5,380.2 L496.2,385.7 L489.2,381.6 L477.6,383.1 L476.2,385.4 L473.0,385.3 L471.6,389.1 L447.7,395.8 L445.9,397.6 L434.5,395.2 L424.3,395.9 L423.5,399.1 L418.7,401.7 L415.1,400.8 L410.9,402.0 L410.9,406.5 L405.5,409.0 L404.0,407.1 L400.6,408.5 L398.7,412.9 L400.0,416.3 L394.9,417.5 L393.3,419.5 L394.5,423.4 L393.5,427.8 L384.0,434.1 L380.5,431.9 L374.6,435.8 L370.3,433.0 L365.4,434.1 L364.4,431.8 L359.4,430.1 L359.3,343.5 L365.1,333.8 L368.4,333.1 L375.8,327.1 L376.4,323.6 L390.1,314.0 L394.2,315.0 L398.9,313.4 L412.5,294.6 L425.3,294.4 L433.5,290.1 L435.0,292.4 L438.1,292.9 L446.4,286.8 L463.5,290.8 L465.5,289.3 L478.4,289.2 L487.0,286.4 L489.9,287.9 L498.1,282.7 L507.5,284.0 L514.3,288.2 L512.7,290.8 L516.2,295.8 L508.6,303.2 L506.8,307.8 L508.2,315.8 L507.1,318.8 L497.5,326.2 L498.6,328.6 L497.3,333.3 L499.3,336.8 L497.1,359.6 L500.0,362.1 L501.1,366.6 L499.3,368.6 L499.7,372.3 L503.5,380.2 Z"}, {"name": "Casanare", "region": "orinoquia", "capital": "Yopal", "cx": 334.0, "cy": 325.6, "d": "M412.5,294.6 L398.9,313.4 L394.2,315.0 L390.1,314.0 L376.4,323.6 L375.8,327.1 L368.4,333.1 L365.1,333.8 L359.3,343.5 L331.2,357.5 L327.8,357.5 L319.9,365.7 L313.1,363.2 L306.9,364.7 L302.5,368.5 L286.9,367.9 L276.3,354.9 L273.8,347.3 L276.4,339.1 L278.3,340.1 L281.2,336.3 L278.2,333.0 L282.2,324.2 L285.1,322.8 L290.4,327.1 L302.9,314.8 L307.0,317.5 L307.6,313.2 L310.2,310.6 L306.6,305.2 L300.2,302.7 L305.9,299.1 L302.2,288.2 L304.0,282.6 L305.4,281.5 L304.2,283.1 L305.1,286.6 L307.3,287.5 L308.0,290.5 L313.9,293.5 L321.5,289.1 L341.8,287.7 L353.3,283.5 L363.3,286.5 L371.8,285.5 L374.5,287.0 L382.7,286.4 L389.2,283.3 L400.3,285.3 L412.5,294.6 Z"}, {"name": "Amazonas", "region": "amazonia", "capital": "Leticia", "cx": 348.8, "cy": 644.0, "d": "M429.7,599.6 L431.3,602.5 L429.9,606.7 L431.2,612.4 L408.3,734.8 L401.6,728.1 L397.9,726.9 L397.6,722.3 L393.5,717.9 L390.3,716.8 L384.7,720.1 L374.9,716.6 L402.8,672.1 L402.2,668.1 L396.1,667.7 L394.3,663.4 L389.4,660.9 L386.7,662.1 L383.9,660.1 L378.5,660.1 L377.1,655.0 L369.5,652.0 L368.3,649.3 L365.4,650.6 L363.5,648.7 L361.1,651.4 L357.0,651.9 L357.2,654.1 L354.4,656.0 L352.8,654.5 L349.1,655.9 L345.6,655.0 L343.4,651.8 L335.7,648.6 L331.3,649.2 L331.9,646.6 L327.0,648.0 L323.5,655.3 L317.8,654.1 L314.7,656.9 L304.2,660.7 L302.7,658.2 L297.4,657.7 L292.8,655.0 L290.2,659.0 L287.2,656.7 L281.1,658.6 L277.8,654.3 L274.8,655.3 L270.4,650.7 L273.0,641.5 L272.4,634.6 L268.1,629.2 L262.7,631.1 L253.9,626.6 L257.2,621.9 L250.0,608.3 L239.9,606.3 L238.4,602.2 L222.5,595.8 L222.8,589.2 L218.1,581.2 L217.6,577.5 L241.1,570.8 L252.2,573.3 L252.7,575.9 L262.7,575.5 L268.1,580.5 L272.2,579.7 L275.2,576.7 L282.3,580.3 L288.0,577.8 L294.5,583.5 L301.3,578.1 L306.3,581.7 L309.5,579.7 L310.0,574.9 L313.7,568.7 L317.2,567.7 L319.0,565.0 L328.9,565.4 L332.2,563.7 L331.1,560.8 L332.5,556.6 L339.1,552.8 L342.3,554.2 L351.0,552.2 L354.8,549.6 L356.8,553.4 L362.7,553.9 L367.1,558.2 L365.0,560.6 L367.6,562.8 L370.1,569.4 L373.8,566.1 L377.0,568.8 L378.2,567.5 L383.3,569.2 L386.8,574.2 L394.0,571.7 L395.0,573.9 L391.7,577.3 L394.2,578.7 L394.7,585.7 L393.0,588.4 L395.8,592.2 L392.5,595.7 L397.8,600.9 L400.0,601.4 L403.5,595.8 L407.1,595.3 L408.2,600.8 L412.3,597.9 L418.1,598.7 L419.1,605.4 L422.9,602.9 L424.0,604.9 L427.6,605.8 L429.7,599.6 Z"}, {"name": "Vaupés", "region": "amazonia", "capital": "Mitú", "cx": 364.9, "cy": 536.7, "d": "M400.8,464.5 L397.7,472.8 L403.1,477.5 L412.1,480.2 L412.0,507.5 L416.4,506.0 L419.4,507.8 L434.5,507.1 L439.7,511.0 L442.2,524.1 L439.7,527.3 L432.9,527.3 L427.6,522.2 L421.1,526.4 L418.8,525.3 L417.3,527.3 L408.2,530.0 L403.5,529.6 L402.6,560.8 L409.7,568.2 L422.1,575.2 L423.8,580.9 L422.1,586.6 L429.8,597.3 L427.6,605.8 L424.0,604.9 L422.9,602.9 L419.1,605.4 L418.1,598.7 L412.3,597.9 L408.2,600.8 L407.1,595.3 L403.5,595.8 L400.0,601.4 L397.8,600.9 L392.5,595.7 L395.8,592.2 L393.0,588.4 L394.7,585.7 L394.2,578.7 L391.7,577.3 L395.0,573.9 L394.0,571.7 L386.8,574.2 L383.3,569.2 L378.2,567.5 L377.0,568.8 L373.8,566.1 L370.1,569.4 L367.6,562.8 L365.0,560.6 L367.1,558.2 L362.7,553.9 L356.8,553.4 L354.8,549.6 L349.9,550.5 L346.6,546.3 L343.4,547.8 L337.7,546.7 L329.7,539.7 L327.0,539.2 L326.0,534.2 L323.2,534.0 L322.9,530.4 L320.3,529.5 L320.7,526.8 L318.5,525.3 L331.0,511.5 L335.2,511.1 L338.1,507.3 L339.3,499.3 L346.0,485.2 L345.4,479.8 L351.6,482.2 L355.6,478.4 L363.1,475.5 L367.2,471.4 L375.3,471.9 L384.6,470.1 L386.6,468.2 L397.4,466.9 L400.8,464.5 Z"}, {"name": "Guaviare", "region": "amazonia", "capital": "San José del Guaviare", "cx": 304.1, "cy": 476.9, "d": "M348.6,429.6 L364.4,431.8 L365.4,434.1 L370.3,433.0 L374.6,435.8 L380.5,431.9 L384.0,434.1 L365.1,441.9 L366.2,443.9 L372.7,444.8 L378.5,454.5 L384.2,457.9 L387.2,456.4 L392.2,459.0 L394.7,456.6 L397.3,458.0 L402.4,455.4 L405.6,458.3 L397.4,466.9 L386.6,468.2 L384.6,470.1 L375.3,471.9 L367.2,471.4 L363.1,475.5 L355.6,478.4 L351.6,482.2 L345.4,479.8 L346.0,485.2 L339.3,499.3 L338.1,507.3 L335.2,511.1 L331.0,511.5 L318.5,525.3 L308.3,521.0 L299.9,507.2 L298.1,507.9 L292.0,503.5 L282.6,504.6 L283.2,509.0 L273.7,515.4 L260.2,504.5 L256.7,495.3 L248.9,486.1 L248.8,455.3 L250.0,452.8 L258.3,451.5 L264.3,453.5 L266.8,451.2 L270.5,452.2 L276.5,449.3 L280.4,443.9 L284.9,441.6 L288.4,443.4 L289.9,441.3 L294.2,441.6 L295.8,438.7 L299.1,438.5 L299.8,436.5 L303.2,436.3 L311.1,431.1 L315.0,430.4 L317.9,432.8 L330.9,430.0 L334.7,432.7 L342.6,429.6 L346.0,431.7 L348.6,429.6 Z"}, {"name": "Caldas", "region": "andina", "capital": "Manizales", "cx": 176.6, "cy": 327.0, "d": "M205.8,306.3 L207.4,309.3 L205.7,321.8 L202.8,326.9 L194.1,325.8 L189.1,327.4 L186.5,332.3 L179.2,333.3 L176.7,335.7 L177.6,345.0 L175.4,347.7 L173.2,347.1 L170.8,342.8 L160.9,341.1 L159.5,337.2 L156.6,342.7 L153.4,340.9 L152.2,335.8 L157.2,330.7 L157.1,327.2 L161.8,328.3 L163.8,326.0 L159.8,322.2 L154.7,323.0 L154.3,318.2 L160.2,315.0 L162.0,317.0 L167.1,316.8 L165.8,307.6 L171.0,310.7 L175.3,310.3 L179.7,321.3 L182.0,317.6 L187.6,314.1 L187.2,311.6 L191.8,308.5 L197.2,307.2 L202.6,309.2 L203.7,306.2 L205.8,306.3 Z"}, {"name": "Quindío", "region": "andina", "capital": "Armenia", "cx": 160.9, "cy": 364.4, "d": "M174.9,351.4 L173.7,355.4 L169.5,358.3 L166.7,362.7 L166.1,368.4 L161.7,376.5 L159.3,378.8 L155.5,377.8 L157.8,369.5 L157.1,365.1 L153.5,363.6 L154.4,356.0 L156.2,353.7 L161.2,353.9 L160.9,351.5 L170.4,353.5 L174.9,351.4 Z"}, {"name": "Risaralda", "region": "andina", "capital": "Pereira", "cx": 149.6, "cy": 334.6, "d": "M154.3,318.2 L154.7,323.0 L159.8,322.2 L163.8,326.0 L161.8,328.3 L157.1,327.2 L157.2,330.7 L152.2,335.8 L153.4,340.9 L156.6,342.7 L159.5,337.2 L160.9,341.1 L170.8,342.8 L173.2,347.1 L175.4,347.7 L174.9,351.4 L170.4,353.5 L157.6,351.3 L149.2,344.6 L145.4,337.2 L146.1,333.4 L143.4,331.8 L140.1,325.4 L140.5,322.2 L144.9,320.1 L145.0,316.3 L148.3,314.9 L149.4,317.0 L154.3,318.2 Z"}, {"name": "Antioquia", "region": "andina", "capital": "Medellín", "cx": 172.6, "cy": 248.3, "d": "M198.7,201.9 L200.7,204.9 L208.4,208.9 L212.1,214.7 L212.5,222.3 L208.6,233.6 L213.3,238.7 L216.6,236.3 L216.6,233.7 L220.6,234.5 L217.2,238.5 L216.7,244.7 L220.5,252.6 L223.7,253.3 L237.9,240.8 L236.9,245.6 L239.1,250.4 L238.7,254.0 L233.8,257.1 L229.3,263.5 L216.8,271.2 L217.3,276.9 L208.1,290.9 L210.2,293.0 L210.2,296.2 L208.1,297.8 L209.0,300.8 L202.6,309.2 L197.2,307.2 L191.8,308.5 L187.2,311.6 L187.6,314.1 L182.0,317.6 L179.7,321.3 L175.3,310.3 L171.0,310.7 L165.8,307.6 L167.1,316.8 L162.0,317.0 L160.2,315.0 L154.3,318.2 L149.4,317.0 L148.4,312.5 L144.9,309.7 L146.0,308.0 L144.5,302.8 L146.3,300.8 L144.2,295.5 L141.9,296.2 L140.5,293.8 L139.7,288.4 L118.0,289.0 L114.9,282.7 L115.4,275.3 L110.2,271.4 L107.9,267.3 L107.1,262.1 L114.7,259.2 L113.4,253.2 L119.7,252.1 L125.2,253.4 L127.3,246.2 L126.0,242.5 L122.4,240.0 L120.4,234.2 L114.4,228.9 L108.6,228.4 L100.6,219.5 L104.8,215.2 L106.0,209.7 L108.5,207.6 L106.8,199.5 L109.1,209.4 L109.2,214.1 L116.7,213.8 L116.2,193.7 L113.4,189.2 L109.0,187.3 L110.8,183.8 L120.9,181.7 L121.7,179.2 L131.0,173.0 L134.2,183.0 L137.3,183.1 L139.7,188.0 L139.0,194.2 L130.3,208.0 L131.1,210.2 L128.1,218.2 L127.6,230.2 L132.4,236.6 L155.3,238.5 L159.7,227.1 L165.6,228.3 L182.0,207.7 L194.6,207.3 L198.7,201.9 Z"}, {"name": "Chocó", "region": "pacifica", "capital": "Quibdó", "cx": 102.4, "cy": 284.6, "d": "M106.8,199.5 L108.5,207.6 L106.0,209.7 L104.8,215.2 L100.6,219.5 L108.6,228.4 L114.4,228.9 L120.4,234.2 L122.4,240.0 L126.0,242.5 L127.3,246.2 L125.2,253.4 L119.7,252.1 L113.4,253.2 L114.7,259.2 L107.1,262.1 L107.9,267.3 L110.2,271.4 L115.4,275.3 L114.9,282.7 L118.0,289.0 L139.7,288.4 L140.5,293.8 L141.9,296.2 L144.2,295.5 L146.3,300.8 L144.5,302.8 L146.0,308.0 L144.9,309.7 L148.4,312.5 L148.3,314.9 L145.0,316.3 L144.9,320.1 L140.5,322.2 L140.1,325.4 L143.4,331.8 L146.1,333.4 L144.9,341.5 L142.5,346.2 L135.3,349.9 L136.5,351.6 L132.2,361.5 L124.6,366.3 L129.6,374.6 L127.3,379.4 L119.5,383.6 L111.6,380.7 L109.5,378.0 L106.1,376.9 L103.8,378.1 L99.1,374.3 L92.8,375.0 L90.8,373.6 L86.6,380.5 L83.4,376.7 L83.4,371.1 L90.7,364.3 L91.9,357.7 L92.5,348.9 L89.8,341.0 L89.2,320.2 L85.7,318.2 L82.8,318.6 L84.3,314.1 L91.4,312.6 L94.6,308.5 L94.9,305.2 L91.5,296.3 L85.2,288.0 L88.4,286.5 L92.0,272.8 L86.7,266.0 L83.8,268.1 L81.5,262.2 L75.5,258.6 L77.5,253.4 L68.1,244.0 L72.0,233.6 L75.8,231.5 L74.1,224.3 L78.2,225.4 L81.6,231.6 L92.5,214.9 L98.2,214.1 L94.7,201.4 L91.6,198.7 L89.4,191.6 L86.6,189.1 L91.1,182.8 L95.3,190.3 L100.4,192.9 L104.3,199.6 L106.8,199.5 Z"}, {"name": "Nariño", "region": "pacifica", "capital": "Pasto", "cx": 67.7, "cy": 487.3, "d": "M66.2,440.4 L66.6,450.3 L70.1,460.4 L74.5,462.2 L85.0,459.6 L86.2,455.7 L92.1,458.4 L91.7,465.8 L97.2,470.0 L93.9,473.9 L91.8,481.4 L95.6,482.6 L108.6,479.6 L113.0,484.5 L109.0,490.1 L109.3,496.0 L106.7,501.3 L102.1,503.0 L102.3,508.2 L104.7,511.1 L100.9,515.1 L97.9,526.7 L100.4,527.9 L102.0,535.5 L101.0,537.8 L93.2,538.1 L83.5,535.9 L85.1,525.6 L81.8,525.8 L76.1,521.4 L77.5,518.9 L75.4,517.2 L68.8,519.4 L64.6,518.4 L54.7,513.0 L49.7,502.7 L45.2,504.0 L39.8,500.4 L36.5,500.1 L20.0,482.6 L28.4,475.3 L32.4,477.8 L37.3,476.8 L40.0,474.1 L37.4,472.2 L38.0,469.1 L34.4,466.6 L32.6,460.9 L39.5,446.8 L48.8,439.8 L57.0,438.7 L60.0,441.7 L61.6,440.1 L66.2,440.4 Z"}, {"name": "Córdoba", "region": "caribe", "capital": "Montería", "cx": 168.4, "cy": 193.8, "d": "M161.5,149.9 L167.1,155.6 L171.9,157.4 L172.4,161.6 L174.7,160.8 L182.5,165.4 L184.3,169.6 L175.9,174.9 L177.4,186.4 L182.3,190.2 L183.6,193.5 L186.0,190.4 L194.7,189.1 L200.8,198.6 L194.6,207.3 L182.0,207.7 L165.6,228.3 L159.7,227.1 L155.3,238.5 L132.4,236.6 L127.6,230.2 L128.1,218.2 L131.1,210.2 L130.3,208.0 L139.0,194.2 L139.7,188.0 L137.3,183.1 L134.2,183.0 L131.0,173.0 L137.3,167.7 L140.6,162.6 L141.4,157.7 L145.2,153.2 L149.6,151.5 L150.9,148.5 L157.9,150.7 L161.5,149.9 Z"}, {"name": "Bolívar", "region": "caribe", "capital": "Cartagena de Indias", "cx": 224.1, "cy": 170.9, "d": "M181.9,90.6 L181.1,102.4 L186.1,107.6 L188.0,107.0 L193.0,110.7 L195.3,113.8 L193.8,119.2 L200.6,124.3 L196.9,127.5 L196.9,131.2 L199.4,133.9 L201.2,141.7 L199.8,143.9 L202.7,149.5 L204.4,149.3 L212.3,157.6 L215.5,155.8 L217.0,158.4 L219.6,157.7 L223.6,160.6 L229.8,166.7 L234.1,166.3 L239.8,169.3 L240.0,172.5 L243.0,175.4 L242.0,182.1 L245.1,190.5 L243.9,204.3 L240.0,207.5 L242.9,225.2 L237.8,233.1 L237.9,240.8 L223.7,253.3 L220.5,252.6 L216.7,244.7 L217.2,238.5 L220.6,234.5 L216.6,233.7 L216.6,236.3 L213.3,238.7 L208.6,233.6 L212.5,222.3 L212.1,214.7 L208.4,208.9 L200.7,204.9 L198.7,201.9 L200.8,198.6 L206.5,197.0 L211.2,192.2 L208.2,179.2 L211.2,176.0 L206.9,168.6 L198.9,165.0 L195.7,160.6 L194.0,152.5 L195.2,149.8 L190.1,147.6 L185.8,142.0 L179.5,138.2 L177.6,140.8 L175.4,139.4 L177.1,132.7 L171.5,128.6 L170.5,123.1 L166.9,121.0 L169.0,117.3 L167.4,113.1 L169.9,111.8 L169.6,100.1 L174.5,95.5 L179.7,94.0 L181.9,90.6 Z"}, {"name": "Cesar", "region": "caribe", "capital": "Valledupar", "cx": 249.3, "cy": 157.4, "d": "M281.3,106.0 L280.8,119.8 L277.1,128.0 L278.3,130.9 L273.5,143.7 L269.5,146.1 L258.7,163.2 L257.9,173.5 L259.5,177.0 L253.4,184.5 L256.8,191.3 L255.0,193.5 L257.5,195.0 L260.2,194.3 L262.1,196.2 L258.6,204.5 L260.9,206.0 L261.4,209.5 L265.2,211.1 L265.1,213.3 L262.0,215.1 L262.0,219.3 L256.5,224.4 L250.0,221.3 L244.8,221.2 L248.4,215.1 L244.4,207.8 L245.1,190.5 L242.0,182.1 L243.0,175.4 L240.0,172.5 L242.9,165.1 L238.9,160.1 L235.9,159.5 L236.7,155.2 L234.7,154.0 L235.2,150.9 L228.4,146.3 L232.7,142.2 L242.7,140.3 L241.0,133.4 L230.7,121.7 L231.5,117.5 L238.9,107.9 L243.7,107.7 L248.8,105.1 L253.5,92.5 L251.4,88.8 L256.5,87.5 L264.6,87.7 L266.1,89.2 L265.8,93.3 L273.8,97.4 L272.8,101.0 L269.6,104.1 L271.6,107.6 L281.3,106.0 Z"}, {"name": "La Guajira", "region": "caribe", "capital": "Riohacha", "cx": 296.2, "cy": 61.8, "d": "M281.3,106.0 L271.6,107.6 L269.6,104.1 L272.8,101.0 L273.8,97.4 L265.8,93.3 L266.1,89.2 L264.6,87.7 L251.4,88.8 L248.6,82.2 L252.4,70.6 L265.3,69.5 L288.9,51.7 L309.7,43.8 L313.9,34.4 L313.7,28.6 L321.4,27.9 L320.1,30.9 L321.6,32.4 L325.8,29.8 L323.0,26.1 L325.8,23.6 L328.2,25.8 L336.0,20.0 L350.6,24.1 L357.7,35.2 L356.9,38.8 L346.5,47.0 L321.1,54.0 L309.3,75.6 L304.9,75.3 L299.1,77.5 L281.3,106.0 Z"}, {"name": "Magdalena", "region": "caribe", "capital": "Santa Marta", "cx": 212.7, "cy": 118.4, "d": "M252.4,70.6 L248.6,82.2 L253.5,92.5 L251.7,94.5 L251.4,100.0 L248.8,105.1 L243.7,107.7 L238.9,107.9 L236.3,110.1 L231.5,117.5 L230.7,121.7 L241.0,133.4 L242.7,140.3 L232.7,142.2 L228.4,146.3 L235.2,150.9 L234.7,154.0 L236.7,155.2 L235.9,159.5 L238.9,160.1 L242.9,165.1 L239.9,170.3 L234.1,166.3 L229.8,166.7 L219.6,157.7 L217.0,158.4 L215.5,155.8 L212.3,157.6 L204.4,149.3 L202.7,149.5 L199.8,143.9 L201.2,141.7 L199.4,133.9 L196.9,131.2 L196.9,127.5 L200.6,124.3 L193.8,119.2 L199.6,104.3 L202.8,101.0 L203.4,85.9 L197.8,77.3 L208.6,81.4 L219.0,82.8 L224.9,79.0 L224.1,72.3 L228.0,67.4 L235.2,67.2 L240.4,70.0 L252.4,70.6 Z"}, {"name": "Sucre", "region": "caribe", "capital": "Sincelejo", "cx": 183.7, "cy": 159.0, "d": "M200.8,198.6 L194.7,189.1 L186.0,190.4 L183.6,193.5 L182.3,190.2 L177.4,186.4 L175.9,174.9 L184.3,169.6 L182.5,165.4 L174.7,160.8 L172.4,161.6 L171.9,157.4 L167.1,155.6 L161.5,149.9 L164.3,149.2 L166.0,146.6 L167.1,141.1 L163.9,135.1 L166.9,121.0 L170.5,123.1 L171.5,128.6 L177.1,132.7 L175.4,139.4 L177.6,140.8 L179.5,138.2 L185.8,142.0 L190.1,147.6 L195.2,149.8 L194.0,152.5 L195.7,160.6 L198.9,165.0 L206.9,168.6 L211.2,176.0 L208.2,179.2 L211.2,192.2 L206.5,197.0 L200.8,198.6 Z"}, {"name": "Arauca", "region": "orinoquia", "capital": "Arauca", "cx": 363.5, "cy": 269.3, "d": "M429.9,291.7 L425.3,294.4 L412.5,294.6 L396.9,283.7 L389.2,283.3 L382.7,286.4 L374.5,287.0 L371.8,285.5 L363.3,286.5 L353.3,283.5 L341.8,287.7 L321.5,289.1 L313.9,293.5 L308.0,290.5 L304.2,283.1 L308.7,277.3 L313.9,274.3 L315.6,264.3 L317.7,263.4 L322.1,252.9 L326.9,252.3 L327.9,250.7 L346.4,252.7 L357.2,252.0 L357.9,253.8 L361.7,254.5 L367.1,250.9 L375.6,249.4 L382.0,250.2 L383.9,253.1 L387.0,253.1 L391.6,256.2 L400.4,254.3 L429.9,291.7 Z"}, {"name": "Boyacá", "region": "andina", "capital": "Tunja", "cx": 284.9, "cy": 302.4, "d": "M311.3,251.7 L322.1,252.9 L317.7,263.4 L315.6,264.3 L313.9,274.3 L304.0,282.6 L302.2,288.2 L305.9,299.1 L300.2,302.7 L306.6,305.2 L310.2,310.6 L307.6,313.2 L307.0,317.5 L302.9,314.8 L290.4,327.1 L285.1,322.8 L282.2,324.2 L278.2,333.0 L281.2,336.3 L278.3,340.1 L276.4,339.1 L273.8,347.3 L274.8,350.5 L272.7,353.8 L267.5,353.0 L267.5,350.7 L264.0,350.7 L259.9,344.4 L254.8,344.4 L253.6,342.5 L256.5,336.5 L254.3,327.3 L250.6,321.8 L242.1,315.5 L234.7,323.1 L228.1,320.0 L221.0,312.6 L222.0,307.2 L220.0,303.7 L215.8,306.7 L211.6,305.3 L206.0,307.0 L207.0,302.1 L209.0,300.8 L208.1,297.8 L210.2,296.2 L210.2,293.0 L208.1,290.9 L211.7,284.6 L214.9,292.1 L218.1,294.6 L222.0,292.8 L226.6,300.2 L233.2,304.6 L234.4,307.4 L240.2,308.7 L246.6,305.9 L249.7,308.1 L251.4,301.9 L250.1,300.8 L255.8,291.7 L261.2,296.1 L256.8,304.2 L260.4,307.0 L262.3,303.1 L269.2,302.8 L267.7,300.0 L268.5,296.2 L271.5,298.1 L288.0,286.2 L288.4,275.3 L291.6,277.3 L296.8,275.4 L296.5,272.0 L299.1,268.1 L298.3,257.3 L303.1,258.9 L307.4,253.7 L310.4,254.0 L311.3,251.7 Z"}, {"name": "Cundinamarca", "region": "andina", "capital": "Bogotá, D.C.", "cx": 248.5, "cy": 349.4, "d": "M274.8,350.5 L271.8,371.0 L261.9,368.3 L256.8,370.3 L253.5,368.9 L251.3,362.6 L252.8,359.5 L250.5,358.0 L242.5,364.0 L245.2,370.7 L244.8,373.9 L242.2,373.5 L227.8,381.9 L229.6,374.9 L227.8,371.1 L230.1,367.3 L229.3,364.8 L234.1,358.1 L233.9,346.9 L232.1,346.4 L226.9,351.6 L223.8,377.7 L220.4,376.7 L218.6,380.6 L218.9,385.8 L215.5,393.7 L215.2,390.7 L211.4,388.9 L211.5,380.7 L213.9,377.3 L213.6,374.6 L210.2,370.5 L206.9,373.1 L204.2,373.0 L199.5,369.5 L196.7,370.7 L200.6,360.3 L199.4,350.6 L202.5,348.2 L202.8,326.9 L205.7,321.8 L207.4,309.3 L206.0,307.0 L211.6,305.3 L215.8,306.7 L220.0,303.7 L222.0,307.2 L221.0,312.6 L228.1,320.0 L234.7,323.1 L242.1,315.5 L250.6,321.8 L254.3,327.3 L256.5,336.5 L253.6,342.5 L254.8,344.4 L259.9,344.4 L264.0,350.7 L267.5,350.7 L267.5,353.0 L272.7,353.8 L274.8,350.5 Z"}, {"name": "Norte de Santander", "region": "andina", "capital": "Cúcuta", "cx": 283.0, "cy": 207.4, "d": "M317.8,251.8 L311.3,251.7 L310.4,254.0 L307.4,253.7 L303.1,258.9 L298.3,257.3 L296.2,254.0 L289.0,253.2 L283.1,246.8 L283.9,237.9 L277.4,227.8 L267.7,226.3 L266.5,229.5 L261.9,230.1 L255.4,227.9 L250.0,221.3 L256.5,224.4 L259.5,222.7 L262.0,219.3 L262.0,215.1 L265.1,213.3 L265.2,211.1 L261.4,209.5 L260.9,206.0 L258.6,204.5 L262.1,196.2 L260.2,194.3 L257.5,195.0 L255.0,193.5 L256.8,191.3 L253.4,184.5 L259.5,177.0 L257.9,173.5 L258.7,163.2 L261.3,160.2 L269.5,160.0 L276.7,155.1 L279.9,164.1 L282.1,162.0 L287.1,163.3 L291.8,184.1 L303.2,195.5 L304.7,203.8 L305.0,208.9 L299.0,212.8 L300.9,216.5 L299.4,232.0 L301.7,236.2 L311.4,236.8 L313.3,239.3 L312.6,242.6 L317.8,251.8 Z"}, {"name": "Bogotá, D.C.", "region": "andina", "capital": "Capital de Colombia", "cx": 226.9, "cy": 369.2, "d": "M227.8,381.9 L224.5,382.4 L215.5,393.7 L218.9,385.8 L218.6,380.6 L220.4,376.7 L223.8,377.7 L226.9,351.6 L232.1,346.4 L233.9,346.9 L234.1,358.1 L229.3,364.8 L230.1,367.3 L227.8,371.1 L229.6,374.9 L227.8,381.9 Z"}, {"name": "Meta", "region": "orinoquia", "capital": "Villavicencio", "cx": 282.2, "cy": 415.8, "d": "M359.3,343.5 L359.4,430.1 L348.6,429.6 L346.0,431.7 L342.6,429.6 L334.7,432.7 L330.9,430.0 L317.9,432.8 L315.0,430.4 L311.1,431.1 L303.2,436.3 L299.8,436.5 L299.1,438.5 L295.8,438.7 L294.2,441.6 L289.9,441.3 L288.4,443.4 L284.9,441.6 L280.4,443.9 L276.5,449.3 L270.5,452.2 L266.8,451.2 L264.3,453.5 L258.3,451.5 L250.0,452.8 L248.8,455.3 L248.8,484.6 L234.5,483.4 L220.5,477.0 L210.2,474.5 L210.3,469.5 L206.7,463.8 L208.9,462.1 L206.4,457.5 L202.5,456.3 L205.5,448.7 L205.1,444.2 L209.1,439.5 L207.0,437.5 L205.6,429.9 L201.7,430.5 L199.9,427.8 L196.7,428.7 L195.8,426.6 L202.2,420.4 L207.9,411.2 L207.9,405.3 L224.5,382.4 L230.0,381.6 L234.1,377.4 L236.2,377.8 L242.2,373.5 L244.8,373.9 L245.2,370.7 L242.5,364.0 L245.9,360.6 L250.5,358.0 L252.8,359.5 L251.3,362.6 L253.5,368.9 L256.8,370.3 L261.9,368.3 L271.8,371.0 L274.8,350.5 L276.3,354.9 L286.9,367.9 L302.5,368.5 L306.9,364.7 L313.1,363.2 L319.9,365.7 L327.8,357.5 L331.2,357.5 L359.3,343.5 Z"}, {"name": "Huila", "region": "andina", "capital": "Neiva", "cx": 171.7, "cy": 439.7, "d": "M215.5,393.7 L216.5,393.3 L207.9,405.3 L207.9,411.2 L202.2,420.4 L188.5,436.0 L185.2,436.9 L185.8,442.4 L175.0,454.4 L172.4,461.8 L168.6,462.9 L160.0,477.1 L152.8,480.1 L147.2,485.9 L143.4,486.5 L138.2,481.5 L132.4,482.2 L132.8,479.4 L123.5,473.7 L121.9,469.1 L125.0,461.9 L130.5,462.4 L132.2,456.4 L135.7,455.8 L139.8,459.4 L143.5,458.3 L143.3,451.6 L147.2,450.7 L149.6,446.3 L154.5,449.6 L156.3,447.2 L155.5,444.0 L159.5,437.1 L156.3,432.1 L147.5,427.6 L154.7,430.5 L164.6,424.9 L166.8,415.6 L171.0,409.5 L173.2,409.9 L175.8,407.6 L189.5,406.5 L189.9,412.7 L195.4,412.6 L201.5,406.1 L201.1,402.5 L210.4,392.1 L211.4,388.9 L215.2,390.7 L215.5,393.7 Z"}, {"name": "Santander", "region": "andina", "capital": "Bucaramanga", "cx": 266.7, "cy": 255.6, "d": "M250.0,221.3 L255.4,227.9 L261.9,230.1 L266.5,229.5 L267.7,226.3 L277.4,227.8 L283.9,237.9 L283.1,246.8 L286.2,251.3 L296.2,254.0 L298.3,257.3 L299.1,268.1 L296.5,272.0 L296.8,275.4 L291.6,277.3 L288.4,275.3 L288.0,286.2 L271.5,298.1 L268.5,296.2 L267.7,300.0 L269.2,302.8 L262.3,303.1 L260.4,307.0 L256.8,304.2 L261.2,296.1 L255.8,291.7 L250.1,300.8 L251.4,301.9 L249.7,308.1 L246.6,305.9 L240.2,308.7 L234.4,307.4 L233.2,304.6 L226.6,300.2 L222.0,292.8 L218.1,294.6 L214.9,292.1 L211.7,284.6 L215.0,282.1 L217.3,276.9 L216.8,271.2 L229.3,263.5 L233.8,257.1 L238.7,254.0 L239.1,250.4 L236.9,245.6 L238.8,234.9 L237.8,233.1 L242.9,225.2 L240.0,207.5 L243.9,204.3 L248.4,215.1 L244.8,221.2 L250.0,221.3 Z"}, {"name": "Tolima", "region": "andina", "capital": "Ibagué", "cx": 184.9, "cy": 383.3, "d": "M202.8,326.9 L202.5,348.2 L199.4,350.6 L200.6,360.3 L196.7,370.7 L199.5,369.5 L204.2,373.0 L206.9,373.1 L210.2,370.5 L213.6,374.6 L210.4,392.1 L205.3,396.5 L201.1,402.5 L201.5,406.1 L195.4,412.6 L189.9,412.7 L189.5,406.5 L175.8,407.6 L173.2,409.9 L171.0,409.5 L166.8,415.6 L164.6,424.9 L154.7,430.5 L147.5,427.6 L144.8,416.5 L146.3,415.4 L146.0,409.8 L149.0,398.9 L166.1,368.4 L166.7,362.7 L169.5,358.3 L173.7,355.4 L175.4,347.7 L177.6,345.0 L176.7,335.7 L179.2,333.3 L186.5,332.3 L189.1,327.4 L194.1,325.8 L202.8,326.9 Z"}, {"name": "Atlántico", "region": "caribe", "capital": "Barranquilla", "cx": 191.9, "cy": 97.4, "d": "M195.3,113.8 L181.1,102.4 L180.8,93.7 L181.9,90.6 L189.6,86.1 L191.3,82.6 L197.8,77.3 L203.4,85.9 L202.8,101.0 L195.3,113.8 Z"}];

// Rectángulo aproximado que ocupa la silueta continental (en coordenadas del viewBox)
const MAP_BOX = { xmin: 15, xmax: 545, ymin: 10, ymax: 755 };
const MAP_CENTER = { x: (MAP_BOX.xmin + MAP_BOX.xmax) / 2, y: (MAP_BOX.ymin + MAP_BOX.ymax) / 2 };
const LABEL_GAP = 46; // separación entre el borde del mapa y la etiqueta
// Debe coincidir con el viewBox del <svg> de ColombiaMap ("-150 -75 860 910")
const CANVAS = { xmin: -150, xmax: 710, ymin: -75, ymax: 835 };
const LABEL_SAFE_H = 34;

function outwardLabelPoint(cx, cy, estW) {
  let dx = cx - MAP_CENTER.x;
  let dy = cy - MAP_CENTER.y;
  const mag = Math.hypot(dx, dy) || 1;
  dx /= mag;
  dy /= mag;
  // distancia desde el centro del mapa hasta salir del rectángulo, en la dirección dx,dy
  const tx = dx > 0 ? (MAP_BOX.xmax - MAP_CENTER.x) / dx : dx < 0 ? (MAP_BOX.xmin - MAP_CENTER.x) / dx : Infinity;
  const ty = dy > 0 ? (MAP_BOX.ymax - MAP_CENTER.y) / dy : dy < 0 ? (MAP_BOX.ymin - MAP_CENTER.y) / dy : Infinity;
  const t = Math.min(tx, ty) + LABEL_GAP;
  let lx = MAP_CENTER.x + dx * t;
  let ly = MAP_CENTER.y + dy * t;
  // El texto crece hacia la derecha si el punto queda a la derecha del departamento, y viceversa
  const anchor = dx >= 0 ? "start" : "end";
  // Recorte para que la etiqueta (con su ancho reservado, según el texto) siempre quede dentro del lienzo
  const minX = anchor === "start" ? CANVAS.xmin + 8 : CANVAS.xmin + estW + 8;
  const maxX = anchor === "start" ? CANVAS.xmax - estW - 8 : CANVAS.xmax - 8;
  lx = Math.min(maxX, Math.max(minX, lx));
  ly = Math.min(CANVAS.ymax - LABEL_SAFE_H, Math.max(CANVAS.ymin + LABEL_SAFE_H, ly));
  return { lx, ly, anchor };
}

function CalloutLine({ dept, color }) {
  const { cx, cy, name, capital } = dept;
  // Estimación previa del ancho (para reservar espacio antes de medir el DOM real)
  const estW = Math.min(300, Math.max(110, Math.max(name.length * 7.4, (capital.length + 9) * 6.3) + 22));
  const { lx, ly, anchor } = outwardLabelPoint(cx, cy, estW);
  const labelPad = anchor === "start" ? 10 : -10;
  const len = Math.hypot(lx - cx, ly - cy);

  const titleRef = useRef(null);
  const capRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(estW);

  useLayoutEffect(() => {
    const w1 = titleRef.current ? titleRef.current.getBBox().width : 0;
    const w2 = capRef.current ? capRef.current.getBBox().width : 0;
    setBoxWidth(Math.min(estW, Math.max(w1, w2) + 20));
  }, [name, capital, estW]);

  const boxX = anchor === "start" ? lx - 6 : lx - boxWidth + 6;

  return (
    <g style={{ pointerEvents: "none" }}>
      <line
        x1={cx} y1={cy} x2={lx} y2={ly}
        stroke={color} strokeWidth="2"
        strokeDasharray={len}
        strokeDashoffset={len}
        style={{ animation: "drawCallout .45s ease-out forwards" }}
      />
      <circle cx={cx} cy={cy} r="4.5" fill={color} stroke="white" strokeWidth="1.5"
        style={{ animation: "popDot .3s ease-out .1s backwards" }} />
      <circle cx={lx} cy={ly} r="4.5" fill={color} stroke="white" strokeWidth="1.5"
        style={{ animation: "popDot .3s ease-out .35s backwards" }} />
      <g style={{ animation: "fadeIn .3s ease-out .35s backwards" }}>
        <rect x={boxX} y={ly - 20} width={boxWidth} height="32" rx="6" fill="#FFFDF8" stroke={color} strokeOpacity="0.35" />
        <text ref={titleRef} x={lx + labelPad} y={ly - 6} textAnchor={anchor} fontSize="13" fontWeight="700" fill="#3a3327">
          {name}
        </text>
        <text ref={capRef} x={lx + labelPad} y={ly + 10} textAnchor={anchor} fontSize="11" fill="#6b6455">
          Capital: {capital}
        </text>
      </g>
    </g>
  );
}

function ColombiaMap({ selected, hovered, pinnedDept, onSelect, onHover }) {
  return (
    <svg viewBox="-150 -75 860 910" className="w-full h-full max-h-[620px] overflow-visible" role="img" aria-label="Mapa de las regiones de Colombia">
      <style>{`
        @keyframes drawCallout { to { stroke-dashoffset: 0; } }
        @keyframes popDot { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        circle { transform-box: fill-box; transform-origin: center; }
        path:focus, g:focus { outline: none; }
      `}</style>
      {DEPTS.map((dept) => {
        const region = REGIONS[dept.region];
        const regionActive = selected === dept.region;
        const isHovered = hovered === dept.region;
        const isPinned = pinnedDept && pinnedDept.name === dept.name;
        return (
          <path
            key={dept.name}
            d={dept.d}
            fill={region.color}
            fillOpacity={regionActive ? 1 : isHovered ? 0.88 : 0.62}
            stroke="#FAF7EF"
            strokeWidth={isPinned ? 2.5 : regionActive ? 2 : 1}
            strokeLinejoin="round"
            className="cursor-pointer outline-none focus:outline-none"
            style={{
              outline: "none",
              filter: isPinned ? "drop-shadow(0 5px 12px rgba(0,0,0,0.3))" : regionActive ? "drop-shadow(0 4px 10px rgba(0,0,0,0.25))" : "none",
              transform: isPinned ? "scale(1.06)" : "scale(1)",
              transformBox: "view-box",
              transformOrigin: `${dept.cx}px ${dept.cy}px`,
              transition: "transform 300ms ease-out, filter 300ms ease-out, fill-opacity 300ms ease-out",
            }}
            onClick={() => onSelect(dept)}
            onMouseEnter={() => onHover(dept.region)}
            onMouseLeave={() => onHover(null)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(dept); }}
          />
        );
      })}

      {/* San Andrés, Providencia y Santa Catalina — insular, se muestra como recuadro aparte */}
      <g
        className="cursor-pointer outline-none focus:outline-none"
        style={{ outline: "none" }}
        onClick={() => onSelect({ name: "San Andrés y Providencia", region: "caribe", capital: "San Andrés", cx: 65, cy: 43 })}
        onMouseEnter={() => onHover("caribe")}
        onMouseLeave={() => onHover(null)}
      >
        <rect
          x="30" y="20" width="70" height="46" rx="8"
          fill={REGIONS.caribe.color}
          fillOpacity={selected === "caribe" ? 1 : hovered === "caribe" ? 0.88 : 0.62}
          stroke="#FAF7EF" strokeWidth="1.5"
        />
        <text x="65" y="40" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">San Andrés,</text>
        <text x="65" y="50" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">Providencia y</text>
        <text x="65" y="60" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">Sta. Catalina</text>
      </g>

      {pinnedDept && <CalloutLine key={pinnedDept.name} dept={pinnedDept} color={REGIONS[pinnedDept.region].color} />}
    </svg>
  );
}

/* ============================================================
   PANEL DE DETALLE
   ============================================================ */
function DetailPanel({ regionKey, onClose }) {
  const [tab, setTab] = useState("geografia");
  if (!regionKey) return null;
  const r = REGIONS[regionKey];

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl border animate-[fadeIn_.25s_ease-out]"
      style={{ borderColor: r.color, backgroundColor: "#FFFDF8" }}
    >
      <div className="px-5 py-4 flex items-start justify-between" style={{ backgroundColor: r.color }}>
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            {r.name}
          </h2>
          <p className="text-white/85 text-sm mt-0.5">{r.tagline}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-2xl leading-none px-2 -mt-1"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>

      <div className="px-5 pt-3 pb-2 flex flex-wrap gap-1.5 border-b" style={{ borderColor: r.soft }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              tab === t.key
                ? { backgroundColor: r.color, color: "white" }
                : { backgroundColor: r.soft, color: r.color }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-5 py-4 space-y-3 max-h-[360px] overflow-y-auto">
        {tab === "geografia" && (
          <>
            <p className="text-stone-700 leading-relaxed">{r.geografia}</p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: r.color }}>Departamentos</p>
                <p className="text-sm text-stone-600 mt-1">{r.departamentos.join(", ")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: r.color }}>Capitales</p>
                <p className="text-sm text-stone-600 mt-1">{r.capitales.join(", ")}</p>
              </div>
            </div>
            <div className="text-sm text-stone-500"><span className="font-semibold" style={{ color: r.color }}>Clima:</span> {r.clima}</div>
            <div className="mt-2 rounded-lg px-3 py-2 text-sm" style={{ backgroundColor: r.soft, color: "#3a3327" }}>
              💡 {r.dato}
            </div>
          </>
        )}

        {tab === "relieve" && (
          <div className="space-y-2.5">
            {r.relieve.map((it) => (
              <div key={it.titulo} className="border-l-2 pl-3" style={{ borderColor: r.color }}>
                <p className="font-semibold text-stone-800 text-sm">{it.titulo}</p>
                <p className="text-sm text-stone-600">{it.texto}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "flora" && (
          <div className="grid grid-cols-2 gap-2.5">
            {r.flora.map((it) => (
              <div
                key={it.nombre}
                className="rounded-xl p-3 flex flex-col items-center text-center gap-1 transition-transform active:scale-95"
                style={{ backgroundColor: r.soft }}
              >
                <span className="text-3xl leading-none">{it.icono}</span>
                <p className="font-semibold text-stone-800 text-sm leading-tight">{it.nombre}</p>
                <p className="text-xs text-stone-600 leading-snug">{it.texto}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "fauna" && (
          <div className="space-y-4">
            {r.fauna.map((cat) => (
              <div key={cat.categoria}>
                <p className="font-semibold text-stone-800 text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="text-base">{cat.icono}</span> {cat.categoria}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {cat.items.map((sp) => (
                    <div
                      key={sp.nombre}
                      className="rounded-xl p-2 flex flex-col items-center text-center gap-1 transition-transform active:scale-95"
                      style={{ backgroundColor: r.soft }}
                    >
                      <span className="text-2xl leading-none">{sp.icono}</span>
                      <p className="text-xs font-medium text-stone-700 leading-tight">{sp.nombre}</p>
                    </div>
                  ))}
                </div>
                {cat.nota && <p className="text-xs text-stone-500 italic mt-1.5">💡 {cat.nota}</p>}
              </div>
            ))}
          </div>
        )}

        {tab === "gente" && <p className="text-stone-700 leading-relaxed">{r.gente}</p>}
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function MapaRegiones() {
  const [selected, setSelected] = useState("andina");
  const [hovered, setHovered] = useState(null);
  const [pinnedDept, setPinnedDept] = useState(null);

  const handleMapSelect = (dept) => {
    setSelected(dept.region);
    setPinnedDept((prev) => (prev && prev.name === dept.name ? null : dept));
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7EF" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
            🗺️ Regiones de Colombia
          </h1>
          <p className="text-stone-500 text-sm mt-1">Toca una región del mapa para explorar su geografía, flora, fauna y gente.</p>
        </header>

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(REGIONS).map(([key, r]) => (
            <button
              key={key}
              onClick={() => { setSelected(key); setPinnedDept(null); }}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
              style={
                selected === key
                  ? { backgroundColor: r.color, color: "white", borderColor: r.color }
                  : { backgroundColor: "white", color: r.color, borderColor: r.color }
              }
            >
              {r.name.replace("Región ", "")}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-2xl border border-stone-200 p-3">
            <ColombiaMap selected={selected} hovered={hovered} pinnedDept={pinnedDept} onSelect={handleMapSelect} onHover={setHovered} />
          </div>
          <DetailPanel regionKey={selected} onClose={() => { setSelected(null); setPinnedDept(null); }} />
        </div>
      </div>
    </div>
  );
}
