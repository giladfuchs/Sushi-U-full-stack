const express = require("express");

const router = express.Router();
const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

router.post("/order", isAuth, orderController.postOrder);

router.get("/orders", isAuth, orderController.getOrders);
router.post("/payment", orderController.payment);


module.exports = router;
