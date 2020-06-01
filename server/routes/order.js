const express = require("express");

const router = express.Router();
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

router.post("/order", isAuth, orderController.postOrder);

router.get("/orders", isAuth, orderController.getOrders);

module.exports = router;
