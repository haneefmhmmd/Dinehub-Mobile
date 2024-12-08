const router = require("express").Router();
const controller = require("../controllers/menu.controller");

// Routes for menu CRUD
router.post("/menu", controller.create);
router.get("/menu", controller.getAll);
router.get("/menu/category", controller.findItemsByCategory);
router.get("/menu/restaurant/:restaurantId", controller.findMenuByRestaurant);
router.get("/menu/:id", controller.getById);
router.put("/menu/:id", controller.update);
router.delete("/menu/:id", controller.delete);

module.exports = router;
