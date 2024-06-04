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
                <option value="">-- Pilih Pengajuan Biaya --</option>
                <option
                  v-for="(item, index) in getSMataAnggaran"
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
            <Column
              field=""
              header="Status"
              style="min-width: 120px !important"
            >
              <template #body="{ data }">
                <div class="label-Retur" v-if="data.status_pengajuan == 2">
                  Retur
                </div>
              </template>
            </Column>

            <!-- <Column
              field="nama_entitas"
              header="Entitas"
              style="min-width: 120px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_entitas }}
                </div>
              </template>
            </Column> -->
            <Column
              field="nama_sub_mata_anggaran"
              header="Sub Mata Anggaran"
              style="min-width: 200px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{
                    data.kode_sub_mata_anggaran +
                    " - " +
                    data.nama_sub_mata_anggaran
                  }}
                </div>
              </template>
            </Column>
            <Column
              field="uraian_kegiatan"
              header="Uraian Kegiatan"
              style="min-width: 200px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.uraian_kegiatan }}
                </div>
              </template>
            </Column>
            <Column field="" header="Tahun">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>

            <Column
              field=""
              header="Nominal Pengajuan"
              class="text-right"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.nominal_pengajuan.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column
              field=""
              header="Nominal Anggaran"
              class="text-right"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.nominal.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column field="" header="Task">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <button
                    class="bg-transparent border-0"
                    title="DETAIL"
                    @click="showDetail(data)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        d="M480-333.847 626.153-480 584-522.153l-74.001 72.001v-176.001h-59.998v176.001L376-522.153 333.847-480 480-333.847ZM212.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115v-535.382q0-29.923 21.193-51.115 21.192-21.193 51.115-21.193h178q3.769-33.307 29.076-56.653 25.308-23.347 60.615-23.347 35.692 0 60.999 23.347 25.308 23.346 28.692 56.653h178q29.923 0 51.115 21.193 21.193 21.192 21.193 51.115v535.382q0 29.923-21.193 51.115-21.192 21.193-51.115 21.193H212.309Zm0-59.999h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-535.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v535.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846ZM480-786.154q13 0 21.5-8.5t8.5-21.5q0-13-8.5-21.5t-21.5-8.5q-13 0-21.5 8.5t-8.5 21.5q0 13 8.5 21.5t21.5 8.5ZM200-200V-760-200Z"
                      />
                    </svg>
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal retur pengajuan biaya -->
  <div
    id="detail-modal"
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
            Pengajuan Retur
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
              Alasan
            </label>
            {{ Detail.alasan }}
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Jenis Pengajuan <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.jnspengajuan"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Jenis Pengajuan --</option>
              <option value="PBI">Beban Reguler</option>
              <option value="PK">Beban Komitmen</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.jnspengajuan.$error"
            >
              Jenis Pengajuan tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kegiatan <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.id_kegiatan"
              @change="setPreview"
              :disabled="Form.jnspengajuan == ''"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Kegiatan --</option>
              <option
                v-for="(item, index) in getKegiatan"
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
              v-if="this.v$.Form.id_kegiatan.$error"
            >
              Kegiatan tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Uraian Kegiatan <span class="text-red-600">*</span>
            </label>
            <textarea
              v-model="Form.uraian_kegiatan"
              cols="30"
              rows="10"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.uraian_kegiatan.$error"
            >
              Uraian Kegiatan tidak boleh kosong!
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
      token: localStorage.getItem("token"),
      modal: null,
      listPengajuanRetur: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      rowKegiatan: null,
      filters: {
        kdsubmatanggaran: "",
        cari: "",
        status: "",
        bulan: new Date().getMonth() + 1,
        
        kddepartemen: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
      },
      Form: {
        id_anggaran: "",
        jnspengajuan: "",
        nominal: "",
        userid: "",
        id_kegiatan: "",
        uraian_kegiatan: "",
        sisa_nominal: "",
        id: "",
      },
      Detail: {
        alasan: "",
      },
      filterForm: {
        kdkelmatanggaran: "",
        kdmatanggaran: "",
      },
      loading: true,
      userSession: JSON.parse(atob(localStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        id_anggaran: { required },
        jnspengajuan: { required },
        nominal: { required },
        userid: { required },
        id_kegiatan: { required },
        uraian_kegiatan: { required },
        sisa_nominal: { required },
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
      return this.listPengajuanRetur;
    },
    getSMataAnggaran() {
      return this.rowSMataAnggaran;
    },
    getKegiatan() {
      if (this.Form.id_kegiatan == "") {
        return this.rowKegiatan;
      } else {
        let asArr = Object.entries(this.rowKegiatan);
        asArr.filter((value) => {
          console.log(value[1].id);
          if (value[1].id == this.Form.id_kegiatan) {
            this.Form.id_kegiatan = [];
            this.Form.id_kegiatan = value[1];
          }
        });
        return this.rowKegiatan;
      }
    },
  },
  methods: {
    async getRowKegiatan() {
      let payload = {
        idkegiatan: "",
        status: 1,
        kddepartemen: this.userSession.departemen,
        bulan: this.filters.bulan,
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
      };
      try {
        let res = await serviceAnggaran.getKegiatan(payload, this.token);
        this.rowKegiatan = res.data.data;
      } catch (error) {
        this.rowKegiatan = null;
        console.log(error);
      }
    },
    validationNominal(evt) {
      if (evt.value > this.Form.sisa_nominal) {
        this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
    },
    setPreview() {
      this.Form.sisa_nominal = this.Form.id_kegiatan.nominal;
      this.Form.nominal = this.Form.id_kegiatan.nominal;
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
      let payload = {
        kdkelmatanggaran: this.filterForm.kdkelmatanggaran,
        kdmatanggaran: this.filterForm.kdmatanggaran,
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
    showDetail(data) {
      this.Form = {
        id_anggaran: data.id_anggaran,
        jnspengajuan: data.jenis_pengajuan,
        nominal: data.nominal_pengajuan,
        userid: this.userSession.username,
        id_kegiatan: data.id_kegiatan,
        uraian_kegiatan: data.uraian_kegiatan,
        sisa_nominal: data.sisanominal_pengajuan,
        id: data.id,
      };
      this.Detail = {
        alasan: data.alasan,
      };
      const $targetEl = document.getElementById("detail-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.userSession.departemen,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceAnggaran.listRetur(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.listPengajuanRetur = res.data.data.data;

        this.loading = false;
      } catch (error) {
        this.listPengajuanRetur = null;
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
      if (!this.v$.Form.$error) {
        Forminput.sisa_nominal =
          Number(this.Form.sisa_nominal) - Number(this.Form.nominal);
          console.log(Forminput);
        Forminput.id_anggaran =
          this.Form.id_kegiatan.id_anggaran.toLocaleString();
        let payload = {
          id : Forminput.id,
          id_anggaran : Forminput.id_anggaran,
          id_kegiatan : Forminput.id_kegiatan.id,
          jnspengajuan : Forminput.jnspengajuan,
          nominal : Forminput.nominal,
          sisa_nominal : Forminput.sisa_nominal,
          uraian_kegiatan : Forminput.uraian_kegiatan,
          userid : Forminput.userid
        }
        // console.log(payload);
        try {
          let respon = await serviceAnggaran.inputRetur(payload, this.token);
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
            nominal: "",
            userid: "",
            id_kegiatan: "",
            uraian_kegiatan: "",
            sisa_nominal: "",
            id: "",
          };
          this.refreshListTable();
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
    this.getSubMataAnggaran();
    this.getRowKegiatan();
  },
};
</script>
<style></style>
