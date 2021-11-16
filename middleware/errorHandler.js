const { StatusCodes } = require("http-status-codes");

async function errorHandler(err, req, res, next) {
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "An error has occurred", data: err });
}

module.exports = errorHandler;
