import express from "express";
import { Router } from "express";
import Carts from "../entidades/carts.js";
import { pmg } from "../dao/product.manager.mg.js";
import { cmg } from "../dao/cart.manager.mg.js";

export const appCarts = Router();
appCarts.use(express.json());
appCarts.use(express.urlencoded({ extended: true }));


//creo un carrito
appCarts.post("/", async (req, res, next) => {
  try {
    const newcart = new Carts();
    const agregada = await cmg.addCart(newcart);
    res.json(agregada);
  } catch (error) {
    next(error);
  }
});


//muestro un carrito
appCarts.get("/:cid", async (req, res, next) => {
  try {
    const productosEnCarro = await cmg.getProductsInCartById(req.params.cid);
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
});


//le cargo productos al carrito
appCarts.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    await pmg.getProductById(req.params.pid);
  } catch (error) {
    return next(error);
  }
  try {
    const product = await cmg.addProductInCart(req.params.cid, req.params.pid);
    res.json(product);
  } catch (error) {
    next(error);
  }
});


//elimino un producto de un carrito
appCarts.delete("/:cid/product/:pid", async (req, res, next) => {
  try {
    await pmg.getProductById(req.params.pid);
  } catch (error) {
    return next(error);
  }
  try {
    const deleter = await cmg.delProductInCart(req.params.cid, req.params.pid);
    res.json(deleter);
  } catch (error) {
    return next(error);
  }
});


//actualizo un carrito
appCarts.put("/:cid", async (req, res, next) => {
  try {
    const productosEnCarro = await cmg.updateCart(req.params.cid, req.body);
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
});


//actualizo la cantidad de un producto en un carrito
appCarts.put("/:cid/product/:pid", async (req, res, next) => {
  try {
    const prod = await pmg.getProductById(req.params.pid);
    try {
      
      if (prod?.stock < req.body.quantity) {
        throw new Error("Not Enough Stock");
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
  try {
    const productupd = await cmg.updProductinCart(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.json(productupd);
  } catch (error) {
    next(error);
  }
});


//elimino todos los productos de un carrito
appCarts.delete("/:cid", async (req, res, next) => {
  try {
    const deleter = await cmg.delAllProductsInCart(req.params.cid);
    res.json(deleter);
  } catch (error) {
    return next(error);
  }
});