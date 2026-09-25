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

/* Media de las áreas que tienen algún resultado. null si no hay ninguna:
   una media de cero áreas sería 0 % y daría a entender que se falló todo. */
export function mediaProgreso(progreso, claves) {
  const conDatos = claves.filter((k) => progreso[k]);
  if (conDatos.length === 0) return null;
  const suma = conDatos.reduce((n, k) => n + progreso[k].pct, 0);
  return { media: Math.round(suma / conDatos.length), areas: conDatos.length };
}
