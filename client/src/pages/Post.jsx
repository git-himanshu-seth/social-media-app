import React from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import Post from "../components/Post";

const PostSection = () => {
  // Example post data
  const postData = {
    user: {
      name: "John Doe",
      profilePicture: "https://example.com/profile.jpg",
    },
    timestamp: 1643245200000, // Example timestamp (milliseconds since epoch)
    content: "This is an example post using Material-UI in React!",
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Facebook-like Post Section
        </Typography>
        <Post {...postData} />
      </Container>
    </>
  );
};

export default PostSection;
