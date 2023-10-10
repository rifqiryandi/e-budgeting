import http from "../conf-http";

class DepartemenService {
    getDataDepartemen(data,token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/getdepartemen", data,config);
    }
    tambahDataDepartemen(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/insdepartemen", data, config);
    }

    updateDepartemen(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/updatedepartemen", data, config);
    }

    deleteDepartemen(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/deldepartemen", data, config);
    }

}

export default new DepartemenService();