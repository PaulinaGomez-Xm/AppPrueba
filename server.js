const express = require("express");
const productosRoutes = require("./routes/productos.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS: el frontend en CentOS (otra IP) puede consumir la API
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
    endpoints: { articulos: "GET /api/articulos", uno: "GET /api/articulos/:id" },
  });
});

app.use("/api/articulos", productosRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
