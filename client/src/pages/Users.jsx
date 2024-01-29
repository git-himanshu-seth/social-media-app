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
  const [userData, setUser] = useState(
    useSelector((state) => {
      return state?.auth?.user;
    })
  );
  const [friendList, setFriend] = useState(
    useSelector((state) => {
      return state?.auth?.friend;
    })
  );
  const [userList, setUserList] = useState(
    useSelector((state) => {
      return state?.auth?.userList;
    })
  );
  const [response, setResponse] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (userData?._id) {
      dispatch(friendActions.getFriendsList({ id: userData._id }));
      dispatch(authActions.getUsers());
    }
  }, []);

  const handleSendRequest = async () => {};

  const handleReceiveRequest = () => {
    // Simulate receiving a friend request
    const newRequest = { id: friendRequests.length + 1, sender: "New Friend" };
    setFriendRequests([...friendRequests, newRequest]);
  };

  const handleAcceptRequest = (requestId) => {
    // Move the request from friendRequests to acceptedRequests
    const acceptedRequest = friendRequests.find(
      (request) => request.id === requestId
    );
    setAcceptedRequests([...acceptedRequests, acceptedRequest]);

    // Remove the accepted request from friendRequests
    setFriendRequests(
      friendRequests.filter((request) => request.id !== requestId)
    );
  };

  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Doe" },
  //   // Add more users as needed
  // ];

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
        {/* {friendRequests && friendRequests.length > 0 && ( */}
        {activeTab === 1 && (
          <Box>
            {/* Friend Requests */}
            <Typography variant="h4" gutterBottom>
              Friend Requests
            </Typography>
            <List>
              {/* {friendRequests.map((request) => ( */}
              <React.Fragment key={1}>
                <ListItem>
                  <ListItemText
                    primary={"himanshu"}
                    secondary="sent you a friend request"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleAcceptRequest()}
                    sx={{ marginRight: "20px" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleAcceptRequest()}
                  >
                    Reject
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
              {/* ))} */}
            </List>
          </Box>
        )}
        {/* )} */}
        {activeTab === 2 && (
          <Box>
            {/* Friends List */}
            <Typography variant="h4" gutterBottom>
              Friends List
            </Typography>
            <List>
              {friendList.map((friend) => (
                <React.Fragment key={friend.id}>
                  <ListItem>
                    <ListItemText
                      primary={friend.name}
                      secondary="sent friend request"
                    />
                    <ListItemText primary={friend.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSendRequest}
                    >
                      View
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
        {activeTab === 3 && (
          <Box>
            {/* User List */}
            <Typography variant="h4" gutterBottom>
              User List
            </Typography>
            <List>
              {userList &&
                userList.length > 0 &&
                userList.map((user) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemText
                        primary={user.name}
                        secondary="sent friend request"
                      />
                      <ListItemText primary={user.name} />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendRequest}
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
