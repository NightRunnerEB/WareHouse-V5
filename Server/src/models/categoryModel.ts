import { pool } from "../db";

export interface Category {
  id?: number;
  name: string;
}

export async function getAllCategories() {
  const result = await pool.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
}

export async function getCategoryById(id: number) {
  const result = await pool.query("SELECT * FROM categories WHERE id=$1", [id]);
  return result.rows[0];
}

export async function createCategory(category: Category) {
  const { name } = category;
  const result = await pool.query(
    `INSERT INTO categories (name)
     VALUES ($1)
     RETURNING *`,
    [name]
  );
  return result.rows[0];
}

export async function updateCategory(id: number, category: Category) {
  const { name } = category;
  const result = await pool.query(
    `UPDATE categories
     SET name=$1
     WHERE id=$2
     RETURNING *`,
    [name, id]
  );
  return result.rows[0];
}

export async function deleteCategory(id: number) {
  await pool.query("DELETE FROM categories WHERE id=$1", [id]);
  return true;
}
