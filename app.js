import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import indexRouter from './routes/indexRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import productsRouter from './routes/productsRouter.js';
import searchRouter from './routes/searchRouter.js';

// returns the absolute path of the "app.js" file
const __filename = fileURLToPath(import.meta.url);
// returns the "parent" directory of the app.js file (root directory)
const __dirname = path.dirname(__filename);

const app = express();

// used for parsing forms
app.use(express.urlencoded({ extended: true }));
// used to parse static files (fonts, css files)
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/search', searchRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
