function getProducts(req, res) {
  res.render('products');
}

function postProducts(req, res) {
  res.send('Post products!');
}

function getNewProductsForm(req, res) {
  res.render('add-product');
}

export default {
  getProducts,
  postProducts,
  getNewProductsForm,
};
