const mongoose = require("mongoose");
const friendshipSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;
