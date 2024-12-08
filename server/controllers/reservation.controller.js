require("dotenv").config();

const Reservation = require("../models/reservation.model");

//Creates new Reservation
exports.create = async (req, res) => {
  if (
    !req.body.restaurant ||
    !req.body.customerName ||
    !req.body.customerEmail ||
    !req.body.customerPhoneNumber ||
    !req.body.reservedDate ||
    !req.body.slotInterval ||
    !req.body.tableNumber
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const reservation = new Reservation({
      date: date,
      restaurant: req.body.restaurant,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhoneNumber: req.body.customerPhoneNumber,
      reservedDate: req.body.reservedDate,
      slotInterval: req.body.slotInterval,
      paymentInfo: req.body.paymentInfo,
      tableNumber: req.body.tableNumber,
      status: "Reserved",
    });

    const saveReservation = await reservation.save();

    return res.status(201).send({ savedReservation: saveReservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get all reservations
exports.getAll = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json({ reservations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get reservation by ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ reservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a reservation by ID
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update reservation by ID
exports.update = async (req, res) => {
  if (
    !req.body.restaurant ||
    !req.body.reservedDate ||
    !req.body.slotInterval ||
    !req.body.tableNumber
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  const { id } = req.params;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ updatedReservation: updatedReservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get all reservation by restaurant ID
exports.getReservationsByRestaurantId = async (req, res) => {
  const restaurantId = req.params.id;
  if (!restaurantId) {
    return res.status(400).json({
      error: "Restaurant ID is required!",
    });
  }
  try {
    const reservations = await Reservation.find({ restaurant: restaurantId });
    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ error: "Reservations not found for this Restaurant" });
    }
    res.json({ reservations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
