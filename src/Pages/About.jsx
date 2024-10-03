import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CheckCircleOutline,
  AddCircleOutline,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";

const About = () => {

  const todoFeatures = [
    {
      icon: <AddCircleOutline />,
      text: "Add new tasks easily with a simple input form",
    },
    {
      icon: <CheckCircleOutline />,
      text: "Mark tasks as complete with a single click",
    },
    {
      icon: <EditOutlined />,
      text: "Edit existing tasks to update their content",
    },
    { icon: <DeleteOutline />, text: "Remove tasks you no longer need" },
  ];


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} p={2}>
          <Typography variant="h4" mb={2}>
            About This App
          </Typography>

          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingX: 2,
              paddingY: 3,
              background:
                "linear-gradient(90deg, rgba(0, 114, 255, 1) 0%, rgba(0, 198, 255, 1) 100%)",
              borderRadius: 4,
              color: "white",
              marginBottom: 2,
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.4)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h5">Hello, Neven</Typography>
              <Typography variant="h5">It's a lovely day!</Typography>
            </Box>

            <Avatar
              sx={{
                width: 80,
                height: 80,
                border: "2px solid white",
              }}
              alt="Neven"
              src="https://media.licdn.com/dms/image/v2/D4D03AQHdLGRQevv32A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1675369431735?e=1733356800&v=beta&t=uqyVROaC59u-sfXHp39LYwkqaC2RoQiCWwG_1BNKRe0"
            />
          </Card>

          <Card
            sx={{
              padding: 3,
              background:
                "linear-gradient(90deg, rgba(0, 0, 255, 1) 0%, rgba(238, 130, 238, 1) 100%)",
              color: "white",
              borderRadius: 4,
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.4)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Todo App: Simplify Your Tasks
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Our Todo App helps you manage your tasks efficiently. Here's how
              it works:
            </Typography>
            <List>
              {todoFeatures.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText primary={feature.text} />
                </ListItem>
              ))}
            </List>
          </Card>
        
    </Box>
  );
};

export default About;
