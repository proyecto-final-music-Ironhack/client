import { useEffect, useState } from "react";
import playlistService from "../../services/playlist.service";

const Playlist = () => {
  const [playlists, setPlaylist] = useState([]);

  const getPlaylist = async () => {
    try {
      const res = await playlistService.getPlaylists();
      console.log(res);
      setPlaylist(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);
  return (
    <>
      {playlists.map((playlist) => (
        <div key={playlist.id}>{playlist.name}</div>
      ))}
    </>
  );
};

export default Playlist;
