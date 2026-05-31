import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import indexRouter from './routes/indexRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import productsRouter from './routes/productsRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
