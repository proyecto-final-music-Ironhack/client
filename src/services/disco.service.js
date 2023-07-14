import apiInstance from "./apiInstance";

class DiscoService {
  constructor() {
    this.api = apiInstance;
  }

  getAllDiscos() {
    return this.api.get("/disco");
  }

  getOneDisco(id) {
    return this.api.get(`/disco/${id}`);
  }

  updateDisco(id) {
    return this.api.put(`/disco/${id}`);
  }
  addFollower(id) {
    return this.api.put(`/disco/${id}/add-follower`).then((response) => response.data.followers);
  }

  removeFollower(id) {
    return this.api.put(`/disco/${id}/remove-follower`).then((response) => response.data.followers);
  }
}

const discoService = new DiscoService();
export default discoService;
