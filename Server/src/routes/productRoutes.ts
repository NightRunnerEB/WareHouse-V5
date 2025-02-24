import { Router } from "express";
import {
  getProducts,
  getProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createNewProduct);
router.put("/:id", updateExistingProduct);
router.delete("/:id", deleteExistingProduct);

export default router;
