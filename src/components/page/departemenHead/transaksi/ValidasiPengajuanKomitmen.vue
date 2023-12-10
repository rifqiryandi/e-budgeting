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
                Pengajuan Biaya
              </label>
              <select
                v-model="filters.idpengajuan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Pengajuan Biaya --</option>
                <option
                  v-for="(item, index) in getPengajuanPK"
                  :key="index"
                  :value="item.id_pengajuan"
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
            <Column field="status_pengajuan" header="Status">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <div class="label-nonAktif" v-if="data.status_pengajuan == 0">
                    Belum diproses
                  </div>
                  <div
                    class="label-Aktif"
                    v-else-if="data.status_pengajuan == 1"
                  >
                    Tervalidasi
                  </div>
                  <div
                    class="label-Retur"
                    v-else-if="data.status_pengajuan == 2"
                  >
                    Retur
                  </div>
                </div>
              </template>
            </Column>

            <Column field="uraian_pengajuan" header="Kegiatan">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.uraian_pengajuan }}
                </div>
              </template>
            </Column>
            <Column field="nama_sub_mata_anggaran" header="Sub Mata Anggaran">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>

            <Column field="nominal_realisasi" header="Nominal">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nominal_realisasi.toLocaleString("de-DE") }}
                </div>
              </template>
            </Column>
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
                <p class="text-lg font-semibold mb-0">Sub Mata Anggaran</p>
                <p class="text-base">{{ Detail.nama_sub_mata_anggaran }}</p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Jenis Pengajuan</p>
                <p class="text-base">
                  {{
                    Detail.jenis_pengajuan == "PBI"
                      ? "Pengajuan biasa"
                      : Detail.jenis_pengajuan == "PB"
                      ? "Pengajuan Baru"
                      : Detail.jenis_pengajuan == "PK"
                      ? "Pengajuan Komitmen"
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Nama Kegiatan</p>
                <p class="text-base">
                  {{ Detail.uraian_pengajuan }}
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
                <p class="text-lg font-semibold mb-0">Komitmen Anggaran</p>
                <p class="text-base">
                  {{
                    Detail.nominal_pengajuan != undefined
                      ? "Rp " + Detail.nominal_pengajuan.toLocaleString("de-DE")
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">
                  Nominal Pengajuan Komitmen
                </p>
                <p class="text-base">
                  {{
                    Detail.nominal_realisasi != undefined
                      ? "Rp " + Detail.nominal_realisasi.toLocaleString("de-DE")
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Sisa Komitmen Anggaran</p>
                <p class="text-base">
                  {{
                    Detail.sisa_realisasi != undefined
                      ? "Rp " + Detail.sisa_realisasi.toLocaleString("de-DE")
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
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";

import serviceAnggaran from "../../../../services/Transaction.service";

export default {
  name: "Validasi Pengajuan Komitmen",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      modal: null,
      listPengajuanKomitmen: null,
      rowDepartemen: null,
      rowAnggaran: null,
      rowPengajuanPK: null,
      filters: {
        idpengajuan: "",
        cari: "",
        status: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
      },
      Detail: {},
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
      return this.listPengajuanKomitmen;
    },

    getPengajuanPK() {
      return this.rowPengajuanPK;
    },
  },
  methods: {
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
    async getRowPengajuanPK() {
      let payload = {
        id_pengajuan: "",
      };
      try {
        let res = await serviceAnggaran.getPengajuanPK(payload, this.token);
        this.rowPengajuanPK = res.data.data;
      } catch (error) {
        this.rowPengajuanPK = null;
        console.log(error);
      }
    },
    async getData() {
      this.loading = true;
      let payload = {
        idpengajuan: this.filters.idpengajuan,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
        kddepartemen: this.userSession.departemen,
      };
      try {
        let res = await serviceAnggaran.getListPengajuanPK(payload, this.token);
        this.pagination.totaldata = res.data.total_data;
        this.listPengajuanKomitmen = res.data.data;
        this.loading = false;
      } catch (error) {
        this.listPengajuanKomitmen = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesRetur() {
      let payload = {
        id_pengajuan: this.Detail.id_pk,
        status: 2,
        rubrik: this.Detail.kode_departement,
        kdsubmatanggaran: this.Detail.kode_sub_mata_anggaran,
        nominal: this.Detail.nominal_realisasi,
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
            let respon = await serviceAnggaran.validasiPengajuanPK(
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
    async showValidasi(data) {
      this.Detail = data;
      console.log(this.Detail);
      const $targetEl = document.getElementById("validasi-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async prosesValidasi() {
      let payload = {
        id_pengajuan: this.Detail.id_pk,
        status: 1,
        rubrik: this.Detail.kode_departement,
        kdsubmatanggaran: this.Detail.kode_sub_mata_anggaran,
        nominal: this.Detail.nominal_realisasi,
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
            let respon = await serviceAnggaran.validasiPengajuanPK(
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
    hideModal() {
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
    this.getRowPengajuanPK();
  },
};
</script>
<style></style>
