import express from 'express';

import categoriesController from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getCategories);

categoriesRouter.get('/new', categoriesController.getNewCategoriesForm);
categoriesRouter.post('/new', categoriesController.postNewCategory);

export default categoriesRouter;
