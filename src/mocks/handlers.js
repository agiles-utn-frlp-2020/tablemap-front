import { rest } from "msw";

const TABLES = [
  {
    position: { x: 10, y: 10 },
    isSelected: false,
    isOpen: false,
    name: "1",
    order: []
  },
  {
    position: { x: 100, y: 150 },
    isSelected: false,
    isOpen: true,
    name: "2",
    order: []
  }
];

const PRODUCTS = [
  {
    id: 1,
    title: "Cerveza IPA",
    price: 100,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Helles_im_Glas-Helles_%28pale_beer%29.jpg/150px-Helles_im_Glas-Helles_%28pale_beer%29.jpg"
  },
  {
    id: 2,
    title: "Cerveza SCOTCH",
    price: 100,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Helles_im_Glas-Helles_%28pale_beer%29.jpg/150px-Helles_im_Glas-Helles_%28pale_beer%29.jpg"
  }
];

export const handlers = [
  // Handles a GET /tables request
  rest.get("/api/v1/tables", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TABLES));
  }),

  rest.get("/api/v1/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(PRODUCTS));
  })
];
