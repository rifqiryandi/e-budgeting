import http from "../conf-http";

class EntitasService {
    getDataEntitas(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getentitas", config);
    }
    tambahDataEntitas(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/insentitas", data, config);
    }

    updateEntitas(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updateentitas", data, config);
    }

    deleteEntitas(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/delentitas", data, config);
    }
    ubahStatus(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updatestatusentitas", data, config);
    }

}

export default new EntitasService();