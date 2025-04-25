import usersModel from "../models/user.model.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const phoneReg = /^(\+98|0|0098)?9\d{9}$/;

export const signUp = async (req, res, next) => {
  try {
    const { name, username, password, email, phone, gender } = req.body;
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !gender.trim()
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    if (!phoneReg.test(phone)) {
      return res
        .status(400)
        .json({ message: "Invalid phone number", success: false });
    }

    if (password.length < 6 || password.length > 20) {
      return res
        .status(400)
        .json({
          message: "Password must be between 6 and 20 characters",
          success: false,
        });
    }

    const user = await usersModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await hash(password, 12);
    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await usersModel.create({
      name,
      username,
      password: hashedPassword,
      email: email ? email : null,
      phone,
      gender,
      avatar: gender === "male" ? boyAvatar : girlAvatar,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("chat-app-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    newUser.password = undefined;
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const signOut = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const me = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const forgotPassword = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const resetPassword = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const changePassword = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const verifyCode = async (req, res, next) => {
  try {
  } catch (error) {}
};
