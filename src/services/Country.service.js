import http from "../conf-http";

class CountryService {

  getProvinsi() {
    return http.get("referensi/getpropinsi");
  }
  getKabupaten(data) {
    return http.post("referensi/getkabupaten", data);
  }
  getKecamatan(data) {
    return http.post("referensi/getkecamatan", data);
  }
  getKelurahan(data) {
    return http.post("referensi/getkelurahan", data);

  }

  // REG,KCU KC
  getReg(token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.get("referensi/listkantoreg", config);
  }
  getKcu(data,token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("referensi/listkantorkcu",data, config);
  }
  getKc(data,token) {
    var config = {
      headers: {
        "x-access-token": token
      }
    }
    return http.post("referensi/listkantorkc",data, config);
  }
}

export default new CountryService();