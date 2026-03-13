function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: "Internal server error",
    success: false,
  });
  console.log("[ERROR]: " + err.message);
}

module.exports = errorHandler;
