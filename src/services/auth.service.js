import apiInstance from "./apiInstance";

class AuthService {
  constructor() {
    this.api = apiInstance;
  }

  signupUser(data) {
    return this.api.post("/auth/signup/user", data);
  }
  signupDj(data) {
    return this.api.post("/auth/signup/dj", data);
  }

  login(data) {
    return this.api.post(`/auth/login`, data);
  }

  verify(token) {
    return this.api.get(`/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

const authService = new AuthService();

export default authService;
