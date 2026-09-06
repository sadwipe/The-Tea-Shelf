import pool from './pool.js';

async function postCategory(category) {
  await pool.query('INSERT INTO categories (name, color) VALUES ($1, $2);', [
    category.name,
    category.color,
  ]);
}

async function getCategory(category) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name ILIKE $1',
    [category],
  );
  return rows;
}

async function getProduct(name) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE name ILIKE $1',
    [name],
  );
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getCategoryIdByName(categoryName) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name = $1',
    [categoryName],
  );
  return rows[0].id;
}

async function postProduct(product) {
  const categoryId = await getCategoryIdByName(product.category);
  await pool.query(
    'INSERT INTO products (category_id, name, price, stock, image_url) VALUES ($1, $2, $3, $4, $5)',
    [categoryId, product.name, product.price, product.stock, product.image_url],
  );
}

export default {
  postCategory,
  getCategories,
  getCategory,
  postProduct,
  getProduct,
};
