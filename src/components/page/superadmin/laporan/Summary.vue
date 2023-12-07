<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500">Pencarian</h3>
          <hr />
          <div class="grid grid-cols-1 gap-2">
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Entitas
              </label>
              <select
                v-model="filters.entitas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Entitas --</option>
                <option
                  v-for="(item, index) in getAllEntitas"
                  :key="index"
                  :value="item"
                >
                  {{ item.nama_entitas }}
                </option>
              </select>
            </div>
          </div>
          <button
            class="btn w-full mt-3"
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
          <!-- <unduhExcel :data="getAllData" type="xlsx" name="filename.xlsx">
            Unduh Data
          </unduhExcel> -->
        </div>
      </div>
    </div>
    <div class="col-12">
      <DataTable :value="getAllData" tableStyle="min-width: 50rem">
        <ColumnGroup type="header">
          <Row>
            <Column header="Divisi Corporate Secretary" :rowspan="2" />
            <Column :header="'Tahun ' + tahun" :colspan="18" />
          </Row>
          <Row>
            <Column :header="filters.namaEntitas" :colspan="6" />
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
              data.kode_sub_mata_anggaran + " - " + data.nama_sub_mata_anggaran
            }}
          </template>
        </Column>

        <!-- Entitas -->
        <Column style="min-width: 160px !important; text-align: right">
          <template #body="{ data }">
            {{
              data.nominalrealisasicse != null
                ? data.nominalrealisasicse.toLocaleString("de-DE")
                : "-"
            }}
          </template>
        </Column>
        <Column style="min-width: 160px !important ; text-align: right">
          <template #body="{ data }">
            {{
              data.anggaranfycse != null
                ? data.anggaranfycse.toLocaleString("de-DE")
                : "-"
            }}
          </template>
        </Column>
        <Column style="min-width: 160px !important ; text-align: right">
          <template #body="{ data }">
            {{
              data.anggaranytdcse != null
                ? data.anggaranytdcse.toLocaleString("de-DE")
                : "-"
            }}
          </template>
        </Column>
        <Column style="min-width: 90px !important; text-align: center">
          <template #body="{ data }">
            <div
              :class="
                data.fycse >= 0 && data.fycse <= 70
                  ? 'label-ijo'
                  : data.fycse >= 71 && data.fycse <= 90
                  ? 'label-yellow'
                  : data.fycse >= 91 && data.fycse <= 100
                  ? 'label-orange'
                  : 'label-red'
              "
            >
              {{ data.fycse }}%
            </div>
          </template>
        </Column>
        <Column style="min-width: 90px !important; text-align: center">
          <template #body="{ data }">
            <div
              :class="
                data.ytdcse >= 0 && data.ytdcse <= 70
                  ? 'label-ijo'
                  : data.ytdcse >= 71 && data.ytdcse <= 90
                  ? 'label-yellow'
                  : data.ytdcse >= 91 && data.ytdcse <= 100
                  ? 'label-orange'
                  : 'label-red'
              "
            >
              {{ data.ytdcse }}%
            </div>
          </template>
        </Column>
        <Column style="min-width: 160px !important; text-align: right">
          <template #body="{ data }">
            {{
              data.sisaanggarancse != null
                ? data.sisaanggarancse.toLocaleString("de-DE")
                : "-"
            }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import serviceReport from "../../../../services/Report.service";
import serviceEntitas from "../../../../services/Entitas.service";
export default {
  name: "Laporan Realisasi",
  data() {
    return {
      tahun: "",
      tanggalLengkap: "",
      listLaporanEntitas: null,
      token: sessionStorage.getItem("token"),
      rowEntitas: null,
      filters: {
        entitas: "",
        namaEntitas: "",
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
    getAllData() {
      return this.listLaporanEntitas;
    },
    getAllEntitas() {
      return this.rowEntitas;
    },
  },
  methods: {
    async getEntitas() {
      try {
        let res = await serviceEntitas.getDataEntitas(this.token);
        this.rowEntitas = res.data.data;
      } catch (error) {
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
      this.filters.namaEntitas =
        this.filters.entitas.kode_entitas +
        " - " +
        this.filters.entitas.nama_entitas;
      let payload = {
        kode_entitas: this.filters.entitas.kode_entitas,
      };
      try {
        let res = await serviceReport.reportRealisasiDepart(
          payload,
          this.token
        );
        this.listLaporanEntitas = res.data.data;
        console.log(this.listLaporanEntitas);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getTahun();
    this.getEntitas();
  },
};
</script>
<style>
.label-ijo {
  color: rgb(6, 165, 6);
}
.label-yellow {
  color: rgb(206, 206, 16);
}
.label-orange {
  color: rgb(255, 94, 0);
}
.label-red {
  color: rgb(237, 13, 13);
}
</style>
