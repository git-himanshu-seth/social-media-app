// LoginPage.js
import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <>
      <Typography variant="h5" align="center">
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mb={"50px"}>
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
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} mt={"10px"}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Log In
        </Button>
      </form>
    </>
  );
};

export default Login;
