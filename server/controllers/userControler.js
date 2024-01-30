const userModel = require("../models/userModel");
const Friendship = require("../models/friendSchema");
const FriendRequest = require("../models/friendRequestSchema");

const signup = async (req, res) => {
  const { uid , displayName, email } = req.body;
  console.log(req.body);
 let userExist = await  userModel.findOne({ email: email})  ;
 if (userExist) {
return res.status(200).json({
  message: "User already exists",
  data: {_id:userExist._id, googleId:userExist.googleId, ...req.body},
  status: 200,
});
 }else{
  userModel
    .create({name:displayName, googleId: uid, email})
    .then((result) => {
      Friendship.create({ user_id: result._id, friends: [] });
      res.status(200).json({
        message: "User created successfully",
        data: {...result, ...req.body},
        status: 200,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error:", err.message);
        res
          .status(400)
          .json({ message: "Validation Error", error: err.message });
      } else {
        console.error("Error creating user:", err);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
    });
  }
};

const signin = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User signed in successfully",
        data: user,
        status: 200,
      });
    })
    .catch((err) => {
      console.error("Error signing in user:", err);

      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    });
};

const getFriendList = (req, res) => {
  Friendship.findOne({ user_id: req.params.id })
    .populate("friends", "name email") 
    .then((list) => {
      if (list) {
        res.status(200).json({
          message: "get friends list successfully",
          success: true,
          data: list.friends,
          length: list.friends.length,
          status: 200,
        });
      } else {
        res.status(404).json({
          message: "Friendship not found",
          success: false,
          status: 404,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        status: 500,
      });
    });
};
const getUserByGoogleId = async (req, res) => {
  const { googleId } = req.params;

  try {
    const user = await userModel.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({status:200, message:'User login successfully',data:user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sendFriendRequest = (req, res) => {
  const { senderId, receiverId } = req.body;

  
  FriendRequest.findOne({ sender: senderId, receiver: receiverId })
    .then((existingRequest) => {
      if (existingRequest) {
        res.status(400).json({ message: "Friend request already sent" });
      } else {
        const friendRequest = new FriendRequest({
          sender: senderId,
          receiver: receiverId,
        });

        friendRequest
          .save()
          .then((savedRequest) => {
            res.status(201).json({
              message: "Friend request sent successfully",
              data: savedRequest,
              status: 200,
            });
          })
          .catch((error) => {
            console.error(error);

            if (error.name === "ValidationError") {
              const errorDetails = {};

              if (error.errors.sender) {
                errorDetails.sender = {
                  message: "Invalid sender ID",
                  details: error.errors.sender.message,
                };
              }

              if (error.errors.receiver) {
                errorDetails.receiver = {
                  message: "Invalid receiver ID",
                  details: error.errors.receiver.message,
                };
              }

              res
                .status(400)
                .json({ message: "Validation Error", errors: errorDetails });
            } else {
              res.status(500).json({ message: "Internal Server Error" });
            }
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const friendRequests = await FriendRequest.find({
      $or: [ { receiver: userId }],
    })
      .populate("sender", ["name", "email"]) 
      .populate("receiver", ["name", "email"]); 

    res.status(200).json({ data: friendRequests, status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleFriendRequest = async (req, res) => {
  const { requestId, action } = req.body;
  if (!action || !requestId) {
    return res.status(400).json({
      message: "Missing 'action' parameter or 'requestId' parameter",
    });
  }

  let status;

  if (action === "accept") {
    status = "accepted";
  } else if (action === "reject") {
    status = "rejected";
  } else {
    return res.status(400).json({ message: "Invalid action" });
  }

  try {
    const updatedRequest = await FriendRequest.findByIdAndUpdate(
      requestId,
      { $set: { status } },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (action === "accept") {
      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.sender },
        { $addToSet: { friends: updatedRequest.receiver } },
        { upsert: true }
      );

      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.receiver },
        { $addToSet: { friends: updatedRequest.sender } },
        { upsert: true }
      );
    } else if (action === "reject") {
      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.user_id },
        { $pull: { friends: updatedRequest.requester_id } }
      );

      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.requester_id },
        { $pull: { friends: updatedRequest.user_id } }
      );
    }

    res.status(200).json({
      message: `Friend request ${status}ed successfully`,
      status: 200,
      data: updatedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUsersList = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      users,
      status: 200,
      message: "Get users succesfully",
      length: users.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  signin,
  getFriendList,
  handleFriendRequest,
  getFriendRequests,
  sendFriendRequest,
  getUsersList,
  getUserByGoogleId,
};
