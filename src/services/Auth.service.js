import http from "../conf-http";

class AuthService {
  getToken(data) {
    return http.post("auth/login",data);
  }
  clearLogin(data){
    return http.post("auth/logout",data);
  }
}

export default new AuthService();