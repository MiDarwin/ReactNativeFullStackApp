const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    console.log("Decoded UserID:", decoded.userId); // Debug log
    req.userId = decoded.userId; // req.userId'yi ayarlıyoruz
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = auth;
