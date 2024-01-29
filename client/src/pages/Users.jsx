// UserList.js
import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { friendActions } from "../_actions";
import { UseDispatch, useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const [user, setUser] = useState(
    useSelector((state) => {
      return state?.auth?.user;
    })
  );
  const [friends, setFriend] = useState(
    useSelector((state) => {
      return state?.auth?.friend;
    })
  );
  console.log(user);
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  useEffect(() => {
    if (user?._id) {
      dispatch(friendActions.getFriendsList({ id: user._id }));
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

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    // Add more users as needed
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {/* {friendRequests && friendRequests.length > 0 && ( */}
      <div>
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
      </div>
      {/* )} */}
      <div>
        {/* Friends List */}
        <Typography variant="h4" gutterBottom>
          Friends List
        </Typography>
        <List>
          {users.map((user) => (
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
                  View
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
      <div>
        {/* User List */}
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>
        <List>
          {users.map((user) => (
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
      </div>
    </div>
  );
};

export default UserList;
