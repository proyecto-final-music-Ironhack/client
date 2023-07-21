import { Card, Heading, Flex, Text, Box, Image } from "@chakra-ui/react";
import headphones from "../../images/icons/headphones.svg";

export default function EventCardDisco({ name, dj, date }) {
  const timeEvent = new Date(date).toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const dateTime = new Date(date).toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });

  return (
    <Card
      bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)"
      p="10px"
      mt="10px"
      mb="10px"
    >
      <Flex alignItems="center">
        <Card p="10px" bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size="md">{dateTime}</Heading>
            <Text> {timeEvent}</Text>
          </Flex>
        </Card>

        <Box ml="20px">
          <Text>{name}</Text>
          <Flex>
            <Image src={headphones} alt="location-icon" />
            <Text fontSize="xs"> Dj: {dj?.name}</Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
