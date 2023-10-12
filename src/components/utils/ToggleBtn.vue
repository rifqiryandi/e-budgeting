<template>
  <ToggleButton
    v-model="checked"
    onLabel="Aktif"
    offLabel="Non-Aktif"
    @click="getValToggle()"
  />
</template>
<script>
import { integer } from "@vuelidate/validators";
import ToggleButton from "primevue/togglebutton";
import serviceUser from "../../services/User.service";
export default {
  name: "Toggle Button",
  props: {
    nilaiStatus: integer,
    apihit: String,
    keyid: integer,
  },
  data() {
    return {
      checked: this.nilaiStatus == 1 ? true : false,
      urlApi: this.apihit,
      keyId: this.keyid,
      token:sessionStorage.getItem('token')

    };
  },
  computed: {
    getCheck(){
      return this.checked
    }
  },
  components: {
    ToggleButton,
  },
  methods: {
    async getValToggle() {
      let payload;
      if (this.checked) {
        payload = {
          id: this.keyId,
          status: 1,
        };
      } else {
        payload = {
          id: this.keyId,
          status: 2,
        };
      }
      switch (this.urlApi) {
        case "User":
          try {
            await serviceUser.ubahStatus(payload, this.token);
          } catch (error) {
            console.log(error);
          }
          break;
      }
    },
  },
  mounted() {},
};
</script>
<style>
.p-button span {
  font-size: 14px !important;
}
.p-button {
  width: 136px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  color: #f66512 !important;
  text-align: center;
  border: 0px !important;
  border-left: #f66512 5px solid !important ;
  box-shadow: none !important;

  /* Animasi */
  background: linear-gradient(to right, #dcffeb 50%, #ffe3c2 50%) !important;
  background-size: 200% 100% !important;
  background-position: right bottom !important;
  transition: all 0.3s ease-out !important;
  transition: background 1.5s ease-out !important;
}
.p-highlight {
  color: #5bb07f !important;
  box-shadow: none !important;

  border-top: 0px !important;
  border-bottom: 0px !important;
  border-left: #5bb07f 5px solid !important;
  box-shadow: none;
  /* transition: background 2s ease-out; */
  background-position: left bottom !important;
}
</style>
