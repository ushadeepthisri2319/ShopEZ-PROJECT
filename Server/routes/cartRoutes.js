const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Get Cart
router.get("/", protect, getCart);

// Add to Cart
router.post("/", protect, addToCart);

// Remove Cart
router.delete("/:id", protect, removeFromCart);

// Update Quantity
router.put("/:cartId/:productId", protect, updateQuantity);

module.exports = router;