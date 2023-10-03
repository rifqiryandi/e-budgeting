import http from "../conf-http";

class ReportService {
    getDashboard(data,token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("dashboard/listdashboard", data,config);
    }
    getDashboardSpesifik(data,token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("dashboard/listdashboardetail", data,config);
    }
}

export default new ReportService();