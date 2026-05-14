const model = require("../models/productos.model");

async function listar(req, res) {
  try {
    const datos = await model.listarTodos();
    res.json({ ok: true, total: datos.length, articulos: datos });
  } catch (err) {
    console.error("[listar] error consultando BD:", err.message);
    res.status(500).json({ ok: false, mensaje: "Error al listar artículos" });
  }
}

async function obtenerUno(req, res) {
  try {
    const item = await model.obtenerPorId(req.params.id);
    if (!item) {
      return res.status(404).json({ ok: false, mensaje: "Artículo no encontrado" });
    }
    res.json({ ok: true, articulo: item });
  } catch (err) {
    console.error("[obtenerUno] error consultando BD:", err.message);
    res.status(500).json({ ok: false, mensaje: "Error al obtener artículo" });
  }
}

module.exports = {
  listar,
  obtenerUno,
};
