import apiInstance from "./apiInstance";

class EventService {
  constructor() {
    this.api = apiInstance;
  }

  getAllEvent() {
    return this.api.get("/events");
  }

  getOneEvent(id) {
    return this.api.get(`/event/${id}`);
  }
}

const eventService = new EventService();
export default eventService;
