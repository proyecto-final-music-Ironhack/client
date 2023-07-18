import { Container, Heading, Button } from "@chakra-ui/react";


export default function OnBoardingPage() {
  return (
    <Container centerContent minHeight="100vh"  p="30px"className="onboarding-container">
      <Heading as="h1" size='3xl'>Beat the beat! Vote for your fav songs</Heading>
      <Button mt="500px">Get started</Button>
    </Container>
  );
}
