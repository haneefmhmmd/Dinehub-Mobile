require("dotenv").config();

const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model");
const { createToken } = require("../middlewares/utils");
const bcrypt = require("bcrypt");

/**
 * Creates a new restaurant and an associated default menu.
 * @param {Object} req - The request object containing restaurant details in req.body.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with created restaurant details or error message.
 */
exports.create = async (req, res) => {
  if (!req.body.name || !req.body.businessEmail || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    // Check if a restaurant with the same email already exists
    const checkRestaurant = await Restaurant.findOne({
      businessEmail: req.body.businessEmail,
    });

    if (checkRestaurant) {
      return res
        .status(500)
        .send({ message: "This restaurant already exists!" });
    }

    // Create new restaurant and save to the database
    const restaurant = new Restaurant(req.body);
    const savedRestaurant = await restaurant.save();

    // Create an initial default menu for the restaurant
    const menu = new Menu({
      restaurant: savedRestaurant._id,
      menuName: "Main",
      menuItems: [],
    });
    await menu.save();

    return res.status(201).send({ savedRestaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves all restaurants.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with list of all restaurants or error message.
 */
exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ restaurants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
