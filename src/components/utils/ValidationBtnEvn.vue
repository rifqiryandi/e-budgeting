<template>
  <ToggleButton
    v-model="getCheck"
    :disabled="getCheck != false"
    onLabel="Tervalidasi"
    offLabel="Belum di validasi"
    @click="getValToggle()"
  />
</template>
<script>
import { integer } from "@vuelidate/validators";
import ToggleButton from "primevue/togglebutton";
import serviceTrans from "../../services/Transaction.service";
export default {
  name: "validation button",
  props: {
    nilaiStatus: integer,
    keyid: integer,
    num: integer,
  },
  data() {
    return {
      checked: this.num,
      namaAkses: sessionStorage.getItem("namaAkes"),
      // keyId: this.keyid,
      token: sessionStorage.getItem("token"),
    };
  },
  components: {
    ToggleButton,
  },
  computed: {
    getCheck() {
      if (this.checked == 0) {
        return this.nilaiStatus == 0 ? false : true;
      } else {
        return true;
      }
    },
  },
  methods: {
    async getValToggle() {
      let payload = {
        id_kegiatan: this.keyid,
        status: 1,
      };
      this.$swal({
        icon: "question",
        title: "Validasi kegiatan?",
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
            let respon = await serviceTrans.validasiKegiatan(
              payload,
              this.token
            );
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
