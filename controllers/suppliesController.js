// 📦 School Supply Store — Supplies Controller
// Receives VALIDATED data → calls data layer → returns standardized response

const suppliesData = require("../data/suppliesData");

// ✅ CREATE
function createSupply(req, res) {
  const data = req.validatedBody; // Already passed validation guards

  try {
    const newSupply = suppliesData.save(data);
    return res.status(201).json({
      status: 201,
      data: newSupply
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "Failed to add supply item",
      field: null
    });
  }
}

// ✅ READ ALL
function getAllSupplies(req, res) {
  const supplies = suppliesData.findAll();
  return res.status(200).json({
    status: 200,
    data: supplies
  });
}

// ✅ READ ONE by ID
function getSupplyById(req, res) {
  const supply = suppliesData.findById(req.params.id);
  if (!supply) {
    return res.status(404).json({
      status: 404,
      error: "Supply item not found",
      field: "id"
    });
  }
  return res.status(200).json({
    status: 200,
    data: supply
  });
}

// ✅ UPDATE
function updateSupply(req, res) {
  const data = req.validatedBody;
  const updated = suppliesData.updateById(req.params.id, data);
  return res.status(200).json({
    status: 200,
    data: updated
  });
}

// ✅ DELETE
function deleteSupply(req, res) {
  suppliesData.deleteById(req.params.id);
  return res.status(200).json({
    status: 200,
    data: { message: "Supply item deleted successfully" }
  });
}

module.exports = {
  createSupply,
  getAllSupplies,
  getSupplyById,
  updateSupply,
  deleteSupply
};
