import pool from './pool.js';

// GET Categories
async function getCategories() {
  const SQL = `
    SELECT name, color
    FROM categories
  `;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function getCategory(category) {
  const SQL = `
    SELECT *
    FROM categories
    WHERE name ILIKE $1
  `;

  const { rows } = await pool.query(SQL, [category]);
  return rows;
}

async function getCategoryIdByName(categoryName) {
  const SQL = `
    SELECT *
    FROM categories
    WHERE name = $1
  `;

  const { rows } = await pool.query(SQL, [categoryName]);
  return rows[0].id || null;
}

// POST Categories
async function postCategory(category) {
  const SQL = `
    INSERT
    INTO categories (name, color)
    VALUES ($1, $2);
  `;

  await pool.query(SQL, [category.name, category.color]);
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
  `;

  const { rows } = await pool.query(SQL, query);
  return rows;
}

async function getProductByName(name) {
  const SQL = `
    SELECT *
    FROM products
    WHERE name ILIKE $1
  `;

  const { rows } = await pool.query(SQL, [name]);
  return rows;
}

async function getProductById(id) {
  const SQL = `
    SELECT
      p.*,
      c.name AS category,
      c.color AS "backgroundColor"
    FROM products p
    LEFT JOIN categories c
    ON p.category_id = c.id
    WHERE p.id = $1;
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
}

async function getProductCategory(id) {
  const SQL = `
    SELECT categories.name
    FROM categories
    JOIN products ON categories.id = products.category_id
    WHERE products.id = $1
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows[0].name;
}

async function getProductColor(id) {
  const SQL = `
    SELECT categories.color
    FROM categories
    JOIN products
    ON categories.id = products.category_id
    WHERE products.id = $1
  `;

  const { rows } = await pool.query(SQL, [id]);
  return '#' + rows[0].color;
}

// POST Products
async function postProduct(product) {
  const SQL = `
    INSERT INTO products (category_id, name, description, price, stock, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  const categoryId = await getCategoryIdByName(product.category);

  await pool.query(SQL, [
    categoryId,
    product.name,
    product.description,
    product.price,
    product.stock,
    product.image_url,
  ]);
}

async function deleteProduct(productId) {
  const SQL = `
    DELETE FROM products
    WHERE id = $1
  `;

  await pool.query(SQL, [productId]);
}

async function updateProduct(productId, updates) {
  const { categoryId, price, stock, description } = updates;

  const SQL = `
    UPDATE products
    SET category_id = $1,
        description = $2,
        price = $3,
        stock = $4
    WHERE id = $5
  `;

  await pool.query(SQL, [categoryId, description, price, stock, productId]);
}

async function searchProducts(query) {
  const SQL = `
    SELECT p.*, c.color as "backgroundColor"
    FROM products p
    JOIN categories c
    ON p.category_id = c.id
    WHERE p.name ILIKE $1
  `;

  const { rows } = await pool.query(SQL, [`%${query}%`]);

  return rows;
}

export default {
  getCategories,
  getCategory,
  postCategory,
  getCategoryIdByName,
  getProducts,
  getProductByName,
  getProductById,
  postProduct,
  getProductCategory,
  getProductColor,
  deleteProduct,
  updateProduct,
  searchProducts,
};
