import { ProductRepositoryMongo } from '../repository/productoRepositoryMongo.js';
import { validateProductData } from '../utils/validateProductData.js';  
import { ProductDTO } from '../models/ProductoDTO.js';

const productRepositoryMongo = new ProductRepositoryMongo();

export const productUseCases = {
    
    async listAllProducts() {
        const productsWithStock = await productRepositoryMongo.getProducts();

        if(!productsWithStock || productsWithStock.length === 0) {
            return null;
        }

        return ProductDTO.fromArray(productsWithStock).map(dto => dto.toPlainObject());
    },

    async createProduct(newProduct) {
        const validProduct = validateProductData.onCreation(newProduct);
        const createdProduct = await productRepositoryMongo.createProduct(validProduct);

        const dto = new ProductDTO(createdProduct);
        return dto.toPlainObject();
    },

    async getProductById(productId) {
        const productExist = await productRepositoryMongo.getProductById(productId);

        if(!productExist) {
            return null;
        }

        const dto = new ProductDTO(productExist);
        return dto.toPlainObject();
    },

    async updateProductStock(productId, newStockAmount) {
        const productExist = await productRepositoryMongo.getProductById(productId);
        const validStockAmount = validateProductData.onUpdateStock(newStockAmount);

        if(!productExist || validStockAmount === null) {
            return null;
        }

        const updatedProduct = await productRepositoryMongo.updateProductStock(productExist._id, validStockAmount);

        const dto = new ProductDTO(updatedProduct);
        return dto.toPlainObject();
    },

    async deleteProduct(productId) {
        const productExist = await productRepositoryMongo.getProductById(productId);

        if(!productExist) {
            return null;
        }

        await productRepositoryMongo.deleteProductFromDB(productId);

        return true;
    }
};