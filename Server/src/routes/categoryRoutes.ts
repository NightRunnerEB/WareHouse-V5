import { Router } from "express";
import {
  getCategories,
  getCategory,
  createNewCategory,
  updateExistingCategory,
  deleteExistingCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createNewCategory);
router.put("/:id", updateExistingCategory);
router.delete("/:id", deleteExistingCategory);

export default router;
