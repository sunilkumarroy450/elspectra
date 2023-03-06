const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./config/database");
const PORT = 8080;
const catRoute = require("./controllers/user.controller");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/cats", catRoute);
app.listen(PORT, async () => {
  try {
    await connection();
    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
