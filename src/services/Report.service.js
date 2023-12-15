import http from "../conf-http";

class ReportService {
    laporanRealisasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/realisasi", data, config);
    }
    reportRealisasiDepart(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/reportrealisasidepart", data, config);
    }

    totalAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/totalanggaran", data, config);
    }

    totalRealisasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/totalrealisasi", data, config);
    }

    listSponsorship(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/sponsorship", {}, config);
    }
    
    sponsorshipList(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/sponsorshiplist", data, config);
    }

}

export default new ReportService();