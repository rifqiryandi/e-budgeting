<template>
  <ToggleButton
    v-model="getCheck"
    :disabled="getCheck != false"
    :onLabel="getLabelTrue"
    :offLabel="getLabelFalse"
    @click="getValToggle()"
  />
</template>
<script>
import { integer } from "@vuelidate/validators";
import ToggleButton from "primevue/togglebutton";
import serviceTrans from "../../services/Transaction.service";
export default {
  name: "validation button top up",
  props: {
    nilaiStatus: integer,
    keyid: integer,
    num: integer,
    nominal: integer,
    nominalTopup: integer,
    idtopUp: integer,
  },
  data() {
    return {
      checked: this.num,
      namaAkses: localStorage.getItem("namaAkes"),
      // keyId: this.keyid,
      token: localStorage.getItem("token"),
    };
  },
  computed: {
    getCheck() {
      if (this.namaAkses == "Superadmin") {
        if (this.checked == 0) {
          return this.nilaiStatus == 0 ? false : true;
        } else {
          return true;
        }
      }
      // else if (this.namaAkses == "Officer") {
      //   if (this.checked == 0) {
      //     return this.nilaiStatus == 0
      //       ? true
      //       : this.nilaiStatus == 1
      //       ? false
      //       : true;
      //   } else {
      //     return true;
      //   }
      // }
      else {
        if (this.checked == 0) {
          return this.nilaiStatus == 1 ? false : true;
        } else {
          return true;
        }
      }
    },
    getLabelTrue() {
      if (this.namaAkses == "Superadmin") {
        return this.nilaiStatus == 1
          ? "Validated By Superadmin"
          : this.nilaiStatus == 2
          ? "Validated By Departemen Head"
          : this.nilaiStatus == 0
          ? "On Progress By Superadmin"
          : "Validated By Departemen Head";
      }
      // else if (this.namaAkses == "Officer") {
      //   return this.nilaiStatus == 1
      //     ? "Tervalidasi Level 2"
      //     : this.nilaiStatus == 2
      //     ? "Tervalidasi Level 2"
      //     : this.nilaiStatus == 0
      //     ? "Belum di proses level 1"
      //     : "Tervalidasi Level 3";
      // }
      else {
        return this.nilaiStatus == 1
          ? "On Progress By Departemen Head"
          : this.nilaiStatus == 2
          ? "Validated By Departemen Head"
          : this.nilaiStatus == 0
          ? "On Progress By Superadmin"
          : "Validated By Departemen Head";
      }
    },
    getLabelFalse() {
      return "Belum divalidasi";
    },
  },
  components: {
    ToggleButton,
  },
  methods: {
    async getValToggle() {
      let status = 0;
      switch (this.namaAkses) {
        case "Superadmin":
          status = 1;
          break;
        // case "Officer":
        //   status = 2;
        //   break;
        case "Departemen Head":
          status = 2;
          break;
      }
      let payload = {
        id_topup: this.idtopUp,
        status: status,
        nominal: this.nominal + this.nominalTopup,
        id_anggaran: this.keyid,
      };
      this.$swal({
        icon: "question",
        title: "Validasi Anggaran?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#008073",
        cancelButtonColor: "grey",
        confirmButtonText: "Validasi",
        cancelButtonText: "Batal",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-2 right-gap",
          confirmButton: "order-1",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let respon = await serviceTrans.validasiTopUp(payload, this.token);
            this.checked++;
            this.responBerhasil(respon);
          } catch (error) {
            this.status = 0;
            this.responError(error);
          }
        } else {
          this.status = 0;
        }
      });
    },
    responBerhasil(respon) {
      this.$swal({
        icon: "success",
        title: "Berhasil",
        text: respon.data.Msg,
        confirmButtonColor: "#e77817",
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.namaAkses == "Departemen Head") {
            return location.reload();
          }
        }
      });
    },
    async responError(error) {
      await this.$swal({
        icon: "info",
        title: "GAGAL",
        text: error.response.data.Msg,
        confirmButtonColor: "#e77817",
      });
    },
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
