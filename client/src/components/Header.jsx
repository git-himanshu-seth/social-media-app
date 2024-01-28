// Header.js

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../_assets/images/logo.png";
import firebaseAuthManager from "../utilis/services/firebase";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    handleUser();
  }, []);
  const handleUser = () => {
    firebaseAuthManager.initAuthStateListener().then((res) => {
      setUser(res);
    });
  };
  return (
    <AppBar position="sticky" sx={{ marginTop: 0 }}>
      <Toolbar>
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "70px", marginRight: "20px" }}
        />
        <Typography variant="h6" component="div">
          MANDALA
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "solid 1px",
            borderRadius: "20px",
            width: "300px",
          }}
          ml={2}
          mr={2}
          pr={2}
        >
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "inherit" }}
          />
        </Box>
        <Box ml={2} width={"90%"}>
          <Box sx={{ float: "right" }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/home")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<GroupIcon />}
              onClick={() => navigate("/groups")}
            >
              Groups
            </Button>
            <Button
              color="inherit"
              startIcon={<PostAddIcon />}
              onClick={() => navigate("/posts")}
            >
              Posts
            </Button>
            <Button
              color="inherit"
              startIcon={<ChatIcon />}
              onClick={() => navigate("/chats")}
            >
              Chats
            </Button>
            {user && (
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={async () => {
                  await firebaseAuthManager.logout();
                  handleUser();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
