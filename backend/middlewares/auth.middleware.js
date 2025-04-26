import jwt from "jsonwebtoken";
import usersModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    if (typeof process.env.JWT_SECRET !== "string") {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = req.cookies["chat-app-token"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", success: false });
    }

    const user = await usersModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not found", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};