<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="mb-1">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Filters.kdkelmatanggaran"
              @change="getMataAnggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Kelompok Mata Anggaran --</option>
              <option
                v-for="(item, index) in getKelompokMataAnggaran"
                :key="index"
                :value="item.kode_kelompok_mata_anggaran"
              >
                {{ item.nama_kelompok_mata_anggaran }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Filters.kdmatanggaran"
              :disabled="rowAllMataAnggaran == null"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Mata Anggaran --</option>
              <option
                v-for="(item, index) in rowAllMataAnggaran"
                :key="index"
                :value="item.kode_mata_anggaran"
              >
                {{ item.nama_mata_anggaran }}
              </option>
            </select>
          </div>
          <div>
            <button
              class="w-full"
              style="
                border-radius: 6px;
                background: #006699;
                color: #ffff;
                height: 48px;
                padding-top: 11px;
                padding-bottom: 11px;
              "
              @click="getData"
            >
              Tampilkan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable
            :value="getAllData"
            tableStyle="min-width: 50rem"
            :rowClass="getClassdata"
            :headerClass="getClassHead"
          >
            <ColumnGroup type="header">
              <Row>
                <Column header="Divisi Corporate Secretary" :rowspan="2" />
                <Column :header="'Tahun ' + tahun" :colspan="6" />
              </Row>
              <Row>
                <Column
                  :header="
                    userSession.departemen +
                    ' - ' +
                    userSession.nama_departement
                  "
                  :colspan="6"
                />
              </Row>
              <Row>
                <Column :header="tanggalLengkap" />
                <!-- CSE -->
                <Column header="Realisasi" />
                <Column header="Anggaran FY" />
                <Column header="Anggaran YTD" />
                <Column header="% FY" />
                <Column header="% YTD" />
                <Column header="Sisa Anggaran" />
              </Row>
            </ColumnGroup>

            <Column style="min-width: 620px !important">
              <template #body="{ data }">
                {{
                  data.kode_sub_mata_anggaran != undefined &&
                  data.nama_sub_mata_anggaran != undefined
                    ? data.kode_sub_mata_anggaran +
                      " - " +
                      data.nama_sub_mata_anggaran
                    : data.kode_mata_anggaran != undefined &&
                      data.nama_mata_anggaran != undefined
                    ? data.kode_mata_anggaran + " - " + data.nama_mata_anggaran
                    : data.kode_kelompok_mata_anggaran +
                      " - " +
                      data.nama_kelompok_mata_anggaran
                }}
              </template>
            </Column>
            <!-- Depart -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalmatarealisasidepart != undefined ?
                  data.nominalmatarealisasidepart != 0
                    ? data.nominalmatarealisasidepart.toLocaleString("de-DE")
                    : "-" : data.nominalrealisasidepart != 0
                    ? data.nominalrealisasidepart.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalmataanggaranfydepart != undefined ?
                  data.nominalmataanggaranfydepart != 0
                    ? data.nominalmataanggaranfydepart.toLocaleString("de-DE")
                    : "-" : data.anggaranfydepart != 0
                    ? data.anggaranfydepart.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.mataanggaranytddepart != undefined ?
                  data.mataanggaranytddepart != 0
                    ? data.mataanggaranytddepart.toLocaleString("de-DE")
                    : "-" :data.anggaranytddepart != 0
                    ? data.anggaranytddepart.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div class="flex">
                  {{ data.fycse != undefined ? data.fycse : data.fydepart }}%

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.fycse != undefined
                        ? data.fycse >= 0 && data.fycse <= 70
                          ? 'label-ijo'
                          : data.fycse >= 71 && data.fycse <= 90
                          ? 'label-yellow'
                          : data.fycse >= 91 && data.fycse <= 100
                          ? 'label-orange'
                          : 'label-red'
                        : data.fydepart >= 0 && data.fydepart <= 70
                        ? 'label-ijo'
                        : data.fydepart >= 71 && data.fydepart <= 90
                        ? 'label-yellow'
                        : data.fydepart >= 91 && data.fydepart <= 100
                        ? 'label-orange'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div class="flex">
                  {{ data.ytdcse != undefined ? data.ytdcse : data.ytddepart }}%

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.ytdcse != undefined
                        ? data.ytdcse >= 0 && data.ytdcse <= 70
                          ? 'label-ijo'
                          : data.ytdcse >= 71 && data.ytdcse <= 90
                          ? 'label-yellow'
                          : data.ytdcse >= 91 && data.ytdcse <= 100
                          ? 'label-orange'
                          : 'label-red'
                        : data.ytddepart >= 0 && data.ytddepart <= 70
                        ? 'label-ijo'
                        : data.ytddepart >= 71 && data.ytddepart <= 90
                        ? 'label-yellow'
                        : data.ytddepart >= 91 && data.ytddepart <= 100
                        ? 'label-orange'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.sisaanggarancse != undefined
                    ? data.sisaanggarancse != 0
                      ? data.sisaanggarancse.toLocaleString("de-DE")
                      : "-"
                    : data.sisamtanggarancse != null
                    ? data.sisamtanggarancse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
          </DataTable>
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
import serviceReport from "../../../../services/Report.service";
import serviceMataAnggaran from "../../../../services/MataAnggaran.service";
import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";
export default {
  name: "Laporan Realisasi",
  data() {
    return {
      Filters: {
        kdkelmatanggaran: "",
        kdmatanggaran: "",
      },
      rowMataAnggaran: null,
      rowKelompokMataA: null,
      tahun: "",
      tanggalLengkap: "",
      listLaporan: null,
      token: sessionStorage.getItem("token"),
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
  computed: {
    getAllData() {
      return this.listLaporan;
    },
    rowAllMataAnggaran() {
      return this.rowMataAnggaran;
    },
    getKelompokMataAnggaran() {
      return this.rowKelompokMataA;
    },
  },
  methods: {
    async getKMataAnggaran() {
      try {
        let res = await serviceKMataAnggaran.getDataKMataAnggaran(this.token);
        this.rowKelompokMataA = res.data.data;
      } catch (error) {
        console.log(error.response.data.Msg);
      }
    },
    async getMataAnggaran() {
      this.Filters.kdmatanggaran = "";
      let payload = {
        kdkelmatanggaran: this.Filters.kdkelmatanggaran,
      };
      try {
        let respon = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );

        this.rowMataAnggaran = respon.data.data;
      } catch (error) {
        this.rowMataAnggaran = null;
        console.log(error);
      }
    },
    getTahun() {
      const d = new Date();
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      this.tahun = d.getFullYear();
      let namaBulan = month[d.getMonth()];
      let hari = days[d.getDay()];

      this.tanggalLengkap =
        hari + ", " + namaBulan + " " + d.getDay() + ", " + this.tahun;
    },
    async getData() {
      console.log(this.userSession);
      if (this.Filters.kdkelmatanggaran == "") {
        this.listLaporan = null;
        return this.$swal({
          icon: "info",
          title: "Pemberitahuan",
          text: "Pilih Kelompok Mata Anggaran Terlebih Dahulu",
          confirmButtonColor: "#e77817",
        });
      }
      if (this.Filters.kdmatanggaran == "") {
        this.listLaporan = null;
        return this.$swal({
          icon: "info",
          title: "Pemberitahuan",
          text: "Pilih Mata Anggaran Terlebih Dahulu",
          confirmButtonColor: "#e77817",
        });
      }
      let payload = {
        kddepartemen: this.userSession.departemen,
        kdmatanggaran: this.Filters.kdmatanggaran,
        kdkelmatanggaran: this.Filters.kdkelmatanggaran,
      };
      try {
        let res = await serviceReport.reportRealisasiDepart(
          payload,
          this.token
        );
        this.listLaporan = res.data.data;
      } catch (error) {
        this.listLaporan = null;
        console.log(error);
      }
    },
    getClassdata(data) {
      return data.kode_kelompok_mata_anggaran != undefined
        ? "color-kmataanggaran"
        : data.kode_mata_anggaran != undefined
        ? "color-mataanggaran"
        : "";
    },
  },
  mounted() {
    this.getTahun();
    this.getKMataAnggaran();
  },
};
</script>
<style>
.label-ijo {
  fill: rgb(45, 220, 45);
  margin-left: 3px;
}
.label-yellow {
  fill: rgb(245, 195, 17);
  margin-left: 3px;
}
.label-orange {
  fill: rgb(255, 94, 0);
  margin-left: 3px;
}
.label-red {
  fill: rgb(241, 0, 0);
  margin-left: 3px;
}
.color-mataanggaran {
  background-color: rgb(93, 113, 121) !important;
  color: #fff !important;
}
.color-kmataanggaran {
  background-color: rgb(160, 166, 169) !important;
  color: #fff !important;
}
</style>
