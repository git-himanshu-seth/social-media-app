const express = require("express");
const passport = require("passport");
// require("../middlewares/AuthMiddleware");
const {
  signup,
  signin,
  getFriendList,
  handleFriendRequest,
  getFriendRequests,
  sendFriendRequest,
  getUsersList,
  getUserByGoogleId,
} = require("../controllers/userControler");

const {
  createChat,
  getChats,
  sendMessage,
  deleteChats,
} = require("../controllers/chatControlers");
const {
  createPost,
  getAllPosts,
  commentsAndLikes,
} = require("../controllers/postControlers");
const {
  createGroup,
  getAllGroups,
  updateGroup,
  sendJoinRequest,
  handleJoinRequest,
  sendGroupMessage,
} = require("../controllers/groupControler");

const appRoute = express.Router();

// signup routes
appRoute.route("/signup").post(signup);
appRoute.route("/users/:googleId").get(getUserByGoogleId);

// signin routes
appRoute.route("/signin").post(signin);

//GROUP ROUTES

//********************************************************************************************************************************************/
//GET USERS LISTS
appRoute.route("/users/:id").get(getUsersList);

// friend requests routes
appRoute.route("/send-friend-request").post(sendFriendRequest);

// GET FRIEND LIST ROUTE
appRoute.route("/friends/:id").get(getFriendList);

// Route to accept or reject a friend request
appRoute.route("/handle-friend-request").put(handleFriendRequest);

// Route to get all friend requests for a user
appRoute.route("/get-friend-requests/:userId").get(getFriendRequests);

//********************************************************************************************************************************************/

// POST ROUTES
//********************************************************************************************************************************************/

appRoute.route("/post").post(createPost);
appRoute.route("/posts/:userId").get(getAllPosts);
appRoute.route("/like_and_comments").post(commentsAndLikes);

// CHATS ROUTES
//********************************************************************************************************************************************/

appRoute.route("/chat").post(createChat);
appRoute.route("/chat/message").post(sendMessage);
appRoute.route("/chats/get_message/:user/:sender").get(getChats);
appRoute.route("/chats/:chat_id").delete(deleteChats);

// GROUP ROUTES
//********************************************************************************************************************************************/
appRoute.route("/create_group").post(createGroup);
appRoute.route("/get_groups/:userId").get(getAllGroups);
appRoute.route("/delete_group/:groupId").delete();
appRoute.route("/send_group_request").post();
appRoute.route("/handle_group_request").post();
appRoute.route("/group_message").post();

module.exports = appRoute;
