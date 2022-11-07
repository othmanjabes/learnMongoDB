const express = require("express"); //framework of node.js
const morgan = require("morgan"); //for middlewere
const dotenv = require("dotenv"); // define the env file
dotenv.config({ path: ".env" }); // Embedd the env file to server.js file
const PORT = process.env.PORT || process.env.PORT2;
const NODE_DEV = process.env.NODE_DEV;
const dbConection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/ApiError");
const globalError = require("./middleware/errorMiddleware");

// db connection
dbConection();

//express app
const app = express();

//middlewere
app.use(express.json());
if (NODE_DEV === "dev") {
  app.use(morgan("dev"));
  console.log(`mode is: ${NODE_DEV}`);
} else {
  console.log(`mode is ${NODE_DEV}`);
}

app.use("/categories", categoryRoute);

//Global Error Hundling middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this Route ${req.originalUrl}`, 404));
});

// Global Error hundling middleware for express
app.use(globalError);

// @disc RUN the server || and write the message
const server = app.listen(PORT, () => {
  console.log(`app runnuig on PORT: ${PORT}`); 
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shatting down........");
    process.exit(1);
  });
});
