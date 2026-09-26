import { body, validationResult, matchedData } from 'express-validator';

import db from '../db/queries.js';
import { upload } from '../middleware/upload.js';
import { getContrastColor } from '../utils/utils.js';

// GET /products
async function getProducts(req, res) {
  const rawCategories = req.query.category;
  const filteredCategories = rawCategories
    ? Array.isArray(rawCategories)
      ? rawCategories
      : [rawCategories]
    : null;

  let sortingCriteria = null;
  let sortingOrder = null;

  if (req.query.sort) {
    const [criteria, order] = req.query.sort.split(' ');
    sortingCriteria = criteria;
    sortingOrder = order;
  }

  const [categories, products] = await Promise.all([
    db.getCategories(),
    db.getProducts([filteredCategories, sortingCriteria, sortingOrder]),
  ]);

  res.render('pages/products', {
    products,
    categories,
    getContrastColor,
    query: req.query,
  });
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

// Wrapper for catching errors thrown by multer
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

    const existingProduct = await db.getProductByName(name);

    if (existingProduct.length !== 0) {
      const categories = await db.getCategories();

      return res.status(400).render('pages/add-product', {
        categories,
        errors: [{ msg: `The product ${name} already exists.` }],
      });
    }

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : '/images/default-tea.svg';

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

async function getProduct(req, res) {
  const { productId } = req.params;
  const product = await db.getProductById(productId);
  console.log(product);
  res.send('hello');
}

export default {
  getProducts,
  postProducts,
  getNewProductsForm,
  postNewProduct,
  getProduct,
};
