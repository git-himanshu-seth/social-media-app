const userModel = require("../models/userModel");
const Friendship = require("../models/friendSchema");
const FriendRequest = require("../models/friendRequestSchema");

const signup = (req, res) => {
  const { name, email } = req.body;
  userModel
    .create({ name, email })
    .then((result) => {
      console.log("User created successfully:", result);
      // Send a success response to the client
      Friendship.create({ user_id: result._id, friends: [] });
      res
        .status(201)
        .json({ message: "User created successfully", user: result });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error:", err.message);
        // Send a validation error response to the client
        res
          .status(400)
          .json({ message: "Validation Error", error: err.message });
      } else {
        console.error("Error creating user:", err);
        // Send an internal server error response to the client
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
    });
};

const signin = (req, res) => {
  const { email } = req.body;

  // Validate the presence of email and password
  if (!email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Assuming userModel has a login method
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // You may want to generate and send a token for authentication here

      // Send a success response to the client
      res.status(200).json({ message: "User signed in successfully", user });
    })
    .catch((err) => {
      console.error("Error signing in user:", err);

      // Send an internal server error response to the client
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    });
};

const getFriendList = (req, res) => {
  Friendship.findOne({ user_id: req.params.id })
    .then((list) => {
      if (list) {
        res.status(200).json({
          message: "get friends list successfuly",
          success: true,
          friends: list.friends,
          length: list.friends.length,
        });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error:", err.message);
        // Send a validation error response to the client
        res
          .status(400)
          .json({ message: "Validation Error", error: err.message });
      } else {
        console.error("Error creating user:", err);
        // Send an internal server error response to the client
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
    });
};

// Controller to send a friend request
const sendFriendRequest = (req, res) => {
  const { senderId, receiverId } = req.body;

  // Check if the sender and receiver exist
  // You may want to add more validation here, depending on your application logic

  // Check if the friend request already exists
  FriendRequest.findOne({ sender: senderId, receiver: receiverId })
    .then((existingRequest) => {
      if (existingRequest) {
        // Friend request already exists
        res.status(400).json({ message: "Friend request already sent" });
      } else {
        // Friend request does not exist, proceed to save
        const friendRequest = new FriendRequest({
          sender: senderId,
          receiver: receiverId,
        });

        friendRequest
          .save()
          .then((savedRequest) => {
            // Document saved successfully
            res.status(201).json({
              message: "Friend request sent successfully",
              friendRequest: savedRequest,
            });
          })
          .catch((error) => {
            // Handle the error
            console.error(error);

            // Check if it's a validation error (e.g., required fields missing)
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
      // Handle database query error
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Controller to get all friend requests for a user
const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const friendRequests = await FriendRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "username") // Populate sender details
      .populate("receiver", "username"); // Populate receiver details

    res.status(200).json({ friendRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to accept or reject a friend request
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

    // Update friends list based on the action
    if (action === "accept") {
      // Add the user to the requester's friends list
      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.sender },
        { $addToSet: { friends: updatedRequest.receiver } },
        { upsert: true }
      );

      // Add the requester to the user's friends list
      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.receiver },
        { $addToSet: { friends: updatedRequest.sender } },
        { upsert: true }
      );
    } else if (action === "reject") {
      // Remove the friend from the requester's friends list
      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.user_id },
        { $pull: { friends: updatedRequest.requester_id } }
      );

      // Remove the requester from the user's friends list
      await Friendship.findOneAndUpdate(
        { user_id: updatedRequest.requester_id },
        { $pull: { friends: updatedRequest.user_id } }
      );
    }

    res.status(200).json({
      message: `Friend request ${status}ed successfully`,
      updatedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  signin,
  getFriendList,
  handleFriendRequest,
  getFriendRequests,
  sendFriendRequest,
};
