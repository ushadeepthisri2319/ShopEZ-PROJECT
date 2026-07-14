const Product = require("../models/Product");


// Get all products
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};




// Get single product by ID
const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);


    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.json(product);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};




// Add product
const addProduct = async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.status(201).json(product);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};




// Update product
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true
      }

    );


    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.json(product);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};




// Delete product
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );


    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.json({
      message: "Product deleted successfully"
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



module.exports = {

  getProducts,

  getProductById,

  addProduct,

  updateProduct,

  deleteProduct,

};