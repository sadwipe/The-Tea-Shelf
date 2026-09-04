import 'dotenv/config';
import pg from 'pg';
import dbConfig from './config.js';

const { Client } = pg;

const SQL = `

  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;

  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    color CHAR(6) NOT NULL
  );

  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(6, 2),
    stock INT,
    image_url VARCHAR(255)
  );

  INSERT INTO categories (name, color) VALUES
  ('Green Tea',         '49eb34'),
  ('Black Tea',         '000000'),
  ('Plant Infused Tea', 'e3f792');

  INSERT INTO products (category_id, name, price, stock, image_url) VALUES
  (1, 'Organic Jasmine Green', 10,  1000, '/images/jasmine-green.png'),
  (1, 'Sencha Premium',        12,  1300, '/images/sencha.png'),
  (2, 'Earl Grey Supreme',     13,  2300, '/images/earl-grey.png'),
  (2, 'English Breakfast',      8,  3000, '/images/english-breakfast.png'),
  (3, 'Chamomile Lavender',    20,  2000, '/images/chamomile.png'),
  (3, 'Peppermint Herbal',      5,  6000, '/images/peppermint.png');
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    ...dbConfig,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done');
}

main();
