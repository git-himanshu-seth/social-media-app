const Group = require("../models/groupSchema");

// Controller to create a new group
const createGroup = (req, res) => {
  const { name, description, admin, members } = req.body;

  Group.create({ name, description, admin, members })
    .then((group) => {
      res.status(201).json(group);
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

    res.status(200).json(groups);
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

    res.status(200).json(group);
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

    res.status(200).json(updatedGroup);
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
      return res
        .status(403)
        .json({
          message: "Permission denied. Only the admin can delete the group.",
        });
    }

    // User is the admin, proceed with group deletion
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
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
};
