const model = require("../models/productos.model");

function listar(req, res) {
  try {
    const datos = model.listarTodos();
    res.json({ ok: true, total: datos.length, articulos: datos });
  } catch (err) {
    res.status(500).json({ ok: false, mensaje: "Error al listar artículos" });
  }
}

function obtenerUno(req, res) {
  try {
    const item = model.obtenerPorId(req.params.id);
    if (!item) {
      return res.status(404).json({ ok: false, mensaje: "Artículo no encontrado" });
    }
    res.json({ ok: true, articulo: item });
  } catch (err) {
    res.status(500).json({ ok: false, mensaje: "Error al obtener artículo" });
  }
}

module.exports = {
  listar,
  obtenerUno,
};
