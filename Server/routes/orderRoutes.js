const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Create Order
router.post("/", protect, createOrder);

// Get Orders
router.get("/", protect, getOrders);

module.exports = router;