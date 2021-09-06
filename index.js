require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const donationBagRoutes = require("./routes/donationBag");
const foodItemRoutes = require("./routes/foodItem");
const donationRequestRoutes = require("./routes/donationRequest");

const app = express();

const DBURL =
  "mongodb+srv://admin:admin0307@fda.ja2cz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//DB Connection
mongoose
  .connect(process.env.DBURL || DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected!!");
  });

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//api routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", donationBagRoutes);
app.use("/api", foodItemRoutes);
app.use("/api", donationRequestRoutes);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
