import { productUseCases} from "../use-cases/product.useCase.js";

export const productMongoController = {
  async getAllProducts(req, res) {
    try {
      const productsWithStock = await productUseCases.listAllProducts();

      if (!productsWithStock)
        return res.status(404).json({
          statusCode: 404,
          error: "No se encontraron productos con stock disponible",
        });

      return res.status(200).json({
        statusCode: 200,
        payload: productsWithStock,
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async createProduct(req, res) {
    try {
      const newProduct = req.body;
      const createdProduct = await productUseCases.createProduct(newProduct);

      return res.status(201).json({
        statusCode: 201,
        payload: createdProduct,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const findProduct = await productUseCases.getProductById(productId);

      if (!findProduct)
        return res.status(404).json({
          statusCode: 404,
          error: "Producto no encontrado",
        });

      return res.status(200).json({
        statusCode: 200,
        payload: findProduct,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async updateProductStock(req, res) {
    try {
      const productId = req.params.id;
      const { newStockAmount } = req.body;

      const updatedProduct = await productUseCases.updateProductStock(
        productId,
        newStockAmount
      );

      if (!updatedProduct)
        return res.status(404).json({
          statusCode: 404,
          error: "Producto no encontrado",
        });

      return res.status(200).json({
        statusCode: 200,
        payload: updatedProduct,
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await productUseCases.deleteProduct(productId);

      if (!deletedProduct)
        return res.status(404).json({
          statusCode: 404,
          error: "Producto no encontrado",
        });

      return res.status(200).json({
        statusCode: 200,
        payload: deletedProduct,
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};