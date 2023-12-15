import http from "../conf-http";

class UserService {
  getDataUser(data,token) {
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

  updateUser(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/edituser", data, config);
  }

  deleteUser(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/deluser", data, config);
  }

  ubahStatus(data, token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/updatestatus", data, config);
  }

  changePassword(data, token){
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("users/updatepass", data, config);
  }


  getJabatan(token){
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.get("referensi/getjabatan", config);
  }
  

}

export default new UserService();