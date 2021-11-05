const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

//Middlewares Import
const errorMiddleware = require("./middlewares/error");

app.use("/api/v1", product);

app.use("/api/v1", user);

app.use("/api/v1", order);

//middleware for error

app.use(errorMiddleware);

module.exports = app;
