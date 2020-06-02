
const Item = require("../modles/item");
const User = require("../modles/user");

const Stripe = require('stripe');

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

exports.payment = async (req, res, next) => {


  const stripe = Stripe(process.env.STRIPE);

  let event;
  // const rawBody = { ...req.body.rawBody };



  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, req.get('stripe-signature'),
      'whsec_ubOcGGGzyu0cccWDpoM8BeotE1rN0Ocu'
    );
  } catch (error) {
    console.log(error.message);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }


  if (event.type === 'payment_intent.succeeded') {
    const session = event.data.object;


    try {

      console.log("userId", session.description);

      req.user = await User.findById(session.description)
      console.log(req.user);

      let items = await req.user.populate("cart.items.productId").execPopulate();
      items = items.cart.items.filter((i) => {
        return i.productId !== null;
      });
      if (items === null) items = [];
      items = items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });


      const order = new Order({
        orderData: { orderMethod: "take away", remark: "aa" },
        cart: {
          items: items,
          sushi: req.user.cart.sushi,
          price: req.user.cart.price,
        },
        userId: req.user._id,
      });

      await req.user.clear(order);
      res.status(200).send({ received: true });
    } catch (error) {
      console.log(error);

      res.status(404).send({ error, session });
    }
  }

};

// const urlStripe = "http://localhost:3000/"
const urlStripe = "https://sushiu.firebaseapp.com/"
const CURRENCY = 'eur';

const toCent = amount => amount * 100;
exports.postOrder = async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE);




  const lineItem = {
    name: req.user.name,
    amount: toCent(33),
    currency: CURRENCY,
    quantity: 1,
    // orderData: { ...req.body },
  };


  try {
    const session = await stripe.checkout.sessions.create({
      client_reference_id: "clientReferenceId",
      customer_email: req.user.email,
      payment_method_types: ['card'],
      line_items: [lineItem],
      payment_intent_data: {
        description: req.user._id.toString(),

      },
      success_url: urlStripe,
      cancel_url: urlStripe,
    });
    console.log("im here");




    res.status(201).json({ session });
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
