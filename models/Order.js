const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        product: {
          _id: { type: String },
          title: { type: String},
          desc: { type: String },
          img: { type: String },
          categories: { type: Array },
          size: { type: String },
          color: { type: String },
          price: { type: Number },
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
