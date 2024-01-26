// RegisterPage.js
import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("Registration data:", formData);
    // Redirect or perform further actions as needed
  };

  return (
    <>
      <Typography variant="h5" align="center">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mb="50px">
          <Grid item xs={12} sm={6} mt={"20px"}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={"20px"}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} mt={"20px"}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} mt={"20px"}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterPage;
