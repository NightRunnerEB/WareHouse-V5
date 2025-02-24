import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel";

// GET /api/products
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const products = await getAllProducts(limit, offset);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ message: "Товар не найден" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// POST /api/products
export const createNewProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, category, quantity, price } = req.body;
    // Валидация
    if (!name || !description || !category || quantity == null || price == null) {
      res.status(400).json({ message: "Все поля обязательны" });
    }
    const newProduct = await createProduct({ name, description, category, quantity, price });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
export const updateExistingProduct: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, category, quantity, price } = req.body;
    // Валидация
    if (!name || !description || !category || quantity == null || price == null) {
      res.status(400).json({ message: "Все поля обязательны" });
    }
    const updated = await updateProduct(id, { name, description, category, quantity, price });
    if (!updated) {
      res.status(404).json({ message: "Товар не найден" });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
export const deleteExistingProduct: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ message: "Товар не найден" });
    }
    await deleteProduct(id);
    res.json({ message: "Удалено" });
  } catch (error) {
    next(error);
  }
};
