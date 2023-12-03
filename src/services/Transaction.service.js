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
    validasiPengajuanPK(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasipengajuanpk", data, config);
    }

    // Retur
    listRetur(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listretur", data, config);
    }

    inputRetur(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/retur", data, config);
    }

    inputReturPK(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/returpk", data, config);
    }

    inputRealisasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/realisasi", data, config);
    }

    getPengajuanRealisasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("pengajuan/getidpengajuan", data, config);

    }

    getListPengajuanPB(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("pengajuan/getidpengajuan", data, config);
    }

    inputPengajuanPB(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("pengajuan/inspengajuanpb", data, config);
    }


    listRealisasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listrealisasi", data, config);
    }

    listTopUp(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listopupanggaran", data, config);
    }

    inputTopUp(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/topupanggaran", data, config);
    }
    validasiTopUp(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasitopup", data, config);
    }

    ListSwitchAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listswitchanggaran", data, config);
    }

    inputSwitchAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/switchanggaran", data, config);
    }

    validasiSwitchAnggaran(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasiswitchanggaran", data, config);
    }

    listPengajuanForRealisasi(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/getpengajuan", data, config);
    }

    validasiRealisasi(data, token){
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/validasirealisasi", data, config);
    }
    uploadFileRealisasi(data, token){
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/realisasi", data, config);
    }
    
    listFileRealisasi(data, token){
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/listfilerealisasi", data, config);
    }
}

export default new TransactionService();