function getProducts(req, res) {
  res.render('products');
}

function postProducts(req, res) {
  res.send('Post products!');
}

export default {
  getProducts,
  postProducts,
};
