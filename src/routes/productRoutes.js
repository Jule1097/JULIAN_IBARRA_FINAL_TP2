import express from "express";
import { productMongoController } from "../controllers/productController.js";
import { apiKeyMiddleware } from "../middlewares/authMiddleware.js";

const productRouterMongo = express.Router();

productRouterMongo.get("/productos", productMongoController.getAllProducts);
productRouterMongo.get("/productos/:id", productMongoController.getProductById);  
productRouterMongo.post("/productos", productMongoController.createProduct);
productRouterMongo.put("/productos/:id", apiKeyMiddleware, productMongoController.updateProductStock);
productRouterMongo.delete("/productos/:id", apiKeyMiddleware,productMongoController.deleteProduct);

export default productRouterMongo;