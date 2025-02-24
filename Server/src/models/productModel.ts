import { pool } from "../db";

export interface Product {
  id?: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
}

export async function getAllProducts(limit: number, offset: number) {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return result.rows;
}

export async function getProductById(id: number) {
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
  return result.rows[0];
}

export async function createProduct(product: Product) {
  const { name, description, category, quantity, price } = product;
  const result = await pool.query(
    `INSERT INTO products (name, description, category, quantity, price)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, category, quantity, price]
  );
  return result.rows[0];
}

export async function updateProduct(id: number, product: Product) {
  const { name, description, category, quantity, price } = product;
  const result = await pool.query(
    `UPDATE products
     SET name=$1, description=$2, category=$3, quantity=$4, price=$5
     WHERE id=$6
     RETURNING *`,
    [name, description, category, quantity, price, id]
  );
  return result.rows[0];
}

export async function deleteProduct(id: number) {
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
  return true;
}
