import http from "../conf-http";

class SubMataAnggaranService {
    getDataSubMataAnggaran(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getsubmatanggaran", config);
    }
    tambahDataSubMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/inssubmatanggaran", data, config);
    }

    updateSubMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updatesubmatanggaran", data, config);
    }

    deleteSubMataAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/delsubmatanggaran", data, config);
    }

}

export default new SubMataAnggaranService();