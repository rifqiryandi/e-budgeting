<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500">Pencarian</h3>
          <hr />
          <div class="grid grid-cols-1">
            <div class="w-full mb-2">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Kelompok Mata Anggaran
              </label>
              <select
                v-model="filters.kdkelmatanggaran"
                @change="getMataAnggaranFilter"
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
            <div class="w-full">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Mata Anggaran
              </label>
              <select
                v-model="filters.kdmatanggaran"
                @change="getSubMataAnggaranFilter"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Mata Anggaran --</option>
                <option
                  v-for="(item, index) in rowAllMataAnggaranFilter"
                  :key="index"
                  :value="item.kode_mata_anggaran"
                >
                  {{ item.nama_mata_anggaran }}
                </option>
              </select>
            </div>
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
                  v-for="(item, index) in getSMataAnggaranFilter"
                  :key="index"
                  :value="item.kode_sub_mata_anggaran"
                >
                  {{
                    item.kode_sub_mata_anggaran +
                    " - " +
                    item.nama_sub_mata_anggaran
                  }}
                </option>
              </select>
            </div>
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                v-model="filters.status"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Status --</option>
                <option value="0">Belum Validasi</option>
                <option value="1">Validated By Superadmin</option>
                <option value="9">Validated By Officer</option>
                <option value="2">Validated By Departemen Head</option>
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
            @click="filterShow"
          >
            Tampilkan
          </button>
          <!-- <unduhExcel :data="getAllData" type="xlsx" name="filename.xlsx">
              Unduh Data
            </unduhExcel> -->
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
            :first="pagination.first"
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
            <Column field="" header="" style="min-width: 140px !important">
              <template #body="{ data }">
                <ValidationBtn
                  :nilaiStatus="data.status_anggaran.toString()"
                  :keyid="data.id_anggaran"
                  :num="0"
                />
              </template>
            </Column>
            <!-- <Column field="nama_entitas" header="Entitas">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_entitas }}
                </div>
              </template>
            </Column>
            <Column field="nama_departement" header="Departemen">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_departement }}
                </div>
              </template>
            </Column> -->
            <Column
              field="nama_kelompok_mata_anggaran"
              header="Kelompok Mata Anggaran"
              style="min-width: 220px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_kelompok_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_mata_anggaran"
              header="Mata Anggaran"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_mata_anggaran }}
                </div>
              </template>
            </Column>

            <Column
              field="nama_sub_mata_anggaran"
              header="Sub Mata Anggaran"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>

            <!-- <Column field="tahun" header="Tahun">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column> -->
            <Column
              field=""
              header="Nominal Awal Tahun"
              class="text-right"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.nominal.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column
              field=""
              header="Sisa Anggaran"
              class="text-right"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.sisa_anggaran.toLocaleString("de-DE") }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Insert -->
  <div
    id="input-modal"
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
            Tambah Anggaran
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
        <div class="p-6 space-y-2">
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Sub Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.kdsubmatanggaran"
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
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdsubmatanggaran.$error"
            >
              Sub Mata Anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kode Departemen <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.kddepartemen"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih departemen --</option>
              <option
                v-for="(item, index) in getDepartemen"
                :key="index"
                :value="item.kode_departement"
              >
                {{ item.nama_departement }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kddepartemen.$error"
            >
              Kode Departemen tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Tahun <span class="text-red-600">*</span>
            </label>
            <VueDatePicker v-model="Form.tahun" auto-apply year-picker />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.tahun.$error"
            >
              Tahun tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal <span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.nominal"
              placeholder="Masukkan Nominal"
              class="w-full"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nominal.$error"
            >
              Nominal tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Keterangan <span class="text-red-600">*</span>
            </label>
            <textarea
              v-model="Form.keterangan"
              cols="30"
              rows="10"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.keterangan.$error"
            >
              Keterangan tidak boleh kosong!
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            @click="prosesInput"
            class="bg-bni-blue text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            SIMPAN
          </button>
          <button
            @click="hideModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Delete -->
  <div
    id="delete-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah anda yakin ingin menghapus data ini?
          </h3>
          <button
            type="button"
            @click="prosesDelete"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Hapus
          </button>
          <button
            @click="hideModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import exportFromJSON from "export-from-json";
import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";
import ValidationBtn from "../../../utils/ValidationBtn.vue";

import serviceAnggaran from "../../../../services/Transaction.service";
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";
import serviceDepartemen from "../../../../services/Departemen.service";
import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";
import serviceMataAnggaran from "../../../../services/MataAnggaran.service";
export default {
  name: "Anggaran",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      ListTransaksi: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowKMataAnggaran: null,
      rowMataAnggaranFilter: null,
      rowSMataAnggaranFilter: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        cari: "",
        status: "",
        kdkelmatanggaran: "",
        kdmatanggaran: "",
        tahun: new Date().getFullYear(),
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
        first: 0,
      },
      Form: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        tahun: "",
        nominal: "",
        keterangan: "",
        status: 0,
        userid: "",
      },
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        kdsubmatanggaran: { required },
        kddepartemen: { required },
        tahun: { required },
        nominal: { required },
        keterangan: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    VueDatePicker,
    InputNumber,
    ValidationBtn,
  },
  computed: {
    getAllData() {
      return this.ListTransaksi;
    },
    getSMataAnggaran() {
      return this.rowSMataAnggaran;
    },
    getDepartemen() {
      return this.rowDepartemen;
    },
    getKelompokMataAnggaran() {
      return this.rowKMataAnggaran;
    },
    getSMataAnggaranFilter() {
      return this.rowSMataAnggaranFilter;
    },
    rowAllMataAnggaranFilter() {
      return this.rowMataAnggaranFilter;
    },
  },
  methods: {
    // tes() {
    //   const data = this.ListTransaksi;
    //   const fileName = "download";
    //   const exportType = exportFromJSON.types.csv;

    //   exportFromJSON({ data, fileName, exportType });
    // },
    async getMataAnggaranFilter() {
      let payload = {
        kdkelmatanggaran: this.filters.kdkelmatanggaran,
      };
      try {
        let respon = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );
        this.rowMataAnggaranFilter = respon.data.data;
      } catch (error) {
        this.rowMataAnggaranFilter = null;
        console.log(error);
      }
    },
    async getSubMataAnggaranFilter() {
      let payload = {
        kdkelmatanggaran: this.filters.kdkelmatanggaran,
        kdmatanggaran: this.filters.kdmatanggaran,
      };
      try {
        let res = await serviceSMataAnggaran.getDataSubMataAnggaran(
          payload,
          this.token
        );
        this.rowSMataAnggaranFilter = res.data.data;
      } catch (error) {
        this.rowSMataAnggaranFilter = null;
        console.log(error);
      }
    },
    async rowDataKMataAnggaran() {
      try {
        let res = await serviceKMataAnggaran.getDataKMataAnggaran(this.token);
        this.rowKMataAnggaran = res.data.data;
      } catch (error) {
        this.rowKMataAnggaran = null;
        console.log(error);
      }
    },
    cariData() {
      this.refreshListTable(1);
    },
    filterShow() {
      this.pagination.currentPage = 1;
      this.refreshListTable();
    },
    paginationTable(evt) {
      this.pagination.first = evt.first;
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
    async getAllDepartemen() {
      let payload = {
        entitas: "",
        status: "",
      };
      try {
        let respon = await serviceDepartemen.getDataDepartemen(
          payload,
          this.token
        );
        this.rowDepartemen = respon.data.data;
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "GAGAL",
          text: error.response.data.Msg,
          confirmButtonColor: "#e77817",
        });
      }
    },
    async getSubMataAnggaran() {
      let payload = {
        kdkelmatanggaran: "",
        kdmatanggaran: "",
      };
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
    showInput() {
      this.Form = {
        kdsubmatanggaran: "",
        kddepartemen: "",
        tahun: "",
        nominal: "",
        userid: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    deleteAnggaran(data) {
      const $targetEl = document.getElementById("delete-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.idKey = data.id;
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.userSession.departemen,
        status: this.filters.status,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
        tahun: this.filters.tahun,
        kelmatanggaran: this.filters.kdkelmatanggaran,
        matanggaran: this.filters.kdmatanggaran,
      };
      try {
        let res = await serviceAnggaran.getTransaksi(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.ListTransaksi = res.data.data.data;
        this.loading = false;
      } catch (error) {
        this.ListTransaksi = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesInput() {
      let Forminput = this.Form;
      Forminput.userid = this.userSession.username;
      Forminput.status = 0;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        try {
          let respon = await serviceAnggaran.inputAnggaran(
            Forminput,
            this.token
          );
          this.modal.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.Form = {
            kdsubmatanggaran: "",
            kddepartemen: "",
            tahun: "",
            nominal: "",
            keterangan: "",
            status: 0,
            userid: "",
          };
          this.refreshListTable(1);
        } catch (error) {
          this.$swal({
            icon: "error",
            title: "Gagal",
            text: error.response.data.Msg,
            confirmButtonColor: "#e77817",
          });
        }
      }
    },
    hideModal() {
      this.modal.hide();
    },
    refreshListTable(reset = 0) {
      if (reset != 0) {
        this.pagination.first = 0;

        this.pagination.currentPage = 1;
      }
      this.getData();
    },
  },
  mounted() {
    initFlowbite();
    this.getData();
    this.getSubMataAnggaran();
    this.getAllDepartemen();
    this.rowDataKMataAnggaran();

  },
};
</script>
<style>
.p-inputnumber input {
  color: black !important;
  background-color: rgba(249, 250, 251) !important;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100% !important;
}
.p-inputnumber input:hover {
  border-color: rgb(219, 222, 225) !important;
}
.p-inputnumber input:focus {
  border-color: #006699 !important;
  box-shadow: none !important;
}
.dp__input_wrap input {
  color: black !important;
  background-color: rgba(249, 250, 251) !important;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100% !important;
  height: 46px;
}
.dp__input_wrap input:hover {
  border-color: rgb(219, 222, 225) !important;
}
.dp__input_wrap input:focus {
  border-color: #006699 !important;
  box-shadow: none !important;
}
</style>
