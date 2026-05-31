function getProducts(req, res) {
  res.send('Get products!');
}

function postProducts(req, res) {
  res.send('Post products!');
}

export default {
  getProducts,
  postProducts,
};
