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
  sendJoinRequestByAdmin,
  acceptJoinRequest,
  rejectJoinRequest,
} = require("../controllers/groupControler");

const appRoute = express.Router();

// signup routes
appRoute.route("/signup").post(signup);
appRoute.route("/users/:googleId").get(getUserByGoogleId);

// signin routes
appRoute.route("/signin").post(signin);

//GROUP ROUTES
appRoute.route("/chat_group").post(createGroup).get(getAllGroups);
appRoute.route("/send_group_join").post(sendJoinRequestByAdmin);
appRoute.route("/accept_join_group").post(acceptJoinRequest);
appRoute.route("/reject_join_group").post(rejectJoinRequest);

//GROUP ROUTES
appRoute
  .route("/chat_group/:id")
  // .get(getGroupById)
  // .delete(deleteGroup)
  .put(updateGroup);

// FRIENDS ROUTES
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

module.exports = appRoute;
