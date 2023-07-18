import { Button, Image, Spinner } from "@chakra-ui/react";
import emptyHeart from "../../images/empy-heart.png";
import heart from "../../images/heart.png";
import playlistService from "../../services/playlist.service";
import { useState } from "react";

function TrackCard({ trackName, likes, image, artists, _id }) {
  console.log("track id", _id);
  const [like, setLike] = useState(false);
  const [showLikes, setShowLikes] = useState(likes?.length);

  const getArtists = () => {
    return artists.map((artist) => artist);
  };

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
      setShowLikes((num) => num - 1);
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

      {like ? (
        <Button className="like-button" type="submit" onClick={handleDislike}>
          <Image w="18px" src={heart} />
        </Button>
      ) : (
        <Button className="dislike-button" type="submit" onClick={handleLike}>
          <Image w="18px" src={emptyHeart} />
        </Button>
      )}

      <hr />
    </>
  );
}

export default TrackCard;
