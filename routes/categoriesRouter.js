import express from 'express';

import categoriesController from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getCategories);

categoriesRouter.post('/', categoriesController.postCategories);

export default categoriesRouter;
