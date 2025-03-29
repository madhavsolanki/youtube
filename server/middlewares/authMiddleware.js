import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the token is provided or not
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user exists
    req.user = decoded;

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
