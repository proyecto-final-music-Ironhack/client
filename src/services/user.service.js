import apiInstance from "./apiInstance";

class UserService {
  constructor() {
    this.api = apiInstance;
  }
  getUser() {
    return this.api.get("/users/user-profile");
  }

  updateUser(id) {
    return this.api.get(`/users/${id}`);
  }
  deleteUser(id) {
    this.api.get(`/users/${id}/delete`);
  }
}

const userService = new UserService();
export default userService;
