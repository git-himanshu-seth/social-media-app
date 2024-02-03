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
  Checkbox,
} from "@mui/material";
import GroupChat from "./GroupChat";
import { useDispatch, useSelector } from "react-redux";
import { groupActions, friendActions } from "../../_actions";
import Loader from "../../components/customLoader";

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

  const creatGroupRes = useSelector((state) => {
    return state?.group?.createGroup;
  });

  const acceptRejectReq = useSelector((state) => {
    return state?.group?.acceptGroup;
  });

  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [chatSectionOpen, setChatSectionOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    if (userData?._id) {
      dispatch(groupActions.getGroups({ id: userData._id }));
      dispatch(friendActions.getFriendsList({ id: userData._id }));
    }
  }, []);

  useEffect(() => {
    if (creatGroupRes && creatGroupRes.status === 200) {
      setCreateGroupDialogOpen(false);
      dispatch(groupActions.getGroups({ id: userData._id }));
      setNewGroupName("");
      setNewGroupDescription("");
      setMembers([]);
    }
  }, [creatGroupRes]);

  useEffect(() => {
    if (acceptRejectReq && acceptRejectReq?.status === 200) {
      dispatch(groupActions.getGroups({ id: userData._id }));
    }
  }, [acceptRejectReq]);

  const handleCreateGroup = () => {
    const groupMember = [];
    if (members.length > 0) {
      for (const member of members) {
        groupMember.push({ user: member });
      }
    }
    if (groupMember.length > 0 && newGroupName && newGroupDescription) {
      const newGroup = {
        name: newGroupName,
        userId: userData?._id,
        description: newGroupDescription,
        members: groupMember, // You can set an initial member count
      };
      dispatch(groupActions.createGroup(newGroup));
    }
  };

  const addUsers = (checked, id) => {
    if (checked) {
      if (members?.length > 0 && members.includes(id) === -1 && checked) {
        members.push(id);
      } else {
        members.push(id);
      }
    } else {
      if (members.includes(id)) {
        members.splice(id, 1);
      }
    }
    setMembers(members);
  };

  const handleAcceptRequest = (action, groupId) => {
    const sendData = {
      status: action,
      userId: userData?._id,
      groupId: groupId,
    };
    dispatch(groupActions.acceptGroupRequest(sendData));
  };

  const findGroupUser = (data) => {
    if (data?.admin?._id === userData?._id) {
      return false;
    } else if (data.members) {
      for (const member of data.members) {
        if (
          member?.status === "pending" &&
          member?.user?._id === userData?._id
        ) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  return (
    <Box>
      {!isLoading && (
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
                      <React.Fragment key={group._id}>
                        <ListItem
                          alignItems="flex-start"
                          onClick={() => {
                            setChatSectionOpen(true);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={
                                "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                              }
                              alt={group.name}
                            />
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
                                  {group.description}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          {findGroupUser(group) && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() =>
                                  handleAcceptRequest("accept", group?._id)
                                }
                                sx={{ marginRight: "20px" }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() =>
                                  handleAcceptRequest("reject", group?._id)
                                }
                              >
                                Reject
                              </Button>
                            </>
                          )}
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
      )}
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
                return (
                  <React.Fragment key={user.id}>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => {
                        setChatSectionOpen(true);
                      }}
                    >
                      <Checkbox
                        onChange={(val) =>
                          addUsers(val.target.checked, user.user._id)
                        }
                      />
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
            onClick={() => {
              setCreateGroupDialogOpen(false);
              setNewGroupName("");
              setNewGroupDescription("");
              setMembers([]);
            }}
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
      {isLoading && <Loader />}
    </Box>
  );
};

export default Groups;
