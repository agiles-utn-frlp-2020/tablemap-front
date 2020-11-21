import { rest } from "msw";

const TABLES = [
  {
    position: { x: 10, y: 10 },
    isOpen: false,
    name: "Mesa 1",
    orders: []
  },
  {
    position: { x: 10, y: 210 },
    isOpen: true,
    name: "Mesa 2",
    orders: []
  },

  {
    position: { x: 10, y: 410 },
    isOpen: true,
    name: "Mesa 3",
    orders: []
  },

  {
    position: { x: 210, y: 10 },
    isOpen: false,
    name: "Mesa 4",
    orders: []
  }
];

const PRODUCTS = [
  {
    id: 1,
    title: "Cerveza IPA",
    price: 120,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Helles_im_Glas-Helles_%28pale_beer%29.jpg/150px-Helles_im_Glas-Helles_%28pale_beer%29.jpg"
  },
  {
    id: 2,
    title: "Cerveza SCOTCH",
    price: 100,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Helles_im_Glas-Helles_%28pale_beer%29.jpg/150px-Helles_im_Glas-Helles_%28pale_beer%29.jpg"
  },

  {
    id: 3,
    title: "Papas",
    price: 70,
    image:
      "https://s1.eestatic.com/2015/03/10/cocinillas/Cocinillas_17008413_127305533_1706x1280.jpg"
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
