import { Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function OnBoardingPage() {
  return (
    <Container centerContent p="50px" maxHeight="100vh" className="onboarding-container">
      <Heading as="h1" fontWeight="600" size="3xl" mb="500px">
        Beat the beat! <br /> Vote for your fav songs
      </Heading>
      <Link className="gray-button" to="/user-type">
        Get started!
      </Link>
    </Container>
  );
}
