<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
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
                  v-for="(item, index) in getPengajuan"
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
            <Column field="nama_entitas" header="Entitas" style="width: 20%">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_entitas }}
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
              header="Uraian Kegiatan"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.uraian_kegiatan }}
                </div>
              </template>
            </Column>
            <Column field="" header="Tahun" style="width: 20%">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>
            <Column field="" header="Status" style="width: 20%">
              <template #body="{ data }">
                <div class="label-nonAktif" v-if="data.status_pengajuan == 0">
                  Belum diproses
                </div>
                <div class="label-Aktif" v-else-if="data.status_pengajuan == 2">
                  Tervalidasi
                </div>
              </template>
            </Column>
            <Column
              field=""
              header="Nominal Pengajuan"
              class="text-right"
              style="width: 20%"
            >
              <template #body="{ data }">
                {{ data.nominal_pengajuan.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column
              field=""
              header="Nominal Anggaran"
              class="text-right"
              style="width: 20%"
            >
              <template #body="{ data }">
                {{ data.nominal.toLocaleString("de-DE") }}
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
            Pengajuan Komitmen
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
              Pengajuan Biaya <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.id_pengajuan"
              @change="setPreview"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Pengajuan Biaya --</option>
              <option
                v-for="(item, index) in getPengajuan"
                :key="index"
                :value="item"
              >
                {{
                  item.nama_departement +
                  " - " +
                  item.nama_sub_mata_anggaran +
                  " - " +
                  item.nominal.toLocaleString("de-DE")
                }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.id_pengajuan.$error"
            >
              Pengajuan biaya tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Sisa Anggaran
            </label>
            <InputNumber
              v-model="Form.sisa_nominal"
              placeholder="Masukkan Sisa anggaran"
              class="w-full"
              disabled
            />
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Pengajuan biaya<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.nominal"
              placeholder="Masukkan Nominal"
              class="w-full"
              @input="validationNominal"
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
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";

import serviceAnggaran from "../../../../services/Transaction.service";
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";
export default {
  name: "Pengajuan Komitmen",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      listPengajuan: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      rowPengajuan: null,
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
      Form: {
        id_pengajuan: "",
        nominal: "",
        cek: "",
        sisa_nominal: "",
        id_anggaran: "",
      },
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        id_pengajuan: { required },
        nominal: { required },
        cek: { required },
        sisa_nominal: { required },
        id_anggaran: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    InputNumber,
    // VueDatePicker,
  },
  computed: {
    getAllData() {
      return this.listPengajuan;
    },
    getSMataAnggaran() {
      return this.rowSMataAnggaran;
    },
    getPengajuan() {
      return this.rowPengajuan;
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
    async getRowPengajuan() {
      let payload = {
        idkegiatan: "",
        status: 1,
        kddepartemen: "",
      };
      try {
        let res = await serviceAnggaran.getPengajuanPK(payload, this.token);
        this.rowPengajuan = res.data.data;
        console.log(this.rowPengajuan);
      } catch (error) {
        this.rowPengajuan = null;
        console.log(error);
      }
    },
    showInput() {
      this.Form = {
        id_pengajuan: "",
        nominal: "",
        cek: "",
        sisa_nominal: "",
        id_anggaran: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let payload = {
        idpengajuan: this.filters.kdsubmatanggaran,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceAnggaran.getListPengajuanPK(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.listPengajuan = res.data.data.data;

        this.loading = false;
      } catch (error) {
        this.listPengajuan = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesInput() {
      let Forminput = this.Form;
      if (Forminput.nominal > this.Form.sisa_nominal) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
      Forminput.userid = this.userSession.username;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.Form.$error && !this.v$.Upload.$error) {
        console.log(!this.v$.Form.$error);
        Forminput.sisa_nominal =
          Number(this.Form.sisa_nominal) - Number(this.Form.nominal);
        Forminput.id_anggaran =
          this.Form.id_kegiatan.id_anggaran.toLocaleString();
        Forminput.id_kegiatan = this.Form.id_kegiatan.id.toLocaleString();
        try {
          let respon = await serviceAnggaran.inputPengajuanBiaya(
            Forminput,
            this.token
          );
          console.log(respon);
          this.modal.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.Form = {
            id_anggaran: "",
            jnspengajuan: "",
            id_kegiatan: "",
            nominal: "",
            userid: "",
            uraian_kegiatan: "",
            sisa_nominal: "",
          };
          this.refreshListTable();
          // this.getAllAnggaran();
        } catch (error) {
          console.log(error);
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
  },
};
</script>
<style></style>
