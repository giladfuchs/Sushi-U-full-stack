
const Item = require("../modles/item");

const Order = require("../modles/order");
const { error404, error422 } = require('../middleware/error-handler')

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    console.log(orders);

    res.status(200).json(orders);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    return next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {


    let items = await req.user.populate("cart.items.productId").execPopulate();
    items = items.cart.items.filter((i) => {
      return i.productId !== null;
    });
    if (items === null) items = [];
    items = items.map((i) => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });

    const order = new Order({
      orderData: req.body,
      cart: {
        items: items,
        sushi: req.user.cart.sushi,
        price: req.user.cart.price,
      },
      userId: req.user._id,
    });


    await req.user.clear(order);

    res.status(201).json(order);
  } catch (err) {
    console.log(err);

    return next(err);
  }
};

//only manager

exports.postItem = async (req, res, next) => {
  error422(req);

  const { imageUrl, title, content, price } = req.body;


  const post = new Item({
    title, content, imageUrl, price,
  });
  try {
    await post.save();

    res.status(201).json({
      msg: "create",
      post: post,


    });
  } catch (err) {
    return next(err);
  }
};

exports.getItem = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    error404(post)
    res.status(200).json({
      message: "post fetch",
      post: post,
    });
  } catch (err) {
    return next(err);
  }
};


exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  console.log(itemId);

  try {
    const post = await Item.findById(itemId);
    error404(post)



    await Item.findByIdAndRemove(itemId);


    res.status(200).json({
      message: "post delete",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
