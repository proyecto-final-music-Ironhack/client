import { Button, Image, Spinner } from "@chakra-ui/react";
import emptyHeart from "../../images/empy-heart.png";
import heart from "../../images/heart.png";
import playlistService from "../../services/playlist.service";
import { useState } from "react";

function TrackCard({ trackName, likes, image, artists, _id }) {
  const [like, setLike] = useState(false);
  const [showLikes, setShowLikes] = useState(likes.length);

  const getArtists = () => {
    return artists.map((artist) => artist);
  };

  const handleLike = async () => {
    try {
      const addLike = !like;
      let handleLikes = 0;
      if (addLike) {
        await playlistService.getTrackLike(_id);
        handleLikes = showLikes + 1;
      } else {
        await playlistService.getTrackDislike(_id);
        handleLikes = showLikes - 1;
      }
      setLike(addLike);
      setShowLikes(handleLikes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <img src={image} alt="Track image" />
      <p>{trackName}</p>
      {artists ? getArtists() : <Spinner />}
      <br />
      {likes ? showLikes : <Spinner />}
      <Button className="like-button" type="submit" onClick={handleLike}>
        {like ? <Image w="18px" src={heart} /> : <Image w="18px" src={emptyHeart} />}
      </Button>
      <hr />
    </>
  );
}

export default TrackCard;
