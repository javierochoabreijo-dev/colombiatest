// Genera el QR del cierre como SVG: módulos oscuros sobre crema, con zona de silencio.
const QR = require("qrcode");
const fs = require("fs");
const path = require("path");

const URL_APP = "https://colombiatest.vercel.app/";
const DEST = path.join(__dirname, "qr.svg");

QR.toString(URL_APP, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#17120E", light: "#F5EFE6" },
}).then((svg) => {
  fs.writeFileSync(DEST, svg);
  console.log("QR listo:", DEST, svg.length, "bytes");
});
