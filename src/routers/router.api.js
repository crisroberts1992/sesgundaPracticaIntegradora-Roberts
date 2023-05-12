import express from "express";
import { Router } from "express";
import { appProducts } from "./router.products.js";
import { appCarts } from "./router.carts.js";
import { sesionesRouter } from "./router.sessions.js";
import { usuariosRouter } from "./router.users.js";


export const apiRouter = Router();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use("/products", appProducts);
apiRouter.use("/carts", appCarts);
apiRouter.use('/users', usuariosRouter)
apiRouter.use('/sessions', sesionesRouter)

apiRouter.use((error, req, res, next) => {
    if (error.message === 'AUTHENTICATION ERROR') {
      return res.sendStatus(401)
    }
    next(error)
  })