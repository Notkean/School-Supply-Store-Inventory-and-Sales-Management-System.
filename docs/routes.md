# School Supply Store Inventory and Sales Management System

## Week 3 — Routing Skeleton

## Routing Table

### Product Management

| Method | Path | Handler | Story |
|---|---|---|---|
| GET | /products | listProducts | View product list |
| GET | /products/:id | showProduct | View one product |
| POST | /products | createProduct | Add product |
| PUT | /products/:id | updateProduct | Update product |
| DELETE | /products/:id | deleteProduct | Delete product |
| GET | /products/search | searchProducts | Search products |
| GET | /products/low-stock | listLowStockProducts | Monitor product quantity |

### Sales Management

| Method | Path | Handler | Story |
|---|---|---|---|
| GET | /sales | listSales | View sales transaction history |
| GET | /sales/:id | showSale | View one sales transaction |
| POST | /sales | createSale | Record a sales transaction |

### Reports

| Method | Path | Handler | Story |
|---|---|---|---|
| GET | /reports/inventory | generateInventoryReport | Generate inventory report |
| GET | /reports/sales | generateSalesReport | Generate sales report |

### Authentication

| Method | Path | Handler | Story |
|---|---|---|---|
| POST | /login | login | Validate username and password |
| POST | /logout | logout | Provide logout function |

---

## Standard Response Shape

All handlers should use one consistent response format.

Example:

{
  "status": 200,
  "data": {
    "message": "stub message"
  },
  "error": null
}

---

## Route Testing

### GET /products

Expected Status: 200

Actual Status: ______

Result: ______

Example Response:

```text
Write the actual response returned by your application here.
