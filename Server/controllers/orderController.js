const Order = require("../models/Order");


// Create Order
const createOrder = async (req, res) => {
  try {

    const { products, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// Get Orders
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id
    })
      .populate("products.product");

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createOrder,
  getOrders,
};