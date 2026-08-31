import pool from './pool.js';

async function postCategory(data) {
  await pool.query('INSERT INTO categories (name, color) VALUES ($1, $2);', [
    data.name,
    data.color,
  ]);
}

async function getCategory(category) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name ILIKE $1',
    [category],
  );
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

export default {
  postCategory,
  getCategories,
  getCategory,
};
