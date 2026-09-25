import React, { useEffect, useState } from "react";

/* ============================================================
   ANILLO DE RESULTADO
   ------------------------------------------------------------
   El arco se dibuja y la cifra cuenta hacia arriba al montar. Es
   el único momento de la app que merece una animación larga: se ve
   una vez, al final de un test, y es el dato que el usuario vino
   a buscar.

   NO se usa requestAnimationFrame. En una pestaña en segundo plano
   —o en cualquier contexto que no esté componiendo— rAF no se
   ejecuta nunca, y el usuario se encontraría un 0 % clavado en
   lugar de su nota. El arco lo mueve una transición CSS, que si no
   corre deja igualmente el valor final; la cifra la cuenta un
   setInterval, que siempre termina.

   Con prefers-reduced-motion el valor final aparece de golpe.
   ============================================================ */

const DURACION = 900;
const PASOS = 30;

function reduceMovimiento() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
}

// desaceleración: rápido al principio, se asienta al final
const suavizar = (t) => 1 - Math.pow(1 - t, 3);

export default function Anillo({ pct, color, tamano = 200, grosor = 14 }) {
  const r = (tamano - grosor) / 2 - 2;
  const circunferencia = 2 * Math.PI * r;

  const directo = reduceMovimiento();
  const [valor, setValor] = useState(() => (directo ? pct : 0));
  const [dibujado, setDibujado] = useState(directo);

  useEffect(() => {
    if (directo) {
      setValor(pct);
      setDibujado(true);
      return;
    }

    // el arco arranca en el siguiente fotograma para que la transición
    // tenga un estado inicial del que partir
    const arranque = setTimeout(() => setDibujado(true), 30);

    let paso = 0;
    const tic = setInterval(() => {
      paso += 1;
      const t = paso / PASOS;
      setValor(Math.round(pct * suavizar(Math.min(1, t))));
      if (paso >= PASOS) clearInterval(tic);
    }, DURACION / PASOS);

    return () => {
      clearTimeout(arranque);
      clearInterval(tic);
    };
  }, [pct, directo]);

  const recorrido = circunferencia * (1 - (dibujado ? pct : 0) / 100);

  return (
    <div className="relative" style={{ width: tamano, height: tamano }}>
      <svg width={tamano} height={tamano} viewBox={`0 0 ${tamano} ${tamano}`} aria-hidden="true">
        <circle
          cx={tamano / 2}
          cy={tamano / 2}
          r={r}
          fill="none"
          stroke="var(--raised)"
          strokeWidth={grosor}
        />
        <circle
          cx={tamano / 2}
          cy={tamano / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={grosor}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={recorrido}
          transform={`rotate(-90 ${tamano / 2} ${tamano / 2})`}
          style={{ transition: `stroke-dashoffset ${DURACION}ms cubic-bezier(.22,.61,.36,1)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="tipo-display text-ink leading-none"
          style={{ fontSize: tamano * 0.27, letterSpacing: "-0.04em" }}
        >
          {valor}
        </span>
        <span className="text-ink-soft mt-1" style={{ fontSize: tamano * 0.075 }}>
          por ciento
        </span>
      </div>
    </div>
  );
}
