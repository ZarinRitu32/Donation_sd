const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "No authorization token provided",
      });
    }

    const tokenParts = req.headers.authorization.split(" ");

    // Ensure it follows the "Bearer <token>" format
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Auth Failed - Invalid Token",
        });
      }

      req.body.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.log("Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
