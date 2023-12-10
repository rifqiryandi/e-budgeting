<template lang="">
  <div class="row">
    <div class="col-4">
      <div class="card card-info">
        <div class="card-header text-header text-lg flex justify-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            class="mr-3 icon-dashboard"
          >
            <path
              d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"
            />
          </svg>
          TOTAL REALISASI
        </div>
        <div
          class="card-body text-content-dashboard text-xl d-flex align-items-center justify-end"
        >
          {{ "Rp " + totalRealisasi.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card card-success">
        <div class="card-header text-header text-lg flex justify-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            class="mr-3 icon-dashboard"
          >
            <path
              d="M240-360h280l80-80H240v80Zm0-160h240v-80H240v80Zm-80-160v400h280l-80 80H80v-560h800v120h-80v-40H160Zm756 212q5 5 5 11t-5 11l-36 36-70-70 36-36q5-5 11-5t11 5l48 48ZM520-120v-70l266-266 70 70-266 266h-70ZM160-680v400-400Z"
            />
          </svg>
          TOTAL ANGGARAN
        </div>
        <div
          class="card-body text-content-dashboard text-xl d-flex align-items-center justify-end"
        >
          {{ "Rp " + totalAnggaran.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div
          class="card-header text-header text-lg flex justify-left card-warning"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            class="mr-3 icon-dashboard"
          >
            <path
              d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z"
            />
          </svg>
          SISA ANGGARAN
        </div>
        <div
          class="card-body text-content-dashboard text-xl d-flex align-items-center justify-end"
        >
          {{ "Rp " + sisaAnggaran.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import serviceReport from "../../../services/Report.service";
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      totalAnggaran: 0,
      sisaAnggaran: 0,
      totalRealisasi: 0,
    };
  },
  methods: {
    async getTotalAnggaran() {
      try {
        let res = await serviceReport.totalAnggaran(this.token);
        this.totalAnggaran = res.data.data[0].nominal_anggaran;
        this.sisaAnggaran = res.data.data[0].sisa_anggaran;
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalRealisasi() {
      try {
        let res = await serviceReport.totalRealisasi(this.token);
        this.totalRealisasi = res.data.data[0].nominal;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getTotalAnggaran();
    this.getTotalRealisasi();
  },
};
</script>
<style>
.text-header {
  font-weight: 500;
  text-align: center;
  color: #fff !important;
}
.text-content-dashboard {
  font-weight: 500;
  text-align: right;
}
.icon-dashboard {
  fill: #fff;
}
.card-warning {
  background: rgb(239, 113, 9) !important;
}
.card {
  height: 160px !important;
}
</style>
