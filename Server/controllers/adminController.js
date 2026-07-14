const Admin = require("../models/Admin");


// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);

    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Admin
const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.json(admins);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  registerAdmin,
  getAdmin,
};