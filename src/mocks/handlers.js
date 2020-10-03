import { rest } from "msw";

const TABLES = [
  { position: { x: 10, y: 10 }, isSelected: false, isOpen: false, name: "1" },
  { position: { x: 100, y: 150 }, isSelected: false, isOpen: true, name: "2" }
];

export const handlers = [
  // Handles a GET /tables request
  rest.get("/api/v1/tables", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TABLES));
  })
];
