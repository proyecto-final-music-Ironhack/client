<<<<<<< HEAD
import { Container, Heading, Button } from "@chakra-ui/react";
=======
import { Box, Heading, Center } from "@chakra-ui/react";
>>>>>>> c54797516ed036d86f4d9cd873baa3f6f58c6e55
import { Link } from "react-router-dom";



export default function OnBoardingPage() {
  return (
   
    <Box centerContent p="50px" maxHeight="100vh" className="onboarding-container">
      <Heading as="h1" fontWeight="600" size="3xl" mb="500px">
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
