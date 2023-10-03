import http from "../conf-http";

class AuthService {
  getToken(data) {
    return http.post("auth/signin",data);
  }
}

export default new AuthService();