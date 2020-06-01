const express = require("express");

const router = express.Router();
const priceBuilderController = require("../controllers/priceBuilder");

router.get("/price", priceBuilderController.getPrice);


module.exports = router;
