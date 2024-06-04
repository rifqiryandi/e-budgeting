<template>
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
            :value="getAllKMataAnggaran"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            :loading="loading"
          >
            <template #header>
              <div class="d-flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <InputText
                    placeholder="Search"
                    v-model="filters['global'].value"
                  />
                </span>
              </div>
            </template>
            <template #empty> No Data found. </template>
            <template #loading> Loading data. Please wait. </template>
            <Column
              field="kode_kelompok_mata_anggaran"
              header="Kode Kelompok Mata Anggaran"
              style="min-width: 120px !important; max-width: 120px !important;"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.kode_kelompok_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_kelompok_mata_anggaran"
              header="Nama Kelompok Mata Anggaran"
              style="min-width: 240px !important"
            >
              <template #body="{ data }">
                <div>
                  {{ data.nama_kelompok_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column field="status_aktif" header="Status" style="min-width: 80px !important; max-width: 80px !important;">
              <template #body="{ data }">
                <ToogleBtn
                  :nilaiStatus="data.status_aktif"
                  :apihit="this.apiHit"
                  :keyid="data.id"
                />
              </template>
            </Column>
            <Column field="" header="Task" style="width: 10%">
              <template #body="{ data }">
                <button
                  class="bg-transparent mr-2"
                  title="EDIT"
                  @click="editKMataAnggaran(data)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M206.154-200h49.461l370.387-370.386-49.461-49.462-370.387 370.387V-200Zm548.152-413.77L619.309-747.537l52.154-52.153q17.615-17.615 42.845-17.615t42.845 17.615l48.692 48.691q17.615 17.615 18.23 42.23.615 24.615-17 42.23l-52.769 52.769Zm-43.383 43.999-429.77 429.77H146.156v-134.998l429.769-429.77 134.998 134.998Zm-109.844-25.538-24.538-24.539 49.461 49.462-24.923-24.923Z"
                    />
                  </svg>
                </button>
                <button
                  class="bg-transparent"
                  title="HAPUS"
                  @click="deleteKMataAnggaran(data)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M292.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115V-720h-40v-59.999H360v-35.384h240v35.384h179.999V-720h-40v507.691q0 30.308-21 51.308t-51.308 21H292.309ZM680-720H280v507.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h375.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V-720ZM376.155-280h59.999v-360h-59.999v360Zm147.691 0h59.999v-360h-59.999v360ZM280-720v520-520Z"
                    />
                  </svg>
                </button>
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
          <h3 class="text-xl font-medium" style="color: #fff">Tambah Data</h3>
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
              Kode Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.kdkelmatanggaran"
              placeholder="Masukkan Kode Kelompok mata anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdkelmatanggaran.$error"
            >
              Kode Kelompok mata anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nama Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nama_kelmatanggaran"
              placeholder="Masukkan Nama Kelompok mata anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nama_kelmatanggaran.$error"
            >
              Nama Kelompok mata anggaran tidak boleh kosong!
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
  <!-- Modal Update -->
  <div
    id="update-modal"
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
          <h3 class="text-xl font-medium" style="color: #fff">Edit Data</h3>
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
              Kode Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.kdkelmatanggaran"
              placeholder="Masukkan Kode Kelompok mata anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdkelmatanggaran.$error"
            >
              Kode Kelompok mata anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nama Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nama_kelmatanggaran"
              placeholder="Masukkan Nama Kelompok mata anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nama_kelmatanggaran.$error"
            >
              Nama Kelompok mata anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="hidden">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              v-model="Form.status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="1">Aktif</option>
              <option value="0">Non-Aktif</option>
            </select>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            @click="prosesEdit"
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
import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Modal } from "flowbite";
import ToogleBtn from "../../../utils/ToggleBtn.vue";

import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";
export default {
  name: "Kelompok Mata Anggaran",
  data() {
    return {
      v$: useValidate(),
      token: localStorage.getItem("token"),
      modal: null,
      ListKMataAnggaran: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      Form: {
        kdkelmatanggaran: "",
        nama_kelmatanggaran: "",
        userid: "",
        status: "",
      },
      idKey: "",
      loading: true,
      userSession: JSON.parse(atob(localStorage.getItem("dataUser"))),
      apiHit: "KMataAnggaran",
    };
  },
  validations() {
    return {
      Form: {
        kdkelmatanggaran: { required },
        nama_kelmatanggaran: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    ToogleBtn,
  },
  computed: {
    getAllKMataAnggaran() {
      return this.ListKMataAnggaran;
    },
  },
  methods: {
    showInput() {
      this.Form = {
        kdkelmatanggaran: "",
        nama_kelmatanggaran: "",
        userid: "",
        status: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;

      try {
        let respon = await serviceKMataAnggaran.getDataKMataAnggaran(
          this.token
        );
        this.ListKMataAnggaran = respon.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.ListKMataAnggaran = null;
        console.log(error.response.data.Msg);

        // this.$swal({
        //   icon: "error",
        //   title: "GAGAL",
        //   text: error.response.data.Msg,
        //   confirmButtonColor: "#e77817",
        // });
      }
    },
    editKMataAnggaran(data) {
      const $targetEl = document.getElementById("update-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.Form.kdkelmatanggaran = data.kode_kelompok_mata_anggaran;
      this.Form.nama_kelmatanggaran = data.nama_kelompok_mata_anggaran;
      this.Form.status = data.status_aktif;
      this.idKey = data.id;
    },
    deleteKMataAnggaran(data) {
      const $targetEl = document.getElementById("delete-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.idKey = data.id;
    },
    async prosesInput() {
      let Forminput = this.Form;
      Forminput.userid = this.userSession.username;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        try {
          let respon = await serviceKMataAnggaran.tambahDataKMataAnggaran(
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
            kdkelmatanggaran: "",
            nama_kelmatanggaran: "",
            userid: "",
            status: "",
          };
          this.refreshListTable();
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
    async prosesDelete() {
      let payload = {
        id: this.idKey,
      };
      try {
        let respon = await serviceKMataAnggaran.deleteKMataAnggaran(
          payload,
          this.token
        );
        this.modal.hide();
        this.$swal({
          icon: "success",
          title: "Berhasil",
          text: respon.data.Msg,
          confirmButtonColor: "#e77817",
        });
        this.refreshListTable();
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "Gagal",
          text: error.response.data.Msg,
          confirmButtonColor: "#e77817",
        });
      }
    },
    async prosesEdit() {
      let Forminput = this.Form;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        Forminput.id = this.idKey;
        Forminput.userid = this.userSession.username;
        try {
          let respon = await serviceKMataAnggaran.updateKMataAnggaran(
            Forminput,
            this.token
          );
          this.modal.hide();
          this.Form = {
            entitas: "",
            nama_depart: "",
            kddepart: "",
            userid: "",
            status: "",
          };
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.refreshListTable();
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
    refreshListTable() {
      this.getData();
    },
  },
  mounted() {
    initFlowbite();
    this.getData();
  },
};
</script>
<style>
.label-aktif {
  width: 136px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  background: #dcffeb;
  color: #5bb07f;
  text-align: center;
  border-left: #5bb07f 5px solid;
}

.label-nonaktif {
  width: 136px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  background: #ffe3c2;
  color: #f66512;
  text-align: center;
  border-left: #f66512 5px solid;
}
</style>
