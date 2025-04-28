import usersModel from "../models/user.model.js";

export const getUsersForSideBar = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    if (!currentUserId) {
      return res.status(400).json({
        message: "you should be logged in to see users for sidebar",
        suceess: false,
      });
    }
    const sidebarUsers = await usersModel.find({ _id: { $ne: currentUserId } }).select('-password')
    return res.status(200).json({
        message : "sidebar users fetched succesfully" ,
        success : true ,
        users : sidebarUsers
    });
  } catch (error) {
    next(error);
  }
};
