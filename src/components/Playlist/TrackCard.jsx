import { Spinner } from "@chakra-ui/react";

function TrackCard({ trackName, likes, image, artists }) {
  const getArtists = () => {
    return artists.map((artist) => artist);
  };

  return (
    <>
      <img src={image} alt="Track image" />
      <p>{trackName}</p>
      {artists ? getArtists() : <Spinner />}
      <br />
      {likes ? likes.length : <Spinner />}
      <hr />
    </>
  );
}

export default TrackCard;
