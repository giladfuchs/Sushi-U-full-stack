const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
      sushi: [
        {
          fish: [],
          veggie: [],
        },
      ],
      price: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
userSchema.methods.addSushiToCart = function (sushi) {
  const updatedCartSushi = [...this.cart.sushi];
  console.log(sushi);

  updatedCartSushi.push(sushi);

  this.cart.sushi = updatedCartSushi;
  return this.save();
};

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

userSchema.methods.clear = async function (order) {
  const session = await mongoose.model("User", userSchema).startSession();
  session.startTransaction();
  try {
    const opts = { session };
    await order.save(opts);

    const updatedorders = [...this.orders];
    updatedorders.push(order._id);
    this.orders = updatedorders;
    this.cart = { items: [], sushi: [], price: 0 };
    await this.save(opts);

    await session.commitTransaction();
    session.endSession();
    return true;
  } catch (error) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
module.exports = mongoose.model("User", userSchema);
