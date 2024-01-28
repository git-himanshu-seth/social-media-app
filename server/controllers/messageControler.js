// controllers/messageController.js
const Group = require("../models/groupSchema");

// Create Message
const createMessage = async (req, res) => {
  try {
    const { sender, content, sender_name } = req.body;
    const groupId = req.params.groupId;
    const userId = sender; // Assuming you have middleware that sets the user ID in the request object

    // Check if the group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the sender is a member of the group
    if (!group.members.includes(sender) && group.admin.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "User is not a member of the group" });
    }

    // Check if the user is either the admin or a group member
    if (group.admin.toString() !== userId && !group.members.includes(userId)) {
      return res.status(403).json({
        message:
          "Permission denied. Only admin or group members can send messages.",
      });
    }

    // Create and add the message to the group
    const newMessage = {
      sender,
      content,
      sender_name: sender_name,
    };
    group.messages.push(newMessage);
    await group.save();

    res.status(201).json({ newMessage, status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const messageId = req.query.messageId;
    const userId = req.query.userId; // Assuming you have middleware that sets the user ID in the request object

    // Check if the group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Find the message
    const message = group.messages.find(
      (msg) => msg._id.toString() == messageId
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Check if the user is either the admin or the sender of the message
    if (
      group.admin.toString() !== userId &&
      message.sender.toString() !== userId
    ) {
      return res.status(403).json({
        message:
          "Permission denied. Only admin or sender can delete the message.",
      });
    }

    // Remove the message from the group
    const messageIndex = group.messages.findIndex(
      (msg) => msg._id.toString() == messageId
    );
    group.messages.splice(messageIndex, 1);
    await group.save();

    res.status(200).send({
      message: "Message deleted",
      message: group.messages,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Messages
const getMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    console.log(groupId);
    // Check if the group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is a member of the group
    // const userId = req.user.id; // Assuming you have middleware that sets the user ID in the request object
    // if (!group.members.includes(userId)) {
    //   return res
    //     .status(403)
    //     .json({ message: "User is not a member of the group" });
    // }

    // Return the messages
    res.status(200).json({ messages: group.messages, status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createMessage,
  deleteMessage,
  getMessages,
};
