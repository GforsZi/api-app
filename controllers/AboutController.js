exports.about = async (req, res) => {
  try {
    res.send("hallo, this from api")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}