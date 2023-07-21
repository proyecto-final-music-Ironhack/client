import { Box, Heading, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function OnBoardingPage() {
  return (
    <Box
      centerContent
      p="50px"
      className="onboarding-container"
    >
      <Heading as="h1" fontWeight="600" size="3xl" mb="350px">
        Beat the beat! <br /> Vote for your fav songs
      </Heading>
      <Center>
        <Link className="gray-button" to="/user-type">
          Get started!
        </Link>
      </Center>
    </Box>
  );
}
