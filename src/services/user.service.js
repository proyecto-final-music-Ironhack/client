import apiInstance from "./apiInstance";

class UserService {
  constructor() {
    this.api = apiInstance;
  }
  getUser() {
    return this.api.get("/users/user-profile");
  }

  updateUser(id, formData) {
    return this.api.put(`/users/${id}`, formData);
  }
  deleteUser(id) {
    this.api.post(`/users/${id}/delete`);
  }
}

const userService = new UserService();
export default userService;
