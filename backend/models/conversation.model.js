import mongoose from "mongoose";

const schema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
      default: [],
    },
  ],
},{
    timestamps: true
});

const conversationModel =
  mongoose.models.conversation || mongoose.model("conversation", schema);

export default conversationModel;
