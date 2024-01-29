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
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../_assets/images/logo.png";
import firebaseAuthManager from "../utilis/services/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../_actions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = () => {
    firebaseAuthManager.initAuthStateListener().then((res) => {
      setUser(res);
    });
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <List>
      <ListItem
        onClick={() => {
          navigate("/");
          toggleDrawer(false);
        }}
      >
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        onClick={() => {
          navigate("/groups");
          toggleDrawer(false);
        }}
      >
        <ListItemText primary="Groups" />
      </ListItem>
      <ListItem
        onClick={() => {
          toggleDrawer(false);
          navigate("/posts");
        }}
      >
        <ListItemText primary="Posts" />
      </ListItem>
      <ListItem
        onClick={() => {
          toggleDrawer(false);
          navigate("/chats");
        }}
      >
        <ListItemText primary="Chats" />
      </ListItem>
      {user && (
        <>
          <ListItem
            onClick={async () => {
              dispatch(authActions.logout());
              handleUser();
              toggleDrawer(false);
              navigate("/");
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem onClick={() => navigate("/users")}>
            <ListItemText primary="Users" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ marginTop: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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
                onClick={() => navigate("/")}
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
                    dispatch(authActions.logout());
                    handleUser();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              )}
              <Button color="inherit" onClick={() => navigate("/users")}>
                Users
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            width: "30%",
            boxSizing: "border-box",
          },
        }}
        open={drawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        {drawerList}
      </Drawer>
    </>
  );
};

export default Header;
