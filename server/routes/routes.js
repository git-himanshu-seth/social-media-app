const express = require("express");
const {
  signup,
  signin,
  getFriendList,
  handleFriendRequest,
  getFriendRequests,
  sendFriendRequest,
} = require("../controllers/userControler");
const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupControler");

const {
  createMessage,
  deleteMessage,
  getMessages,
} = require("../controllers/messageControler");

const appRoute = express.Router();

// signup routes
appRoute.route("/signup").post(signup);

// signin routes
appRoute.route("/signin").post(signin);
// friend requests routes
appRoute.route("/send-friend-request").post(sendFriendRequest);

// Route to get all friend requests for a user
appRoute.route("/get-friend-requests/:userId").get(getFriendRequests);

// Route to accept or reject a friend request
appRoute.route("/handle-friend-request").put(handleFriendRequest);

//GROUP ROUTES
appRoute.route("/chat_group").post(createGroup).get(getAllGroups);

//GROUP ROUTES
appRoute
  .route("/chat_group/:id")
  .get(getGroupById)
  .delete(deleteGroup)
  .put(updateGroup);

//  MESSAGE IN GROUP ROUTE
appRoute
  .route("/chat_group/message/:groupId")
  .post(createMessage)
  .get(getMessages)
  .delete(deleteMessage);
// GET FRIEND LIST ROUTE
appRoute.route("/friend_request/:id").get(getFriendList);

appRoute.route("/signin").post((req, res) => {
  res.status(200).json({ name: "himanshu seth" });
});

appRoute.route("/chats").post((req, res) => {
  res.status(200).json({ name: "himanshu seth" });
});

appRoute.route("/chat").post((req, res) => {
  res.status(200).json({ name: "himanshu seth" });
});

module.exports = appRoute;
