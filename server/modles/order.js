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
      remark: String,

      orderMethod: {
        type: String,
        required: true,
      },

    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
