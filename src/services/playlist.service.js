import apiInstace from "./apiInstance";

class PlaylistService {
  constructor() {
    this.api = apiInstace;
  }

  getPlaylists() {
    return this.api.get("/spotify/playlists");
  }
  getPlaylistId() {
    return this.api.get("/spotify/playlist-id");
  }

  getNewTrack() {
    return this.api.get("new-track");
  }

  getTrackLike() {
    return this.api.get("/track-like");
  }

  getTrackDislike() {
    return this.api.get("/track-dislike");
  }
}

const playlistService = new PlaylistService();
export default playlistService;
