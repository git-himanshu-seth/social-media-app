import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  authActions,
  friendActions,
  hideLoader,
  showLoader,
} from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/customLoader";

const UserList = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state?.auth?.user;
  });

  const userListData = useSelector((state) => {
    return state?.auth?.userList?.users;
  });
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    dispatch(authActions.getUsers({ id: userData._id }));
  }, []);

  const handleSendRequest = async (id) => {
    const sendData = {
      senderId: userData?._id,
      receiverId: id,
    };
    const sendRequestResponse = dispatch(friendActions.sendFrienReq(sendData));
    if (sendRequestResponse?.status === 200) {
        dispatch(authActions.getUsers({ id: userData._id }));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <List>
        {userListData &&
          userListData?.length > 0 &&
          userListData?.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem>
                <ListItemText primary={user.name} />
                <ListItemText primary={user.email} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSendRequest(user._id)}
                >
                  Send Request
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
};

export default UserList;
