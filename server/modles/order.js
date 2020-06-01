const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    cart: {
      items: [
        {
          product: { type: Object, required: true },
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderData: {
      name: String,
      phone: {
        type: Number,
        required: true,
      },
      orderMethod: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
