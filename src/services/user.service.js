import apiInstance from "./apiInstance";

class UserService {
  constructor() {
    this.api = apiInstance;
  }
  getUser() {
    return this.api.get("/users/user-profile");
  }
}

const userService = new UserService();
export default userService;
