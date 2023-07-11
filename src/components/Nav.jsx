import { ReactNode } from "react";
import { Avatar, Box, Spacer, Flex, Image, Menu, MenuButton, MenuList, Button, MenuItem } from "@chakra-ui/react";
import logo from "../images/logo-beat.png";

export default function Nav() {
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} style={{ zIndex: 10 }}>
        <Box p="20">
          <Image w="74px" name="Beat the Beat Logo" src={logo} />
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
