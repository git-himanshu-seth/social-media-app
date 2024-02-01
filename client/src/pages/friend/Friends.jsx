import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { friendActions, hideLoader, showLoader } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/customLoader";

const Friends = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state?.auth?.user;
  });
  const friendList = useSelector((state) => {
    return state?.friend?.friends;
  });

  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    dispatch(friendActions.getFriendsList({ id: userData._id }));
  }, []);

  const handleAcceptRequest = (action) => {
    const sendData = {
      action: action,
      requestId: userData?._id,
    };
    const actionFriendRequResponse = dispatch(
      friendActions.acceptReq(sendData)
    );
    if (actionFriendRequResponse?.status === 200) {
      dispatch(friendActions.getFriendsList({ id: userData._id }));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Friend Requests
      </Typography>
      <List>
        {friendList &&
          friendList.length > 0 &&
          friendList.map((request) => (
            <React.Fragment key={1}>
              <ListItem>
                <ListItemText
                  primary={request?.sender?.name}
                  secondary={request?.sender?.email}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleAcceptRequest("accept")}
                  sx={{ marginRight: "20px" }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleAcceptRequest("reject")}
                >
                  Reject
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
};

export default Friends;
