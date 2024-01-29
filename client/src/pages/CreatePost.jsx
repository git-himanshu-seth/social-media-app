import React from "react";
import { Container, TextField, Button } from "@mui/material";

const NewPostPage = () => {
  const [postData, setPostData] = React.useState({
    title: "",
    content: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the post data (you can send it to an API, etc.)
    console.log("Submitted Post:", postData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md">
      <h1>Create a New Post</h1>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Content"
          name="content"
          value={postData.content}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Publish Post
        </Button>
      </form>
    </Container>
  );
};

export default NewPostPage;
