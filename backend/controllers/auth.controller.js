import usersModel from "../models/user.model.js";
import otpModel from "../models/otp.model.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  forgotPasswordEmailHtml,
  generateFiveDigitOTP,
  signupWelcomeEmailHtml,
} from "../utils/helpers.js";
import dotenv from "dotenv";
import request from "request";

dotenv.config();
const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const phoneReg = /^(\+98|0|0098)?9\d{9}$/;

//only works if user vpn is off
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  rateDelta: 20000,
  rateLimit: 5,
  secure: true,
  port: 465,
  logger: true,
  debug: true,
  tls: {
    rejectUnauthorized: false,
  },
});

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
      return res.status(400).json({
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
      email: email,
      phone,
      gender,
      avatar: gender === "male" ? boyAvatar : girlAvatar,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
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
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Chat App ⚡🤖",
      html: signupWelcomeEmailHtml(newUser.name.split(" ")[0]),
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

//send code to users by phone or  signin with email and password
export const signIn = async (req, res, next) => {
  try {
    const { phone, email , password } = req.body;
    if (!phone?.trim() && !email?.trim()) {
      return res.status(400).json({
        message: "Please provide email or phone number",
        success: false,
      });
    }
    const code = generateFiveDigitOTP();
    const date = new Date();
    const expTime = date.getTime() + 60_000; //exires in 60 sec
    if (phone) {
      if (!phoneReg.test(phone)) {
        return res
          .status(400)
          .json({ message: "Invalid phone number.", success: false });
      }
      const user = await usersModel.findOne({ phone });
      if (!user) {
        return res
          .status(400)
          .json({ message: "User not found.", success: false });
      }
      request.post(
        {
          url: "http://ippanel.com/api/select",
          body: {
            op: "pattern",
            user: "FREE09389829461",
            pass: "Faraz@2210427304",
            fromNum: "3000505",
            toNum: phone,
            patternCode: "216s18lgedyiryc",
            inputData: [{ "verification-code": code }],
          },
          json: true,
        },
        async function (error, response, body) {
          if (!error && response.statusCode === 200) {
            await otpModel.create({
              phone,
              code,
              expTime,
            });
            return res.status(201).json({
              message: "Code sent successfully.",
              success: true,
            });
          } else {
            return res.status(500).json({
              message: "Unkown Error.",
              success: true,
            });
          }
        }
      );
    }

    if (email) {
      if (!emailReg.test(email)) {
        return res.status(400).json({
          message: "Invalid email address.",
          success: false,
        });
      }
      if (!password.trim()) {
        return res.status(400).json({
          message: "Please provide password.",
          success: false,
        });
      }
      if (password.length < 6 || password.length > 20) {
        return res.status(400).json({
          message: "Password must be between 6 and 20 characters.",
          success: false,
        });
      }
      const user = await usersModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found.",
          success: false,
        });
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password.",
          success: false,
        });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.cookie("chat-app-token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      });
      user.password = undefined;
      return res.status(200).json({
        message: "User signed in successfully.",
        success: true,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};

//signin logic by code
export const verifyCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code?.trim() || code.length !== 5) {
      return res.status(400).json({
        message: "Please Enter The Valid Code",
        success: false,
      });
    }

    const otpRecord = await otpModel.findOne({ code });
    if (!otpRecord) {
      return res.status(404).json({
        message: "Invalid Code",
        success: false,
      });
    }

    if (otpRecord.expTime < Date.now()) {
      await otpModel.deleteOne({ _id: otpRecord._id });
      return res.status(401).json({
        message: "Code Is Expired",
        success: false,
      });
    }

    const user = await usersModel.findOne({
      $or: [{ email: otpRecord.email }, { phone: otpRecord.phone }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("chat-app-token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });

    await otpModel.deleteOne({ _id: otpRecord._id });
    user.password = undefined;
    return res.status(200).json({
      message: "Signed In Succesfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("VerifyCode Error:", error);
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    try {
      const token = req.cookies["chat-app-token"];
      if (!token) {
        return res
          .status(200)
          .json({ message: "No token provided", success: false });
      }
      res.clearCookie("chat-app-token", { path: "/", maxAge: 0 });
      return res
        .status(200)
        .json({ message: "User logged out successfully", success: true });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
export const me = async (req, res, next) => {
  try {
    const user = req.user;
    return res
      .status(200)
      .json({
        message: "Current User Fetched Succesfully",
        success: true,
        user,
      });
  } catch (error) {
    next(error);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email.trim()) {
      return res
        .status(400)
        .json({ message: "email is required", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "invalid email", success: false });
    }

    const user = await usersModel.findOne({
      email: email.trim(),
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await usersModel.findByIdAndUpdate(user._id, {
      resetToken: resetToken,
      resetTokenExpiry: new Date(Date.now() + 3600000),
    });

    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Recovery 🤖⚡",
      html: forgotPasswordEmailHtml(resetUrl , user.name),
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true,
      token: resetToken,
    });
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    if (!password.trim().length) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }
    if (password.trim().length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }
    const user = await usersModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token", success: false });
    }
    const hashedPassword = await hash(password, 12);
    await usersModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpiry: undefined,
    });
    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};