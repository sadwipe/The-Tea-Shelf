import { body, validationResult, matchedData } from 'express-validator';

import db from '../db/queries.js';
import { upload } from '../middleware/upload.js';

// GET /products
function getProducts(req, res) {
  res.render('pages/products');
}

// POST /products
function postProducts(req, res) {
  res.send('Post products!');
}

// GET /products/new
async function getNewProductsForm(req, res) {
  const categories = await db.getCategories();

  res.render('pages/add-product', { categories });
}

// Validate POST /products/new
const validateProduct = [
  body('name')
    .trim()
    .matches(/^[A-Za-z ]+$/)
    .withMessage('The product name must only contain letters and spaces.')
    .isLength({ min: 3, max: 30 })
    .withMessage(
      'The product name length must be between 3 and 30 characters.',
    ),

  body('price')
    .isFloat({ min: 1, max: 1000 })
    .withMessage('The price must be between 1 and 1000.'),

  body('stock')
    .isInt({ min: 1, max: 100000 })
    .withMessage('The price must be between 1 and 100000.'),
];

function catchMulterError(req, res, next) {
  upload.single('src')(req, res, async (err) => {
    if (err) {
      const categories = await db.getCategories();
      return res.status(400).render('pages/add-product', {
        categories,
        errors: [{ msg: err.message }],
      });
    }
    next();
  });
}

// POST /products/new
const postNewProduct = [
  catchMulterError,
  validateProduct,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getCategories();

      return res
        .status(400)
        .render('pages/add-product', { categories, errors: errors.array() });
    }

    const { name, price, stock } = matchedData(req);

    const existingProduct = await db.getProduct(name);

    if (existingProduct.length !== 0) {
      const categories = await db.getCategories();

      return res.status(400).render('pages/add-product', {
        categories,
        errors: [{ msg: `The product ${name} already exists.` }],
      });
    }

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : '/images/tea.jpg';

    const product = {
      name,
      price,
      stock,
      category: req.body.category,
      image_url: imageUrl,
    };

    await db.postProduct(product);
    res.redirect('/products');
  },
];

export default {
  getProducts,
  postProducts,
  getNewProductsForm,
  postNewProduct,
};
