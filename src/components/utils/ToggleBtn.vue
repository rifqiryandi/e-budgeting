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
import serviceEntitas from "../../services/Entitas.service";
import serviceDepartemen from "../../services/Departemen.service";
import serviceKMataAnggaran from "../../services/KelompokMataAnggaran.service";
import serviceMataAnggaran from "../../services/MataAnggaran.service";
import serviceSMataAnggaran from "../../services/SubMataAnggaran.service";

export default {
  name: "Toggle Button",
  props: {
    nilaiStatus: integer,
    apihit: String,
    keyid: integer,
  },
  data() {
    return {
      checked: false,
      urlApi: this.apihit,
      keyId: this.keyid,
      token: sessionStorage.getItem("token"),
    };
  },
  components: {
    ToggleButton,
  },
  methods: {
    async getValToggle() {
      console.log(this.checked);
      this.$swal({
        icon: "question",
        title: "Ubah Status",
        text : "Yakin ingin Ubah Status?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#008073",
        cancelButtonColor: "grey",
        confirmButtonText: "Ubah",
        cancelButtonText: "Batal",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-2 right-gap",
          confirmButton: "order-1",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          let payload;
          if (this.checked) {
            payload = {
              id: this.keyId,
              status: 1,
            };
          } else {
            payload = {
              id: this.keyId,
              status: 0,
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
            case "Entitas":
              try {
                await serviceEntitas.ubahStatus(payload, this.token);
              } catch (error) {
                this.checked = true;
                await this.responError(error);
                console.log(error);
              }
              break;
            case "Departemen":
              try {
                await serviceDepartemen.ubahStatus(payload, this.token);
              } catch (error) {
                this.checked = true;
                await this.responError(error);
                console.log(error);
              }
              break;
            case "KMataAnggaran":
              try {
                await serviceKMataAnggaran.ubahStatus(payload, this.token);
              } catch (error) {
                this.checked = true;
                await this.responError(error);
                console.log(error);
              }
              break;
            case "MataAnggaran":
              try {
                await serviceMataAnggaran.ubahStatus(payload, this.token);
              } catch (error) {
                this.checked = true;
                await this.responError(error);
                console.log(error);
              }
              break;
            case "SMataAnggaran":
              try {
                await serviceSMataAnggaran.ubahStatus(payload, this.token);
              } catch (error) {
                this.checked = true;
                await this.responError(error);
                console.log(error);
              }
              break;
          }
        } else {
          if (this.checked == false) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        }
      });
    },
    async responError(error) {
      console.log(error);
      await this.$swal({
        icon: "info",
        title: "GAGAL",
        text: "Sudah Terdapat Aktivitas Transaksi",
        confirmButtonColor: "#e77817",
      });
    },
    checkStatus() {
      if (this.nilaiStatus == 1) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  async mounted() {
    await this.checkStatus();
  },
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
