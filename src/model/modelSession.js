import {
    defineStore
} from 'pinia'
import serviceUser from '../services/User.service'
const modelSession = defineStore('dataStore', {
    state: () => ({
        filters: {
            status : ""
        },
        ListUser : null
    }),
    actions: {
        async StoreData() {
            serviceTrans.getDataUser()
            let payload = {
                status: this.filters.status,
            };
            try {
                let respon = await serviceUser.getDataUser(payload, token);
                this.ListUser = respon.data.data;
            } catch (error) {
                this.ListUser = null;
                console.log(error);
            }
        }

    }
})

export default modelSession();