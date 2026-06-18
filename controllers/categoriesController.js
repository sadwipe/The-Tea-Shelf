function getCategories(req, res) {
  res.render('categories');
}

function postCategories(req, res) {
  res.send('Post Categories');
}

export default {
  getCategories,
  postCategories,
};
