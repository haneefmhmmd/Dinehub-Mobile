const mongoose = require("mongoose");
const Restaurant = require("./restaurant.model");

// Menu Item sub-schema for menu items
const categoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price for menu item"],
  },
});

// Menu Item sub-schema for menu items
const menuItemSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please provide manu category"],
  },
  categoryItems: [categoryItemSchema],
});

// Menu properties
const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  menuName: {
    type: String,
  },
  menuItems: [menuItemSchema],
});

const Menu = mongoose.model("menu", menuSchema);

module.exports = Menu;
