const router = require("express").Router();
const controller = require("../controllers/restaurant.controller");

/**
 * Route for creating a new restaurant.
 * Expects restaurant details in the request body.
 * Uses the controller's `create` function to handle the request.
 */
router.post("/restaurant", controller.create);

/**
 * Route for retrieving all restaurants.
 * Uses the controller's `getAll` function to fetch and return all restaurants.
 */
router.get("/restaurant", controller.getAll);

module.exports = router;
