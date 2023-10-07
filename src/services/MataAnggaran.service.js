import http from "../conf-http";

class MataAnggaranService {
    getDataMataAnggaran(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getmatanggaran", config);
    }
    tambahDataMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/insmatanggaran", data, config);
    }

    updateMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updatematanggaran", data, config);
    }

    deleteMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/delmatanggaran", data, config);
    }

}

export default new MataAnggaranService();