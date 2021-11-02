const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "Backend/config/config.env" });
require("./config/database");
app.listen(process.env.PORT, () => {
  console.log("server is running", process.env.PORT);
});
