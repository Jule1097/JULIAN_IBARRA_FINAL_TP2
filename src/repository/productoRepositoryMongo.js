import MongooseConnection from '../database/mongo.cnx.js';
import Product from '../models/Producto.js';

export class ProductRepositoryMongo {
    constructor() {
        this.connection = new MongooseConnection();
        this.connection.connect(); 
    }

    async getProducts() {
        try {
            const products = await Product.find().sort({ _id: 1 });
            return products;
        } catch (error) {
            throw new Error(`Error al obtener productos con stock: ${error.message}`);
        }
    }

    async createProduct(newProduct) {
        try {
            const product = new Product(newProduct);
            const savedProduct = await product.save();
            return savedProduct;
        } catch (error) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);

            return product;  
        } catch (error) {
            throw new Error(`Error al obtener producto por ID: ${error.message}`);
        }
    }

    async updateProductStock(productId, newStockAmount) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { stockAmount: newStockAmount },
                { new: true } 
            );
            return updatedProduct;  
        } catch (error) {
            throw new Error(`Error al actualizar stock: ${error.message}`);
        }
    }

    async deleteProductFromDB(productId) {
        try {
            await Product.findByIdAndDelete(productId);
        } catch (error) {
            throw new Error(`Error al eliminar producto: ${error.message}`);
        }
    }
}