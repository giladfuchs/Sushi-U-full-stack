const { error404, error422 } = require('../middleware/error-handler')

const Item = require("../modles/item");


exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    error404(items)
    res.status(200).json(items);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    return next(err);
  }
};

exports.addItemToCart = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId);
    error404(item)

    await req.user.addToCart(item);
    res.status(201).json();
  } catch (error) {
    return next(err);
  }
};

exports.addSushiToCart = async (req, res, next) => {
  try {
    await req.user.addSushiToCart(req.body);

    res.status(201).json();
  } catch (error) {
    return next(err);
  }
};

//only manager

exports.postItem = async (req, res, next) => {
  error422(req)

  const { imageUrl, title, content, price, userId } = req.body;


  const post = new Item({
    title,
    content,
    imageUrl,
    price,
    userId,
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

      post: post,
    });
  } catch (err) {
    return next(err);
  }
};


exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  try {


    await Item.findByIdAndRemove(itemId);


    res.status(201);

  } catch (err) {
    return next(err);
  }
};
