const express = require("express");
const router = express.Router();
const suppliesController = require("../controllers/suppliesController");
// ↓ ADD THIS LINE to import your validation guards
const { validateCreateSupply, validateUpdateSupply, validateAdminOrOwner } = require("../middleware/validation");

// ✅ Pipeline: Route → Validation → Controller
router.post("/", validateCreateSupply, suppliesController.createSupply);
router.get("/", suppliesController.getAllSupplies);
router.get("/:id", suppliesController.getSupplyById);
router.put("/:id", validateUpdateSupply, suppliesController.updateSupply);
router.delete("/:id", validateAdminOrOwner, suppliesController.deleteSupply);

module.exports = router;
