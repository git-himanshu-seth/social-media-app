const UserChat = require("./models/UserChat"); // Replace with the correct path to your UserChat model file

// Create a new UserChat
const createUserChat = async (req, res) => {
  try {
    const userChat = new UserChat(req.body);
    await userChat.save();
    res.status(200).json({ userChat, status: 200 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all UserChats
const getAllUserChats = async (req, res) => {
  try {
    const userChats = await UserChat.find();
    res.status(200).json({ userChats, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific UserChat by ID
const getUserChatById = async (req, res) => {
  try {
    const userChat = await UserChat.findById(req.params.id);
    if (!userChat) {
      return res.status(404).json({ message: "UserChat not found" });
    }
    res.status(200).json({ userChat, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific UserChat by ID
const updateUserChat = async (req, res) => {
  try {
    const userChat = await UserChat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!userChat) {
      return res.status(404).json({ message: "UserChat not found" });
    }
    res.status(200).json({ userChat, status: 200 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a specific UserChat by ID
const deleteUserChat = async (req, res) => {
  try {
    const userChat = await UserChat.findByIdAndDelete(req.params.id);
    if (!userChat) {
      return res.status(404).json({ message: "UserChat not found" });
    }
    res
      .status(200)
      .json({ message: "UserChat deleted successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserChat,
  getAllUserChats,
  getUserChatById,
  updateUserChat,
  deleteUserChat,
};
