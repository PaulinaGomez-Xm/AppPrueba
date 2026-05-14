require("dotenv").config();

const express = require("express");
const productosRoutes = require("./routes/productos.routes");
const { probarConexion } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "API artículos de oficina",
    endpoints: {
      articulos: "GET /api/articulos",
      uno: "GET /api/articulos/:id",
      salud: "GET /api/salud",
    },
  });
});

app.get("/api/salud", async (req, res) => {
  try {
    await probarConexion();
    res.json({ ok: true, bd: "conectada" });
  } catch (err) {
    res.status(503).json({ ok: false, bd: "sin_conexion", detalle: err.message });
  }
});

app.use("/api/articulos", productosRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("[error global]", err);
  res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
});

(async () => {
  try {
    await probarConexion();
    console.log(
      `BD conectada en ${process.env.DB_HOST}:${process.env.DB_PORT || 3306} (${process.env.DB_NAME})`
    );
  } catch (err) {
    console.warn("Aviso: no se pudo conectar a la BD al iniciar:", err.message);
    console.warn("La API arrancará igualmente; revisa el .env y la red.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
  });
})();
