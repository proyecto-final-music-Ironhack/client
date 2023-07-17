import { useEffect, useState } from "react";
import playlistService from "../../services/playlist.service";

const PlaylistsName = () => {
  const [playlistsName, setPlaylistName] = useState([]);

  const allPlaylists = async () => {
    try {
      const resData = await playlistService.getPlaylists();
      setPlaylistName(resData.data);
      console.log(resData.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      allPlaylists();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h1>ADD A PLAYLIST:</h1>
      {playlistsName.items?.map((playlistItems) => {
        return (
          <div>
            <img
              style={{ height: "60px" }}
              src={playlistItems.images[0].url}
              alt=""
            />
            <h1 key={playlistItems.id}>{playlistItems.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistsName;
