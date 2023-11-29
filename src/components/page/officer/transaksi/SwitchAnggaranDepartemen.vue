<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
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
</template>
<script>
// import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
// import useValidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import { Modal } from "flowbite";
import ValidationBtn from "../../../utils/ValidationBtnTopUp.vue";

// import serviceAnggaran from "../../../../services/Transaction.service";
export default {
  name: "Switch Anggaran Sub Mata Anggaran",
  data() {
    return {
      // v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      ListSwitchDepart: null,
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
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    // VueDatePicker,
    // InputNumber,
    ValidationBtn,
  },
  computed: {},
  methods: {},
  mounted() {
    initFlowbite();
  },
};
</script>
<style></style>
