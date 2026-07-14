const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Route imports

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to ShopEZ Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});