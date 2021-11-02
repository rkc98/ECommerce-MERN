const mongoose = require("mongoose");
// console.log("process", process.env.DBURL);
const connectdb = mongoose
  .connect(process.env.DBURL)
  .then((response) =>
    console.log("mongo db connected at", response.connection.host)
  )
  .catch((err) => console.log(err));

module.exports = connectdb;
