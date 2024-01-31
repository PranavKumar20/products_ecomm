const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/productMirrar");

const productSchema = mongoose.schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: float,
    required: true,
  },
  varients: {
    type: [String],
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
