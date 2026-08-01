import { createClient } from "@supabase/supabase-js";

// Variables de entorno (ver .env.example). En Vite deben empezar por VITE_.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si aún no has configurado Supabase, la app sigue funcionando con el
// banco local (ver src/data/bancoLocal.js). Cuando definas las variables,
// se usará Supabase automáticamente.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const usandoSupabase = Boolean(supabase);
