import http from "../conf-http";

class UserService {
  getDataUser(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/listuser", data, config);
  }

  tambahDataUser(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/insusers", data, config);
  }

  findNippos(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/getuser", data, config);
  }

  getHakakses(token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.get("referensi/gethakakses", config);

  }

  updateUser(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/edituser", data, config);
  }
}

export default new UserService();