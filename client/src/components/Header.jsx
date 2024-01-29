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
import { useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMediumScreen = useMediaQuery("(min-width:1024px)");

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
    <List sx={{ marginTop: "60px" }}>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
      <ListItem
        onClick={() => {
          navigate("/");
          toggleDrawer(false);
        }}
      >
        <HomeIcon sx={{ marginRight: "5px" }} />
        <ListItemText primary="Home" />
      </ListItem>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
      <ListItem
        onClick={() => {
          navigate("/groups");
          toggleDrawer(false);
        }}
      >
        <GroupIcon sx={{ marginRight: "5px" }} />
        <ListItemText primary="Groups" />
      </ListItem>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
      <ListItem
        onClick={() => {
          toggleDrawer(false);
          navigate("/posts");
        }}
      >
        <PostAddIcon sx={{ marginRight: "5px" }} />
        <ListItemText primary="Posts" />
      </ListItem>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
      <ListItem
        onClick={() => {
          toggleDrawer(false);
          navigate("/chats");
        }}
      >
        <ChatIcon sx={{ marginRight: "5px" }} />
        <ListItemText primary="Chats" />
      </ListItem>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
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
            <LogoutIcon sx={{ marginRight: "5px" }} />
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider orientation="horizontal" sx={{ color: "black" }} />
        </>
      )}
      <ListItem onClick={() => navigate("/users")}>
        <LogoutIcon sx={{ marginRight: "5px" }} />
        <ListItemText primary="Users" />
      </ListItem>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
    </List>
  );

  return (
    <>
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
          <Box ml={2} width={"80%"}>
            <Box sx={{ float: "right" }}>
              {isMediumScreen ? (
                <>
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
                </>
              ) : (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "40%",
            boxSizing: "border-box",
          },
        }}
        open={drawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <diV style={{ background: "black" }}></diV>
        {drawerList}
      </Drawer>
    </>
  );
};

export default Header;
