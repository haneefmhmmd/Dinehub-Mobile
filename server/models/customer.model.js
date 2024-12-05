const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

// Customer properties
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
  },
  username: {
    type: String,
    required: [true, "Please provide your username"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validator: [isEmail, "Please enter a valid email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Min length of password is 6"],
  },
});

// salting and hashing the password
customerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Handle login
customerSchema.statics.login = async function (email, password) {
  const customer = await this.findOne({ email });
  if (customer) {
    const isAuth = await bcrypt.compare(password, customer.password);
    if (isAuth) {
      return customer;
    }
    throw new Error("Incorrect password");
  } else {
    throw new Error("Email not found");
  }
};

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
