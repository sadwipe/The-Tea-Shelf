import pool from './pool.js';

// GET Categories
async function getCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getCategory(category) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name ILIKE $1',
    [category],
  );
  return rows;
}

async function getCategoryIdByName(categoryName) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name = $1',
    [categoryName],
  );
  return rows[0].id;
}

// POST Categories
async function postCategory(category) {
  await pool.query('INSERT INTO categories (name, color) VALUES ($1, $2);', [
    category.name,
    category.color,
  ]);
}

// GET Products
async function getProducts(query) {
  const SQL = `
    SELECT
      p.*,
      c.name AS category,
      c.color AS "backgroundColor"
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE ($1::text[] IS NULL OR c.name = ANY($1))
    ORDER BY
      CASE WHEN $2 = 'price' AND $3 = 'asc' THEN p.price END ASC,
      CASE WHEN $2 = 'price' AND $3 = 'desc' THEN p.price END DESC,
      CASE WHEN $2 = 'name' AND $3 = 'asc' THEN p.name END ASC,
      CASE WHEN $2 = 'name' AND $3 = 'desc' THEN p.name END DESC;
    ;
  `;

  const { rows } = await pool.query(SQL, query);
  return rows;
}

async function getProductByName(name) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE name ILIKE $1',
    [name],
  );
  return rows;
}

async function getProductById(id) {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [
    id,
  ]);
  return rows[0];
}

async function getProductCategory(id) {
  const { rows } = await pool.query(
    'SELECT categories.name FROM categories JOIN products ON categories.id = products.category_id WHERE products.id = $1',
    [id],
  );
  return rows[0].name;
}

async function getProductColor(id) {
  const { rows } = await pool.query(
    'SELECT categories.color FROM categories JOIN products ON categories.id = products.category_id WHERE products.id = $1',
    [id],
  );
  return '#' + rows[0].color;
}

// POST Products
async function postProduct(product) {
  const categoryId = await getCategoryIdByName(product.category);
  await pool.query(
    'INSERT INTO products (category_id, name, price, stock, image_url) VALUES ($1, $2, $3, $4, $5)',
    [categoryId, product.name, product.price, product.stock, product.image_url],
  );
}

export default {
  getCategories,
  getCategory,
  postCategory,
  getProducts,
  getProductByName,
  getProductById,
  postProduct,
  getProductCategory,
  getProductColor,
};
