const mongoose = require("mongoose");
const Restaurant = require("./restaurant.model");
// const Customer = require("./customer.model");
const { isEmail } = require("validator");

/**
 * Schema for storing payment information related to a reservation.
 * Each field is validated to ensure correct payment details are provided.
 */
const paymentSchema = new mongoose.Schema({
  paymentDate: {
    type: String,
    required: [true, "Payment date required"],
  },
  paymentTime: {
    type: String,
    required: [true, "Payment time required"],
  },
  paymentAmount: {
    type: Number,
    required: [true, "Payment Amount required"],
  },
  paymentType: {
    type: String,
    required: [true, "Payment type required"],
  },
  cardNumber: {
    type: String,
    maxLength: [16, "Maximum length of password is 16"],
    minLength: [16, "Minimum length of password is 16"],
  },
  expiryDate: {
    type: String,
  },
});

/**
 * Main schema for reservations, containing information about the date, customer, restaurant,
 * and additional details like slot interval, table number, and payment information.
 */ const reservationSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Please provide the reservation date"],
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Please provide the restaurant"],
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  customerName: {
    type: String,
    required: [true, "Please provide customer name"],
  },
  customerEmail: {
    type: String,
    required: [true, "Please provide customer email"],
    lowercase: true,
    validator: [isEmail, "Please enter a valid email"],
  },
  customerPhoneNumber: {
    type: String,
    required: [true, "Please provide customer phone number"],
  },
  reservedDate: {
    type: String,
    required: [true, "Please provide reserved date"],
  },
  slotInterval: {
    type: String,
    required: [true, "Please provide your reservation slot"],
  },
  paymentInfo: [paymentSchema],
  tableNumber: {
    type: Number,
    required: [true, "Please provide your selected table"],
  },
  status: {
    type: String,
    required: [true, "Please provide the reservation status"],
  },
});

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;
