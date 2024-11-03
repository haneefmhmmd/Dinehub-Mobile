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

/**
 * Handles restaurant login by verifying business email and password.
 * 
 * @param {Object} req - The request object containing restaurant credentials.
 * @param {Object} res - The response object used to send responses back to the client.
 * @returns {Promise<void>} Sends back a response indicating the success or failure of the login attempt.
 */
exports.login = async (req, res) => {
  // Check if businessEmail and password are provided
  if (!req.body.businessEmail || !req.body.password) {
    return res.status(400).json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const businessEmail = req.body.businessEmail;
    const password = req.body.password;

    // Look for the restaurant in the database by businessEmail
    const checkRestaurant = await Restaurant.findOne({ businessEmail });

    // If restaurant not found, return a 404 error
    if (!checkRestaurant) {
      return res.status(404).send({ message: "Restaurant not found!" });
    }

    // Verify the restaurant's password
    const restaurant = await Restaurant.login(businessEmail, password);

    // If login failed (e.g., incorrect password), return an error message
    if (!restaurant) {
      return res.status(404).send({ message: "Error logging in!" });
    }

    // Create and save token in cookie after successful login
    const token = createToken(restaurant._id);

    res.cookie("jwt", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      maxAge: 3 * 24 * 60 * 60 * 1000, // Cookie expiration time (3 days)
    });

    // Exclude the password from the response object
    const { password: _, ...rest } = restaurant.toObject();

    // Respond with the restaurant data and the token
    res.status(200).json({
      restaurant: rest,
      token,
    });
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(400).json({ error: error.message });
  }
};

/**
 * Updates restaurant details based on the provided data.
 * 
 * @param {Object} req - The request object containing the updated restaurant information and the restaurant ID.
 * @param {Object} res - The response object used to send responses back to the client.
 * @returns {Promise<void>} Sends back a response indicating the success or failure of the update attempt.
 */
exports.update = async (req, res) => {
  // Check if all required fields are provided
  if (
    !req.body.name ||
    !req.body.businessEmail ||
    !req.body.password ||
    !req.body.address ||
    !req.body.contactNumber ||
    !req.body.cuisine ||
    !req.body.about
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  const { id } = req.params; // Extract the restaurant ID from request parameters

  try {
    // Hash the password if it is being updated
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update the restaurant in the database and return the updated document
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true, // Return the modified document rather than the original
    });

    // If restaurant not found, return a 404 error
    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Respond with the updated restaurant data
    res.json({ restaurant: updatedRestaurant });
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(400).json({ error: error.message });
  }
};
