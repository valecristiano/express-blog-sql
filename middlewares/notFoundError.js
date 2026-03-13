function notFoundError(req, res, next) {
  res.status(404).json({
    message: "File not found",
    success: false,
  });
}

module.exports = notFoundError;
