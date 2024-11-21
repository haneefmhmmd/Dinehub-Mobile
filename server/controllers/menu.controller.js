require("dotenv").config();

const Menu = require("../models/menu.model");

exports.create = async (req, res) => {
  if (!req.body.restaurant) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const { restaurant, menuName, menuItems } = req.body;

    const menu = new Menu({
      restaurant,
      menuName,
      menuItems,
    });

    const savedMenu = await menu.save();
    res.status(201).json({ savedMenu: savedMenu });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  if (!req.body.restaurant || !req.body.menuName || !req.body.menuItems) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const { id } = req.params;

    const existingMenu = await Menu.findById(id);

    if (!existingMenu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ updatedMenu: updatedMenu });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const menus = await Menu.find();

    if (!menus) {
      return res
        .status(404)
        .json({ error: "No menus found for specified restaurant" });
    }

    res.json({ menus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.json({ menu });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findItemsByCategory = async (req, res) => {
  try {
    const restaurantId = req.body.restaurantId;
    const categoryName = req.body.categoryName;

    // Find the menu for the specified restaurant
    const menu = await Menu.findOne({ restaurant: restaurantId });

    if (!menu) {
      return res
        .status(404)
        .json({ error: "Menu not found for this restaurant" });
    }

    const menuItemCategory = menu.menuItems.find(
      (item) => item.categoryName === categoryName
    );

    if (!menuItemCategory) {
      return res
        .status(404)
        .json({ error: "No items found under this category" });
    }

    res.json({ categoryItems: menuItemCategory.categoryItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ error: "Restaurant ID is required" });
    }

    const menu = await Menu.find({ restaurant: restaurantId });

    if (!menu) {
      return res.status(404).json({ error: "No menus in this restaurant" });
    }

    res.json({ restaurantMenu: menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
