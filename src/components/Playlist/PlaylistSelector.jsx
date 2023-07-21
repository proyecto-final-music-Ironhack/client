import { Button, Flex, Heading, Image, useToast, Container } from "@chakra-ui/react";
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
    <Container>
      <Flex align="center" my={10}>
        <Image boxSize="60px" src={images[0].url} alt="" mr={3} />
        <Heading as="h1" size="md">
          {name}
        </Heading>
        <Button
          onClick={() => {
            pushTracksToEvent(),
              toast({
                title: "Playist added successfully",
                description: "Tracks will turn visible at the time of the event",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
          }}
        >
          {" "}
          ADD{" "}
        </Button>
      </Flex>
    </Container>
  );
}
