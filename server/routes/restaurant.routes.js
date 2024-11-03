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

// Define the login route for restaurants
// This route handles POST requests to /restaurant/login
// It invokes the login method from the controller to authenticate a restaurant.
router.post("/restaurant/login", controller.login);

// Define the route for updating restaurant details
// This route handles PUT requests to /restaurant/:id
// The :id parameter represents the unique identifier of the restaurant to be updated.
// It invokes the update method from the controller to modify the restaurant's information.
router.put("/restaurant/:id", controller.update);

router.delete("/restaurant/:id", controller.delete);

router.get("/restaurant/:id", controller.getById);

module.exports = router;
