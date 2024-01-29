import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { groupActions, authActions } from "../_actions";

const Groups = () => {
  const dispatch = useDispatch();
  let groupList=useSelector((state) => {
    return state?.group?.groupList ;
  })
  const [groups, setGroups] = useState(
    groupList
  );
  useEffect(()=>{if(groupList){setGroups(groupList)}},[groupList])
  
  const [userData, setUser] = useState(
    useSelector((state) => {
      return state?.auth?.user;
    })
  );
  const [userList, setUserList] = useState(
    useSelector((state) => {
      return state?.auth?.userList;
    })
  );
  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [chatSectionOpen, setChatSectionOpen] = useState(false);

  useEffect(() => {
    if (userData?._id) {
      dispatch(groupActions.getGroups({ id: userData._id }));
      dispatch(authActions.getUsers());
    }
  }, []);

  const handleCreateGroup = () => {
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      admin:userData?._id,
      members: 0, // You can set an initial member count
    };
    setGroups([...groups, newGroup]);
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
        {groups && groups.length > 0 && (
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
                {groups && groups?.length >0 &&groups?.map((group) => (
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
                <Chat />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Dialog
        open={isCreateGroupDialogOpen}
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
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          {/* Add additional fields for friends list, etc. */}
          {/* userList maping here*/}
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
