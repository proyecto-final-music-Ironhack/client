import { Wizard } from "react-use-wizard";
import EmailPassStep from "./EmailPassStep";
import SearchDiscoStep from "./SearchDiscoStep";
import { useState } from "react";
import { Container, Text, Heading, Center } from "@chakra-ui/react";

function SignupFormDisco() {
  const [discoName, setDiscoName] = useState(null);

  return (
    <Container>
      <Heading textAlign="center">Register your disco:</Heading>
      <Wizard>
        <SearchDiscoStep setDiscoName={setDiscoName} />
        <EmailPassStep discoName={discoName} />
      </Wizard>
      <Center>
        <Text>Can't seem to find your disco?</Text>

        <Text textDecoration="underline" color="#CAFA00">
          {" "}
          Contact us
        </Text>
      </Center>
    </Container>
  );
}

export default SignupFormDisco;
