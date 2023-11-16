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
            <Column field="" header="">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <button
                    class="bg-transparent border-0"
                    title="Detail Realisasi"
                    @click="showDetail(data)"
                  >
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
                  </button>
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
                <div>
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column field="prefix_kegiatan" header="Prefix Kegiatan">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.prefix_kegiatan }}
                </div>
              </template>
            </Column>
            <Column field="status_pengajuan" header="Status">
              <template #body="{ data }">
                <div>
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
            <Column field="nominal_realisasi" header="Nominal">
              <template #body="{ data }">
                <div>
                  {{ data.nominal_pengajuan.toLocaleString("de-DE") }}
                </div>
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
            Realisasi Anggaran
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
                v-for="(item, index) in getPengajuanPK"
                :key="index"
                :value="item"
              >
                {{
                  item.nama_departement +
                  " - " +
                  item.nama_sub_mata_anggaran +
                  " - " +
                  item.nominal_pengajuan.toLocaleString("de-DE")
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
              Bulan <span class="text-red-600">*</span>
            </label>
            <VueDatePicker
              placeholder="Pilih Bulan"
              v-model="Form.tanggal"
              format="MMMM/yyyy"
              auto-apply
              month-picker
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.tanggal.$error"
            >
              Bulan tidak boleh kosong!
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";

import serviceTransaksi from "../../../../services/Transaction.service";

export default {
  name: "Pengajuan Realisasi",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      listRealisasi: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      rowPengajuan: null,
      filters: {
        kddepartemen: "",
        kdsubmatanggaran: "",
        status_anggaran: "",
        status_pengajuan: "",
        jenis_pengajuan: "",
        cari: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
      },
      Form: {
        id_pengajuan: "",
        tanggal: "",
        kode_pengajuan: "",
        kode_buku: "",
        nominal: "",
        keterangan: "",
        user_id: "",
      },
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        id_pengajuan: { required },
        tanggal: { required },
        kode_pengajuan: { required },
        kode_buku: { required },
        nominal: { required },
        keterangan: { required },
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
      return this.listRealisasi;
    },
    getRowPengajuan(){
        return this.rowPengajuan
    }
  },
  methods: {
    async getPengajuan(){
        let payload = {
            idpengajuan: "",
            kddepartemen: this.userSession.departemen,
            status_pengajuan: 1,
            jenis_pengajuan: "",
      };
      try {
        let res = await serviceTransaksi.getPengajuanRealisasi(
          payload,
          this.token
        );
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
        tanggal: "",
        kode_pengajuan: "",
        kode_buku: "",
        nominal: "",
        keterangan: "",
        user_id: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.userSession.departemen,
        status_anggaran: this.filters.status_anggaran,
        status_pengajuan: this.filters.status_pengajuan,
        jenis_pengajuan: this.filters.jenis_pengajuan,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceTransaksi.listRealisasi(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.listRealisasi = res.data.data.data;
        console.log(this.listRealisasi);
        this.loading = false;
      } catch (error) {
        this.listRealisasi = null;
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
      Forminput.id_anggaran =
        this.Form.id_pengajuan.id_anggaran.toLocaleString();
      Forminput.id_pengajuan =
        this.Form.id_pengajuan.id_pengajuan.toLocaleString();
      Forminput.userid = this.userSession.username;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.Form.$error) {
        let addMonth = this.Form.bulan_kegiatan.month + 1;
        if (addMonth >= 10) {
          Forminput.bulan_kegiatan = addMonth.toString();
        } else {
          Forminput.bulan_kegiatan = "0" + addMonth.toString();
        }
        Forminput.sisa_nominal =
          Number(this.Form.sisa_nominal) - Number(this.Form.nominal);
        if (Forminput.sisa_nominal == 0) {
          Forminput.cek = "habis";
        }
        try {
          let respon = await serviceTransaksi.inputRealisasi(
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
            id_pengajuan: "",
            tanggal: "",
            kode_pengajuan: "",
            kode_buku: "",
            nominal: "",
            keterangan: "",
            user_id: "",
          };
          this.refreshListTable();
          //   this.getRowPengajuanPK();
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
    this.getPengajuan()
  },
};
</script>
<style></style>
