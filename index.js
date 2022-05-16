const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoute = require("./routes/order");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/", orderRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
});
