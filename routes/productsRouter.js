import express from 'express';

import productsController from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.post('/', productsController.postProducts);

export default productsRouter;
