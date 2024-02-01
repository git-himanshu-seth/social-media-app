const Group = require("../models/groupSchema");

// CREATE NEW GROUP
const createGroup = (req, res) => {
  const { name, userId, description, members } = req.body;
  if (members && members.length > 0) {
    let isUserExitInMembers = members.filter(
      (member) => member.user === userId
    );
    if (isUserExitInMembers) {
      return res
        .status(200)
        .json({ message: "UserId exist in memebers list", status: 400 });
    }
  }
  try {
    let newGroup = new Group({
      name,
      admin: userId,
      description,
      members: members,
    });
    newGroup.save().then((result) => {
      if (result) {
        return res.status(200).json({
          status: 200,
          message: `Group ${name} created successfully`,
          data: result,
        });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Internal Server Error" });
      }
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Internal Server Error", error: e });
  }
};

//GET ALL GROUPS LIST
const getAllGroups = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "UserId is required in params", status: 400 });
  }
  try {
    await Group.find({
      $or: [{ admin: userId }, { "members.user": userId }],
    })
      .populate("admin members.user messages.sender")
      .then((result) => {
        return res.status(200).json({
          message: result.length
            ? "Groups and messages retrived successfully"
            : "No group found",
          status: 200,
          data: result,
          length: result.length,
        });
      });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Internal Server Error", error: e });
  }
};

//UPDATE GROUP
const updateGroup = (req, res) => {
  const { name, description, groupId, userId } = req.body;
};

//SEND GROUP JOIN REQUEST
const sendJoinRequest = (req, res) => {
  const { userId, newMembers } = req.body;

  try {
  } catch (e) {}
};

//HANDLE REQUEST
const handleJoinRequest = (req, res) => {
  const { userId, status, groupId } = req.body;

  try {
  } catch (e) {}
};

//SEND MESSAGE
const sendGroupMessage = (req, res) => {
  const { message, userId, groupId } = req.body;

  try {
  } catch (e) {}
};

module.exports = {
  createGroup,
  getAllGroups,
  updateGroup,
  sendJoinRequest,
  handleJoinRequest,
  sendGroupMessage,
};
