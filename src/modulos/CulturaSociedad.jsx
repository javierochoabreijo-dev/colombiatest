import React, { useState } from "react";
import ImagenAtribuida from "../components/ImagenAtribuida";
import TarjetaExpandible from "../components/TarjetaExpandible";
import Pill, { BarraPills } from "../components/Pill";
import { Bandera } from "../components/Iconos";
import { shuffle } from "../lib/util";

/* Cultura: el módulo entero se identifica con el color de su área. */
const ACENTO = "var(--text-cul)";
const RELLENO = "var(--area-cul)";
const SOBRE = "var(--on-cul)";

/* ============================================================
   ColombiaTest · Módulo Cultura y Sociedad
   Contenido extraído del capítulo "Cultura y Sociedad" de la
   Guía Cancillería (símbolos patrios, gastronomía, fiestas,
   música, arte, literatura, deporte, religión y turismo).
   Enfoque híbrido: Explorador (codificación) + Flashcards (retrieval).
   ============================================================ */

/* Las categorías ya no llevan color propio: el dorado de "Símbolos" era el
   mismo que el del CTA de Simulacro y el del área Cultura a la vez. Dentro
   del módulo la categoría se distingue por estado, no por tono.

   El icono de "Símbolos" era la bandera 🇨🇴, que en Windows se dibuja como
   las letras "CO" — ahora es un SVG propio. */
const CATS = [
  { key: "simbolos", label: "Símbolos", icono: null },
  { key: "gastronomia", label: "Gastronomía", icono: "🍽️" },
  { key: "fiestas", label: "Fiestas", icono: "🎭" },
  { key: "arte", label: "Música y arte", icono: "🎶" },
  { key: "deporte", label: "Deporte", icono: "🚴" },
  { key: "turismo", label: "Turismo", icono: "🏖️" },
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
    titulo: "Escudo nacional", icono: "🛡️",
    resumen: "Diseñado por Francisco de Paula Santander en 1834.",
    detalle: "Tiene tres franjas y está flanqueado por dos banderas. Arriba (fondo azul): una granada de oro (por la Nueva Granada) entre dos cornucopias (riqueza económica y frutos tropicales). Centro (platino): un gorro frigio, símbolo de libertad, sostenido por una lanza. Abajo: dos buques a ambos lados del Istmo de Panamá (los océanos Caribe y Pacífico y el comercio). Corona el escudo un cóndor con una cinta que dice el lema nacional.",
    destacado: "Lema nacional en la cinta del cóndor: \"Libertad y Orden\".",
    imagen: {
      archivo: "cultura/escudo-nacional.png",
      ajuste: "contain",
      licencia: "Dominio público",
      fuente: "https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_Colombia.svg",
    },
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
    imagen: {
      archivo: "cultura/flor-nacional.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Cattleya_trianae,_Flor_Nacional_de_Colombia.jpg",
      autor: "Mario Carvajal",
      licencia: "CC BY 2.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Cattleya_trianae,_Flor_Nacional_de_Colombia.jpg",
    },
  },
  {
    titulo: "Árbol nacional", icono: "🌴",
    resumen: "La Palma de Cera del Quindío.",
    detalle: "Científicamente Ceroxylon quindiuense, alcanza hasta 70 metros de altura. Fue elegida en 1949 durante la comisión preparatoria del III Congreso Suramericano de Botánica. La Ley 61 de 1985 le otorgó el estatus de Árbol Nacional y ordenó protegerla en su hábitat.",
    destacado: "Palma de Cera del Quindío (Ceroxylon quindiuense), hasta 70 m.",
    imagen: {
      archivo: "cultura/arbol-nacional.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Palma_de_cera_del_Quind%C3%ADo_(Ceroxylon_quindiuense)_(14748688243).jpg",
      autor: "Alejandro Bayer Tamayo",
      licencia: "CC BY-SA 2.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Palma_de_cera_del_Quind%C3%ADo_(Ceroxylon_quindiuense)_(14748688243).jpg",
    },
  },
  {
    titulo: "Símbolo cultural", icono: "👒",
    resumen: "El sombrero vueltiao.",
    detalle: "Pieza artesanal de las sabanas del Caribe, con raíces en la cultura Zenú. Fue declarado Símbolo Cultural de la Nación por la Ley 908 del 8 de septiembre de 2004. Otros símbolos: la ruana cundiboyacense, el carriel antioqueño y las mochilas arhuacas y wayúu.",
    destacado: "Sombrero vueltiao, cultura Zenú, Ley 908 de 2004.",
    imagen: {
      archivo: "cultura/simbolo-cultural.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Sombrero_vueltiao.jpg",
      autor: "Jdvillalobos",
      licencia: "Dominio público",
      fuente: "https://commons.wikimedia.org/wiki/File:Sombrero_vueltiao.jpg",
    },
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
    platos: [{ n: "Pargo rojo", i: "🐟" }, { n: "Arroz con coco", i: "🥥" }, { n: "Sancocho de rabo", i: "🍲" }],
    imagen: {
      archivo: "cultura/region-caribe.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Arroz_con_coco,_pescado_frito_y_patacones.jpg",
      autor: "ProtoplasmaKid",
      licencia: "CC BY-SA 4.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Arroz_con_coco,_pescado_frito_y_patacones.jpg",
    } },
  { titulo: "Región Insular (San Andrés)", icono: "🏝️", region: true,
    detalle: "Cocina isleña con frutos de mar. El plato más típico es el Rondón, cuyo nombre viene de \"run down\": pescado, cangrejo, colita de cerdo, plátano, yuca, ñame y domplines cocidos en leche de coco.",
    platos: [{ n: "El Rondón", i: "🥘" }],
    destacado: "El plato típico del archipiélago de San Andrés es el Rondón." },
  { titulo: "Región Pacífica", icono: "🌊", region: true,
    detalle: "Herencia africana y biodiversidad de mar y ríos. Platos: sancocho de gallina, bocachico frito, chuleta de cerdo (valluna) y aborrajados.",
    platos: [{ n: "Sancocho de gallina", i: "🍲" }, { n: "Bocachico frito", i: "🐟" }, { n: "Aborrajados", i: "🍌" }],
    imagen: {
      archivo: "cultura/region-pacifica.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Sancocho_de_gallina_criolla.jpg",
      autor: "WIKIRAICES",
      licencia: "CC BY-SA 4.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Sancocho_de_gallina_criolla.jpg",
    } },
  { titulo: "Región Andina", icono: "⛰️", region: true,
    detalle: "La de mayor tradición gastronómica; base en la papa, legumbres, queso y carnes. Aquí nacieron la bandeja paisa (arroz, frijoles, carne, chorizo, huevo, plátano, arepa y aguacate; de Antioquia), el ajiaco (sopa de papas, pollo, mazorca y guascas; de Bogotá), el puchero santafereño, los tamales, la lechona tolimense y el mute santandereano.",
    platos: [{ n: "Bandeja paisa", i: "🍛" }, { n: "Ajiaco", i: "🥣" }, { n: "Mute", i: "🌽" }],
    destacado: "Bandeja paisa = Antioquia · Ajiaco = Bogotá · Mute = Santander.",
    imagen: {
      archivo: "cultura/region-andina.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeja_paisa_antioque%C3%B1a,_Colombia.jpg",
      autor: "Matt Lemmon",
      licencia: "CC BY-SA 2.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Bandeja_paisa_antioque%C3%B1a,_Colombia.jpg",
    } },
  { titulo: "Región Orinoquía (Llanos)", icono: "🐄", region: true,
    detalle: "Zona ganadera; carnes rojas de calidad. El plato insignia es la mamona (o ternera a la llanera / becerra asada): ternera joven asada al aire libre solo con sal y fuego lento.",
    platos: [{ n: "Mamona (ternera a la llanera)", i: "🥩" }],
    destacado: "El plato típico de los Llanos es la mamona o ternera a la llanera.",
    imagen: {
      archivo: "cultura/region-orinoquia-llanos.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Ternera_a_la_llanera.jpg",
      autor: "Danilo Sarmiento (Dansar)",
      licencia: "CC BY-SA 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Ternera_a_la_llanera.jpg",
    } },
  { titulo: "Región Amazónica", icono: "🌳", region: true,
    detalle: "Frutos exóticos (copoazú, arazá, camu-camu) y base en pescado y yuca. Plato típico: chicharrones de pirarucú (pez también llamado bacalao), servidos en hoja de plátano con fariña y cazabe.",
    platos: [{ n: "Chicharrones de pirarucú", i: "🐟" }] },
];

/* ---------------- FIESTAS Y FESTIVALES ---------------- */
const FIESTAS = [
  { titulo: "Carnaval de Barranquilla", icono: "🎭", lugar: "Barranquilla (Atlántico)", cuando: "Febrero",
    detalle: "Uno de los carnavales más importantes del mundo, declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Reúne música tradicional como la cumbia y el vallenato.",
    destacado: "Patrimonio de la Humanidad (UNESCO). Se celebra en febrero.",
    imagen: {
      archivo: "cultura/carnaval-de-barranquilla.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Garabato_Carnaval_de_Barranquilla.jpg",
      autor: "Jdvillalobos",
      licencia: "CC BY 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Garabato_Carnaval_de_Barranquilla.jpg",
    } },
  { titulo: "Carnaval de Negros y Blancos", icono: "🎨", lugar: "San Juan de Pasto (Nariño)", cuando: "Inicio de año",
    detalle: "Mezcla de tradiciones indígenas (Los Pastos y Quillacingas) y la evangelización europea. Se celebra en vísperas de año nuevo en el suroeste del país.",
    destacado: "Se celebra en Pasto (Nariño).",
    imagen: {
      archivo: "cultura/carnaval-de-negros-y-blancos.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Epifan%C3%ADa_Carroza_Carnaval_de_Negros_y_Blancos_2024.jpg",
      autor: "Jhonsca",
      licencia: "CC BY-SA 4.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Epifan%C3%ADa_Carroza_Carnaval_de_Negros_y_Blancos_2024.jpg",
    } },
  { titulo: "Feria de las Flores", icono: "🌺", lugar: "Medellín (Antioquia)", cuando: "Agosto",
    detalle: "Festividad emblemática de Medellín, famosa por el desfile de silleteros, conciertos y ferias gastronómicas.",
    destacado: "Feria de las Flores = Medellín, con el desfile de silleteros.",
    imagen: {
      archivo: "cultura/feria-de-las-flores.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Desfile_de_Silleteros2007-(21)Medellin.JPG",
      autor: "SajoR",
      licencia: "CC BY-SA 2.5",
      fuente: "https://commons.wikimedia.org/wiki/File:Desfile_de_Silleteros2007-(21)Medellin.JPG",
    } },
  { titulo: "Festival de la Leyenda Vallenata", icono: "🪗", lugar: "Valledupar (Cesar)", cuando: "Abril",
    detalle: "Resalta el género musical vallenato. Reúne a los mejores acordeoneros para coronar al Rey Vallenato, con conciertos y desfiles.",
    destacado: "Valledupar, capital del vallenato. Corona al Rey Vallenato.",
    imagen: {
      archivo: "cultura/festival-de-la-leyenda-vallenata.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Festival_vallenato.jpg",
      autor: "Jdvillalobos",
      licencia: "CC BY 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Festival_vallenato.jpg",
    } },
  { titulo: "Festival y Torneo Internacional del Joropo", icono: "🎻", lugar: "Villavicencio (Meta)", cuando: "Octubre",
    detalle: "Desde 1962, incentiva la música y el baile tradicional de los llanos orientales. Incluye el \"joropódromo\" con torneos de joropo, baile que comparte raíces con Venezuela.",
    destacado: "El Festival del Joropo se celebra en Villavicencio (Meta).",
    imagen: {
      archivo: "cultura/festival-y-torneo-internacional-del-joropo.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Joropódromo_en_2023_(1).jpg",
      autor: "Canal Global Televisión",
      licencia: "CC BY 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Joropódromo_en_2023_(1).jpg",
    } },
  { titulo: "Festival Petronio Álvarez", icono: "🥁", lugar: "Cali (Valle del Cauca)", cuando: "Agosto",
    detalle: "Desde 1997, en homenaje al músico Petronio Álvarez. Es el festival más importante de la música tradicional del Pacífico colombiano (chirimías, marimba, violines caucanos).",
    destacado: "El festival más importante de la música del Pacífico." },
  { titulo: "Feria de Manizales", icono: "☕", lugar: "Manizales (Caldas)", cuando: "Enero",
    detalle: "Su temática principal es el café. De origen español, se inspira en la Feria de Sevilla; ofrece formación en cata de café.",
    imagen: {
      archivo: "cultura/feria-de-manizales.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Reinado_internacional_del_caf%C3%A9_feria_de_manizales_Colombia.jpg",
      autor: "Anonimo18121991",
      licencia: "CC BY-SA 4.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Reinado_internacional_del_caf%C3%A9_feria_de_manizales_Colombia.jpg",
    } },
  { titulo: "Semana Santa de Popayán", icono: "🕯️", lugar: "Popayán (Cauca)", cuando: "Semana Santa",
    detalle: "Una de las celebraciones religiosas más tradicionales del país: procesiones por las calles empedradas con música sacra.",
    imagen: {
      archivo: "cultura/semana-santa-de-popayan.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Semana_Santa_en_Popay%C3%A1n_(13903409316).jpg",
      autor: "Policía Nacional de Colombia",
      licencia: "CC BY-SA 2.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Semana_Santa_en_Popay%C3%A1n_(13903409316).jpg",
    } },
  { titulo: "Hay Festival", icono: "📚", lugar: "Cartagena (Bolívar)", cuando: "Enero",
    detalle: "\"La fiesta de las ideas y las palabras\": festival internacional de literatura, historia y pensamiento.",
    imagen: {
      archivo: "cultura/hay-festival.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Ciudad_Amurallada_Cartagena.JPG",
      autor: "Davidsan181",
      licencia: "CC BY-SA 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Ciudad_Amurallada_Cartagena.JPG",
    } },
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
    destacado: "García Márquez: Nobel de Literatura 1982, por Cien años de soledad.",
    imagen: {
      archivo: "cultura/literatura.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Gabriel_Garcia_Marquez.jpg",
      autor: "Jose Lara",
      licencia: "CC BY-SA 2.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Gabriel_Garcia_Marquez.jpg",
    } },
  { titulo: "Artes plásticas", icono: "🖼️",
    detalle: "En el siglo XX destacan Fernando Botero, Alejandro Obregón, Omar Rayo, Beatriz González y Débora Arango. En la época colonial sobresalió el pintor Gregorio Vásquez de Arce y Ceballos.",
    imagen: {
      archivo: "cultura/artes-plasticas.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Esfinge_by_Fernando_Botero_-_Plaza_Botero_-_Medell%C3%ADn_-_Colombia_2024.jpg",
      autor: "José Luiz Bernardes Ribeiro",
      licencia: "CC BY-SA 4.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Esfinge_by_Fernando_Botero_-_Plaza_Botero_-_Medell%C3%ADn_-_Colombia_2024.jpg",
    } },
  { titulo: "Cine y televisión", icono: "📺",
    detalle: "Una de las telenovelas colombianas más famosas del mundo es Yo soy Betty, la fea, creada por Fernando Gaitán en 1999." },
  { titulo: "Radio", icono: "📻",
    detalle: "Una de las emisoras más destacadas fue Radio Sutatenza, pionera de la educación a distancia por radio en el campo colombiano." },
];

/* ---------------- DEPORTE ---------------- */
const DEPORTE = [
  { titulo: "Ciclismo — el deporte rey", icono: "🚴",
    detalle: "El ciclismo es el deporte más importante del país; las montañas son ideales para entrenar a los \"escarabajos\". Grandes ciclistas: Lucho Herrera, Rigoberto Urán, Nairo Quintana y Egan Bernal (y de antaño Martín \"Cochise\" Rodríguez, Ramón Hoyos, Rafael Niño).",
    destacado: "El ciclismo es el \"deporte rey\" de Colombia.",
    imagen: {
      archivo: "cultura/ciclismo-el-deporte-rey.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Cl%C3%A1sica_de_ciclismo_El_carmen_de_viboral_-_panoramio.jpg",
      autor: "Fernando Gallo B",
      licencia: "CC BY 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Cl%C3%A1sica_de_ciclismo_El_carmen_de_viboral_-_panoramio.jpg",
    } },
  { titulo: "Otras figuras del deporte", icono: "🏅",
    detalle: "Edgar Rentería (béisbol), Juan Pablo Montoya (automovilismo), Fabiola Zuluaga (tenis), María Isabel Urrutia (levantamiento de pesas) y Catherine Ibargüen (triple salto)." },
];

/* ---------------- TURISMO ---------------- */
const TURISMO = [
  { titulo: "Turismo litoral", icono: "🏖️",
    detalle: "Playas de ciudades como Santa Marta, donde está el Parque Nacional Natural Tayrona.",
    imagen: {
      archivo: "cultura/turismo-litoral.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Playa_La_Arenilla,_Parque_Nacional_Natural_Tayrona.JPG",
      autor: "Karolynaroca",
      licencia: "CC BY-SA 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Playa_La_Arenilla,_Parque_Nacional_Natural_Tayrona.JPG",
    } },
  { titulo: "Turismo de naturaleza", icono: "🐋",
    detalle: "Senderismo, avistamiento de aves, buceo, rafting y avistamiento de ballenas. Incluye parques como Los Nevados.",
    imagen: {
      archivo: "cultura/turismo-de-naturaleza.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Laguna_negra,_parque_nacional_los_nevados,_colombia.JPG",
      autor: "Kamilokardona",
      licencia: "Dominio público",
      fuente: "https://commons.wikimedia.org/wiki/File:Laguna_negra,_parque_nacional_los_nevados,_colombia.JPG",
    } },
  { titulo: "Turismo rural", icono: "🚜",
    detalle: "Contacto con el campo, con parapente, escalada, canopy; incluye las haciendas y plantaciones de café.",
    imagen: {
      archivo: "cultura/turismo-rural.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Valle_de_Cocora_banner.jpg",
      autor: "Peterfitzgerald",
      licencia: "CC BY-SA 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Valle_de_Cocora_banner.jpg",
    } },
  { titulo: "Turismo académico y cultural", icono: "🏛️",
    detalle: "Museos, galerías de arte y sitios arqueológicos. Las ciudades más visitadas son Bogotá, Medellín y Cali.",
    imagen: {
      archivo: "cultura/turismo-academico-y-cultural.jpg",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Calle_de_La_Candelaria_Bogot%C3%A1.JPG",
      autor: "Javier Benítez",
      licencia: "CC BY-SA 3.0",
      fuente: "https://commons.wikimedia.org/wiki/File:Calle_de_La_Candelaria_Bogot%C3%A1.JPG",
    } },
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
   ------------------------------------------------------------
   Los hex de aquí abajo NO son tokens y no deben serlo: son los
   colores oficiales de la bandera y el escudo. Representan un
   objeto real, no un rol de interfaz, así que no cambian con el
   tema ni deben reutilizarse en ningún otro sitio.
   ============================================================ */
function BanderaSVG() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-[220px] rounded-md border border-rule shadow-sm">
      <rect x="0" y="0" width="300" height="100" fill="#FCD116" />
      <rect x="0" y="100" width="300" height="50" fill="#003893" />
      <rect x="0" y="150" width="300" height="50" fill="#CE1126" />
    </svg>
  );
}

/* ============================================================
   TARJETA DE EXPLORADOR
   ============================================================ */
function Tarjeta({ item }) {
  const cabecera =
    item.resumen || (item.lugar ? `${item.lugar}${item.cuando ? " · " + item.cuando : ""}` : null);

  return (
    <TarjetaExpandible item={item} acento={ACENTO} cabecera={cabecera}>
      {item.svg === "bandera" && <div className="flex justify-center py-1"><BanderaSVG /></div>}
      <ImagenAtribuida imagen={item.imagen} alt={item.titulo} />
      {item.lugar && (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-raised" style={{ color: ACENTO }}>📍 {item.lugar}</span>
          {item.cuando && (
            <span className="px-2.5 py-1 rounded-full bg-raised" style={{ color: ACENTO }}>🗓️ {item.cuando}</span>
          )}
        </div>
      )}
      {item.platos && (
        <div className="grid grid-cols-3 gap-2">
          {item.platos.map((p) => (
            <div key={p.n} className="rounded-card p-2 flex flex-col items-center text-center gap-1 bg-raised">
              <span className="text-2xl">{p.i}</span>
              <span className="text-xs text-ink leading-tight">{p.n}</span>
            </div>
          ))}
        </div>
      )}
    </TarjetaExpandible>
  );
}

/* ============================================================
   MODO FLASHCARDS (retrieval practice)
   ============================================================ */
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
      <div className="rounded-card border-2 bg-surface p-6 text-center" style={{ borderColor: ACENTO }}>
        <p
          className="tipo-display text-[12px] mb-2"
          style={{ color: pct >= 70 ? "var(--text-ok)" : "var(--text-danger)" }}
        >
          {pct >= 70 ? "Vas muy bien" : "Toca repasar"}
        </p>
        <h3 className="tipo-display text-3xl text-ink">
          {aciertos} de {mazo.length}
        </h3>
        <p className="text-ink-soft text-sm mt-1">
          {pct}% · {pct >= 70 ? "sigue repasando para afianzar." : "repasa las que fallaste y vuelve a intentarlo."}
        </p>
        <div className="flex flex-col gap-2 mt-5">
          {falladas.length > 0 && (
            <button
              onClick={() => reiniciar(true)}
              className="tipo-display min-h-[44px] px-4 rounded-full text-[12.5px]"
              style={{ backgroundColor: "var(--danger)", color: "var(--on-danger)" }}
            >
              Repasar solo las {falladas.length} falladas
            </button>
          )}
          <button
            onClick={() => reiniciar(false)}
            className="tipo-display min-h-[44px] px-4 rounded-full text-[12.5px]"
            style={{ backgroundColor: "var(--cta)", color: "var(--on-cta)" }}
          >
            Repasar todo de nuevo
          </button>
          <button
            onClick={onSalir}
            className="tipo-display min-h-[44px] px-4 rounded-full text-[12.5px] border-[1.5px] border-rule text-ink-soft"
          >
            Volver al explorador
          </button>
        </div>
      </div>
    );
  }

  const tarjeta = mazo[i];
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-ink-soft">Tarjeta {i + 1} / {mazo.length}</span>
        <span className="tipo-display text-xs" style={{ color: "var(--text-ok)" }}>✓ {aciertos}</span>
      </div>
      {/* barra de progreso */}
      <div className="w-full h-1.5 rounded-full mb-4 bg-raised">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${(i / mazo.length) * 100}%`, backgroundColor: "var(--cta)" }}
        />
      </div>

      <div
        onClick={() => setRevelada(true)}
        className="rounded-card border border-rule bg-surface px-5 py-8 min-h-[200px] flex flex-col items-center justify-center text-center cursor-pointer transition-all"
      >
        <span
          className="tipo-display inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-full mb-3 bg-raised"
          style={{ color: ACENTO }}
        >
          {cat.icono ? <span aria-hidden="true">{cat.icono}</span> : <Bandera width={16} />}
          {cat.label}
        </span>
        <p className="tipo-display text-[17px] text-ink leading-tight">{tarjeta.p}</p>
        {revelada ? (
          <p className="mt-4 text-ink leading-relaxed" style={{ animation: "fadeIn .25s ease-out" }}>
            {tarjeta.r}
          </p>
        ) : (
          <p className="mt-4 text-sm text-ink-soft">Toca para ver la respuesta</p>
        )}
      </div>

      {revelada ? (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => responder(false)}
            className="tipo-display min-h-[48px] px-4 rounded-full text-[12.5px]"
            style={{ backgroundColor: "var(--danger)", color: "var(--on-danger)" }}
          >
            No la sabía
          </button>
          <button
            onClick={() => responder(true)}
            className="tipo-display min-h-[48px] px-4 rounded-full text-[12.5px]"
            style={{ backgroundColor: "var(--ok)", color: "var(--on-ok)" }}
          >
            ¡La sabía!
          </button>
        </div>
      ) : (
        <button
          onClick={() => setRevelada(true)}
          className="tipo-display w-full mt-4 min-h-[48px] px-4 rounded-full text-[12.5px]"
          style={{ backgroundColor: "var(--cta)", color: "var(--on-cta)" }}
        >
          Ver respuesta
        </button>
      )}

      <button onClick={onSalir} className="w-full mt-2 text-sm text-ink-soft min-h-[44px]">Salir del repaso</button>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function CulturaSociedad() {
  const [modo, setModo] = useState("explorar"); // explorar | flashcards
  const [cat, setCat] = useState("simbolos");

  return (
    <>
        <p className="text-ink-soft text-sm mb-4">
          {modo === "explorar"
            ? "Explora por categoría y toca cada tarjeta. Cuando te sientas listo, ponte a prueba."
            : "Retrieval practice: intenta responder antes de revelar."}
        </p>

        {/* conmutador de modo */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            onClick={() => setModo("explorar")}
            aria-pressed={modo === "explorar"}
            className="tipo-display min-h-[48px] px-4 rounded-full text-[12.5px] transition-colors border-[1.5px]"
            style={modo === "explorar"
              ? { backgroundColor: RELLENO, color: SOBRE, borderColor: RELLENO }
              : { backgroundColor: "transparent", color: ACENTO, borderColor: "var(--rule)" }}
          >
            Explorar
          </button>
          <button
            onClick={() => setModo("flashcards")}
            aria-pressed={modo === "flashcards"}
            className="tipo-display min-h-[48px] px-4 rounded-full text-[12.5px] transition-colors border-[1.5px]"
            style={modo === "flashcards"
              ? { backgroundColor: RELLENO, color: SOBRE, borderColor: RELLENO }
              : { backgroundColor: "transparent", color: ACENTO, borderColor: "var(--rule)" }}
          >
            Ponte a prueba
          </button>
        </div>

        {modo === "explorar" ? (
          <>
            {/* categorías */}
            <BarraPills>
              {CATS.map((x) => (
                <Pill
                  key={x.key}
                  activa={cat === x.key}
                  relleno={RELLENO}
                  sobre={SOBRE}
                  acento={ACENTO}
                  onClick={() => setCat(x.key)}
                >
                  {x.icono ? <span aria-hidden="true">{x.icono}</span> : <Bandera width={16} />}
                  {x.label}
                </Pill>
              ))}
            </BarraPills>

            <div className="space-y-2.5">
              {DATA[cat].map((item) => (
                <Tarjeta key={item.titulo} item={item} />
              ))}
            </div>
          </>
        ) : (
          <Flashcards onSalir={() => setModo("explorar")} />
        )}

        <footer className="text-center text-xs text-ink-soft mt-6 pb-4">
          Contenido basado en la guía oficial de estudio · Cultura y Sociedad
        </footer>
    </>
  );
}
