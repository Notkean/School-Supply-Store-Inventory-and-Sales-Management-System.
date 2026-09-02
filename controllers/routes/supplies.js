const express = require("express");
const router = express.Router();
const suppliesController = require("../controllers/suppliesController");

// Validation guards run FIRST (from Week 4)
router.post("/", validateCreateSupply, suppliesController.createSupply);
router.get("/", suppliesController.getAllSupplies);
router.get("/:id", suppliesController.getSupplyById);
router.put("/:id", validateUpdateSupply, suppliesController.updateSupply);
router.delete("/:id", validateAdminOrOwner, suppliesController.deleteSupply);

module.exports = router;
