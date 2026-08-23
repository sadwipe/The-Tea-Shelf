import express from 'express';

import getProduct from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.get('/products', getProduct);

export default searchRouter;
