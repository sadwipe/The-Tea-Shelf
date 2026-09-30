import express from 'express';

import productsController from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/new', productsController.getNewProductsForm);
productsRouter.post('/new', productsController.postNewProduct);

productsRouter.get('/search', productsController.searchProducts);

productsRouter.get('/:productId', productsController.getProduct);

productsRouter.post('/delete/:productId', productsController.deleteProduct);

productsRouter.get('/edit/:productId', productsController.getEditProduct);
productsRouter.post('/edit/:productId', productsController.editProduct);

export default productsRouter;
