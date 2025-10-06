const handleEventUpload = async (req, res) => {
  res.status(200).json({ message: "Yup, route was hit propaaa!" });
};

module.exports = handleEventUpload;
