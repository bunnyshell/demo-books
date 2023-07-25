const express = require("express");
const cors = require("cors");
const process = require("process");

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bunnyshell - Getting Started app" });
});

require("./app/routes/bunnystart.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
