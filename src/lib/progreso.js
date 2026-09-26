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
   ============================================================ */

const CLAVE = "colombiatest-progreso";

function vacio() {
  return {};
}

export function leerProgreso() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return vacio();
    const datos = JSON.parse(crudo);
    return datos && typeof datos === "object" ? datos : vacio();
  } catch (e) {
    // modo privado, almacenamiento bloqueado o JSON corrupto
    return vacio();
  }
}

/* Devuelve el progreso ya actualizado para que quien llama pueda
   pintar sin volver a leer de localStorage. */
export function registrarResultado(area, ok, total) {
  if (!area || !total) return leerProgreso();

  const pct = Math.round((ok / total) * 100);
  const progreso = leerProgreso();
  const previo = progreso[area];

  if (!previo || pct > previo.pct) {
    progreso[area] = { pct, ok, total, fecha: new Date().toISOString() };
    try {
      localStorage.setItem(CLAVE, JSON.stringify(progreso));
    } catch (e) {
      // sin almacenamiento el progreso vale solo para esta sesión
    }
  }

  return progreso;
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

/* Media de las áreas que tienen algún resultado. null si no hay ninguna:
   una media de cero áreas sería 0 % y daría a entender que se falló todo. */
export function mediaProgreso(progreso, claves) {
  const conDatos = claves.filter((k) => progreso[k]);
  if (conDatos.length === 0) return null;
  const suma = conDatos.reduce((n, k) => n + progreso[k].pct, 0);
  return { media: Math.round(suma / conDatos.length), areas: conDatos.length };
}
