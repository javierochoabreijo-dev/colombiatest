/* Baraja una copia; el original no se toca.
   Vivía duplicada en App.jsx y CulturaSociedad.jsx. */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Si el sistema pide menos movimiento, las animaciones no solo se acortan:
   las que retienen al usuario (el destello antes de pasar de pregunta) se
   saltan enteras. Acortarlas dejaría el gesto igual de lento. */
export function reduceMovimiento() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
}
