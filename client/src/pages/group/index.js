import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Input,
  Checkbox,
} from "@mui/material";
import GroupChat from "./GroupChat";
import { useDispatch, useSelector } from "react-redux";
import { groupActions, friendActions } from "../../_actions";

const Groups = () => {
  const dispatch = useDispatch();

  const groupList = useSelector((state) => {
    return state?.group?.groupList;
  });

  const userData = useSelector((state) => {
    return state?.auth?.user;
  });

  const friendList = useSelector((state) => {
    return state?.friend?.friends;
  });

  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [chatSectionOpen, setChatSectionOpen] = useState(false);

  useEffect(() => {
    if (userData?._id) {
      dispatch(groupActions.getGroups({ id: userData._id }));
      dispatch(friendActions.getFriendsList({ id: userData._id }));
    }
  }, []);

  const handleCreateGroup = () => {
    const newGroup = {
      id: groupList.length + 1,
      name: newGroupName,
      admin: userData?._id,
      members: 0, // You can set an initial member count
    };
    // setGroups([...groups, newGroup]);
    // setCreateGroupDialogOpen(false);
    dispatch(groupActions.createGroup(newGroup));
    dispatch(groupActions.getGroups({ id: userData._id }));
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Box width="100%">
          <Button
            sx={{ float: "right", marginTop: "20px" }}
            variant="contained"
            color="primary"
            onClick={() => setCreateGroupDialogOpen(true)}
          >
            Create New Group
          </Button>
        </Box>
        {groupList && groupList.length > 0 && (
          <Box display="flex" flexDirection={"row"}>
            <Box
              width={"30%"}
              marginLeft={"10px"}
              marginTop={"20px"}
              sx={{
                border: "2px solid rgb(25 118 210)",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              <List
                marginTop={"20px"}
                sx={{
                  overflow: "scroll",
                  overflowX: "hidden",
                  height: "600px",
                }}
              >
                {groupList &&
                  groupList?.length > 0 &&
                  groupList?.map((group) => (
                    <React.Fragment key={group.id}>
                      <ListItem
                        alignItems="flex-start"
                        onClick={() => {
                          setChatSectionOpen(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>{group.members}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={group.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {`${group.members} members`}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
              </List>
            </Box>
            {chatSectionOpen && (
              <Box width="70%">
                <GroupChat />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Dialog
        open={isCreateGroupDialogOpen}
        // sx={{}}
        height={"200px"}
        onClose={() => setCreateGroupDialogOpen(false)}
      >
        <DialogTitle color="primary">Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Group Description"
            type="text"
            fullWidth
            // height={"200px"}
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          {/* userList maping here*/}
          <Box
            sx={{ height: "100px", overflow: "scroll", overflowX: "hidden" }}
          >
            {friendList &&
              friendList?.length > 0 &&
              friendList?.map((user) => {
                console.log(user);
                return (
                  <React.Fragment key={user.id}>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => {
                        setChatSectionOpen(true);
                      }}
                    >
                      {/* <ListItemAvatar>
                    <Avatar>{user.members}</Avatar>
                  </ListItemAvatar> */}
                      <Checkbox checked={true} />
                      <ListItemText
                        primary={user.user.name}
                        sx={{ alignSelf: "center" }}
                      />
                      <ListItemText
                        primary={user.user.email}
                        sx={{ alignSelf: "center" }}
                      />
                      <ListItemText />
                    </ListItem>
                    <Divider component="div" variant="middle" />
                  </React.Fragment>
                );
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setCreateGroupDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateGroup}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Groups;
