// routes/orders.js
// =============================================
// POST /api/orders — Create Order
// =============================================
function createOrder(request, response) {
  const { supplyId, quantity, customerName, status } = request.body;

  // ===== GUARD CLAUSES — Validate FIRST =====

  // supplyId
  if (!supplyId) {
    return response.status(422).json({
      status: 422,
      error: "supplyId is required",
      field: "supplyId"
    });
  }
  // Optional: verify supply exists (referential check)
  // if (!supplyExists(supplyId)) return 422...

  // quantity
  if (quantity === undefined || quantity === null) {
    return response.status(422).json({
      status: 422,
      error: "quantity is required",
      field: "quantity"
    });
  }
  if (!Number.isInteger(quantity)) {
    return response.status(422).json({
      status: 422,
      error: "quantity must be a whole number",
      field: "quantity"
    });
  }
  if (quantity < 1 || quantity > 500) {
    return response.status(422).json({
      status: 422,
      error: "quantity must be between 1 and 500",
      field: "quantity"
    });
  }
  // Optional: check ≤ available stock

  // customerName
  if (!customerName) {
    return response.status(422).json({
      status: 422,
      error: "customerName is required",
      field: "customerName"
    });
  }
  if (typeof customerName !== "string") {
    return response.status(422).json({
      status: 422,
      error: "customerName must be text",
      field: "customerName"
    });
  }
  if (customerName.length < 2 || customerName.length > 100) {
    return response.status(422).json({
      status: 422,
      error: "customerName must be 2–100 characters",
      field: "customerName"
    });
  }

  // status
  const allowedStatuses = ["pending", "processed", "shipped", "completed", "cancelled"];
  if (!status) {
    return response.status(422).json({
      status: 422,
      error: "status is required",
      field: "status"
    });
  }
  if (!allowedStatuses.includes(status)) {
    return response.status(422).json({
      status: 422,
      error: "invalid status — allowed: pending, processed, shipped, completed, cancelled",
      field: "status"
    });
  }

  // ✅ VALIDATED — pass to controller/service
  // const newOrder = await orderController.create(request.body);
  // return response.status(201).json({ status: 201, data: newOrder });

  // TEMP success response (replace with your controller call)
  return response.status(201).json({
    status: 201,
    data: { id: "ORD001", supplyId, quantity, customerName, status }
  });
}

// =============================================
// PUT /api/orders/:id — Update Order
// =============================================
function updateOrder(request, response) {
  const { supplyId, quantity, customerName, status } = request.body;

  // ===== GUARD CLAUSES — Optional fields, validate IF provided =====
  if (supplyId !== undefined && !supplyId) {
    return response.status(422).json({ status: 422, error: "supplyId cannot be empty", field: "supplyId" });
  }

  if (quantity !== undefined) {
    if (!Number.isInteger(quantity)) {
      return response.status(422).json({ status: 422, error: "quantity must be a whole number", field: "quantity" });
    }
    if (quantity < 1 || quantity > 500) {
      return response.status(422).json({ status: 422, error: "quantity must be between 1 and 500", field: "quantity" });
    }
  }

  if (customerName !== undefined) {
    if (typeof customerName !== "string" || customerName.length < 2 || customerName.length > 100) {
      return response.status(422).json({ status: 422, error: "customerName must be 2–100 characters", field: "customerName" });
    }
  }

  if (status !== undefined) {
    const allowedStatuses = ["pending", "processed", "shipped", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return response.status(422).json({ status: 422, error: "invalid status", field: "status" });
    }
  }

  // ✅ VALIDATED — pass to controller
  return response.status(200).json({ status: 200, data: { id: request.params.id, ...request.body } });
}

// =============================================
// DELETE /api/orders/:id — Delete Order (AUTHORIZATION GUARD)
// =============================================
function deleteOrder(request, response) {
  const orderId = request.params.id;
  const currentUser = request.user; // from your auth middleware
  const order = findOrderById(orderId); // your DB lookup

  if (!order) {
    return response.status(404).json({ status: 404, error: "order not found", field: "id" });
  }

  // ===== AUTHORIZATION GUARD — Task 4 =====
  if (order.createdBy !== currentUser.id && currentUser.role !== "manager" && currentUser.role !== "admin") {
    return response.status(403).json({
      status: 403,
      error: "not allowed — only creator or manager may delete this order",
      field: null
    });
  }

  // ✅ AUTHORIZED — proceed to delete
  return response.status(200).json({ status: 200, data: null, message: "order deleted" });
}

// Stub — replace with your actual DB lookup
function findOrderById(id) {
  return { id, createdBy: "user-123" };
}

// Export your handlers
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder
};
