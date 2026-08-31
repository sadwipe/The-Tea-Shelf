// GET /products
function getProducts(req, res) {
  res.render('products');
}

// POST /products
function postProducts(req, res) {
  res.send('Post products!');
}

// GET /products/new
function getNewProductsForm(req, res) {
  res.render('add-product');
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
