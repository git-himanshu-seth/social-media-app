const UserChat = require("../models/chatSchema");
const mongoose = require("mongoose");

const createChat = async (req, res) => {
  try {
    const objectId = new mongoose.Types.ObjectId();
    const { user, sender, message } = req.body;
    console.log(user, sender, message);
    const existingChat = await UserChat.findOne({ user, chat_id: objectId });
    if (existingChat) {
      existingChat.messages.push({
        message: {
          content: message,
          sender: user,
          timestamp: Date.now(),
        },
      });
      return res.status(200).json({
        message: "success",
        status: 200,
        data: message,
      });
    } else {
      let newChat;
      if (message) {
        newChat = new UserChat({
          user,
          sender,
          chat_id: objectId,
          messages: [
            {
              message: {
                content: message,
                sender: user,
                timestamp: Date.now(),
              },
            },
          ],
        });
      } else {
        newChat = new UserChat({
          user,
          sender,
          chat_id: objectId,
        });
      }

      await newChat.save();
      return res.status(200).json({
        message: "Chat created Successfully",
        status: 200,
        data: newChat,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { user, chat_id, message } = req.body;
    console.log(user, chat_id, message);

    const existingChat = await UserChat.findOne({ chat_id });
    if (!existingChat) {
      return res
        .status(404)
        .json({ message: "Chat not found for this user and chat_id" });
    }

    const newMessage = {
      content: message,
      timestamp: Date.now(),
      sender: user,
    };

    existingChat.messages.push({ message: newMessage });
    await existingChat.save();

    res.status(200).json({
      message: "Message sent successfully",
      status: 200,
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getChats = async (req, res) => {
  try {
    const { sender, user } = req.params;

    const chats = await UserChat.find({
      $or: [
        { sender: sender, user: user },
        { sender: user, user: sender },
      ],
    })
      .populate("user")
      .populate("sender");
    if (chats) {
      return res.status(200).json({
        message: "Chat retrive successfully",
        data: chats,
        status: 200,
      });
    } else {
      res.status(200).json({
        message: "!Opps no chat found start messaging now",
        data: [],
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteChats = async (req, res) => {
  try {
    const { chat_id } = req.params;

    const deletedChat = await UserChat.findOneAndDelete({ chat_id });

    if (!deletedChat) {
      return res
        .status(404)
        .json({ message: "Chat not found for this user and chat_id" });
    }

    res.status(200).json({ message: "Chat deleted successfully", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = { createChat, getChats, sendMessage, deleteChats };
