import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginWithEmailAndPassword } from "../utilis/services/firebase";
import firebaseAuthManager from "../utilis/services/firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebaseAuthManager.loginWithEmailAndPassword(
      formData.email,
      formData.password
    );
  };

  return (
    <>
      <Typography variant="h5" align="center">
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="email" style={{ marginTop: "20px" }}>
          Email Address<span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          variant="outlined"
          required
          fullWidth
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <InputLabel htmlFor="password" style={{ marginTop: "10px" }}>
          Password<span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          variant="outlined"
          required
          fullWidth
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleTogglePasswordVisibility()}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            placeholder: "Enter your password",
          }}
          inputRef={passwordRef}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export default Login;
