# Validation Rules — School Supply Store Inventory System

## Validation Matrix
| Route | Field | Validation Rules |
|---|---|---|
| **POST /supplies** | name | Required, string, 2–100 characters |
| | category | Required, string, 2–50 characters (e.g. pens, paper, notebooks) |
| | quantity | Required, number, 0–9999, integer only |
| | unitPrice | Required, number, ≥ 0, up to 2 decimal places |
| | status | Required, one of: `in-stock`, `low-stock`, `out-of-stock` |
| **PUT /supplies/:id** | name | Optional, string, 2–100 characters |
| | category | Optional, string, 2–50 characters |
| | quantity | Optional, number, 0–9999, integer only |
| | unitPrice | Optional, number, ≥ 0, up to 2 decimal places |
| | status | Optional, one of: `in-stock`, `low-stock`, `out-of-stock` |

---

## Standard Error Response Shape
```json
{
  "status": 422,
  "error": "clear human-readable message",
  "field": "field-name"
}
