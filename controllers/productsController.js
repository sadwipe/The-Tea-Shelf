import db from '../db/queries.js';

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

// POST /products/new
function postNewProduct(req, res) {
  res.send('hello');
}

export default {
  getProducts,
  postProducts,
  getNewProductsForm,
  postNewProduct,
};
