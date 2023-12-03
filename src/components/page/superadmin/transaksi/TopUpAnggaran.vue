<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500">Pencarian</h3>
          <hr />
          <div class="">
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
                <option value="">-- Pilih Status--</option>
                <option value="0">Belum divalidasi</option>
                <option value="1">Tervalidasi Level 1</option>
                <option value="2">Tervalidasi Level 2</option>
                <option value="3">Tervalidasi Level 3</option>
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
            <Column field="" header="" style="width: 20%">
              <template #body="{ data }">
                <ValidationBtn
                  :nilaiStatus="data.status_topup"
                  :keyid="data.id_anggaran"
                  :num="0"
                  :idtopUp="data.id_topup"
                  :nominal="data.nominal_sisa_anggaran"
                  :nominalTopup="data.nominal_topup"
                />
              </template>
            </Column>
            <Column field="nama_entitas" header="Entitas" style="width: 20%">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_entitas }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_departement"
              header="Departemen"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_departement }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_kelompok_mata_anggaran"
              header="Kelompok Mata Anggaran"
              style="width: 20%"
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
              style="width: 20%"
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
              style="width: 20%"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>

            <Column field="tahun" header="Tahun" style="width: 20%">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>
            <Column
              field=""
              header="Sisa Anggaran"
              class="text-right"
              style="width: 20%"
            >
              <template #body="{ data }">
                {{ data.nominal_sisa_anggaran.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column
              field=""
              header="Top Up"
              class="text-right"
              style="width: 20%"
            >
              <template #body="{ data }">
                {{ data.nominal_topup.toLocaleString("de-DE") }}
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
              Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.idanggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Anggaran --</option>
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
              v-if="this.v$.Form.idanggaran.$error"
            >
              Anggaran tidak boleh kosong!
            </p>
          </div>

          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Awal<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.nominalawal"
              placeholder="Masukkan Nominal Awal"
              class="w-full"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nominalawal.$error"
            >
              Nominal Awal tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Top Up<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.nominaltopup"
              placeholder="Masukkan Nominal Awal"
              class="w-full"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nominaltopup.$error"
            >
              Nominal Top Up tidak boleh kosong!
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
</template>
<script>
import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";
import ValidationBtn from "../../../utils/ValidationBtnTopUp.vue";

import serviceAnggaran from "../../../../services/Transaction.service";

export default {
  name: "Top Up Anggaran",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      ListTopUp: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      filters: {
        status: "",
        cari: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
        first: 0,
      },
      Form: {
        idanggaran: "",
        nominalawal: "",
        nominaltopup: "",
        penanggungjwb: "",
        keterangan: "",
      },
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        idanggaran: { required },
        nominalawal: { required },
        nominaltopup: { required },
        penanggungjwb: { required },
        keterangan: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    // VueDatePicker,
    InputNumber,
    ValidationBtn,
  },
  computed: {
    getAllData() {
      return this.ListTopUp;
    },
  },
  methods: {
    showInput() {
      this.Form = {
        idanggaran: "",
        nominalawal: "",
        nominaltopup: "",
        penanggungjwb: "",
        keterangan: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let payload = {
        status: this.filters.status,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceAnggaran.listTopUp(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.ListTopUp = res.data.data.data;
        this.loading = false;
      } catch (error) {
        this.ListTopUp = null;
        this.loading = false;
        console.log(error);
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
  },
};
</script>
<style></style>
