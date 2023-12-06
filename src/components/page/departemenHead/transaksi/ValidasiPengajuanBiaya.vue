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
                Sub Mata Anggaran
              </label>
              <select
                v-model="filters.kdsubmatanggaran"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Sub Mata Anggaran --</option>
                <option
                  v-for="(item, index) in getSMataAnggaran"
                  :key="index"
                  :value="item.kode_sub_mata_anggaran"
                >
                  {{ item.nama_sub_mata_anggaran }}
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
            @click="cariData"
          >
            Tampilkan
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable
            :value="getAllData"
            lazy
            paginator
            :totalRecords="pagination.totaldata"
            :rows="pagination.perPage"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            :loading="loading"
            @page="paginationTable($event)"
          >
            <template #header>
              <div class="d-flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <InputText
                    v-model="filters.cari"
                    @input="cariData"
                    placeholder="Search"
                  />
                </span>
              </div>
            </template>
            <template #empty> No Data found. </template>
            <template #loading> Loading data. Please wait. </template>
            <Column field="" header="Status">
              <template #body="{ data }">
                <div class="label-nonAktif" v-if="data.status_pengajuan == 0">
                  Belum diproses
                </div>
                <div class="label-Aktif" v-else-if="data.status_pengajuan == 1">
                  Tervalidasi
                </div>
                <div class="label-Retur" v-else-if="data.status_pengajuan == 2">
                  Retur
                </div>
              </template>
            </Column>

            <Column
              field="nama_sub_mata_anggaran"
              header="Sub Mata Anggaran"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="uraian_kegiatan"
              header="Nama Kegiatan"
              style="width: 25%"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.uraian_kegiatan }}
                </div>
              </template>
            </Column>
            <Column field="" header="Tahun" style="width: 5%">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>
            <Column field="" header="Nominal Pengajuan" class="text-right">
              <template #body="{ data }">
                {{ data.nominal_pengajuan.toLocaleString("de-DE") }}
              </template>
            </Column>
            <!-- <Column field="" header="Nominal Anggaran" class="text-right">
              <template #body="{ data }">
                {{ data.nominal.toLocaleString("de-DE") }}
              </template>
            </Column> -->
            <Column field="" header="" style="width: 5%">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <button
                    class="bg-transparent border-0"
                    title="Validasi Pengajuan"
                    @click="showValidasi(data)"
                  >
                    <div v-if="data.status_pengajuan == 0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path
                          d="M480.067-100.001q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.925-148.204q29.925-69.369 81.225-120.682 51.3-51.314 120.65-81.247Q401.15-859.999 480-859.999q63.204 0 119.602 19t103.474 53l-43.383 44.384q-38.769-26.692-83.991-41.539Q530.48-800 480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-21.077-2.769-41.69-2.77-20.612-8.308-40.08l48.46-48.845q11 30.846 16.808 63.463 5.808 32.617 5.808 67.152 0 78.85-29.92 148.199-29.92 69.35-81.21 120.65-51.291 51.3-120.629 81.225-69.337 29.925-148.173 29.925Zm-56.836-209.846L267.078-466l42.153-42.153 114 114 394.615-395.23 42.153 42.153-436.768 437.383Z"
                        />
                      </svg>
                    </div>
                    <div v-else>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path
                          d="M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Validasi -->
  <div
    id="validasi-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 mb-8 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-4xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600 bg-bni-orange"
        >
          <h3 class="text-xl font-medium" style="color: #fff">
            Detail Pengajuan Biaya
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-2 mb-2">
            <div class="">
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Entitas</p>
                <p class="text-base">{{ Detail.nama_entitas }}</p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Sub Mata Anggaran</p>
                <p class="text-base">{{ Detail.nama_sub_mata_anggaran }}</p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Jenis Pengajuan</p>
                <p class="text-base">
                  {{
                    Detail.jenis_pengajuan == "PBI"
                      ? "Beban Reguler"
                      : Detail.jenis_pengajuan == "PB"
                      ? "Pengajuan Baru"
                      : Detail.jenis_pengajuan == "PK"
                      ? "Beban Komitmen"
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Nama Kegiatan</p>
                <p class="text-base">
                  {{ Detail.uraian_kegiatan }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Uraian Kegiatan</p>
                <p class="text-base">
                  {{ Detail.uraian_pengajuan }}
                </p>
              </div>
            </div>
            <div class>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Nominal Anggaran FY</p>
                <p class="text-base">
                  {{
                    Detail.nominal != undefined
                      ? "Rp " + Detail.nominal.toLocaleString("de-DE")
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">
                  Sisa Anggaran Terhadap Total Pengajuan
                </p>
                <p class="text-base">
                  {{
                    Detail.sisanominal_pengajuan != undefined
                      ? "Rp " +
                        Detail.sisanominal_pengajuan.toLocaleString("de-DE")
                      : ""
                  }}
                </p>
              </div>

              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Nominal yang diajukan</p>
                <p class="text-base">
                  {{
                    Detail.nominal_pengajuan != undefined
                      ? "Rp " + Detail.nominal_pengajuan.toLocaleString("de-DE")
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Status</p>
                <div class="label-nonAktif" v-if="Detail.status_pengajuan == 0">
                  Belum diproses
                </div>
                <div
                  class="label-Aktif"
                  v-else-if="Detail.status_pengajuan == 1"
                >
                  Tervalidasi
                </div>
                <div
                  class="label-Retur"
                  v-else-if="Detail.status_pengajuan == 2"
                >
                  Retur
                </div>
              </div>
            </div>
          </div>
          <hr class="bg-gray-400" />
          <p class="text-lg font-semibold mb-0">Lampiran File</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 mb-1">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="64"
                viewBox="0 -960 960 960"
                width="64"
                style="fill: #006699"
              >
                <path
                  d="M252.309-100.001q-30.308 0-51.308-21t-21-51.308v-615.382q0-30.308 21-51.308t51.308-21h317.692l209.998 209.998v477.692q0 30.308-21 51.308t-51.308 21H252.309Zm287.692-520V-800H252.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v615.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h455.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-447.692H540.001ZM240-800v179.999V-800v640V-800Z"
                />
              </svg>
              <p class="text-base m-0 pt-3">
                {{ listFile != null ? listFile[0].lampiran : "" }}
              </p>
            </div>
            <button
              class="download-style w-full lg:w-1/4 lg:mt-1"
              @click="downloadLinkFile(listFile[0].link)"
            >
              Download
            </button>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          v-show="Detail.status_pengajuan == 0"
        >
          <button
            type="button"
            @click="prosesValidasi"
            class="bg-bni-blue text-white font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            VALIDASI
          </button>
          <button
            @click="prosesRetur"
            type="button"
            class="bg-retur text-white font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            RETUR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
import useValidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";

import serviceAnggaran from "../../../../services/Transaction.service";
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";
import serviceFile from "../../../../services/File.service";

export default {
  name: "Validasi Pengajuan Biaya",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      listPengajuan: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        cari: "",
        status: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
      },
      Form: {
        id_anggaran: "",
        jnspengajuan: "",
        id_kegiatan: "",
        nominal: "",
        userid: "",
        uraian_kegiatan: "",
        sisa_nominal: "",
      },
      Detail: {},
      listFile: null,
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
  },
  computed: {
    getAllData() {
      return this.listPengajuan;
    },
    getSMataAnggaran() {
      return this.rowSMataAnggaran;
    },
  },
  methods: {
    downloadLinkFile(link) {
      window.open(link, "_blank", "noreferrer");
    },
    async prosesRetur() {
      let payload = {
        id_pengajuan: this.Detail.id,
        id_anggaran: this.Detail.id_anggaran,
        status: 2,
        rubrik: this.Detail.kode_departement,
        kdsubmatanggaran: this.Detail.kode_sub_mata_anggaran,
        nominal: this.Detail.nominal_pengajuan,
        alasan: "",
      };
      this.$swal({
        icon: "question",
        title: "Retur pengajuan biaya?",
        input: "textarea",
        inputLabel: "ALASAN",
        inputPlaceholder: "Alasan di retur",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#eb4034",
        cancelButtonColor: "grey",
        confirmButtonText: "Retur",
        cancelButtonText: "Batal",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-2 right-gap",
          confirmButton: "order-1",
        },
        inputValidator: (value) => {
          if (!value) {
            return "Alasan tidak boleh kosong!";
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            payload.alasan = result.value;
            let respon = await serviceAnggaran.validasiPengajuan(
              payload,
              this.token
            );
            this.responBerhasil(respon);
            this.hideModal();
            this.refreshListTable(1);
          } catch (error) {
            this.responError(error);
          }
        }
      });
    },
    async prosesValidasi() {
      let payload = {
        id_pengajuan: this.Detail.id,
        id_anggaran: this.Detail.id_anggaran,
        status: 1,
        rubrik: this.Detail.kode_departement,
        kdsubmatanggaran: this.Detail.kode_sub_mata_anggaran,
        nominal: this.Detail.nominal_pengajuan,
        alasan: "",
      };
      this.$swal({
        icon: "question",
        title: "Validasi pengajuan biaya?",
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
            let respon = await serviceAnggaran.validasiPengajuan(
              payload,
              this.token
            );
            this.responBerhasil(respon);
            this.hideModal();
            this.refreshListTable(1);
          } catch (error) {
            this.responError(error);
          }
        }
      });
    },
    responBerhasil(respon) {
      this.$swal({
        icon: "success",
        title: respon.data.Msg,
        text: respon.data.kode_unik,
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
    async showValidasi(data) {
      this.Detail = data;
      let payload = {
        idpengajuan: this.Detail.id,
      };
      try {
        let res = await serviceFile.listFile(payload, this.token);
        this.listFile = res.data.data;
      } catch (error) {
        this.responError(error);
      }
      const $targetEl = document.getElementById("validasi-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    cariData() {
      this.refreshListTable(1);
    },
    filterShow() {
      this.pagination.currentPage = 1;
      this.refreshListTable();
    },
    paginationTable(evt) {
      this.pagination.perPage = evt.rows;
      if (this.pagination.currentPage == evt.page) {
        this.pagination.currentPage++;
      } else if (this.pagination.currentPage - evt.page == 1) {
        this.pagination.currentPage--;
      } else {
        this.pagination.currentPage = evt.page + 1;
      }
      this.refreshListTable();
    },
    async getSubMataAnggaran() {
      let payload = {};
      try {
        let res = await serviceSMataAnggaran.getDataSubMataAnggaran(
          payload,
          this.token
        );
        this.rowSMataAnggaran = res.data.data;
      } catch (error) {
        this.rowSMataAnggaran = null;
        console.log(error);
      }
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.userSession.departemen,
        status: "",
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceAnggaran.getListPengajuan(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.listPengajuan = res.data.data.data;
        this.loading = false;
      } catch (error) {
        this.listPengajuan = null;
        this.loading = false;
        console.log(error);
      }
    },
    hideModal() {
      this.listFile = null;
      this.modal.hide();
    },
    refreshListTable(reset = 0) {
      if (reset != 0) {
        this.pagination.currentPage = 1;
      }
      this.getData();
    },
  },
  mounted() {
    initFlowbite();
    this.getData();
    this.getSubMataAnggaran();
  },
};
</script>
<style></style>
