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
          >
            <ColumnGroup type="header">
              <Row>
                <Column header="Divisi Corporate Secretary" :rowspan="2" />
                <Column :header="'Tahun ' + tahun" :colspan="18" />
              </Row>
              <Row>
                <Column header="753 - CSE" :colspan="6" />
                <Column header="711 - DIR dan SEVP" :colspan="6" />
                <Column header="712 - COMM" :colspan="6" />
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
                <!-- DIR dan SEV -->
                <Column header="Realisasi" />
                <Column header="Anggaran FY" />
                <Column header="Anggaran YTD" />
                <Column header="% FY" />
                <Column header="% YTD" />
                <Column header="Sisa Anggaran" />
                <!-- COMM -->
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
            <!-- CSE -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalrealisasicse != undefined
                    ? data.nominalrealisasicse != 0
                      ? data.nominalrealisasicse.toLocaleString("de-DE")
                      : "-"
                    : data.realisasicse != null
                    ? data.realisasicse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranfycse != undefined
                    ? data.anggaranfycse != 0
                      ? data.anggaranfycse.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranfycse != null
                    ? data.mataanggaranfycse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranytdcse != undefined
                    ? data.anggaranytdcse != 0
                      ? data.anggaranytdcse.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranytdcse != null
                    ? data.mataanggaranytdcse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div
                  :class="
                    data.fycse != undefined
                      ? data.fycse >= 0 && data.fycse <= 70
                        ? 'label-ijo'
                        : data.fycse >= 71 && data.fycse <= 90
                        ? 'label-yellow'
                        : data.fycse >= 91 && data.fycse <= 100
                        ? 'label-orange'
                        : 'label-red'
                      : data.mtfycse >= 0 && data.mtfycse <= 70
                      ? 'label-ijo'
                      : data.mtfycse >= 71 && data.mtfycse <= 90
                      ? 'label-yellow'
                      : data.mtfycse >= 91 && data.mtfycse <= 100
                      ? 'label-orange'
                      : 'label-red'
                  "
                >
                  {{ data.fycse != undefined ? data.fycse : data.mtfycse }}%
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div
                  :class="
                    data.ytdcse != undefined
                      ? data.ytdcse >= 0 && data.ytdcse <= 70
                        ? 'label-ijo'
                        : data.ytdcse >= 71 && data.ytdcse <= 90
                        ? 'label-yellow'
                        : data.ytdcse >= 91 && data.ytdcse <= 100
                        ? 'label-orange'
                        : 'label-red'
                      : data.mtytdcse >= 0 && data.mtytdcse <= 70
                      ? 'label-ijo'
                      : data.mtytdcse >= 71 && data.mtytdcse <= 90
                      ? 'label-yellow'
                      : data.mtytdcse >= 91 && data.mtytdcse <= 100
                      ? 'label-orange'
                      : 'label-red'
                  "
                >
                  {{ data.ytdcse != undefined ? data.ytdcse : data.mtytdcse }}%
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
            <!-- DIR dan SEV -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalrealisasidir != undefined
                    ? data.nominalrealisasidir != 0
                      ? data.nominalrealisasidir.toLocaleString("de-DE")
                      : "-"
                    : data.realisasidir != null
                    ? data.realisasidir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranfydir != undefined
                    ? data.anggaranfydir != 0
                      ? data.anggaranfydir.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranfydir != null
                    ? data.mataanggaranfydir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranytddir != undefined
                    ? data.anggaranytddir != 0
                      ? data.anggaranytddir.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranytddir != null
                    ? data.mataanggaranytddir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div
                  :class="
                    data.fydir != undefined
                      ? data.fydir >= 0 && data.fydir <= 70
                        ? 'label-ijo'
                        : data.fydir >= 71 && data.fydir <= 90
                        ? 'label-yellow'
                        : data.fydir >= 91 && data.fydir <= 100
                        ? 'label-orange'
                        : 'label-red'
                      : data.mtfydir >= 0 && data.mtfydir <= 70
                      ? 'label-ijo'
                      : data.mtfydir >= 71 && data.mtfydir <= 90
                      ? 'label-yellow'
                      : data.mtfydir >= 91 && data.mtfydir <= 100
                      ? 'label-orange'
                      : 'label-red'
                  "
                >
                  {{ data.fydir != undefined ? data.fydir : data.mtfydir }}%
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div
                  :class="
                    data.ytddir != undefined
                      ? data.ytddir >= 0 && data.ytddir <= 70
                        ? 'label-ijo'
                        : data.ytddir >= 71 && data.ytddir <= 90
                        ? 'label-yellow'
                        : data.ytddir >= 91 && data.ytddir <= 100
                        ? 'label-orange'
                        : 'label-red'
                      : data.mtytddir >= 0 && data.mtytddir <= 70
                      ? 'label-ijo'
                      : data.mtytddir >= 71 && data.mtytddir <= 90
                      ? 'label-yellow'
                      : data.mtytddir >= 91 && data.mtytddir <= 100
                      ? 'label-orange'
                      : 'label-red'
                  "
                >
                  {{ data.ytddir != undefined ? data.ytddir : data.mtytddir }}%
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.sisaanggarandir != undefined
                    ? data.sisaanggarandir != 0
                      ? data.sisaanggarandir.toLocaleString("de-DE")
                      : "-"
                    : data.sisamtanggarandir != null
                    ? data.sisamtanggarandir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <!-- COMM -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalrealisasicomm != undefined
                    ? data.nominalrealisasicomm != 0
                      ? data.nominalrealisasicomm.toLocaleString("de-DE")
                      : "-"
                    : data.realisasicomm != null
                    ? data.realisasicomm.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranfycomm != undefined
                    ? data.anggaranfycomm != 0
                      ? data.anggaranfycomm.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranfycomm != null
                    ? data.mataanggaranfycomm.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranytdcomm != undefined
                    ? data.anggaranytdcomm != 0
                      ? data.anggaranytdcomm.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranytdcomm != null
                    ? data.mataanggaranytdcomm.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div
                  :class="
                    data.fycomm != undefined
                      ? data.fycomm >= 0 && data.fycomm <= 70
                        ? 'label-ijo'
                        : data.fycomm >= 71 && data.fycomm <= 90
                        ? 'label-yellow'
                        : data.fycomm >= 91 && data.fycomm <= 100
                        ? 'label-orange'
                        : 'label-red'
                      : data.mtfycomm >= 0 && data.mtfycomm <= 70
                      ? 'label-ijo'
                      : data.mtfycomm >= 71 && data.mtfycomm <= 90
                      ? 'label-yellow'
                      : data.mtfycomm >= 91 && data.mtfycomm <= 100
                      ? 'label-orange'
                      : 'label-red'
                  "
                >
                  {{ data.fycomm != undefined ? data.fycomm : data.mtfycomm }}%
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: center">
              <template #body="{ data }">
                <div
                  :class="
                    data.ytdcomm != undefined
                      ? data.ytdcomm >= 0 && data.ytdcomm <= 70
                        ? 'label-ijo'
                        : data.ytdcomm >= 71 && data.ytdcomm <= 90
                        ? 'label-yellow'
                        : data.ytdcomm >= 91 && data.ytdcomm <= 100
                        ? 'label-orange'
                        : 'label-red'
                      : data.mtytdcomm >= 0 && data.mtytdcomm <= 70
                      ? 'label-ijo'
                      : data.mtytdcomm >= 71 && data.mtytdcomm <= 90
                      ? 'label-yellow'
                      : data.mtytdcomm >= 91 && data.mtytdcomm <= 100
                      ? 'label-orange'
                      : 'label-red'
                  "
                >
                  {{
                    data.ytdcomm != undefined ? data.ytdcomm : data.mtytdcomm
                  }}%
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.sisaanggarancomm != null
                    ? data.sisaanggarancomm != 0
                      ? data.sisaanggarancomm.toLocaleString("de-DE")
                      : "-"
                    : data.sisamtanggarancomm != null
                    ? data.sisamtanggarancomm.toLocaleString("de-DE")
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
      let payload = {
        kdmatanggaran: this.Filters.kdmatanggaran,
        kdkelmatanggaran: this.Filters.kdkelmatanggaran,
      };
      try {
        let res = await serviceReport.laporanRealisasi(payload, this.token);

        this.listLaporan = res.data.data;
        console.log(this.listLaporan);
      } catch (error) {
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
  color: rgb(6, 165, 6);
}
.label-yellow {
  color: rgb(245, 195, 17);
}
.label-orange {
  color: rgb(255, 94, 0);
}
.label-red {
  color: rgb(241, 0, 0);
}
.color-mataanggaran {
  background-color: rgb(94, 198, 240) !important;
}
.color-kmataanggaran {
  background-color: rgb(15, 185, 252) !important;
}
</style>
