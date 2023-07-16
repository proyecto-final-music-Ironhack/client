import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Spacer, Flex, Image, Menu, MenuButton, MenuList, Button, MenuItem } from "@chakra-ui/react";
import logo from "../images/logo-beat.png";
import { AuthContext } from "../context/auth.context";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Flex className="navbar" alignItems={"center"} justifyContent={"space-between"}>
        <Box p="20">
          <Link to="/events">
            <Image w="74px" name="Beat the Beat Logo" src={logo} />
          </Link>
        </Box>
        <Spacer />
        {user && (
          <Menu style={{ zIndex: 10 }}>
            <MenuButton className="profile-image" as={Button}>
              <Image  boxSize="50px" borderRadius={500} name="profileImage" src={user.image} />
            </MenuButton>
            <MenuList>
              <Link to="/profile">
                <MenuItem bg={"#4E4E4E"}>Profile</MenuItem>
              </Link>
              <MenuItem bg={"#4E4E4E"} onClick={handleLogout}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </>
  );
}
