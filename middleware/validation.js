// 📦 School Supply Store — Validation Guard Clauses
// Runs BEFORE controllers. Returns 422 on bad input, proceeds if valid.

// --------------------------
// Validation Rules Matrix
// --------------------------
// name     → Required, string, 2–60 chars
// qty      → Required, number, min 1, max 500
// price    → Required, number, min 0.01
// category → Optional, string, 2–30 chars

const allowedCategories = ["Paper", "Writing", "Tools", "Books", "General"];

// ✅ CREATE validation — ALL fields required
function validateCreateSupply(req, res, next) {
  const data = req.body;

  // ---- Presence Checks ----
  if (!data.name) {
    return res.status(422).json({
      status: 422,
      error: "name is required",
      field: "name"
    });
  }
  if (data.qty === undefined || data.qty === null) {
    return res.status(422).json({
      status: 422,
      error: "qty is required",
      field: "qty"
    });
  }
  if (data.price === undefined || data.price === null) {
    return res.status(422).json({
      status: 422,
      error: "price is required",
      field: "price"
    });
  }

  // ---- Type Checks ----
  if (typeof data.name !== "string") {
    return res.status(422).json({
      status: 422,
      error: "name must be text",
      field: "name"
    });
  }
  if (typeof data.qty !== "number") {
    return res.status(422).json({
      status: 422,
      error: "qty must be a number",
      field: "qty"
    });
  }
  if (typeof data.price !== "number") {
    return res.status(422).json({
      status: 422,
      error: "price must be a number",
      field: "price"
    });
  }

  // ---- Length / Range Checks ----
  if (data.name.trim().length < 2 || data.name.trim().length > 60) {
    return res.status(422).json({
      status: 422,
      error: "name must be 2–60 characters",
      field: "name"
    });
  }
  if (data.qty < 1 || data.qty > 500) {
    return res.status(422).json({
      status: 422,
      error: "qty must be between 1 and 500",
      field: "qty"
    });
  }
  if (data.price < 0.01) {
    return res.status(422).json({
      status: 422,
      error: "price must be at least 0.01",
      field: "price"
    });
  }

  // ---- Category Check (if provided) ----
  if (data.category) {
    if (typeof data.category !== "string" || data.category.trim().length < 2 || data.category.trim().length > 30) {
      return res.status(422).json({
        status: 422,
        error: "category must be 2–30 characters",
        field: "category"
      });
    }
    if (!allowedCategories.includes(data.category)) {
      return res.status(422).json({
        status: 422,
        error: "invalid category — allowed: " + allowedCategories.join(", "),
        field: "category"
      });
    }
  }

  // ✅ ALL VALID — pass cleaned data to controller
  req.validatedBody = {
    name: data.name.trim(),
    qty: data.qty,
    price: Number(data.price.toFixed(2)),
    category: data.category ? data.category.trim() : "General"
  };
  next();
}

// ✅ UPDATE validation — ALL fields OPTIONAL, but validated if provided
function validateUpdateSupply(req, res, next) {
  const data = req.body;

  // Reject empty update
  if (Object.keys(data).length === 0) {
    return res.status(422).json({
      status: 422,
      error: "at least one field required to update",
      field: null
    });
  }

  // ---- Validate name if provided ----
  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length < 2 || data.name.trim().length > 60) {
      return res.status(422).json({
        status: 422,
        error: "name must be 2–60 characters",
        field: "name"
      });
    }
  }

  // ---- Validate qty if provided ----
  if (data.qty !== undefined) {
    if (typeof data.qty !== "number" || data.qty < 1 || data.qty > 500) {
      return res.status(422).json({
        status: 422,
        error: "qty must be between 1 and 500",
        field: "qty"
      });
    }
  }

  // ---- Validate price if provided ----
  if (data.price !== undefined) {
    if (typeof data.price !== "number" || data.price < 0.01) {
      return res.status(422).json({
        status: 422,
        error: "price must be at least 0.01",
        field: "price"
      });
    }
  }

  // ---- Validate category if provided ----
  if (data.category !== undefined) {
    if (typeof data.category !== "string" || !allowedCategories.includes(data.category)) {
      return res.status(422).json({
        status: 422,
        error: "invalid category — allowed: " + allowedCategories.join(", "),
        field: "category"
      });
    }
  }

  // ✅ VALID — pass cleaned data
  req.validatedBody = {};
  if (data.name) req.validatedBody.name = data.name.trim();
  if (data.qty !== undefined) req.validatedBody.qty = data.qty;
  if (data.price !== undefined) req.validatedBody.price = Number(data.price.toFixed(2));
  if (data.category) req.validatedBody.category = data.category.trim();

  next();
}

// 🔒 Authorization Guard — for DELETE
function validateAdminOrOwner(req, res, next) {
  // For lab/demo: skip actual auth check — replace with real logic later
  // Example real logic:
  // const supply = suppliesData.findById(req.params.id);
  // if (!supply || supply.createdBy !== req.user.id && req.user.role !== "admin") {
  //   return res.status(403).json({ status: 403, error: "Not allowed", field: null });
  // }
  next();
}

module.exports = {
  validateCreateSupply,
  validateUpdateSupply,
  validateAdminOrOwner
};
