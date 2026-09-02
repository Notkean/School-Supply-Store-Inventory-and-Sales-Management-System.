// POST /api/supplies — Add New Supply
function addSupply(request, response) {
  const { name, category, quantity, price, supplierId } = request.body;

  // ===== GUARD CLAUSES — validate FIRST, logic LATER =====

  // Name
  if (!name) return response.status(422).json({ status: 422, error: "supply name is required", field: "name" });
  if (typeof name !== "string") return response.status(422).json({ status: 422, error: "name must be text", field: "name" });
  if (name.length < 2 || name.length > 80) return response.status(422).json({ status: 422, error: "name must be 2–80 characters", field: "name" });

  // Category
  const allowedCats = ["writing", "paper", "art", "equipment", "books", "other"];
  if (!category) return response.status(422).json({ status: 422, error: "category is required", field: "category" });
  if (!allowedCats.includes(category)) return response.status(422).json({ status: 422, error: "invalid category", field: "category" });

  // Quantity
  if (quantity === undefined || quantity === null) return response.status(422).json({ status: 422, error: "quantity is required", field: "quantity" });
  if (!Number.isInteger(quantity)) return response.status(422).json({ status: 422, error: "quantity must be a whole number", field: "quantity" });
  if (quantity < 0 || quantity > 9999) return response.status(422).json({ status: 422, error: "quantity must be 0–9999", field: "quantity" });

  // Price
  if (price === undefined || price === null) return response.status(422).json({ status: 422, error: "price is required", field: "price" });
  if (typeof price !== "number" || isNaN(price)) return response.status(422).json({ status: 422, error: "price must be a number", field: "price" });
  if (price < 0.01 || price > 999.99) return response.status(422).json({ status: 422, error: "price must be ₱0.01–₱999.99", field: "price" });

  // Supplier referential check
  if (!supplierId) return response.status(422).json({ status: 422, error: "supplier is required", field: "supplierId" });
  if (!supplierExists(supplierId)) return response.status(422).json({ status: 422, error: "supplier does not exist", field: "supplierId" });

  // ✅ ALL VALID — proceed to save
  // ... database logic ...
  return response.status(201).json({ id: newId, name, category, quantity, price, supplierId });
    }
// DELETE /api/supplies/:id — Sensitive action: only manager/admin can delete
function deleteSupply(request, response) {
  const supply = findSupplyById(request.params.id);
  const currentUser = request.user;

  if (!supply) return response.status(404).json({ status: 404, error: "supply not found", field: "id" });

  // ===== AUTHORIZATION GUARD =====
  if (currentUser.role !== "manager" && currentUser.role !== "admin") {
    return response.status(403).json({
      status: 403,
      error: "only managers may delete supply records",
      field: null
    });
  }

  // ✅ Authorized — proceed
  // ... delete logic ...
  }
