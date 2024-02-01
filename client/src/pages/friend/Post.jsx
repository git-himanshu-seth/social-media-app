import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../_actions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const Posts = (props) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newPosttitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const userData = useSelector((state) => state?.auth?.user);
  const posts = useSelector((state) => state?.post?.posts);

  useEffect(() => {
    dispatch(postActions.getPosts({ id: userData?._id }));
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreatePost = () => {
    if (newPosttitle && newPostDescription) {
      const postData = {
        newPosttitle,
        newPostDescription,
      };
      const response = dispatch(postActions.createPost(postData));
      console.log(response);
    }
    // handleDialogClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        style={{ float: "right", marginRight: "10%" }}
      >
        Create Post
      </Button>
      <Box>
        <Typography variant="h4" gutterBottom>
          Post Section
        </Typography>
        <Box sx={{ marginTop: "10%" }}>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              <Card sx={{ marginBottom: "20px" }}>
                <CardContent>
                  {/* Post Header */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={
                        "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                      }
                      alt={post.title}
                    />
                    <div style={{ marginLeft: "1rem" }}>
                      <Typography variant="subtitle1">
                        {post.content}
                      </Typography>
                      <Typography variant="caption">
                        {new Date(post.timestamps).toDateString()}
                      </Typography>
                    </div>
                  </div>

                  {/* Post Content */}
                  <Typography variant="body1" style={{ marginTop: "1rem" }}>
                    {post.content}
                  </Typography>
                </CardContent>

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
              </Card>;
            })}
        </Box>
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle color="primary">Create a New Post</DialogTitle>
          <DialogContent>
            <TextField
              label="Post Title"
              fullWidth
              variant="outlined"
              value={newPosttitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              sx={{ marginTop: "15px" }}
            />
            <TextField
              sx={{ marginTop: "15px" }}
              label="Post Discreption"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePost}
              style={{ marginTop: "1rem" }}
            >
              Post
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDialogClose}
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Posts;
