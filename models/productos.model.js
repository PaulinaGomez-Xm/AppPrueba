/**
 * Datos de artículos de oficina (capa modelo).
 * En un proyecto real podría venir de una base de datos.
 */
const articulos = [
  { id: 1, nombre: "Resma papel A4", categoria: "Papelería", precio: 4.5, stock: 120 },
  { id: 2, nombre: "Bolígrafos azul (caja 50)", categoria: "Escritura", precio: 8.9, stock: 40 },
  { id: 3, nombre: "Grapadora metálica", categoria: "Oficina", precio: 12.0, stock: 15 },
  { id: 4, nombre: "Carpetas folio (pack 10)", categoria: "Archivo", precio: 6.25, stock: 60 },
  { id: 5, nombre: "Toner impresora HP", categoria: "Consumibles", precio: 45.0, stock: 8 },
];

function listarTodos() {
  return [...articulos];
}

function obtenerPorId(id) {
  const num = Number(id);
  return articulos.find((a) => a.id === num) || null;
}

module.exports = {
  listarTodos,
  obtenerPorId,
};
