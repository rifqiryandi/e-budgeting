import {
    defineStore
} from 'pinia'
import serviceUser from '../services/User.service'

const modelUserStore = defineStore('DaftarUser', {
    state: () => ({
        listUser: [],
        totalData: null,
        totalPage: null
    }),
    actions: {
        async getData(cari = '', limit, page) {
            let data = {
                perPage: limit,
                currentPage: page,
                cari: cari
            }
            let token = sessionStorage.getItem('token')
            try {
                let resData = await serviceUser.getDataUser(data, token)
                this.totalData = resData.data.data.total_data
                this.totalPage = resData.data.data.total_page
                this.listUser = resData.data.data.data
                return true
            } catch (error) {
                console.log(error.message);
            }

        },
        async findNippos(nippos) {
            let data = {
                nippos: nippos
            }
            let token = sessionStorage.getItem('token')

            try {
                return await serviceUser.findNippos(data, token)
            } catch (error) {
                console.log(error.message);
            }
        },
        async inputUser(data) {
            let token = sessionStorage.getItem('token')
            try {
                // const index = this.listUser.indexOf(9);
                // if (index > -1) { // only splice array when item is found
                //     this.listUser.splice(index, 1); // 2nd parameter means remove one item only
                // }
                // this.listUser.splice(0,0,data)
                await serviceUser.tambahDataUser(data, token)
                return true
            } catch (error) {
                return error.response.data.Msg
            }
        },
        async getHakakses() {
            let token = sessionStorage.getItem('token')
            try {
                return await serviceUser.getHakakses(token)
            } catch (error) {
                console.log(error.message);
            }
        },
        async updateUser(payload) {
            let token = sessionStorage.getItem('token')
            try {
                await serviceUser.updateUser(payload,token)
                return true
            } catch (error) {
                console.log(error);
            }
        }

    }
})

export default modelUserStore();