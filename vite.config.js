import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Por defecto Vite incrusta en base64 todo lo que baje de 4 KB. Con las
    // miniaturas de fauna eso metía ~80 KB dentro del JS principal, que se
    // descarga en la primera visita aunque nadie abra la pestaña de Fauna.
    // A 0, cada imagen queda como fichero aparte y solo se pide cuando se ve.
    assetsInlineLimit: 0,
  },
});
