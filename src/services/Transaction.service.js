import http from "../conf-http";

class TransactionService {
    inputAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/inputanggaran", data, config);
    }
    getTransaksi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listtransaksi", data, config);
    }
    inputPersentasiAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/inputpresenanggaran", data, config);
    }
    getIdAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/getidanggaran", data, config);
    }
    getListPresentasiAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listpresentasianggaran", data, config);
    }
    // transaksi/inputpresenanggaran

}

export default new TransactionService();