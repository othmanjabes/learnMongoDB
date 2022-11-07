const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_DEV === "dev") {
    sendErrorDevMode(err,res)
}else{sendErrorDevProd(err,res) }
};

const sendErrorDevMode = (err, res) => {
  res.status(err.statusCode).json({
    isOperational: err.isOperational,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorDevProd = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };
  

module.exports = globalError;
