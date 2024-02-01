const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/productMirrar");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variants: {
    type: [String],
    default: [],
  },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
