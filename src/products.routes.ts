import express, { Request, Response } from "express";
import { Product, UnitProduct } from "./product.interface";
import * as database from "./products.database";
import { StatusCodes } from "http-status-codes";

export const productRouter = express.Router();

productRouter.get("/products", async (request: Request, response: Response) => {
 try {
  const allProducts = await database.findAll();
  if (!allProducts) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: "No products found."});
  }
  return response.status(StatusCodes.OK)
    .json({total: allProducts.length, allProducts});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

productRouter.get("/product/:id", 
  async (request: Request, response: Response) => {
 try {
  const product = await database.findOne(request.params.id);
  if (!product) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: "Product does not exist."});
  }
  return response.status(StatusCodes.OK).json({product});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

productRouter.post("/product", async (request: Request, response: Response) => {
 try {
  const { name, price, quantity, image } = request.body;
  if (!name || !price || !quantity || !image ) {
   return response.status(StatusCodes.BAD_REQUEST)
     .json({error: "Please provide all the required parameters."});
  }
  return response.status(StatusCodes.CREATED)
    .json(await database.create({...request.body}));
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

productRouter.put("/product/:id", async (request: Request, response: Response) => {
 try {
  const id = request.params.id;
  if (!(await database.findOne(id))) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: "Product does not exist."});
  }
  const updateProduct = await database.update(id, request.body);
  return response.status(StatusCodes.OK)
    .json(await database.update(id, request.body));
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

productRouter.delete("/product/:id", async (request: Request, response: Response) => {
 try {
  const getProduct = await database.findOne(request.params.id);
  if (!getProduct) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: `No product with id ${request.params.id}`});
  }
  await database.remove(request.params.id);
  return response.status(StatusCodes.OK).json({msg: "Product deleted."});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});
