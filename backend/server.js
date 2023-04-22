console.log("Loading Server js file");
const express   = require("express");
const colors    = require("colors");
const dotEnv    = require("dotenv").config();
const port      = process.env.PORT || 3000;
const app       = express();
const connectDB = require("./config/db");
const { errorHandler }  = require("./middleware/errorMiddleware");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// goal routes
app.use("/api/goals", require('./routes/goalRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Goal app | listening on port ${port}!`))

// app.listen(port, () => console.log(`ENV file setup with port ${port}`));