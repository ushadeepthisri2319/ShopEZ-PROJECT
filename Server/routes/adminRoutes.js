const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  getAdmin,
} = require("../controllers/adminController");


router.post("/register", registerAdmin);

router.get("/", getAdmin);


module.exports = router;