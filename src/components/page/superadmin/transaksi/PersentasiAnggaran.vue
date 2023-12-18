<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500">Pencarian</h3>
          <hr />
          <div class="grid grid-cols-1">
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Tahun
              </label>
              <VueDatePicker v-model="filters.tahun" auto-apply year-picker />
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
            @click="getData"
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
            :rows="pagination.perPage"
            :totalRecords="pagination.totaldata"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            :loading="loading"
            @page="paginationTable"
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

            <Column field="bulan" header="Bulan" style="width: 20%">
              <template #body="{ data }">
                {{ data.bulan }}
              </template>
            </Column>
            <Column field="" header="Persentasi" style="width: 20%">
              <template #body="{ data }">
                {{ data.presentasi + "%" }}
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
            Tambah Persentasi Anggaran
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
          <!-- <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.id_anggaran"
              @change="showPreview"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Anggaran --</option>
              <option
                v-for="(item, index) in getAnggaran"
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
              v-if="this.v$.Form.id_anggaran.$error"
            >
              Anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Realisasi Tersedia
            </label>
            <InputNumber
              v-model="preview.nominal"
              placeholder="Masukkan Nominal"
              class="w-full"
              disabled
            />
          </div> -->
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Bulan <span class="text-red-600">*</span>
            </label>
            <VueDatePicker
              placeholder="Pilih Bulan"
              v-model="Form.bulan"
              auto-apply
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
              Persentasi (%)<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.presentasi"
              placeholder="Masukkan Persentasi"
              class="w-full"
              :useGrouping="false"
              :min="0"
              :max="batasPersen"
              @input="calculationNominal"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.presentasi.$error"
            >
              Persentasi tidak boleh kosong!
            </p>
          </div>
          <!-- <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal <span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.nominal"
              placeholder="Masukkan Nominal"
              class="w-full"
              disabled
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
              Sisa Nominal <span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.sisanominal"
              placeholder="Masukkan Sisa Nominal"
              class="w-full"
              disabled
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nominal.$error"
            >
              Sisa Nominal tidak boleh kosong!
            </p>
          </div> -->
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
export default {
  name: "Persentasi Anggaran",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      ListPersentasi: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        cari: "",
        tahun: "",
      },
      pagination: {
        perPage: 12,
        currentPage: 1,
        totaldata: 0,
      },
      Form: {
        bulan: "",
        presentasi: "",
        userid: "",
        tahun: "",
      },
      preview: {
        subMataAnggaran: "",
        nominal: "",
      },
      loading: true,
      batasPersen: 100,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        bulan: { required },
        presentasi: { required },
        tahun: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    VueDatePicker,
    InputNumber,
  },
  computed: {
    getAllData() {
      return this.ListPersentasi;
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
  },
  methods: {
    cariData() {
      this.refreshListTable(1);
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
    // Some kind of logic maybe
    calculationSisa(nominalPersentasi) {
      this.Form.sisanominal = Number(this.preview.nominal) - nominalPersentasi;
    },
    calculationNominal(evt) {
      // let kaliValue;
      if (evt.value > this.batasPersen) {
        this.Form.presentasi = this.batasPersen;
        return this.$swal({
          icon: "info",
          title: "Pemberitahuan",
          text: "Tidak boleh lebih dari sisa persen :" + this.batasPersen + "%",
          confirmButtonColor: "#e77817",
        });
      } else {
        this.Form.presentasi = evt.value;
      }

      // let bagiNominal = this.Form.id_anggaran.susunan_anggaran / 100;
      // this.Form.nominal = bagiNominal * kaliValue;
      // this.calculationSisa(this.Form.nominal);
    },
    async getAllAnggaran() {
      let payload = {
        idanggaran: "",
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
        bulan: "",
        presentasi: "",
        userid: "",
        tahun: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    showPreview() {
      this.preview = {
        nominal: this.Form.id_anggaran.susunan_anggaran,
      };
    },
    async getData() {
      this.loading = true;
      let payload = {
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
        tahun: this.filters.tahun,
      };

      try {
        let res = await serviceAnggaran.getListPresentasiAnggaran(
          payload,
          this.token
        );
        this.pagination.totaldata = res.data.data.total_data;
        this.ListPersentasi = res.data.data.data;
        let persen = 0;
        for (let i = 0; i < res.data.data.data.length; i++) {
          persen = Number(persen) + Number(res.data.data.data[i].presentasi);
        }
        console.log(Number(persen));
        this.batasPersen = 100;
        this.batasPersen = Number(this.batasPersen) - Number(persen);
        console.log(this.batasPersen);

        this.loading = false;
      } catch (error) {
        this.ListPersentasi = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesInput() {
      let Forminput = this.Form;
      Forminput.userid = this.userSession.username;
      Forminput.tahun = this.Form.bulan.year.toString();
      let addMonth = this.Form.bulan.month + 1;
      console.log(this.Form.bulan);
      if (addMonth >= 10) {
        Forminput.bulan = addMonth.toString();
      } else {
        Forminput.bulan = "0" + addMonth.toString();
      }
      // console.log(Forminput);
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        try {
          let respon = await serviceAnggaran.inputPersentasiAnggaran(
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
            bulan: "",
            presentasi: "",
            userid: "",
            tahun: "",
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
    this.getSubMataAnggaran();
    this.getAllDepartemen();
    this.getAllAnggaran();
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
