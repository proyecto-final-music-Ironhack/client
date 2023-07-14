import apiInstance from "./apiInstance";

class DjService {
  constructor() {
    this.api = apiInstance;
  }

  getAllDjs() {
    return this.api.get("/djs");
  }

  getOneDj(id) {
    return this.api.get(`/djs/${id}`);
  }

  updateDj(id) {
    return this.api.put(`/djs/${id}`);
  }

  addFollower(id) {
    return this.api.put(`/djs/${id}/add-follower`).then((response) => response.data.followers);
  }

  removeFollower(id) {
    return this.api.put(`/djs/${id}/remove-follower`).then((response) => response.data.followers);
  }
}

const djService = new DjService();
export default djService;
