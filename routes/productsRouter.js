import express from 'express';

import productsController from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.post('/', productsController.postProducts);

productsRouter.get('/new', productsController.getNewProductsForm);
productsRouter.post('/new', productsController.postNewProduct);

export default productsRouter;
