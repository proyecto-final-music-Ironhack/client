import { Button, Flex, Text, Image, useToast, Container, Box, Card, Stack } from "@chakra-ui/react";
import playlistService from "../../services/playlist.service";

export default function PlaylistSelector({ images, id, name, eventId }) {
  const toast = useToast();
  const pushTracksToEvent = async () => {
    try {
      await playlistService.getPlaylistId(id, eventId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card p="5px" bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)" mt="10px" mb="10px" border="1px solid gray">
        <Flex align="center" justifyContent="space-between">
          <Flex justifyContent="center" alignItems="center">
            <Image boxSize="50px" src={images[0].url} alt="" mr={3} />
            <Text as="h1" size="md">
              {name}
            </Text>
          </Flex>
          <Box>
            <Button
              bg="gray"
              color="white"
              onClick={() => {
                pushTracksToEvent(),
                  toast({
                    title: "Playist added successfully!",
                    description: "Tracks will display at the time of the event",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
              }}
            >
              {" "}
              +{" "}
            </Button>
          </Box>
        </Flex>
      </Card>
    </>
  );
}
