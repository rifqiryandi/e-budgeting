import {
    defineStore
} from 'pinia'
import serviceAuth from '../services/Auth.service'
// KC = 40, KCU = 30, REGIONAL = 20, PUSAT = 10
const modelSession = defineStore('SessionAll', {
    state: () => ({
        xtoken: null
    }),
    actions: {
        async login(nippos, password) {
            let data = {
                nippos: nippos,
                password: password
            }
            try {

                let respon = await serviceAuth.getToken(data)
                if (respon.data.responCode == 200) {
                    let token = respon.data.accessToken
                    sessionStorage.setItem("isLogin", true);
                    sessionStorage.setItem("token", token);
                    if (respon.data.data.kodeakses == 10) {
                        sessionStorage.setItem("namaAkes", "Pusat")
                    } else if (respon.data.data.kodeakses == 20) {
                        sessionStorage.setItem("namaAkes", "Regional")
                    } else if (respon.data.data.kodeakses == 30) {
                        sessionStorage.setItem("namaAkes", "KCU")
                    } else if (respon.data.data.kodeakses == 40) {
                        sessionStorage.setItem("namaAkes", "KC")
                    }
                    sessionStorage.setItem('expTime', respon.data.expiresIn)
                    sessionStorage.setItem("dataUser", btoa(JSON.stringify(respon.data.data)));
                    return true
                }
            } catch (error) {
                return error.message
                // console.log(error.message);
            }
        }

    }
})

export default modelSession();