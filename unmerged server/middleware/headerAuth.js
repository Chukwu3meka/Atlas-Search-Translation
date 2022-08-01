const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[0] === "Bearer" &&
      req.headers["authorization"].split(" ")[1];

    // req.headers["authorization"].split(" ")[1];

    // if (req.headers["authorization"] && req.headers["authorization"].split(" ")[0] === "Bearer") {

    if (!token) return res.status(401).json("You're not authorized to access this page");

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json("Suspicious token");
      } else {
        const { session, name, role } = decoded;

        if (session && name && role) {
          if (req.originalUrl.includes("admin") && !["admin", "superAdmin"].includes(role)) return res.status(401).json("Invalid URL");
          return next();
        }

        res.status(401).json("Invalid token");
      }
    });
  } catch (err) {
    res.status(401).json("Autentication error");
  }
};
