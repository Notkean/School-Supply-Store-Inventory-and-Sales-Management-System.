// tests/orders.test.js
const request = require("supertest");
const app = require("../app"); // ← path to your Express app entry

const BASE = "/api/orders";

// ─── Helpers ───────────────────────────────────────
const validOrder = {
  supplyId: "SUP001",
  quantity: 12,
  customerName: "Maria Santos",
  status: "pending"
};

// ─── POST /api/orders — Create ─────────────────────
describe("POST /api/orders — Create Order", () => {
  it("✅ creates order with valid data → returns 201 + order envelope", async () => {
    const res = await request(app).post(BASE).send(validOrder);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("status", 201);
    expect(res.body.data).toMatchObject({
      supplyId: "SUP001",
      quantity: 12,
      customerName: "Maria Santos",
      status: "pending"
    });
  });

  it("❌ rejects when supplyId missing → 422, field=supplyId", async () => {
    const { supplyId, ...missing } = validOrder;
    const res = await request(app).post(BASE).send(missing);

    expect(res.statusCode).toBe(422);
    expect(res.body.field).toBe("supplyId");
    expect(res.body.error).toBeDefined();
  });

  it("❌ rejects when quantity missing → 422, field=quantity", async () => {
    const { quantity, ...missing } = validOrder;
    const res = await request(app).post(BASE).send(missing);

    expect(res.statusCode).toBe(422);
    expect(res.body.field).toBe("quantity");
  });

  it("❌ rejects quantity as string → 422, field=quantity", async () => {
    const res = await request(app)
      .post(BASE)
      .send({ ...validOrder, quantity: "many" });

    expect(res.statusCode).toBe(422);
    expect(res.body.field).toBe("quantity");
  });

  it("❌ rejects quantity below 1 → 422", async () => {
    const res = await request(app)
      .post(BASE)
      .send({ ...validOrder, quantity: 0 });

    expect(res.statusCode).toBe(422);
  });

  it("❌ rejects quantity above 500 → 422", async () => {
    const res = await request(app)
      .post(BASE)
      .send({ ...validOrder, quantity: 999 });

    expect(res.statusCode).toBe(422);
  });

  it("❌ rejects missing customerName → 422, field=customerName", async () => {
    const { customerName, ...missing } = validOrder;
    const res = await request(app).post(BASE).send(missing);

    expect(res.statusCode).toBe(422);
    expect(res.body.field).toBe("customerName");
  });

  it("❌ rejects customerName too short → 422", async () => {
    const res = await request(app)
      .post(BASE)
      .send({ ...validOrder, customerName: "A" });

    expect(res.statusCode).toBe(422);
  });

  it("❌ rejects missing status → 422, field=status", async () => {
    const { status, ...missing } = validOrder;
    const res = await request(app).post(BASE).send(missing);

    expect(res.statusCode).toBe(422);
    expect(res.body.field).toBe("status");
  });

  it("❌ rejects invalid status value → 422", async () => {
    const res = await request(app)
      .post(BASE)
      .send({ ...validOrder, status: "returned" });

    expect(res.statusCode).toBe(422);
    expect(res.body.field).toBe("status");
  });
});

// ─── PUT /api/orders/:id — Update ────────────────────
describe("PUT /api/orders/:id — Update Order", () => {
  it("✅ updates partial fields → returns 200", async () => {
    const res = await request(app)
      .put(`${BASE}/ORD001`)
      .send({ status: "processed" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.status).toBe("processed");
  });

  it("❌ rejects invalid status on update → 422", async () => {
    const res = await request(app)
      .put(`${BASE}/ORD001`)
      .send({ status: "fake-status" });

    expect(res.statusCode).toBe(422);
  });

  it("❌ rejects negative quantity on update → 422", async () => {
    const res = await request(app)
      .put(`${BASE}/ORD001`)
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(422);
  });
});

// ─── DELETE /api/orders/:id — Authorization ───────────
describe("DELETE /api/orders/:id — Delete Order", () => {
  it("🔒 rejects delete by non-owner/non-manager → 403", async () => {
    const res = await request(app)
      .delete(`${BASE}/ORD001`)
      // .set("Authorization", "Bearer NON_OWNER_TOKEN") — uncomment if using auth

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe(403);
    expect(res.body.field).toBeNull();
  });

  it("❌ delete non-existent order → 404", async () => {
    const res = await request(app).delete(`${BASE}/INVALID_ID`);
    expect(res.statusCode).toBe(404);
  });
});
