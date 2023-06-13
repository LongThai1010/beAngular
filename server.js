const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const app = express();
const employeeRoutes = require("./routes/employee");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const ariaRoutes = require("./routes/area");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

// DATABASE
const mongoose = require("mongoose");
const db = require("./models/database");
db.connect();

// ------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(authJwt());
app.use(errorHandler);

app.use(`${config.API}/accounts`, employeeRoutes);
app.use(`${config.API}/projects`, projectRoutes);
app.use(`${config.API}/tasks`, taskRoutes);
app.use(`${config.API}/area`, ariaRoutes);

app.listen(config.PORT, (err) => {
  console.log(`Server is ready to listen on port ${config.PORT}`);
});
