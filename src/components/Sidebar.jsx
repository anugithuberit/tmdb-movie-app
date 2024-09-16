import { Box, Icon, Image, List, ListItem } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import BookmarkIcon from "./Icons/bookMarkIcon";
import DashboardIcon from "./Icons/dashboardIcon";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/", icon: <DashboardIcon /> },
    { path: "/bookMarks", icon: <BookmarkIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      width={{ base: "full", lg: "60px" }}
      height={{ base: "60px", lg: "full" }}
      bgColor="primary.200"
      color="white"
      textAlign="center"
      borderRadius={{ base: "0", lg: "10px" }}
      
      display="flex"
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "center" }}
      flexDirection={{ base: "row", lg: "column" }}
    >
      <Image
        src="/AppLogo.png"
        boxSize="5"
        ml={{ base: "10px", lg: "auto" }}
        mt={{ lg: "5" }}
        mb={{ lg: "7" }}
        mx='15px'
      />
      <List
        display="flex"
        flexDirection={{ base: "row", lg: "column" }}
        flexGrow={1}
        justifyContent={{ base: "center", lg: "start" }}
        px='15px'
      >
        {menuItems.map(({ path, icon }) => (
          <ListItem
            key={path}
            mb={{ lg: "3" }}
            as={Link}
            to={path}
            display="flex"
            justifyContent="center"
            alignItems="center"
            _hover={{ cursor: "pointer", bgColor: "primary.300" }}
            bgColor={isActive(path) ? "primary.400" : "transparent"}
            borderRadius="5px"
            mx={{ base: "10px", lg: "0" }} // Adds space between icons in the row layout
          >
            <Icon
              color={isActive(path) ? "contrast.200" : "secondary.200"}
              _hover={{ color: "grey.500" }}
            >
              {icon}
            </Icon>
          </ListItem>
        ))}
      </List>
      <Image
        src="/userImage.png"
        w='25px'
        h='25px'
        mx={{ base: "10px", lg: "auto" }}
        mb={{ base: "", lg: "4" }}
        borderRadius="full"
      />
    </Box>
  );
};

export default Sidebar;
