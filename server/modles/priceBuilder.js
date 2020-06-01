const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceBuilderSchema = new Schema({
  fish: [
    {
      label: {
        required: true,
        type: String,
      },

      type: {
        required: true,
        type: String,
      },

      color: {
        required: true,
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("PriceBuilder", priceBuilderSchema);
