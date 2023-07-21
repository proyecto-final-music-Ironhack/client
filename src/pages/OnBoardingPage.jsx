import { Box, Heading, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function OnBoardingPage() {
  return (
    <div
      className="onboarding-container"
    >
      <Heading fontWeight="600" size="2xl">
        Beat the beat! <br /> Vote for your fav songs
      </Heading>
      <Center>
        <Link className="gray-button" to="/user-type">
          Get started!
        </Link>
      </Center>
    </div>
  );
}
