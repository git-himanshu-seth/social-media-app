const Group = require("../models/groupSchema");

const sendJoinRequestByAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.params; // Assuming you pass group and user IDs as parameters

    // Check if the user making the request is the admin of the group
    const group = await Group.findOne({ _id: groupId, admin: req.user._id });
    if (!group) {
      return res
        .status(403)
        .json({ message: "You are not the admin of this group." });
    }

    // Check if the user to be invited exists
    const userToInvite = await User.findById(userId);
    if (!userToInvite) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is already a member or has a pending request
    if (
      group.members.includes(userToInvite._id) ||
      group.joinRequests.includes(userToInvite._id)
    ) {
      return res.status(400).json({
        message: "User is already a member or has a pending request.",
      });
    }

    // Add the user to the joinRequests array
    group.joinRequests.push(userToInvite._id);
    await group.save();

    return res
      .status(200)
      .json({ message: "Join request sent successfully.", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const acceptJoinRequest = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // Check if the user making the request is the admin of the group
    const group = await Group.findOne({ _id: groupId, admin: req.user._id });
    if (!group) {
      return res
        .status(403)
        .json({ message: "You are not the admin of this group." });
    }

    // Check if the user to be accepted exists
    const userToAccept = await User.findById(userId);
    if (!userToAccept) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has a pending join request
    if (!group.joinRequests.includes(userToAccept._id)) {
      return res
        .status(400)
        .json({ message: "User does not have a pending request." });
    }

    // Remove the user from joinRequests and add to members
    group.joinRequests = group.joinRequests.filter(
      (id) => id.toString() !== userToAccept._id.toString()
    );
    group.members.push(userToAccept._id);
    await group.save();

    return res
      .status(200)
      .json({ message: "Join request accepted successfully.", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const rejectJoinRequest = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // Check if the user making the request is the admin of the group
    const group = await Group.findOne({ _id: groupId, admin: req.user._id });
    if (!group) {
      return res
        .status(403)
        .json({ message: "You are not the admin of this group." });
    }

    // Check if the user to be rejected exists
    const userToReject = await User.findById(userId);
    if (!userToReject) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has a pending join request
    if (!group.joinRequests.includes(userToReject._id)) {
      return res
        .status(400)
        .json({ message: "User does not have a pending request." });
    }

    // Remove the user from joinRequests
    group.joinRequests = group.joinRequests.filter(
      (id) => id.toString() !== userToReject._id.toString()
    );
    await group.save();

    return res
      .status(200)
      .json({ message: "Join request rejected successfully.", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to create a new group
const createGroup = (req, res) => {
  const { name, description, admin, joinRequests } = req.body;

  Group.create({ name, description, admin, joinRequests })
    .then((group) => {
      res.status(201).json({ group, status: 200 });
    })
    .catch((error) => {
      if (error.name === "SequelizeUniqueConstraintError") {
        // Handle duplicate group creation error
        res
          .status(400)
          .json({ error: "Group with the same name already exists." });
      } else {
        // Handle other errors
        res.status(500).json({ error: error.message });
      }
    });
};

// Controller to get all groups
const getAllGroups = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required in the query string" });
    }

    // Find groups where the user is an admin or a member
    const groups = await Group.find({
      $or: [
        { admin: userId },
        { members: { $in: [userId] } }, // Check if userId is in the members array
      ],
    }).populate("admin members messages.sender", "username");

    res.status(200).json({ groups, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a specific group by ID
const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findById(groupId).populate(
      "admin members messages.sender",
      "username"
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ group, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a group by ID
const updateGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const { name, description, admin, newMember } = req.body;

    // Build the update object based on the fields that exist in req.body
    const updateObject = {};
    if (name) updateObject.name = name;
    if (description) updateObject.description = description;
    if (admin) updateObject.admin = admin;
    if (newMember) updateObject.$push = { members: newMember };

    const updatedGroup = await Group.findByIdAndUpdate(groupId, updateObject, {
      new: true,
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ group: updatedGroup, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a group by ID
const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const userIdFromQueryString = req.query.userId;

    if (!userIdFromQueryString) {
      return res
        .status(400)
        .json({ message: "User ID is required in the query string" });
    }

    // Check if the user making the request is the admin of the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.admin.toString() !== userIdFromQueryString) {
      return res.status(403).json({
        message: "Permission denied. Only the admin can delete the group.",
      });
    }

    // User is the admin, proceed with group deletion
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res
      .status(200)
      .json({ message: "Group deleted successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  sendJoinRequestByAdmin,
  acceptJoinRequest,
  rejectJoinRequest,
};
