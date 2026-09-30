import { query, body, validationResult, matchedData } from 'express-validator';

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
    .withMessage('Product name must be between 3 and 30 characters.'),

  body('price')
    .isFloat({ min: 1, max: 1000 })
    .withMessage('The price must be between 1 and 1000.'),

  body('stock')
    .isInt({ min: 1, max: 100000 })
    .withMessage('The stock must be between 1 and 100000.'),

  body('description')
    .trim()
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('Description must be between 5 and 200 characters.'),
];

// Validate POST /edit/:productId
const validateEditProduct = [
  body('price')
    .isFloat({ min: 1, max: 1000 })
    .withMessage('The price must be between 1 and 1000.'),

  body('description')
    .trim()
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('Description must be between 5 and 200 characters.'),

  body('stock')
    .isInt({ min: 1, max: 100000 })
    .withMessage('The stock must be between 1 and 100000.'),
];

// Validate GET /products/search
const validateSearch = [
  query('query')
    .trim()
    .matches(/^[A-Za-z ]+$/)
    .withMessage('The product name must only contain letters and spaces.')
    .isLength({ min: 2, max: 30 })
    .withMessage('Search query must be between 2 and 30 characters.'),
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

    const { name, price, stock, description } = matchedData(req);

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
      description,
      category: req.body.category,
      image_url: imageUrl,
    };

    await db.postProduct(product);
    res.redirect('/products');
  },
];

// POST /edit/:productId
const editProduct = [
  validateEditProduct,
  async (req, res) => {
    const errors = validationResult(req);

    const productId = req.params.productId;

    if (!errors.isEmpty()) {
      const categories = await db.getCategories();
      const product = await db.getProductById(productId);

      return res.status(400).render('pages/edit-product', {
        product,
        getContrastColor,
        categories,
        errors: errors.array(),
      });
    }

    const { price, stock, description } = matchedData(req);

    const category = req.body.category;
    const categoryId = await db.getCategoryIdByName(category);

    await db.updateProduct(productId, {
      categoryId,
      price,
      stock,
      description,
    });

    res.redirect(`/products/${productId}`);
  },
];

// GET /:productId
async function getProduct(req, res) {
  const { productId } = req.params;
  const product = await db.getProductById(productId);
  res.render('pages/product-details', {
    product,
    getContrastColor,
  });
}

// GET /delete/:productId
async function deleteProduct(req, res) {
  const { productId } = req.params;
  await db.deleteProduct(productId);
  res.redirect('/products');
}

// GET /edit/:productId
async function getEditProduct(req, res) {
  const { productId } = req.params;
  const product = await db.getProductById(productId);
  const categories = await db.getCategories();
  res.render('pages/edit-product', {
    product,
    getContrastColor,
    categories,
  });
}

// GET /search
const searchProducts = [
  validateSearch,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('pages/search-results', {
        products: [],
        errors: errors.array(),
        query: req.query.query || null,
      });
    }

    const { query } = matchedData(req);
    const products = await db.searchProducts(query);
    res.render('pages/search-results', {
      products,
      getContrastColor,
      query,
    });
  },
];

export default {
  getProducts,
  getNewProductsForm,
  postNewProduct,
  getProduct,
  deleteProduct,
  getEditProduct,
  editProduct,
  searchProducts,
};
