import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Spacer, Flex, Image, Menu, MenuButton, MenuList, Button, MenuItem, Container } from "@chakra-ui/react";
import logo from "../images/logo-beat.png";
import { AuthContext } from "../context/auth.context";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {user && (
        <Container p="30px">
        <Flex className="navbar" alignItems={"center"} justifyContent={"space-between"}>
          <Box >
            <Link to="/events">
              <Image w="74px" name="Beat the Beat Logo" src={logo} />
            </Link>
          </Box>
          <Spacer />
          <Menu style={{ zIndex: 10 }}>
            <MenuButton className="profile-image">
              <Image boxSize="50px" borderRadius={500} name="profileImage" src={user.image} />
            </MenuButton>
            <MenuList>
              <Link to="/profile">
                <MenuItem >Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        </Container>
      )}
    </>
  );
}
