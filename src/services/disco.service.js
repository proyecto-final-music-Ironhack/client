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
}

const discoService = new DiscoService();
export default discoService;
