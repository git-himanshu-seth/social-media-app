import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Container,
} from "@mui/material";

const Groups = () => {
  // Dummy data for demonstration
  const groups = [
    { id: 1, name: "Group 1", members: 10 },
    { id: 2, name: "Group 2", members: 8 },
    { id: 3, name: "Group 3", members: 12 },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Group List
      </Typography>
      <List>
        {groups.map((group) => (
          <React.Fragment key={group.id}>
            <ListItem alignItems="flex-start">
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
    </Container>
  );
};

export default Groups;
