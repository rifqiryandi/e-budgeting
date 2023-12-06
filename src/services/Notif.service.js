import http from "../conf-http";

class NotifService {
    listNotif(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/listnotifikasi", data, config);
    }

    updateNotif(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/updatestatusnotif", data, config);
    }

    countNotif(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/countnotifikasi", data, config);
    }
}

export default new NotifService();