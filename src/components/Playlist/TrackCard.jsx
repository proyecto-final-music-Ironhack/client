import { Button, Image, Spinner, Flex, Box, Card, Spacer, Text, Heading } from "@chakra-ui/react";
import emptyHeart from "../../images/empy-heart.png";
import heart from "../../images/heart.png";
import playlistService from "../../services/playlist.service";
import { useState, useEffect } from "react";

function TrackCard({ trackName, likes, image, artists, _id, userId, showLikeButton }) {
  const [like, setLike] = useState(likes?.includes(userId) ?? false);
  const [showLikes, setShowLikes] = useState(likes?.length ?? 0);
  const [artistList, setArtistList] = useState("");

  useEffect(() => {
    if (artists) {
      setArtistList(artists.join(", "));
    }
  }, [artists]);

  const handleLike = async () => {
    try {
      await playlistService.getTrackLike(_id);
      setLike(true);
      setShowLikes((num) => num + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      await playlistService.getTrackDislike(_id);
      setLike(false);
      setShowLikes((num) => (num > 0 ? num - 1 : 0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)" p="10px" mt="10px" mb="10px">
      <Flex justifyContent="center" alignItems="center">
        <Box>
          <Flex justifyContent="center" alignItems="center">
            <img src={image} alt="Track image" />
            <Box pl="10px">
              <Heading size="xs">{trackName}</Heading>
              <Text>{artistList || <Spinner />}</Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />

        <Box>
          {/* <p style={{ display: "inline-block" }}>{showLikes >= 0 ? showLikes : <Spinner />}</p> */}
          <Text>{showLikes >= 0 ? showLikes : <Spinner />}</Text>
          {showLikeButton &&
            (like ? (
              <Button variant="unstyled" className="like-button" type="button" onClick={handleDislike}>
                <Image w="18px" src={heart} />
              </Button>
            ) : (
              <Button variant="unstyled" className="dislike-button" type="button" onClick={handleLike}>
                <Image w="18px" src={emptyHeart} />
              </Button>
            ))}
        </Box>
      </Flex>
    </Card>
  );
}

export default TrackCard;
