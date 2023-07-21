import { Container, Heading, VStack, Card, CardBody, Text, Flex, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function TypeOfUsersPage() {
  return (
    <>
      <Container p="40px" maxHeight="100vh">
        <VStack spacing={15}>
          <Heading as="h2">Select your type of user: </Heading>
          <Link className="non-style-link" to="/signup/user">
            <Card borderColor="#CAFA00" borderWidth="3px" backgroundColor="black" centerContent w="300px" borderRadius="20px">
              <CardBody>
                <Heading size="md" mb="10px">Music Lover</Heading>
                <Text as="p">See, suggest, and vote the songs being played and the club</Text>
              </CardBody>
            </Card>
          </Link>

          <Link className="non-style-link" to="/signup/disco">
            <Card borderColor="#CAFA00" borderWidth="3px" backgroundColor="black" centerContent w="300px" borderRadius="20px">
              <CardBody>
                <Heading size="md" mb="10px">Club</Heading>
                <Text as="p">Create and organice events, choose a DJ and spread the word!</Text>
              </CardBody>
            </Card>
          </Link>

          <Link className="non-style-link" to="/signup/dj">
            <Card borderColor="#CAFA00" borderWidth="3px" backgroundColor="black" centerContent w="300px" borderRadius="20px">
              <CardBody>
                <Heading size="md" mb="10px">Dj</Heading>
                <Text as="p">Gain followers to attend all of your events! Mix it how you love it!</Text>
              </CardBody>
            </Card>
          </Link>
        </VStack>
      </Container>
    </>
  );
}
