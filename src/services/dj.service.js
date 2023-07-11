import apiInstance from "./apiInstance";

class DjService {
  constructor() {
    this.api = apiInstance;
  }

  getAllDjs() {
    return this.api.get("/djs");
  }

  getOneDj() {
    return this.api.get(`/djs/${id}`);
  }

  updateDj() {
    return this.api.put(`/djs/${id}`);
  }
}

const djService = new DjService();
export default djService;
