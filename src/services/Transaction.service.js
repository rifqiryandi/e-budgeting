import http from "../conf-http";

class TransactionService {
    // File
    uploadPengajuan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/pengajuan", data, config);
    }

    listFile(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/listfile", data, config);
    }

    getFile(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/getfile", data, config);
    }


    // Hapus Pengajuan dan prefix nopend
    hapusPengajuan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/hapuspengajaun", data, config);
    }
    prefixNopend(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/createnopend", data, config);
    }
    // Pusat Ubah status kantor
    changeStatusKantor(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/pengajuankantorpst", data, config)
    }

    // Detail dan Update Kantor
    detailKantor(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/detailkantor", data, config);
    }
    updateKantor(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/updatekantor", data, config);
    }
    detailLayanan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/detaillayanan", data, config);
    }
    deleteLayanan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/hapuslayanan", data, config);
    }
    // LAPORAN
    getLaporanPengajuan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/historipengajuan", data, config);
    }

    // HISTORY
    getHistoryPengajuan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("histori/historikantorkc", data, config);
    }
    // LAYANAN
    getKantorLayanan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("reporting/listkantorkc", data, config);
    }
    pengajuanLayanan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/pengajuanlayanan", data, config);
    }
    penambahanOutlet(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/penambahanlayananoutlet", data, config);
    }
    // Validasi
    validasiKantor(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/updatepengajuanktr", data, config);
    }
    // List dan pengajuan
    pengajuanKantor(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/pengajuanktr", data, config);
    }

    pengajuanPembatalan(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/penutupankantor", data, config);

    }

    listPengajuanKC(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listpengajuanktrkc", data, config);
    }
    listPengajuanKCU(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listpengajuanktrkcu", data, config);
    }
    listPengajuanREG(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("transaksi/listpengajuanktreg", data, config);
    }

    //   LIST JENIS KANTOR, KELAS, GEDUNG DAN KONEKSI

    jenisKantor(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/getjenisktr", data, config);
    }
    jenisKelas(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getkelasktr", config);
    }
    refGedung(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getrefgedung", config);
    }
    refJaringan(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getjaringan", config);
    }
    refLayanan(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/getlayanan", config);
    }
    refKC(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/listkantorkc", data, config);
    }
    refKCU(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("referensi/listkantorkcu", data, config);
    }
    refREG(token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.get("referensi/listkantoreg", config);
    }

}

export default new TransactionService();