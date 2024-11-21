require("dotenv").config();

const Customer = require("../models/customer.model");
const { createToken } = require("../middlewares/utils");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.username ||
    !req.body.email ||
    !req.body.phoneNumber ||
    !req.body.password
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const customer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });

    const checkCustomer = await Customer.findOne({
      email: req.body.email,
    });

    if (checkCustomer) {
      return res
        .status(500)
        .send({ message: err.message || "Error occurred while signing up." });
    }

    const saveCustomer = await customer.save();

    return res.status(201).send({ savedCustomer: saveCustomer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const email = req.body.email;
    const password = req.body.password;

    const checkCustomer = await Customer.findOne({ email });

    if (!checkCustomer) {
      return res.status(404).send({ message: "Customer not found!" });
    }
    const customer = await Customer.login(email, password);

    // Create and save token in cookie after successful login
    const token = createToken(customer._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...rest } = customer.toObject();

    res.status(200).json({
      customer: rest,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.username ||
    !req.body.email ||
    !req.body.phoneNumber ||
    !req.body.password
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  const { id } = req.params;

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ customer: updatedCustomer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json({ customers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
