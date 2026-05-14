const { pool } = require("../config/db");

async function listarTodos() {
  const [rows] = await pool.query(
    "SELECT id, nombre, categoria, precio, stock FROM articulos ORDER BY id ASC"
  );
  return rows.map(normalizar);
}

async function obtenerPorId(id) {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) return null;

  const [rows] = await pool.query(
    "SELECT id, nombre, categoria, precio, stock FROM articulos WHERE id = ? LIMIT 1",
    [num]
  );
  return rows.length ? normalizar(rows[0]) : null;
}

function normalizar(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    precio: Number(row.precio),
    stock: Number(row.stock),
  };
}

module.exports = {
  listarTodos,
  obtenerPorId,
};
