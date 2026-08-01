import { supabase } from "../lib/supabase";
import { BANCO_LOCAL } from "./bancoLocal";

// Devuelve el banco de preguntas. Si Supabase está configurado, lo lee de la
// tabla "preguntas"; si no (o si falla), cae al banco local incrustado.
// Forma de cada pregunta: { area, q, a, aceptadas }.
export async function cargarBanco() {
  if (!supabase) return BANCO_LOCAL;
  try {
    const { data, error } = await supabase
      .from("preguntas")
      .select("area_id, enunciado, respuesta, aceptadas");
    if (error || !data || data.length === 0) return BANCO_LOCAL;
    return data.map((r) => ({
      area: r.area_id,
      q: r.enunciado,
      a: r.respuesta,
      aceptadas: r.aceptadas || [],
    }));
  } catch {
    return BANCO_LOCAL;
  }
}
