const apiResponse = require("../utils/apiRespone.js");

exports.about = async (req, res) => {
  try {
    res.status(200).json(apiResponse(true, "hallo, this from api"));
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500));
  }
}