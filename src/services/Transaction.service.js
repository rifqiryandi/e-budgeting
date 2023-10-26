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
    validasiAlokasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasialokasi", data, config);

    }
    validasiKegiatan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasikegiatan", data, config);

    }
    inputKegiatan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/inskegiatan", data, config);

    }
    listKegiatan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listkegiatan", data, config);

    }

    getKegiatan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("pengajuan/getidkegiatan", data, config);

    }

    inputPengajuanBiaya(data, token) {
        console.log(data);
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("pengajuan/inspengajuan", data, config);
    }

    getPengajuanPK(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/getpengajuanpk", data, config);

    }
    getListPengajuan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listpengajaun", data, config);
    }
    validasiPengajuan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasipengajuan", data, config);
    }

    getListPengajuanPK(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listpengajaunpk", data, config);
    }
    inputPengajuanPK(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("pengajuan/inspengajuanpk", data, config);
    }
    


}

export default new TransactionService();