import http from "../conf-http";

class KMataAnggaranService {
    getDataKMataAnggaran(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getkelmatanggaran", config);
    }
    tambahDataKMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/inskelmatanggaran", data, config);
    }

    updateKMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updatekelmatanggaran", data, config);
    }

    deleteKMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/delkelmatanggaran", data, config);
    }
    ubahStatus(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updatestatusklpmataanggaran", data, config);
    }
}

export default new KMataAnggaranService();