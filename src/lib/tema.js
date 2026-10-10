import { useCallback, useEffect, useState } from "react";

/* ============================================================
   TEMA CLARO / OSCURO
   ------------------------------------------------------------
   El tema elegido es lo ÚNICO que la app guarda en el navegador.
   Sigue sin haber cuentas, sesiones ni datos personales.

   Mientras no se elige nada, `data-theme` no existe y manda la
   preferencia del sistema vía @media (prefers-color-scheme).
   En cuanto se pulsa el botón, `data-theme` gana y se recuerda.
   El valor inicial ya se aplicó en index.html, antes de pintar.
   ============================================================ */

const CLAVE = "vueltiao-tema";

function temaDelSistema() {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// La barra de estado del móvil toma su color de <meta name="theme-color">.
// Con un tema forzado, el `media` del sistema ya no manda: se fija el mismo
// color en las dos metas para que la barra siga al botón, no al sistema.
const FONDO = { light: "#F2EADB", dark: "#17120E" };
function pintarBarra(tema) {
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", FONDO[tema]));
}

function temaActual() {
  return document.documentElement.dataset.theme || temaDelSistema();
}

export function useTema() {
  const [tema, setTema] = useState(temaActual);

  // Si nunca se ha elegido tema, seguimos al sistema cuando cambia.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const alCambiar = () => {
      if (!document.documentElement.dataset.theme) setTema(temaDelSistema());
    };
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, []);

  const alternar = useCallback(() => {
    const siguiente = temaActual() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = siguiente;
    pintarBarra(siguiente);
    try {
      localStorage.setItem(CLAVE, siguiente);
    } catch (e) {
      // modo privado o almacenamiento bloqueado: el tema vale para esta sesión
    }
    setTema(siguiente);
  }, []);

  return { tema, alternar };
}
