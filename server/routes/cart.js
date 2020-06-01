const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

router.get("/carts", isAuth, cartController.getCart);

module.exports = router;
