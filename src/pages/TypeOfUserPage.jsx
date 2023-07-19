import {
  Container,
  Heading,
  VStack,
  Card,
  CardBody,
  Text,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function TypeOfUserPage() {
  return (
    <>
      <Container p="30px">
        <AbsoluteCenter>
          <Heading as="h2">Select your type of user: </Heading>

          <VStack spacing={15}>
            <Link className="non-style-link" to="/signup/user">
              <Card
                border="1px solid #CAFA00"
                p="30px"
                centerContent
                w="250px"
                borderRadius="20px"
              >
                <CardBody>
                  <Text as="h3">Music Lover</Text>
                  <Text as="p">
                    See, suggest, and vote the songs being played and the club
                  </Text>
                </CardBody>
              </Card>
            </Link>

            <Link className="non-style-link" to="/signup/disco">
              <Card
                border="1px solid #CAFA00"
                p="30px"
                centerContent
                w="250px"
                borderRadius="20px"
              >
                <CardBody>
                  <Text as="h3">Club</Text>
                  <Text as="p">
                    Create and organice events, choose a DJ and spread the word!
                  </Text>
                </CardBody>
              </Card>
            </Link>

            <Link className="non-style-link" to="/signup/dj">
              <Card
                border="1px solid #CAFA00"
                p="30px"
                centerContent
                w="250px"
                borderRadius="20px"
              >
                <CardBody>
                  <Text as="h3">Dj</Text>
                  <Text as="p">
                    Gain followers to attend all of your events! Mix it how you
                    love it!
                  </Text>
                </CardBody>
              </Card>
            </Link>
          </VStack>
        </AbsoluteCenter>
      </Container>
    </>
  );
}
