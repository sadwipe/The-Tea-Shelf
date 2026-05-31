import pool from './pool.js';

async function test() {
  console.log('Testing');
  const { rows } = await pool.query('SELECT * FROM category;');
  await pool.end();
  console.log(rows);
}

test();
