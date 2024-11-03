require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const restaurantRoute = require("./routes/restaurant.routes");
const reservationRoute = require("./routes/reservation.routes");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const connectionString = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(connectionString, {
    dbName: "Restaurant",
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port : http://localhost:${PORT}`);
    });
  })

  .catch((err) => {
    console.log("Error connecting to MongoDB : ", err);

    process.exit();
  });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(restaurantRoute, reservationRoute);
