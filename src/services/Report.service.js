import http from "../conf-http";

class ReportService {
    laporanRealisasi(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/realisasi", {}, config);
    }
    reportRealisasiDepart(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/reportrealisasidepart", data, config);
    }

    totalAnggaran(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/totalanggaran", {}, config);
    }

    totalRealisasi(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/totalrealisasi", {}, config);
    }

    listSponsorship(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/sponsorship", {}, config);
    }
}

export default new ReportService();