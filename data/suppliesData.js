// 📦 School Supply Store Inventory — Data Layer
// Handles storage, read, write — ONLY called by controllers

// In-memory "database" — resets on server restart (perfect for lab)
let supplies = [
  // Optional seed data — helps you test right away
  { id: 1, name: "Bond Paper", qty: 100, price: 45.5, category: "Paper" },
  { id: 2, name: "Pencils (Dozen)", qty: 50, price: 72.0, category: "Writing" }
];
let nextId = 3;

// ✅ CREATE
function save(data) {
  const newItem = {
    id: nextId++,
    name: data.name.trim(),
    qty: data.qty,
    price: Number(data.price.toFixed(2)),
    category: data.category ? data.category.trim() : "General"
  };
  supplies.push(newItem);
  return newItem;
}

// ✅ READ ALL
function findAll() {
  return [...supplies]; // Return copy so caller can't mutate internal data
}

// ✅ READ ONE by ID
function findById(id) {
  const numericId = Number(id);
  return supplies.find(item => item.id === numericId) || null;
}

// ✅ UPDATE by ID
function updateById(id, data) {
  const index = supplies.findIndex(item => item.id === Number(id));
  if (index === -1) return null;

  supplies[index] = {
    ...supplies[index],
    ...data,
    id: Number(id) // Never let ID change
  };
  return supplies[index];
}

// ✅ DELETE by ID
function deleteById(id) {
  const beforeLen = supplies.length;
  supplies = supplies.filter(item => item.id !== Number(id));
  return supplies.length < beforeLen;
}

module.exports = {
  save,
  findAll,
  findById,
  updateById,
  deleteById
};
