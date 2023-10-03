import {
    defineStore
} from 'pinia'
import serviceTransaction from '../services/Transaction.service'

const modelUserStore = defineStore('DaftarPengajuan', {
    state: () => ({
        listKantor: [],
        totalData: null,
        totalPage: null,
        layanan: {
            listKantorLayanan: [],
            totalData: null,
            totalPage: null
        },
        history: {
            listPengajuan: [],
            totalData: null,
            totalPage: null
        },
        laporan: {
            listPengajuan: [],
            totalData: null,
            totalPage: null
        }
    }),
    actions: {
        clearData() {
            this.listKantor = []
            this.totalPage = null
            this.totalData = null
            this.layanan.listKantorLayanan = []
            this.layanan.totalPage = null
            this.layanan.totalData = null
            this.history.listPengajuan = []
            this.history.totalPage = null
            this.history.totalData = null
            this.laporan.listPengajuan = []
            this.laporan.totalData = null
            this.laporan.totalPage = null
        },
        async getData(data, tipeKantor) {
            let token = sessionStorage.getItem('token')
            try {
                let res
                if (tipeKantor == "Pusat") {
                    res = await serviceTransaction.listPengajuanREG(data, token)
                } else if (tipeKantor == "Regional") {
                    res = await serviceTransaction.listPengajuanKCU(data, token)
                } else if (tipeKantor == "KCU") {
                    res = await serviceTransaction.listPengajuanKC(data, token)
                }
                this.totalPage = res.data.total_page
                this.totalData = res.data.total_data
                this.listKantor = res.data.data
                return true
            } catch (error) {
                this.listKantor = []
                this.totalPage = null
                this.totalData = null
                return error.response.data.Msg

            }
        },
        async getDataLayanan(data) {
            let token = sessionStorage.getItem('token')
            try {
                let res = await serviceTransaction.getKantorLayanan(data, token)
                this.layanan.listKantorLayanan = res.data.data.data
                this.layanan.totalPage = res.data.data.total_page
                this.layanan.totalData = res.data.data.total_data
                return true
            } catch (error) {
                this.layanan.listKantorLayanan = []
                this.layanan.totalPage = null
                this.layanan.totalData = null
                return error.response.data.Msg

            }
        },
        async getDataHistory(data) {
            let token = sessionStorage.getItem('token')
            try {
                let res = await serviceTransaction.getHistoryPengajuan(data, token)
                
                this.history.listPengajuan = res.data.data
                this.history.totalPage = res.data.total_page
                this.history.totalData = res.data.total_data
                return true

            } catch (error) {
                this.history.listPengajuan = []
                this.history.totalPage = null
                this.history.totalData = null
                return error.response.data.Msg

            }

        },
        async getDataLaporan(data) {
            let token = sessionStorage.getItem('token')
            try {
                let res = await serviceTransaction.getLaporanPengajuan(data, token)
                this.laporan.listPengajuan = res.data.data
                this.laporan.totalPage = res.data.total_page
                this.laporan.totalData = res.data.total_data
                return true

            } catch (error) {
                this.laporan.listPengajuan = []
                this.laporan.totalPage = null
                this.laporan.totalData = null
                return error.response.data.Msg

            }

        }
    },

})

export default modelUserStore();