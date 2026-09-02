const { createSupply } = require("../controllers/suppliesController");

// Mock request/response helper
function mockReqRes(body = {}, params = {}) {
  const req = { validatedBody: body, params };
  const res = {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };
  return { req, res };
}

// 🟢 Happy Path — Valid item
test("createSupply adds a valid school supply item → returns 201", () => {
  const validItem = { name: "Bond Paper", qty: 50, price: 45.5, category: "Paper" };
  const { req, res } = mockReqRes(validItem);

  createSupply(req, res);

  expect(res.statusCode).toBe(201);
  expect(res.body.data.name).toBe("Bond Paper");
});

// 🔴 Validation Failure — Bad quantity
test("createSupply rejects zero quantity → returns 422", () => {
  const badItem = { name: "Pencils", qty: 0, price: 12.0, category: "Writing" };
  const { req, res } = mockReqRes(badItem);

  // Your validation guard catches this
  validateCreateSupply(req, res, () => {});

  expect(res.statusCode).toBe(422);
  expect(res.body.field).toBe("qty");
});

// ⚡ Edge Case — Missing required field
test("createSupply rejects missing name → returns 422", () => {
  const missingName = { qty: 10, price: 25.0, category: "Tools" };
  const { req, res } = mockReqRes(missingName);

  validateCreateSupply(req, res, () => {});

  expect(res.statusCode).toBe(422);
  expect(res.body.field).toBe("name");
});
