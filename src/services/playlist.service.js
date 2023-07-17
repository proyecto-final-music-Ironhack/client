import apiInstance from "./apiInstance";

class PlaylistService {
  constructor() {
    this.api = apiInstance;
  }

  getPlaylists() {
    return this.api.get("/spotify/playlists");
  }
  getPlaylistId(playlistId, eventId) {
    return this.api.get(`/spotify/playlist/${playlistId}/${eventId}`);
  }

  getTrackLike(trackId) {
    return this.api.put(`/spotify/track-like/${trackId}`);
  }

  getTrackDislike(trackId) {
    return this.api.put(`/spotify/track-dislike/${trackId}`);
  }
}

const playlistService = new PlaylistService();
export default playlistService;
