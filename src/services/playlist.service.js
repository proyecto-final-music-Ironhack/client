import apiInstance from "./apiInstance";

class PlaylistService {
  constructor() {
    this.api = apiInstance;
  }

  getPlaylists() {
    return this.api.get("/playlists");
  }
  getPlaylistId() {
    return this.api.get(`/playlist/${playlistId}/${eventId}`);
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
