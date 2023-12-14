<template lang="">
  <div class="row flex justify-center">
    <h3 class="bg-bni-blue text-white rounded-md text-center py-1">
      Beban Opex
    </h3>
    <div class="col-lg-3 col-6">
      <div class="card card-success card-style-cstm">
        <div class="card-header text-header flex justify-left">
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
          class="card-body text-content-dashboard d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ "Rp " + totalAnggaran.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="card card-info card-style-cstm">
        <div class="card-header text-header flex justify-left">
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
          class="card-body text-content-dashboard text-xl d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ "Rp " + totalRealisasi.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
    <div class="col-lg-2 col-6">
      <div class="card card-style-cstm card-danger">
        <div class="card-header text-header flex justify-left">
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
          PERSENTASE
        </div>
        <div
          class="card-body text-content-dashboard text-xl d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ persentaseOpex + "%" }}
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="card card-style-cstm">
        <div class="card-header text-header flex justify-left card-warning">
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
          class="card-body text-content-dashboard text-xl d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ "Rp " + sisaAnggaran.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable :value="getListSponsorship" tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
              <Row>
                <Column
                  header="Data Realisasi Anggaran Sponsorship"
                  :colspan="7"
                  style="
                    background-color: #00c2c7 !important;
                    color: #333333 !important;
                  "
                />
              </Row>
              <Row>
                <Column
                  header="Sub Mata Anggaran"
                  style="
                    background-color: #daf8e3 !important;
                    color: #333333 !important;
                  "
                />

                <Column
                  header="Total Anggaran"
                  style="
                    background-color: #daf8e3 !important;
                    color: #333333 !important;
                  "
                />
                <Column
                  header="Total Realisasi"
                  style="
                    background-color: #daf8e3 !important;
                    color: #333333 !important;
                  "
                />
                <Column
                  header="Persentase"
                  style="
                    background-color: #daf8e3 !important;
                    color: #333333 !important;
                  "
                />
                <Column
                  header="Sisa Anggaran"
                  style="
                    background-color: #daf8e3 !important;
                    color: #333333 !important;
                  "
                />
              </Row>
            </ColumnGroup>

            <Column style="min-width: 620px !important">
              <template #body="{ data }">
                {{ data.kode_mata_anggaran + " - " + data.nama_mata_anggaran }}
              </template>
            </Column>
            <!-- Depart -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{ data.nominalanggaranfysponsor.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{ data.nominalrealisasisponsor.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }"> {{ data.fydepart }}% </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                {{ data.sisaanggarancse.toLocaleString("de-DE") }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <div class="row flex justify-center">
    <h3 class="bg-bni-blue text-white rounded-md text-center py-1">
      Beban Non Operasional
    </h3>
    <div class="col-lg-3 col-6">
      <div class="card card-success card-style-cstm">
        <div class="card-header text-header flex justify-left">
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
          class="card-body text-content-dashboard d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ "Rp " + totalAnggaranNon.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="card card-info card-style-cstm">
        <div class="card-header text-header flex justify-left">
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
          class="card-body text-content-dashboard d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ "Rp " + totalRealisasiNon.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
    <div class="col-lg-2 col-6">
      <div class="card card-style-cstm card-danger">
        <div class="card-header text-header flex justify-left">
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
          PERSENTASE
        </div>
        <div
          class="card-body text-content-dashboard d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ persentaseNonOpex + "%" }}
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <div class="card card-style-cstm">
        <div class="card-header text-header flex justify-left card-warning">
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
          class="card-body text-content-dashboard d-flex align-items-center justify-end pl-0 pr-2"
        >
          {{ "Rp " + sisaAnggaranNon.toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="planet-chart"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="chart1"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="chart2"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="chart3"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="chart4"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="chart5"></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="card">
        <div class="card-body">
          <canvas id="chart6"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import serviceReport from "../../../services/Report.service";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
);
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      listTableSponsor: null,
      totalAnggaran: 0,
      sisaAnggaran: 0,
      totalRealisasi: 0,
      persentase: 0,
      totalAnggaranNon: 0,
      sisaAnggaranNon: 0,
      totalRealisasiNon: 0,
      persentaseNon: 0,
      chartType: "line",
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartData1: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartData2: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartData3: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartData4: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartData5: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartData6: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Okt",
          "Des",
        ],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            ticks: {
              stepSize: 10000000,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            display: true,
          },
          title: {
            display: true,
            text: "Realisasi Anggaran",
          },
        },
      },
    };
  },
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
  computed: {
    persentaseOpex() {
      return this.persentase != "NaN" ? this.persentase : 0;
    },
    persentaseNonOpex() {
      return this.persentaseNon != "NaN" ? this.persentaseNon : 0;
    },
    getListSponsorship() {
      return this.listTableSponsor;
    },
  },
  methods: {
    async getListSponsor() {
      let payload = {
        opex: 1,
      };
      try {
        let res = await serviceReport.sponsorshipList(payload, this.token);
        this.listTableSponsor = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalAnggaran() {
      let payload = {
        opexs: 1,
      };
      try {
        let res = await serviceReport.totalAnggaran(payload, this.token);
        this.totalAnggaran = res.data.data[0].nominal_anggaran;
        this.sisaAnggaran = res.data.data[0].sisa_anggaran;
        this.persentase = Math.round(
          (this.totalRealisasi / res.data.data[0].nominal_anggaran) * 100
        ).toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalRealisasi() {
      let payload = {
        opexs: 1,
      };
      try {
        let res = await serviceReport.totalRealisasi(payload, this.token);
        this.totalRealisasi = res.data.data[0].nominal;
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalAnggaranNonOpex() {
      let payload = {
        opexs: 0,
      };
      try {
        let res = await serviceReport.totalAnggaran(payload, this.token);
        this.totalAnggaranNon =
          res.data.data[0].nominal_anggaran != null
            ? res.data.data[0].nominal_anggaran
            : 0;
        this.sisaAnggaranNon =
          res.data.data[0].sisa_anggaran != null
            ? res.data.data[0].sisa_anggaran
            : 0;
        this.persentaseNon = Math.round(
          (this.totalRealisasiNon / this.totalAnggaranNon) * 100
        ).toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalRealisasiNonOpex() {
      let payload = {
        opexs: 0,
      };
      try {
        let res = await serviceReport.totalRealisasi(payload, this.token);
        this.totalRealisasiNon =
          res.data.data[0].nominal != null ? res.data.data[0].nominal : 0;
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart() {
      try {
        let res = await serviceReport.listSponsorship(this.token);
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          const randomColor =
            "hsl(" +
            360 * Math.random() +
            "," +
            (25 + 70 * Math.random()) +
            "%," +
            50 +
            "%)";
          let labelData = data[i].nama_sub_mata_anggaran;

          let CustomData = {
            label: labelData,
            data: [
              data[i].januari,
              data[i].febuari,
              data[i].maret,
              data[i].april,
              data[i].mei,
              data[i].juni,
              data[i].juli,
              data[i].agutus,
              data[i].september,
              data[i].oktober,
              data[i].november,
              data[i].desember,
            ],
            backgroundColor: randomColor,
            borderColor: randomColor,
            lineTension: 0,
            pointBackgroundColor: randomColor,
          };
          // console.log(CustomData);
          this.chartData.datasets.push(CustomData);
        }
        const chartElement = document.querySelector("#planet-chart");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart1() {
      try {
        this.chartData1.datasets.push(this.chartData.datasets[0]);
        const chartElement = document.querySelector("#chart1");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData1,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart2() {
      try {
        this.chartData2.datasets.push(this.chartData.datasets[1]);
        const chartElement = document.querySelector("#chart2");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData2,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart3() {
      try {
        this.chartData3.datasets.push(this.chartData.datasets[2]);
        const chartElement = document.querySelector("#chart3");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData3,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart4() {
      try {
        this.chartData4.datasets.push(this.chartData.datasets[3]);
        const chartElement = document.querySelector("#chart4");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData4,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart5() {
      try {
        this.chartData5.datasets.push(this.chartData.datasets[4]);
        const chartElement = document.querySelector("#chart5");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData5,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChart6() {
      try {
        this.chartData6.datasets.push(this.chartData.datasets[5]);
        const chartElement = document.querySelector("#chart6");
        new ChartJS(chartElement, {
          type: this.chartType,
          data: this.chartData6,
          options: this.chartOptions,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getTotalRealisasi();
    this.getTotalAnggaran();
    await this.getTotalRealisasiNonOpex();
    this.getTotalAnggaranNonOpex();
    await this.getDataChart();
    this.getDataChart1();
    this.getDataChart2();
    this.getDataChart3();
    this.getDataChart4();
    this.getDataChart5();
    this.getDataChart6();

    this.getListSponsor();
  },
};
</script>
<style>
.text-header {
  font-weight: 500;
  text-align: center;
  font-size: 20px !important;
  color: #fff !important;
}
.text-content-dashboard {
  font-weight: 500;
  font-size: 28px !important;
  text-align: right;
}
@media only screen and (max-width: 892px) {
  .text-content-dashboard {
    font-size: 26px !important;
  }
  .text-header {
    font-size: 19px !important;
  }
}

.icon-dashboard {
  fill: #fff;
}
.card-warning {
  background: rgb(239, 113, 9) !important;
}
.card-style-cstm {
  height: 160px !important;
}
</style>
