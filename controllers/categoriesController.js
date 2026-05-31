function getCategories(req, res) {
  res.send('Get Categories');
}

function postCategories(req, res) {
  res.send('Post Categories');
}

export default {
  getCategories,
  postCategories,
};
