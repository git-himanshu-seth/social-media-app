const express = require("express");
const {getAllPosts, likePost, addComment , createPost} =require("../controllers/postControlers")

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
  createGroup,
  getAllGroups,
  updateGroup,
  sendJoinRequestByAdmin,
  acceptJoinRequest,
  rejectJoinRequest,
} = require("../controllers/groupControler");

const {
  createMessage,
  deleteMessage,
  getMessages,
} = require("../controllers/messageControler");

const appRoute = express.Router();


appRoute.route("/signup").post(signup);
appRoute.route("/users").get(getUsersList);
appRoute.route("/users/:googleId").get(getUserByGoogleId);


appRoute.route("/signin").post(signin);

appRoute.route("/send-friend-request").post(sendFriendRequest);

appRoute.route("/get-friend-requests/:userId").get(getFriendRequests);

appRoute.route("/handle-friend-request").put(handleFriendRequest);

appRoute.route("/chat_group").post(createGroup).get(getAllGroups);
appRoute.route("/send_group_join").post(sendJoinRequestByAdmin);
appRoute.route("/accept_join_group").post(acceptJoinRequest);
appRoute.route("/reject_join_group").post(rejectJoinRequest);

appRoute
  .route("/chat_group/:id")
  // .get(getGroupById)
  // .delete(deleteGroup)
  .put(updateGroup);

//  MESSAGE IN GROUP ROUTE
appRoute
  .route("/chat_group/message/:groupId")
  .post(createMessage)
  .get(getMessages)
  .delete(deleteMessage);
// GET FRIEND LIST ROUTE
appRoute.route("/friends/:id").get(getFriendList);





appRoute.route("/chat").post((req, res) => {
  res.status(200).json({ name: "himanshu seth" });
});

// POSTS ROUTES 
appRoute.route("/post").post(createPost).get(getAllPosts)
appRoute.route("/post/like/:id").put(likePost);
appRoute.route("/post/comment/:id").put(addComment);



module.exports = appRoute;
