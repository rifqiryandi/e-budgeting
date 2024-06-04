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
                <option value="1">Tervalidasi</option>
                <option value="2">Digunakan</option>
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
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <button class="btn d-flex btn-add" @click="showInput">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M450.001-450.001h-230v-59.998h230v-230h59.998v230h230v59.998h-230v230h-59.998v-230Z"
          />
        </svg>
        Tambah Data
      </button>
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
            <Column
              field=""
              header="Status"
              style="min-width: 220px !important"
            >
              <template #body="{ data }">
                <div class="label-nonAktif" v-if="data.status_kegiatan == 0">
                  Belum di validasi
                </div>
                <div class="label-Aktif" v-else-if="data.status_kegiatan == 1">
                  Tervalidasi
                </div>
                <div class="label-Aktif" v-else>Digunakan</div>
              </template>
            </Column>
            <!-- <Column field="nama_entitas" header="Entitas" style="min-width: 140px !important">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_entitas }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_departement"
              header="Departemen"
              style="min-width: 140px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_departement }}
                </div>
              </template>
            </Column> -->
            <Column
              field="nama_kelompok_mata_anggaran"
              header="Kelompok Mata Anggaran"
              style="min-width: 240px !important"
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
              style="min-width: 200px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="kegiatan"
              header="Kegiatan"
              style="min-width: 220px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.kegiatan }}
                </div>
              </template>
            </Column>

            <Column
              field="Waktu Kegiatan"
              header="Bulan"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.bulan + " - " + data.tahun }}
              </template>
            </Column>
            <Column
              field=""
              header="Nominal Kegiatan"
              class="text-right"
              style="min-width: 220px !important"
            >
              <template #body="{ data }">
                <div style="color: green">
                  {{ data.nonimal_anggaran.toLocaleString("de-DE") }}
                </div>
              </template>
            </Column>
            <!-- <Column
              field=""
              header="Nominal Anggaran"
              class="text-right"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div style="color: green">
                  {{ data.nominal_kegiatan.toLocaleString("de-DE") }}
                </div>
              </template>
            </Column> -->
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
            Tambah Proyeksi Kegiatan
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
              Kelompok Mata Anggaran
            </label>
            <select
              v-model="filterForm.kdkelmatanggaran"
              @change="rowDataMataAnggaran"
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
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Mata Anggaran
            </label>
            <select
              v-model="filterForm.kdmataanggaran"
              @change="getAllAnggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Mata Anggaran --</option>
              <option
                v-for="(item, index) in rowMataAnggaran"
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
              Sub Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.id_anggaran"
              @change="setPreview"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Anggaran --</option>
              <option
                v-for="(item, index) in getAnggaran"
                :key="index"
                :value="item"
              >
                {{
                  item.kode_sub_mata_anggaran +
                  " - " +
                  item.nama_sub_mata_anggaran
                }}
              </option>
            </select>

            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.id_anggaran.$error"
            >
              Anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Status Indirect Opex <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.opex"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Status Indirect Opex --</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.opex.$error"
            >
              Status Indirect Opex tidak boleh kosong!
            </p>
          </div>
          <div class="" v-if="Form.opex == 1">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Keterangan Indirect Opex <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              v-model="Form.keterangan"
              placeholder="Divisi/Wilayah/Cabang"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Proyeksi Kegiatan <span class="text-red-600">*</span>
            </label>
            <textarea
              v-model="Form.kegiatan"
              cols="30"
              rows="10"
              @input="countChar"
              maxlength="255"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <!-- <span class="text-black bg-yellow-300 font-medium rounded-sm px-2" >Jumlah karakter : /255</span> -->
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kegiatan.$error"
            >
              Kegiatan tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Bulan <span class="text-red-600">*</span>
            </label>
            <VueDatePicker
              placeholder="Pilih Bulan"
              v-model="Form.bulan"
              format="MMMM/yyyy"
              auto-apply
              disable-year-select
              month-picker
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.bulan.$error"
            >
              Bulan tidak boleh kosong!
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
</template>
<script>
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

import serviceAnggaran from "../../../../services/Transaction.service";
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";
import serviceDepartemen from "../../../../services/Departemen.service";
import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";
import serviceMataAnggaran from "../../../../services/MataAnggaran.service";
export default {
  name: "Kegiatan",
  data() {
    return {
      v$: useValidate(),
      token: localStorage.getItem("token"),
      modal: null,
      ListKegiatan: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      rowKMataAnggaran: null,
      rowMataAnggaran: null,
      rowMataAnggaranFilter: null,
      rowSMataAnggaranFilter: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        cari: "",
        status: "",
        kdkelmatanggaran: "",
        kdmatanggaran: "",
        // bulan: new Date().getMonth() + 1,
        bulan: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
      },
      Form: {
        id_anggaran: "",
        kegiatan: "",
        nominal: "",
        bulan: "",
        userid: "",
        opex: "",
        keterangan: "",
      },
      longText: 0,
      preview: {
        nominal_sisa: "",
      },
      filterForm: {
        kdkelmatanggaran: "",
        kdmataanggaran: "",
      },
      loading: true,
      userSession: JSON.parse(atob(localStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        id_anggaran: { required },
        kegiatan: { required },
        nominal: { required },
        bulan: { required },
        userid: { required },
        opex: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    InputNumber,
    VueDatePicker,
  },
  computed: {
    getAllData() {
      return this.ListKegiatan;
    },
    getSMataAnggaran() {
      return this.rowSMataAnggaran;
    },
    getDepartemen() {
      return this.rowDepartemen;
    },
    getAnggaran() {
      return this.rowAnggaran;
    },
    getKelompokMataAnggaran() {
      return this.rowKMataAnggaran;
    },
    getMataAnggaran() {
      return this.rowMataAnggaran;
    },

    getSMataAnggaranFilter() {
      return this.rowSMataAnggaranFilter;
    },
    rowAllMataAnggaranFilter() {
      return this.rowMataAnggaranFilter;
    },
  },
  methods: {
    countChar(event) {
      if (event.target.value.length > 255) {
        event.preventDefault();
        return;
      }
      this.longText = event.target.value.length;
    },
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
      this.filterForm = {
        kdkelmatanggaran: "",
        kdmataanggaran: "",
      };
      this.rowSMataAnggaran = null;
      this.rowMataAnggaran = null;

      try {
        let res = await serviceKMataAnggaran.getDataKMataAnggaran(this.token);
        this.rowKMataAnggaran = res.data.data;
      } catch (error) {
        this.rowKMataAnggaran = null;
        console.log(error);
      }
    },
    async rowDataMataAnggaran() {
      let payload = {
        kdkelmatanggaran: this.filterForm.kdkelmatanggaran,
      };
      try {
        let res = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );
        this.rowMataAnggaran = res.data.data;
      } catch (error) {
        this.rowMataAnggaran = null;
        console.log(error);
      }
    },
    cariData() {
      this.refreshListTable(1);
    },
    setPreview() {
      this.preview.nominal_sisa = this.Form.id_anggaran.sisa_nominal_pengajaun;
    },
    validationNominal(evt) {
      if (evt.value > this.preview.nominal_sisa) {
        this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
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
    async getAllAnggaran() {
      let payload = {
        idanggaran: "",
        status: 2,
        kddepartemen: this.userSession.departemen,
        idanggaranawal: "",
        kdmatanggaran: this.filterForm.kdmataanggaran,
      };
      try {
        let res = await serviceAnggaran.getIdAnggaran(payload, this.token);
        this.rowAnggaran = res.data.data;
      } catch (error) {
        console.log(error);
      }
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
        kdkelmatanggaran: this.filterForm.kdkelmatanggaran,
        kdmatanggaran: this.filterForm.kdmataanggaran,
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
        id_anggaran: "",
        kegiatan: "",
        nominal: "",
        userid: "",
      };
      this.preview = {
        nominal_sisa: "",
      };
      this.filterForm = {
        kdkelmatanggaran: "",
        kdmataanggaran: "",
      };
      this.rowSMataAnggaran = null;
      this.rowMataAnggaran = null;

      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
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
        bulan: this.filters.bulan,
      };
      // console.log(payload);
      try {
        let res = await serviceAnggaran.listKegiatan(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.ListKegiatan = res.data.data.data;

        this.loading = false;
      } catch (error) {
        this.ListKegiatan = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesInput() {
      let Forminput = this.Form;

      Forminput.userid = this.userSession.username;

      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        if (Forminput.keterangan == "") {
          return this.$swal({
            icon: "info",
            title: "INFO",
            text: "Keterangan Indirect Opex tidak boleh kosong",
            confirmButtonColor: "#e77817",
          });
        }
        Forminput.id_anggaran = this.Form.id_anggaran.id;
        let addMonth = this.Form.bulan.month + 1;
        if (addMonth >= 10) {
          Forminput.bulan = addMonth.toString();
        } else {
          Forminput.bulan = "0" + addMonth.toString();
        }
        try {
          let respon = await serviceAnggaran.inputKegiatan(
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
            id_anggaran: "",
            kegiatan: "",
            nominal: "",
            userid: "",
          };
          this.refreshListTable();
          this.getAllAnggaran();
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
        this.pagination.currentPage = 1;
      }
      this.getData();
    },
  },
  mounted() {
    initFlowbite();
    this.getData();
    this.getAllDepartemen();
    // this.getAllAnggaran();
    this.rowDataKMataAnggaran();
  },
};
</script>
<style>
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
.dp__month_picker_header {
  display: none !important;
}
</style>
