import express from 'express';

import getHomepage from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/', getHomepage);

export default indexRouter;
