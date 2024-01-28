// Post.js

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Loader from "../components/customLoader";

const Post = ({ user, timestamp, content }) => {
  return (
    <>
      <Card>
        <CardContent>
          {/* Post Header */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={user.profilePicture} alt={user.name} />
            <div style={{ marginLeft: "1rem" }}>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Typography variant="caption">
                {new Date(timestamp).toDateString()}
              </Typography>
            </div>
          </div>

          {/* Post Content */}
          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            {content}
          </Typography>
        </CardContent>

        {/* Post Actions */}
        <CardActions>
          <IconButton>
            <ThumbUpIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Loader />
    </>
  );
};

export default Post;
