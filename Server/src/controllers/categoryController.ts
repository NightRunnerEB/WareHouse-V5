import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../models/categoryModel";

// GET /api/categories
export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:id
export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const category = await getCategoryById(id);
    if (!category) {
        res.status(404).json({ message: "Категория не найдена" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// POST /api/categories
export const createNewCategory: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Название категории обязательно" });
    }
    const newCategory = await createCategory({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// PUT /api/categories/:id
export const updateExistingCategory: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Название категории обязательно" });
    }
    const updated = await updateCategory(id, { name });
    if (!updated) {
      res.status(404).json({ message: "Категория не найдена" });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id
export const deleteExistingCategory: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ message: "Категория не найдена" });
    }
    await deleteCategory(id);
    res.json({ message: "Удалено" });
  } catch (error) {
    next(error);
  }
};
