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
import { authActions, friendActions } from "../_actions";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state?.auth?.user;
  });
  const friendList = useSelector((state) => {
    return state?.friend?.friends;
  });

  const friendRequestList = useSelector((state) => {
    return state?.friend?.friendsReq;
  });

  const userListData = useSelector((state) => {
    return state?.auth?.userList?.users;
  });
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    dispatch(friendActions.getFriendsList({ id: userData._id }));
    dispatch(authActions.getUsers());
    dispatch(friendActions.getReqList({ id: userData._id }));
  }, []);

  const handleSendRequest = async (id) => {
    const sendData = {
      senderId: userData?._id,
      receiverId: id,
    };
    const sendRequestResponse = dispatch(friendActions.sendFrienReq(sendData));
    if (sendRequestResponse?.status === 200) {
      dispatch(friendActions.getReqList({ id: userData._id }));
    }
  };

  const handleAcceptRequest = (action) => {
    const sendData = {
      action: action,
      requestId: userData?._id,
    };
    const actionFriendRequResponse = dispatch(
      friendActions.acceptReq(sendData)
    );
    if (actionFriendRequResponse?.status === 200) {
      dispatch(friendActions.getReqList({ id: userData._id }));
      dispatch(friendActions.getFriendsList({ id: userData._id }));
    }
  };

  return (
    <Container>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Box display={"flex"} flexDirection={"row"}>
          <Button
            size="large"
            variant={activeTab === 1 ? "contained" : "outlined"}
            onClick={() => setActiveTab(1)}
            sx={{ marginRight: "15px" }}
          >
            Friend Requests
          </Button>
          <Button
            size="large"
            variant={activeTab === 2 ? "contained" : "outlined"}
            onClick={() => setActiveTab(2)}
            sx={{ marginRight: "15px" }}
          >
            Friends List
          </Button>
          <Button
            size="large"
            variant={activeTab === 3 ? "contained" : "outlined"}
            onClick={() => setActiveTab(3)}
            sx={{ marginRight: "15px" }}
          >
            Make New Friends
          </Button>
        </Box>
        {activeTab === 1 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              Friend Requests
            </Typography>
            <List>
              {friendRequestList &&
                friendRequestList.length > 0 &&
                friendRequestList.map((request) => (
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
        )}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              Friends List
            </Typography>
            <List>
              {friendList &&
                friendList.length > 0 &&
                friendList.map((friend) => (
                  <React.Fragment key={friend.id}>
                    <ListItem>
                      <ListItemText
                        primary={friend.name}
                        secondary="sent friend request"
                      />
                      <ListItemText primary={friend.email} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </Box>
        )}
        {activeTab === 3 && (
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
        )}
      </Box>
    </Container>
  );
};

export default UserList;
