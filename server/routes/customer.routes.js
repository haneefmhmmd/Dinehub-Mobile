const router = require("express").Router();
const controller = require("../controllers/customer.controller");

router.post("/customer", controller.signup);
router.post("/customer/login", controller.login);
router.put("/customer/:id", controller.update);
router.delete("/customer/:id", controller.delete);
router.get("/customer", controller.getAll);
router.get("/customer/:id", controller.getById);

module.exports = router;
