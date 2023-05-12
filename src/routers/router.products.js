import express from "express";
import { Router } from "express";
import { socketFn } from "../mid/socketio.productrt.js";
import { pmg } from "../dao/product.manager.mg.js";
import { postProductController } from "../controllers/controller.post.products.js";
import { extraerCredenciales } from "../mid/autenticacionWeb.js";
import { soloAutenticados } from "../mid/autenticacionWeb.js";

export const appProducts = Router();
appProducts.use(express.json());
appProducts.use(express.urlencoded({ extended: true }));



appProducts.post("/", extraerCredenciales, soloAutenticados,postProductController);

// consultar productos todos o con limite desde el servidor

appProducts.get("/",extraerCredenciales, soloAutenticados, async (req, res, next) => {
  try {
    const urlsrt = `http://localhost:8080${req.originalUrl}`;
    console.log(urlsrt);
    const result = await pmg.getPagProducts(req.query, urlsrt);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

//obtener producto por ID

//A partir de aca debo agregar number al req.params.pid si cambio a persistencia en archivos

appProducts.get("/:pid",extraerCredenciales, soloAutenticados, async (req, res, next) => {
  try {
    const producto = await pmg.getProductById(req.params.pid);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

//editar un producto
appProducts.put("/:pid",extraerCredenciales, soloAutenticados, async (req, res, next) => {
  let upd;
  try {
    upd = { ...req.body };
  } catch (error) {
    return next(error);
  }
  try {
    const actualizada = await pmg.updateProduct(req.params.pid, upd);
    await socketFn();
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
});

//eliminar un producto
appProducts.delete("/:pid", extraerCredenciales, soloAutenticados, async (req, res, next) => {
  try {
    await pmg.deleteProduct(req.params.pid);
    await socketFn();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});