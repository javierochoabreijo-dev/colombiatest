/* ============================================================
   PROGRESO POR ÁREA
   ------------------------------------------------------------
   Lo segundo que la app guarda en el navegador, después del tema.
   Sigue sin haber cuentas, sesiones ni datos personales: son
   cuatro números que no salen de este dispositivo.

   Se guarda el MEJOR resultado de cada área, no el último, para
   que probar no penalice. Y se guarda en porcentaje porque los
   totales no son comparables entre sí: un test de área son 20
   preguntas y la porción de un simulacro son 5.

   Y se guarda POR MODO de respuesta. Con 3 opciones se acierta al
   azar 1 de cada 3, así que un 90 % en selección simple no vale lo
   que un 90 % escribiendo: sabiendo el 55 % y adivinando el resto
   ya salen 70 %. Mezclados en un solo número, el modo fácil taparía
   al difícil. Cada área guarda:  { escrita?: R, opciones?: R }  con
   R = { pct, ok, total, fecha }. La tarjeta enseña `escrita` si
   existe (es lo que mide el examen real) y si no, `opciones`.
   ============================================================ */

const CLAVE = "colombiatest-progreso";

function vacio() {
  return {};
}

/* Lo que hay en localStorage no es de fiar: lo pudo escribir una versión
   anterior, el usuario con las herramientas de desarrollo o un fallo a medias.
   Cada resultado tiene que ser {pct, ok, total} numéricos y coherentes; los que
   no lo sean se descartan en silencio, porque pintarlos daba "NaN %" y "/". */
const esNumero = (n) => typeof n === "number" && Number.isFinite(n);

export const MODOS = ["escrita", "opciones"];

function resultadoValido(r) {
  if (!r || typeof r !== "object") return null;
  const { pct, ok, total, fecha } = r;
  if (!esNumero(pct) || !esNumero(ok) || !esNumero(total)) return null;
  if (pct < 0 || pct > 100 || total <= 0 || ok < 0 || ok > total) return null;
  // sin fecha válida se omite la clave: haceCuanto(undefined) devuelve null
  return typeof fecha !== "string" || Number.isNaN(new Date(fecha).getTime())
    ? { pct, ok, total }
    : { pct, ok, total, fecha };
}

function limpiar(datos) {
  const limpio = {};
  for (const [area, entrada] of Object.entries(datos)) {
    if (!entrada || typeof entrada !== "object") continue;
    // Formato anterior: un único resultado plano. Era de respuesta escrita,
    // el único modo que existía entonces, y así se conserva.
    const porModo = "pct" in entrada ? { escrita: entrada } : entrada;
    const nuevo = {};
    for (const modo of MODOS) {
      const r = resultadoValido(porModo[modo]);
      if (r) nuevo[modo] = r;
    }
    if (Object.keys(nuevo).length) limpio[area] = nuevo;
  }
  return limpio;
}

export function leerProgreso() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return vacio();
    const datos = JSON.parse(crudo);
    return datos && typeof datos === "object" ? limpiar(datos) : vacio();
  } catch (e) {
    // modo privado, almacenamiento bloqueado o JSON corrupto
    return vacio();
  }
}

/* Devuelve el progreso ya actualizado para que quien llama pueda
   pintar sin volver a leer de localStorage. */
export function registrarResultado(area, ok, total, modo = "escrita") {
  if (!area || !total || !MODOS.includes(modo)) return leerProgreso();

  const pct = Math.round((ok / total) * 100);
  const progreso = leerProgreso();
  const previo = progreso[area]?.[modo];

  if (!previo || pct > previo.pct) {
    progreso[area] = {
      ...progreso[area],
      [modo]: { pct, ok, total, fecha: new Date().toISOString() },
    };
    try {
      localStorage.setItem(CLAVE, JSON.stringify(progreso));
    } catch (e) {
      // sin almacenamiento el progreso vale solo para esta sesión
    }
  }

  return progreso;
}

/* El resultado que enseña la tarjeta de un área: el de respuesta escrita si
   existe (lo que mide el examen real) y, si no, el de selección simple. Lleva
   `modo` para poder avisar de que no es comparable. */
export function resultadoVisible(entrada) {
  if (!entrada) return null;
  if (entrada.escrita) return { ...entrada.escrita, modo: "escrita" };
  if (entrada.opciones) return { ...entrada.opciones, modo: "opciones" };
  return null;
}

/* Borra todo el progreso. Si la app guarda datos, el usuario tiene que
   poder quitarlos, y sin enterrar el control en ningún menú. */
export function borrarProgreso() {
  try {
    localStorage.removeItem(CLAVE);
  } catch (e) {
    // sin almacenamiento no había nada que borrar
  }
  return vacio();
}

/* "hace 3 días" en vez de una fecha: lo que importa de un resultado viejo
   es que es viejo, no el día exacto. */
export function haceCuanto(iso) {
  if (!iso) return null;
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (Number.isNaN(dias) || dias < 0) return null;
  if (dias === 0) return "hoy";
  if (dias === 1) return "ayer";
  if (dias < 30) return `hace ${dias} días`;
  const meses = Math.floor(dias / 30);
  return meses === 1 ? "hace un mes" : `hace ${meses} meses`;
}

/* Media de las áreas que tienen algún resultado visible. null si no hay
   ninguna: una media de cero áreas sería 0 % y daría a entender que se falló
   todo. `conSeleccion` avisa de que alguna área cuenta con su resultado en
   selección simple, que no es comparable con el de respuesta escrita. */
export function mediaProgreso(progreso, claves) {
  const visibles = claves.map((k) => resultadoVisible(progreso[k])).filter(Boolean);
  if (visibles.length === 0) return null;
  const suma = visibles.reduce((n, r) => n + r.pct, 0);
  return {
    media: Math.round(suma / visibles.length),
    areas: visibles.length,
    conSeleccion: visibles.some((r) => r.modo === "opciones"),
  };
}
