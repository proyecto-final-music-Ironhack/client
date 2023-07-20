import { extendTheme } from "@chakra-ui/react";
import { Button, Container, Heading, Text } from "./styleConfig";


const theme = extendTheme({
  fonts: {
    heading: `'Kanit', sans-serif`,
    body: `'Kanit', sans-serif`,
  },
  components: {
    Button,
    Container,
    Heading, 
    Text
  },
});

export default theme;
