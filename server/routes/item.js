const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const itemController = require("../controllers/item");
const isAuth = require("../middleware/is-auth");

router.get("/items", itemController.getItems);

router.post(
  "/item/addtocart/:itemId",
  isAuth,
  itemController.addItemToCart
);
router.post("/items/addsushi", isAuth, itemController.addSushiToCart);

router.post(
  "/item",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  itemController.postItem
);

router.get("/item/:itemId", isAuth, itemController.getItem);


router.delete("/item/:itemId", itemController.deleteItem);

module.exports = router;
