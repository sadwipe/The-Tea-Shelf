import 'dotenv/config';
import pg from 'pg';
import db from './config.js';

const { Client } = pg;

const SQL = `

DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  quantity_per_bag INT,
  price_per_bag NUMERIC(6, 2),
  stock INT,
  image_url VARCHAR(255)
);

INSERT INTO category (name) VALUES
('Green Tea'),
('Black Tea'),
('Plant Infused Tea');

INSERT INTO product (category_id, name, quantity_per_bag, price_per_bag, stock, image_url) VALUES
(1, 'Organic Jasmine Green', 20, 12.99, 50, '/images/jasmine-green.png'),
(1, 'Sencha Premium', 15, 14.50, 35, '/images/sencha.png'),
(2, 'Earl Grey Supreme', 20, 11.99, 60, '/images/earl-grey.png'),
(2, 'English Breakfast', 25, 9.99, 80, '/images/english-breakfast.png'),
(3, 'Chamomile Lavender', 20, 13.25, 45, '/images/chamomile.png'),
(3, 'Peppermint Herbal', 20, 10.50, 55, '/images/peppermint.png');
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    ...db,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done');
}

main();
