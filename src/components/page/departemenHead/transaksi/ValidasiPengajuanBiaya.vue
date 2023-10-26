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
                Sub Mata Anggaran
              </label>
              <select
                v-model="filters.kdsubmatanggaran"
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

            <Column field="" header="" style="width: 5%">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <button
                    class="bg-transparent border-0"
                    title="Validasi Pengajuan"
                    @click="showValidasi(data)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      v-show="data.status_pengajuan == 0"
                    >
                      <path
                        d="M480.067-100.001q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.925-148.204q29.925-69.369 81.225-120.682 51.3-51.314 120.65-81.247Q401.15-859.999 480-859.999q63.204 0 119.602 19t103.474 53l-43.383 44.384q-38.769-26.692-83.991-41.539Q530.48-800 480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-21.077-2.769-41.69-2.77-20.612-8.308-40.08l48.46-48.845q11 30.846 16.808 63.463 5.808 32.617 5.808 67.152 0 78.85-29.92 148.199-29.92 69.35-81.21 120.65-51.291 51.3-120.629 81.225-69.337 29.925-148.173 29.925Zm-56.836-209.846L267.078-466l42.153-42.153 114 114 394.615-395.23 42.153 42.153-436.768 437.383Z"
                      />
                    </svg>
                  </button>
                </div>
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
            <Column field="" header="Tahun" style="width: 5%">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>
            <Column field="" header="Nominal Pengajuan" class="text-right">
              <template #body="{ data }">
                {{ data.nominal_pengajuan.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column field="" header="Nominal Anggaran" class="text-right">
              <template #body="{ data }">
                {{ data.nominal.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column field="" header="Status">
              <template #body="{ data }">
                <div class="label-nonAktif" v-if="data.status_pengajuan == 0">
                  Belum diproses
                </div>
                <div class="label-Aktif" v-else-if="data.status_pengajuan == 1">
                  Tervalidasi
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
        <div class="p-6 grid grid-cols-2 gap-2">
          <div class="">
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Entitas</p>
              <p class="text-base">{{ Detail.nama_entitas }}</p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Sub Mata Anggaran</p>
              <p class="text-base">{{ Detail.nama_sub_mata_anggaran }}</p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Uraian Kegiatan</p>
              <p class="text-base border-2 border-bni-blue p-3 rounded-md">
                {{ Detail.uraian_kegiatan }}
              </p>
            </div>
          </div>
          <div class>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Sisa Anggaran</p>
              <p class="text-base">
                {{
                  Detail.nominal != undefined
                    ? "Rp." + Detail.nominal.toLocaleString("de-DE")
                    : ""
                }}
              </p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Nominal yang di ajukan</p>
              <p class="text-base">
                {{
                  Detail.nominal_pengajuan != undefined
                    ? "Rp." + Detail.nominal_pengajuan.toLocaleString("de-DE")
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
                class="label-nonAktif"
                v-else-if="Detail.status_pengajuan == 1"
              >
                Tervalidasi
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            @click="prosesValidasi"
            class="bg-bni-blue text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            VALIDASI
          </button>
          <button
            @click="hideModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
import useValidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "flowbite";

import serviceAnggaran from "../../../../services/Transaction.service";
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";

export default {
  name: "Validasi Pengajuan Biaya",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      listPengajuan: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        cari: "",
        status: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
      },
      Form: {
        id_anggaran: "",
        jnspengajuan: "",
        id_kegiatan: "",
        nominal: "",
        userid: "",
        uraian_kegiatan: "",
        sisa_nominal: "",
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
      return this.listPengajuan;
    },
  },
  methods: {
    async prosesValidasi() {
      let payload = {
        id_pengajuan: this.Detail.id,
        id_anggaran: this.Detail.id_anggaran,
        status: 1,
        rubrik: this.Detail.kode_departement,
        kdsubmatanggaran: this.Detail.kode_sub_mata_anggaran,
        nominal: this.Detail.nominal_pengajuan,
        alasan : ""
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
            let respon = await serviceAnggaran.validasiPengajuan(
              payload,
              this.token
            );
            this.responBerhasil(respon);
            this.modal.hide();
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
      console.log(respon);
    },
    async responError(error) {
      await this.$swal({
        icon: "info",
        title: "GAGAL",
        text: error.response.data.Msg,
        confirmButtonColor: "#e77817",
      });
    },
    showValidasi(data) {
      this.Detail = data;
      const $targetEl = document.getElementById("validasi-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
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
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.userSession.departemen,
        status: "",
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceAnggaran.getListPengajuan(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.listPengajuan = res.data.data.data;
        console.log(this.listPengajuan);
        this.loading = false;
      } catch (error) {
        this.listPengajuan = null;
        this.loading = false;
        console.log(error);
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
  },
};
</script>
<style>
.label-nonAktif {
  width: 136px;
  height: 32px;
  padding: 5px 10px 5px 10px;
  border-left: #f66512 5px solid;
  background: #ffe3c2;
  color: #f66512;
  border-radius: 5px;
  text-align: center;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
}
.label-Aktif {
  width: 136px;
  height: 32px;
  padding: 5px 10px 5px 10px;
  border-left: #5bb07f 5px solid;
  background: #dcffeb;
  color: #5bb07f;
  border-radius: 5px;
  text-align: center;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
}

.label-Proses {
  width: 136px;
  height: 32px;
  padding: 5px 10px 5px 10px;
  border-left: #eebe12 5px solid;
  background: #fffee4;
  color: #eebe12;
  border-radius: 5px;
  text-align: center;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
}
</style>
