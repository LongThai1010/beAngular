function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "The user is not Authorized",
    });
  }

  return res.status(500).json({
    success: false,
    message: err,
  });
}

module.exports = errorHandler;
