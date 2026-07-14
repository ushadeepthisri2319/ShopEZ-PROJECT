const Cart = require("../models/Cart");


// Get cart
const getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user._id
    }).populate("products.product");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Add to cart
const addToCart = async (req, res) => {
  try {

    const cart = await Cart.create(req.body);

    res.status(201).json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Remove cart
const removeFromCart = async (req, res) => {
  try {

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Cart removed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Update Quantity
const updateQuantity = async (req, res) => {
  try {

    const { cartId, productId } = req.params;
    const { quantity } = req.body;


    const cart = await Cart.findById(cartId);


    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }


    const productItem = cart.products.find(
      (item) => item.product.toString() === productId
    );


    if (!productItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }


    productItem.quantity = quantity;


    await cart.save();


    res.json({
      message: "Quantity updated successfully",
      cart,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
};