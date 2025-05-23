import messageModel from "../models/message.model.js";
import conversationModel from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "receiver user id is required", success: false });
    }
    const { message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ message: "message is required", success: false });
    }
    const senderId = req.user._id;
    const receiverId = id;
    //impossible scenario 😂👺⚡
    if (!senderId) {
      return res
        .status(400)
        .json({ message: "sender user id is required", success: false });
    }
    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json({
          message: "you can't send message to yourself",
          success: false,
        });
    }

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    await conversationModel.findOneAndUpdate(
      {
        participants: { $all: [senderId, receiverId] },
      },
      {
        $push: { messages: newMessage._id },
      }
    );

    const populatedMessage = await messageModel
      .findById(newMessage._id)
      .populate("senderId", "username avatar")
      .populate("receiverId", "username avatar");

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    return res
      .status(201)
      .json({
        message: "message sent successfully",
        success: true,
        data: newMessage,
      });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    if (!userToChatId) {
      return res
        .status(400)
        .json({ message: "receiver user id is required", success: false });
    }

    const senderId = req.user._id;

    if (!senderId) {
      return res
        .status(400)
        .json({ message: "sender user id is required", success: false });
    }

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate({
        path: "messages",
        populate: [
          {
            path: "senderId",
            select: "name avatar username",
          },
          {
            path: "receiverId",
            select: "name avatar username",
          },
        ],
      });

    return res
      .status(200)
      .json({
        message: "messages fethed successfully",
        success: true,
        data: conversation?.messages || [],
      });
  } catch (error) {
    next(error);
  }
};
