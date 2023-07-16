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
      <h1>HOLA</h1>
      {playlistsName.items?.map((playlistItems) => {
        return <h1 key={playlistItems.id}>{playlistItems.name}</h1>;
      })}
    </div>
  );
};

export default PlaylistsName;
