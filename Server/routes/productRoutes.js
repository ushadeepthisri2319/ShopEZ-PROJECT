const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Test route
router.get("/test", (req, res) => {
  res.send("Product route working");
});


// Get all products
router.get("/", getProducts);


// Get single product
router.get("/:id", getProductById);


// Add product
router.post("/", protect, adminMiddleware, addProduct);


// Update product
router.put("/:id", protect, adminMiddleware, updateProduct);


// Delete product
router.delete("/:id", protect, adminMiddleware, deleteProduct);


module.exports = router;