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
} from "@mui/material";
import { useDispatch } from "react-redux";
import Post from "../components/Post";
import { postActions } from "../_actions";

const PostSection = (props) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreatePost = () => {
    dispatch(postActions.createPost());
    // handleDialogClose();
  };

  useEffect(() => {
    dispatch(postActions.getPosts());
  }, []);

  const postData = [
    {
      user: {
        name: "John Doe",
        profilePicture:
          "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      timestamp: 1643245200000,
      content: "This is an example post using Material-UI in React!",
    },
    {
      user: {
        name: "John Doe",
        profilePicture:
          "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      timestamp: 1643245200000,
      content: "This is an example post using Material-UI in React!",
    },
    {
      user: {
        name: "John Doe",
        profilePicture:
          "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      timestamp: 1643245200000,
      content: "This is an example post using Material-UI in React!",
    },
    {
      user: {
        name: "John Doe",
        profilePicture:
          "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      timestamp: 1643245200000,
      content: "This is an example post using Material-UI in React!",
    },
  ];

  return (
    <>
      <CssBaseline />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        style={{ float: "right", marginRight: "10%" }}
      >
        Create Post
      </Button>
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Post Section
        </Typography>

        <Box sx={{ marginTop: "10%" }}>
          {postData &&
            postData.length > 0 &&
            postData.map((post) => <Post {...post} />)}
        </Box>
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle color="primary">Create a New Post</DialogTitle>
          <DialogContent>
            <TextField
              label="Post Title"
              fullWidth
              variant="outlined"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              sx={{ marginTop: "15px" }}
            />
            <TextField
              sx={{ marginTop: "15px" }}
              label="Post Discreption"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
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
              onClick={handleCreatePost}
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            >
              Cancle
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default PostSection;
