import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Spacer, Flex, Image, Menu, MenuButton, MenuList, Button, MenuItem } from "@chakra-ui/react";
import logo from "../images/logo-beat.png";
import { AuthContext } from "../context/auth.context";

export default function Nav() {
  const { user } = useContext(AuthContext);
  

  console.log(user);

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} style={{ zIndex: 10 }}>
        <Box p="20">
          <Link to="/events">
            <Image w="74px" name="Beat the Beat Logo" src={logo} />
          </Link>
        </Box>
        <Spacer />

        <Menu style={{ zIndex: 10 }}>
          <MenuButton as={Button}>
            <Image boxSize="50px" borderRadius={500} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </MenuButton>
          <MenuList>
            <MenuItem bg={"#4E4E4E"}>Profile</MenuItem>
            <MenuItem bg={"#4E4E4E"}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}
