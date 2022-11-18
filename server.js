const express = require("express"); //framework of node.js
const morgan = require("morgan"); //for middlewere
const dotenv = require("dotenv"); // define the env file

dotenv.config({ path: ".env" }); // Embedd the env file to server.js file
const PORT = process.env.PORT || process.env.PORT2;
const {NODE_DEV} = process.env.NODE_DEV;

const dbConection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");


//const ApiError = require("./utils/ApiError");
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


// Mount Rout
app.use("/categories", categoryRoute); 
app.use('/subcategory',subCategoryRoute)
app.use('/brands',brandRoute)
app.use('/products',productRoute)
app.all("*", (req, res, next) => {
  res.status(404).json(`Can't find this Route ${req.originalUrl}`)
  //new ApiError(`Can't find this Route ${req.originalUrl}`, 404);
  //next();
});

// Global Error hundling middleware for express
app.use(globalError);

// @disc RUN the server || and write the message
const server = app.listen(PORT, () => {
  console.log(`app runnuig on PORT: ${PORT}`); 
});


// hundle all error out express app
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shatting down........");
    process.exit(1);
  });
});
