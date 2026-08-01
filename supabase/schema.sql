-- ============================================================
-- ColombiaTest · Esquema Supabase + seed del banco de preguntas
-- Ejecutar en el SQL Editor de Supabase.
-- Sin datos de usuario: la app no usa logins ni perfiles.
-- ============================================================

create table if not exists areas (
  id     text primary key,
  nombre text not null,
  orden  int  not null
);

create table if not exists preguntas (
  id            uuid primary key default gen_random_uuid(),
  area_id       text not null references areas(id),
  enunciado     text not null,
  respuesta     text not null,
  aceptadas     text[] default '{}',
  uso_simulacro boolean not null default true,
  created_at    timestamptz default now()
);

create index if not exists idx_preguntas_area on preguntas(area_id);

alter table areas     enable row level security;
alter table preguntas enable row level security;

create policy "areas: lectura pública"     on areas     for select using (true);
create policy "preguntas: lectura pública" on preguntas for select using (true);

insert into areas (id, nombre, orden) values
  ('geografia',    'Geografía',    1),
  ('historia',     'Historia',     2),
  ('constitucion', 'Constitución', 3),
  ('cultura',      'Cultura',      4)
on conflict (id) do nothing;

insert into preguntas (area_id, enunciado, respuesta, aceptadas) values
  ('geografia', '¿Cuántas regiones naturales (biogeográficas) tiene Colombia y cuáles son?', '5: Caribe, Andina, Pacífica, Orinoquía y Amazónica.', array['5', 'cinco']::text[]),
  ('geografia', '¿Cuál es el pico más alto de Colombia y dónde está?', 'El Pico Cristóbal Colón (5.775 m), en la Sierra Nevada de Santa Marta (región Caribe).', array['cristóbal colón', 'cristobal colon']::text[]),
  ('geografia', '¿Cuántas cordilleras atraviesan el territorio y cómo se llaman?', 'Tres: Occidental, Central y Oriental.', array['3', 'tres']::text[]),
  ('geografia', 'Completa: la región ___ ocupa cerca del 42% del territorio y es la más biodiversa.', 'Amazónica (Amazonía).', array['amazónica', 'amazonia', 'amazonía']::text[]),
  ('geografia', '¿Qué región es la más poblada del país (≈40%)?', 'La región Andina.', array['andina']::text[]),
  ('geografia', '¿Qué región es una de las más lluviosas del mundo?', 'La región Pacífica (el Chocó puede superar los 10.000 mm de lluvia al año).', array['pacífica', 'pacifica']::text[]),
  ('geografia', '¿Cómo se llaman las llanuras planas de la Orinoquía?', 'Los Llanos Orientales.', array['llanos']::text[]),
  ('geografia', '¿Qué piso térmico corresponde a temperaturas entre 18 y 24 °C?', 'El piso térmico templado (entre 1.000 y 2.000 m).', array['templado']::text[]),
  ('geografia', '¿Cómo se llama el piso térmico de más de 3.000 m con temperaturas bajo 10 °C?', 'El páramo.', array['páramo', 'paramo']::text[]),
  ('geografia', '¿Cuál es la capital y ciudad más poblada de Colombia?', 'Bogotá.', array['bogotá', 'bogota']::text[]),
  ('geografia', '¿En qué región están las tres cordilleras y los grandes nevados?', 'En la región Andina.', array['andina']::text[]),
  ('geografia', '¿Qué formación aislada de la Orinoquía alberga a Caño Cristales?', 'La Serranía de La Macarena.', array['macarena']::text[]),
  ('geografia', '¿Qué archipiélago del Caribe forma parte del territorio colombiano?', 'San Andrés, Providencia y Santa Catalina.', array['san andrés', 'san andres', 'providencia']::text[]),
  ('geografia', 'Completa: los páramos son considerados las "fábricas de ___" del país.', 'Agua.', array['agua']::text[]),
  ('geografia', '¿Qué pueblos indígenas habitan la Sierra Nevada de Santa Marta?', 'Los kogui, arhuaco, wiwa y kankuamo.', array['kogui', 'arhuaco', 'wiwa', 'kankuamo']::text[]),
  ('geografia', '¿Cuál es el roedor más grande del mundo, típico de la Orinoquía?', 'El capibara (chigüiro).', array['capibara', 'chigüiro', 'chiguiro']::text[]),
  ('geografia', '¿Qué región tiene clima ecuatorial húmedo y frontera con Ecuador, Perú y Brasil?', 'La región Amazónica.', array['amazónica', 'amazonica', 'amazonía', 'amazonia']::text[]),
  ('geografia', '¿Qué piso térmico corresponde a menos de 1.000 m y 24–28 °C?', 'El piso térmico cálido.', array['cálido', 'calido']::text[]),
  ('geografia', '¿Qué región es reconocida por sus manglares, sabanas y la Sierra Nevada?', 'La región Caribe.', array['caribe']::text[]),
  ('geografia', '¿Cómo se llama el ecosistema de alta montaña con frailejones?', 'El páramo.', array['páramo', 'paramo']::text[]),
  ('historia', '¿Por dónde llegaron los primeros pobladores a América hace ~16.000 años?', 'Por el estrecho de Beringia y luego el Darién.', array['beringia']::text[]),
  ('historia', '¿Cuáles fueron las tres lenguas madre de los pueblos prehispánicos?', 'Chibcha, arawak y caribe.', array['chibcha', 'arawak', 'caribe']::text[]),
  ('historia', '¿Quién fundó Santa Fe de Bogotá en 1538?', 'Gonzalo Jiménez de Quesada.', array['jiménez de quesada', 'jimenez de quesada', 'quesada']::text[]),
  ('historia', '¿En qué año se fundó el Virreinato de la Nueva Granada?', 'En 1717.', array['1717']::text[]),
  ('historia', '¿Cómo se llamó la rebelión de 1780–1781 contra el alza de impuestos?', 'La Revolución de los Comuneros.', array['comuneros']::text[]),
  ('historia', '¿Quién escribió el Memorial de Agravios en 1809?', 'Camilo Torres.', array['camilo torres', 'torres']::text[]),
  ('historia', '¿Qué se conmemora el 20 de julio de 1810?', 'El Grito de Independencia y la Junta Suprema de Gobierno en Bogotá.', array['grito de independencia', 'junta']::text[]),
  ('historia', '¿Con qué batalla se consolidó la independencia y en qué fecha?', 'La Batalla de Boyacá, el 7 de agosto de 1819.', array['boyacá', 'boyaca', '1819']::text[]),
  ('historia', 'Completa: la República creada en Angostura (1819), hoy llamada ___ Colombia.', 'Gran Colombia.', array['gran']::text[]),
  ('historia', '¿En qué año se disolvió la Gran Colombia?', 'En 1831.', array['1831']::text[]),
  ('historia', '¿Qué dos partidos surgieron en la etapa de la Nueva Granada?', 'El Liberal y el Conservador.', array['liberal', 'conservador']::text[]),
  ('historia', '¿En qué año se promulgó la Constitución centralista anterior a la de 1991?', 'En 1886.', array['1886']::text[]),
  ('historia', '¿Qué conflicto ocurrió entre 1899 y 1902?', 'La Guerra de los Mil Días.', array['mil días', 'mil dias']::text[]),
  ('historia', '¿Qué territorio se separó de Colombia en 1903?', 'Panamá.', array['panamá', 'panama']::text[]),
  ('historia', '¿Qué ocurrió el 9 de abril de 1948?', 'El asesinato de Jorge Eliécer Gaitán, que desató el Bogotazo.', array['gaitán', 'gaitan', 'bogotazo']::text[]),
  ('historia', '¿En qué año votaron por primera vez las mujeres en Colombia?', 'En el plebiscito de 1957.', array['1957']::text[]),
  ('historia', '¿Cómo se llamó el acuerdo de alternancia entre liberales y conservadores (1958–1974)?', 'El Frente Nacional.', array['frente nacional']::text[]),
  ('historia', '¿En qué años se fundaron el ELN, las FARC y el EPL?', 'ELN en 1962, FARC en 1965 y EPL en 1967.', array['1962', '1965', '1967']::text[]),
  ('historia', '¿En qué año se firmó el acuerdo de paz con las FARC?', 'En 2016 (negociado en La Habana).', array['2016']::text[]),
  ('historia', '¿Qué mecanismos de justicia transicional creó el acuerdo de 2016?', 'La JEP (Jurisdicción Especial para la Paz) y la Comisión de la Verdad.', array['jep', 'comisión de la verdad', 'comision de la verdad']::text[]),
  ('constitucion', '¿En qué año fue promulgada la Constitución vigente?', 'En 1991.', array['1991']::text[]),
  ('constitucion', 'Completa: la Constitución define a Colombia como un Estado ___ de derecho.', 'Social.', array['social']::text[]),
  ('constitucion', '¿Cuáles son los tres tipos de descentralización?', 'Territorial, por servicios y por colaboración.', array['territorial', 'servicios', 'colaboración', 'colaboracion']::text[]),
  ('constitucion', 'Se dice que la Constitución es "norma de ___".', 'Normas.', array['normas']::text[]),
  ('constitucion', '¿En qué artículos están los derechos fundamentales?', 'Del artículo 11 al 44.', array['11', '44']::text[]),
  ('constitucion', '¿Qué mecanismo protege los derechos fundamentales de forma inmediata?', 'La acción de tutela.', array['tutela']::text[]),
  ('constitucion', '¿Qué acción es PREVENTIVA y la puede interponer una sola persona?', 'La acción popular (protege derechos colectivos).', array['popular']::text[]),
  ('constitucion', '¿Qué acción es INDEMNIZATORIA y requiere mínimo 20 personas?', 'La acción de grupo.', array['grupo']::text[]),
  ('constitucion', '¿Qué acción tutela la libertad personal ante una detención ilegal?', 'El habeas corpus.', array['habeas corpus', 'hábeas corpus']::text[]),
  ('constitucion', '¿En qué artículo está el derecho de petición?', 'En el artículo 23.', array['23']::text[]),
  ('constitucion', '¿Cuál es el principal mecanismo de participación ciudadana?', 'El voto.', array['voto', 'sufragio']::text[]),
  ('constitucion', '¿Qué mecanismo permite terminar el mandato de un alcalde o gobernador?', 'La revocatoria del mandato.', array['revocatoria']::text[]),
  ('constitucion', '¿Cuáles son las tres ramas del poder público?', 'Ejecutiva, Legislativa y Judicial.', array['ejecutiva', 'legislativa', 'judicial']::text[]),
  ('constitucion', '¿Quién está a la cabeza de la rama ejecutiva?', 'El Presidente de la República.', array['presidente']::text[]),
  ('constitucion', '¿Qué dos cámaras integran el Congreso?', 'El Senado y la Cámara de Representantes.', array['senado', 'cámara', 'camara']::text[]),
  ('constitucion', '¿Qué órgano ejerce el control fiscal del Estado?', 'La Contraloría General de la República.', array['contraloría', 'contraloria']::text[]),
  ('constitucion', '¿Qué órgano ejerce el control disciplinario de los servidores públicos?', 'La Procuraduría General de la Nación.', array['procuraduría', 'procuraduria']::text[]),
  ('constitucion', '¿Qué entidades conforman la organización electoral?', 'El Consejo Nacional Electoral y la Registraduría Nacional del Estado Civil.', array['consejo nacional electoral', 'registraduría', 'registraduria']::text[]),
  ('constitucion', '¿Cuál es el banco central y órgano autónomo del Estado?', 'El Banco de la República.', array['banco de la república', 'banco de la republica']::text[]),
  ('constitucion', '¿Qué tribunal integra la Jurisdicción Constitucional?', 'La Corte Constitucional.', array['corte constitucional']::text[]),
  ('cultura', '¿Cuáles son los colores de la bandera, de arriba a abajo?', 'Amarillo, azul y rojo.', array['amarillo', 'azul', 'rojo']::text[]),
  ('cultura', '¿Qué representa el color amarillo de la bandera?', 'La riqueza del suelo (también armonía y justicia).', array['riqueza', 'suelo', 'oro']::text[]),
  ('cultura', '¿Cuál es el lema nacional que aparece en el escudo?', '"Libertad y Orden".', array['libertad y orden']::text[]),
  ('cultura', '¿Quién diseñó el escudo nacional y en qué año?', 'Francisco de Paula Santander, en 1834.', array['santander', '1834']::text[]),
  ('cultura', '¿Quién escribió la letra del himno nacional?', 'El presidente Rafael Núñez (música de Oreste Síndici).', array['núñez', 'nuñez', 'nunez']::text[]),
  ('cultura', '¿En qué año se proclamó oficialmente el himno nacional?', 'En 1920.', array['1920']::text[]),
  ('cultura', '¿Cuál es el ave nacional de Colombia?', 'El cóndor de los Andes.', array['cóndor', 'condor']::text[]),
  ('cultura', '¿Cuál es la flor nacional de Colombia?', 'La orquídea Cattleya trianae.', array['cattleya', 'trianae']::text[]),
  ('cultura', '¿Cuál es el árbol nacional de Colombia?', 'La Palma de Cera del Quindío.', array['palma de cera', 'quindío', 'quindio']::text[]),
  ('cultura', '¿Cuál es el símbolo cultural de la nación (Ley 908 de 2004)?', 'El sombrero vueltiao (cultura Zenú).', array['sombrero vueltiao', 'vueltiao']::text[]),
  ('cultura', '¿Cuál es la moneda oficial de Colombia?', 'El peso colombiano (COP).', array['peso']::text[]),
  ('cultura', '¿Cuál es el plato típico del archipiélago de San Andrés?', 'El Rondón.', array['rondón', 'rondon']::text[]),
  ('cultura', '¿De qué región es originaria la bandeja paisa?', 'De la región Andina (Antioquia).', array['andina', 'antioquia']::text[]),
  ('cultura', '¿Cuál es el plato típico de los Llanos (Orinoquía)?', 'La mamona o ternera a la llanera.', array['mamona', 'ternera a la llanera']::text[]),
  ('cultura', '¿Qué carnaval es Patrimonio de la Humanidad de la UNESCO?', 'El Carnaval de Barranquilla.', array['barranquilla']::text[]),
  ('cultura', '¿En qué ciudad se celebra el Carnaval de Negros y Blancos?', 'En San Juan de Pasto (Nariño).', array['pasto']::text[]),
  ('cultura', '¿En qué ciudad es la Feria de las Flores con el desfile de silleteros?', 'En Medellín.', array['medellín', 'medellin']::text[]),
  ('cultura', '¿Qué música tradicional es característica de los Llanos Orientales?', 'El joropo.', array['joropo']::text[]),
  ('cultura', '¿Quién ganó el Nobel de Literatura en 1982 y con qué obra?', 'Gabriel García Márquez, con Cien años de soledad.', array['garcía márquez', 'garcia marquez', 'cien años de soledad']::text[]),
  ('cultura', '¿Cuál es considerado el "deporte rey" de Colombia?', 'El ciclismo.', array['ciclismo']::text[]);
