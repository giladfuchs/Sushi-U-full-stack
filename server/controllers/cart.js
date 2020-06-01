exports.getCart = async (req, res, next) => {
  try {
    let items = await req.user.populate("cart.items.productId").execPopulate();

    // a temporery handle for no error need to add a transaction
    items = items.cart.items.filter((i) => {
      return i.productId !== null;
    });
    if (items === null) items = [];
    items = items.map((i) => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });

    res.status(200).json({
      sushi: req.user.cart.sushi,
      price: req.user.cart.price,
      items: items,
    });
  } catch (err) {

    return next(err);
  }
};
