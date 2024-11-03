const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

// Sub-schema for address
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  postalCode: String,
  province: String,
  country: String,
});

// Sub-schema for business hours
const businessHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  openHours: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
});

// Sub-schema for seating arrangements
const seatingArrangementSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  tableCapacity: {
    type: Number,
    required: true,
  },
});

// Restaurant properties
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide restaurant name"],
  },
  businessEmail: {
    type: String,
    required: [true, "Please provide a business email"],
    unique: true,
    lowercase: true,
    validator: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Min length of password is 6"],
  },
  address: {
    type: addressSchema,
    default: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
    },
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide restaurant contact number"],
    minLength: [10, "Minimum length of phone number is 10 digits"],
    maxLength: [10, "Maximum length of phone number is 10 digits"],
  },
  url: {
    type: String,
    default: "",
  },
  bannerImageHref: {
    type: String,
    default: "",
  },
  logoHref: {
    type: String,
    default: "",
  },
  cuisine: {
    type: String,
    default: "",
    // required: [true, "Please provide the cuisine type"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    default: "",
    // required: [true, "Please description about your business"],
  },
  businessHours: [businessHoursSchema],
  seatingArrangements: [seatingArrangementSchema],
});

// salting and hashing the password
restaurantSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Handle login
restaurantSchema.statics.login = async function (businessEmail, password) {
  const restaurant = await this.findOne({ businessEmail });
  if (restaurant) {
    const isAuth = await bcrypt.compare(password, restaurant.password);
    if (isAuth) {
      return restaurant;
    }
    throw new Error("Incorrect password");
  } else {
    throw new Error("Email not found");
  }
};

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
