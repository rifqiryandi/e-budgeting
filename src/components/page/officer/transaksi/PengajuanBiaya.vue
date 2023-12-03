<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500;">Pencarian</h3>
          <hr>
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
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Jenis Pengajuan
              </label>
              <select
                v-model="filters.jenis_pengajuan"
                class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style="height: 50px"
              >
                <option value="">-- Pilih Jenis Beban --</option>
                <option value="PBI">Beban Reguler</option>
                <option value="PK">Beban Komitmen</option>
                <!-- <option value="PB">Pengajuan Baru</option> -->
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
        Pengajuan Biaya
      </button>
      <!-- <button class="btn d-flex btn-add ml-2" @click="showInputBaru" >
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
        Pengajuan Baru
      </button> -->
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
              header="Nama Kegiatan"
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
            <Column field="" header="Jenis Pengajuan" style="width: 20%">
              <template #body="{ data }">
                {{ data.jenis_pengajuan }}
              </template>
            </Column>
            

            <Column field="" header="Status" style="width: 20%">
              <template #body="{ data }">
                <div class="label-nonAktif" v-if="data.status_pengajuan == 0">
                  Belum diproses
                </div>
                <div class="label-Aktif" v-else-if="data.status_pengajuan == 1">
                  Tervalidasi
                </div>
                <div class="label-Retur" v-else-if="data.status_pengajuan == 2">
                  Retur
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
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Insert pengajuan biaya -->
  <div
    id="input-modal"
    tabindex="-1"
    class="fixed z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto top-10 bottom-10 left-0 right-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-4xl max-h-full">
      <!-- Modal content -->
      <div
        class="relative w-full max-w-4xl bg-white rounded-lg shadow dark:bg-gray-700"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600 bg-bni-orange"
        >
          <h3 class="text-xl font-medium" style="color: #fff">
            Pengajuan Biaya
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
              Jenis Pengajuan <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.jnspengajuan"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
            >
              <option value="">-- Pilih Jenis Beban --</option>
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
              Beban Opex <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.id_kegiatan"
              @change="setPreview"
              :disabled="Form.jnspengajuan == ''"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
            >
              <option value="">-- Pilih Kegiatan --</option>
              <option
                v-for="(item, index) in getKegiatan"
                :key="index"
                :value="item"
              >
                {{
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
              Bulan <span class="text-red-600">*</span>
            </label>
            <VueDatePicker
              placeholder="Pilih Bulan"
              v-model="Form.bulan_pengajuan"
              format="MMMM/yyyy"
              auto-apply
              month-picker
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.bulan_pengajuan.$error"
            >
              Bulan tidak boleh kosong!
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
              :disabled="Form.jnspengajuan == 'PK'"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nominal.$error"
            >
              Nominal tidak boleh kosong!
            </p>
          </div>
          <div class="mt-2">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              File Pengajuan biaya<span class="text-red-600">*</span>
            </label>
            <FileUpload
              :customUpload="true"
              @select="setFileUpload($event)"
              :showUploadButton="false"
              :showCancelButton="false"
              :multiple="false"
              accept="application/pdf,zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
              :maxFileSize="1000000"
              chooseLabel="Browse"
            >
              <template #empty>
                <p>Drag and drop files to here to upload.</p>
              </template>
            </FileUpload>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Upload.file.$error"
            >
              File tidak boleh kosong!
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

  <!-- Modal Insert pengajuan baru -->
  <div
    id="input-modal-baru"
    tabindex="-1"
    class="fixed mb-8 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto top-10 bottom-10 left-0 right-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-4xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600 bg-bni-orange"
        >
          <h3 class="text-xl font-medium" style="color: #fff">
            Pengajuan Baru
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
              v-model="FormPB.id_anggaran"
              @change="setPreviewKegiatan"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
            >
              <option value="">-- Pilih Anggaran --</option>
              <option
                v-for="(item, index) in getAnggaran"
                :key="index"
                :value="item"
              >
                {{ item.nama_sub_mata_anggaran }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormPB.id_anggaran.$error"
            >
              Anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Sisa Anggaran
            </label>
            <InputNumber
              v-model="preview.nominal_sisa_kegiatan"
              placeholder="Masukkan Sisa anggaran"
              class="w-full"
              disabled
            />
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Kegiatan<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="FormPB.nominal_kegiatan"
              placeholder="Masukkan Nominal"
              class="w-full"
              @input="validationNominalPB"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormPB.nominal_kegiatan.$error"
            >
              Nominal tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Uraian Kegiatan <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="FormPB.uraian_kegiatan"
              placeholder="Masukkan Urain Kegiatan"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormPB.uraian_kegiatan.$error"
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
              v-model="FormPB.bulan_pengajuan"
              format="MMMM/yyyy"
              auto-apply
              month-picker
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormPB.bulan_pengajuan.$error"
            >
              Bulan tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Pengajuan biaya<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="FormPB.nominal_pengajuan"
              placeholder="Masukkan Nominal"
              class="w-full"
              @input="validationNominalPBPengajuan"
              :disabled="FormPB.nominal_kegiatan == 0"
              style="height: 50px"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormPB.nominal_pengajuan.$error"
            >
              Nominal tidak boleh kosong!
            </p>
          </div>
          <div class="mt-2">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              File Pengajuan biaya<span class="text-red-600">*</span>
            </label>
            <FileUpload
              :customUpload="true"
              @select="setFileUpload($event)"
              :showUploadButton="false"
              :showCancelButton="false"
              :multiple="false"
              accept="application/pdf,zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
              :maxFileSize="1000000"
              chooseLabel="Browse"
            >
              <template #empty>
                <p>Drag and drop files to here to upload.</p>
              </template>
            </FileUpload>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Upload.file.$error"
            >
              File tidak boleh kosong!
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            @click="prosesInputPB"
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
import FileUpload from "primevue/fileupload";

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
import serviceFile from "../../../../services/File.service";
// import serviceDepartemen from "../../../../services/Departemen.service";

export default {
  name: "Pengajuan Biaya",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      listPengajuan: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowAnggaran: null,
      rowKegiatan: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        status_anggaran: "",
        status_pengajuan: "",
        jenis_pengajuan: "",
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
        bulan_pengajuan: "",
      },
      FormPB: {
        id_anggaran: "",
        jnspengajuan: "PB",
        nominal_kegiatan: "",
        userid: "",
        nominal_pengajuan: "",
        uraian_kegiatan: "",
        sisa_nominal: "",
        bulan_pengajuan: "",
      },
      preview: {
        nominal_sisa: "",
        nominal_sisa_kegiatan: "",
      },
      Upload: {
        file: null,
        rubrik: "",
        kdsubmatanggaran: "",
        nominal: "",
        jnspengajuan: "",
        idpengajuan: "",
      },
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        // id_anggaran: { required },
        jnspengajuan: { required },
        id_kegiatan: { required },
        nominal: { required },
        uraian_kegiatan: { required },
        bulan_pengajuan: { required },
      },
      FormPB: {
        id_anggaran: { required },
        nominal_kegiatan: { required },
        nominal_pengajuan: { required },
        uraian_kegiatan: { required },
        bulan_pengajuan: { required },
      },
      Upload: {
        file: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    InputNumber,
    VueDatePicker,
    FileUpload,
  },
  computed: {
    getAllData() {
      return this.listPengajuan;
    },
    getSMataAnggaran() {
      return this.rowSMataAnggaran;
    },
    getKegiatan() {
      return this.rowKegiatan;
    },
    getAnggaran() {
      return this.rowAnggaran;
    },
  },
  methods: {
    setPreviewKegiatan() {
      this.preview.nominal_sisa_kegiatan =
        this.FormPB.id_anggaran.sisa_nominal_pengajaun;
    },
    setFileUpload(evt) {
      this.Upload.file = evt.files[0];
    },
    validationNominal(evt) {
      if (evt.value > this.Form.sisa_nominal) {
        this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal kegiatan tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
    },
    validationNominalPB(evt) {
      if (evt.value > this.preview.nominal_sisa_kegiatan) {
        this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
    },
    validationNominalPBPengajuan(evt) {
      if (evt.value > this.FormPB.nominal_kegiatan) {
        this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal pengajuan tidak boleh lebih dari nominal kegiatan",
          confirmButtonColor: "#e77817",
        });
      }
    },
    setPreview() {
      this.Form.sisa_nominal = 
        this.Form.id_kegiatan.sisa_nominal_pengajuan == null
          ? this.Form.id_kegiatan.nominal_anggaran
          : this.Form.id_kegiatan.sisa_nominal_pengajuan;
      this.Form.nominal =
        this.Form.id_kegiatan.nominal == null
          ? this.Form.id_kegiatan.nominal
          : this.Form.id_kegiatan.nominal;
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
    async getAllAnggaran() {
      this.rowAnggaran = null;
      let payload = {
        idanggaran: "",
        status: 2,
        kddepartemen: this.userSession.departemen,
      };
      try {
        let res = await serviceAnggaran.getIdAnggaran(payload, this.token);
        this.rowAnggaran = res.data.data;
      } catch (error) {
        this.rowAnggaran = null;
        console.log(error);
      }
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
    async getRowKegiatan() {
      let payload = {
        idkegiatan: "",
        status: 1,
        kddepartemen: this.userSession.departemen,
      };
      try {
        let res = await serviceAnggaran.getKegiatan(payload, this.token);
        this.rowKegiatan = res.data.data;
      } catch (error) {
        this.rowKegiatan = null;
        console.log(error);
      }
    },
    showInput() {
      this.Form = {
        id_anggaran: "",
        jnspengajuan: "",
        id_kegiatan: "",
        nominal: "",
        userid: "",
      };
      this.preview = {
        nominal_sisa: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    showInputBaru() {
      this.Form = {
        id_anggaran: "",
        jnspengajuan: "",
        id_kegiatan: "",
        nominal: "",
        userid: "",
      };
      this.preview = {
        nominal_sisa: "",
      };
      const $targetEl = document.getElementById("input-modal-baru");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.userSession.departemen,
        status_anggaran: "",
        status_pengajuan: "",
        jenis_pengajuan: this.filters.jenis_pengajuan,
        status: "",
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
      };
      try {
        let res = await serviceAnggaran.getListPengajuan(payload, this.token);
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
      let formData = new FormData();
      let Forminput = this.Form;
      let Upload = this.Upload;

      if (Forminput.nominal > this.Form.sisa_nominal) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
      if (this.Form.sisa_nominal == 0) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Sisa Anggaran tidak boleh kosong",
          confirmButtonColor: "#e77817",
        });
      }
      Forminput.userid = this.userSession.username;
      this.v$.$validate();
      // Set File Upload value
      if (!this.v$.Form.$error) {
        formData.append("myFile", Upload.file);
        formData.append("rubrik", Forminput.id_kegiatan.kode_departemen);
        formData.append(
          "kdsubmatanggaran",
          Forminput.id_kegiatan.kode_sub_mata_anggaran
        );
        formData.append("nominal", Forminput.nominal);
        formData.append("jnspengajuan", Forminput.jnspengajuan);
      }

      // checks all inputs
      if (!this.v$.Form.jnspengajuan.$error) {
        if (!this.v$.Form.$error && !this.v$.Upload.$error) {
          let addMonth = this.Form.bulan_pengajuan.month + 1;
          if (addMonth >= 10) {
            Forminput.bulan_pengajuan = addMonth.toString();
          } else {
            Forminput.bulan_pengajuan = "0" + addMonth.toString();
          }
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
            formData.append("idpengajuan", respon.data.idpengajuan);
            await serviceFile.uploadFile(formData, this.token);
            this.modal.hide();
            this.$swal({
              icon: "success",
              title: "Berhasil",
              text: respon.data.Msg,
              confirmButtonColor: "#e77817",
            }).then(() => {
              this.Form = {
                id_anggaran: "",
                jnspengajuan: "",
                id_kegiatan: "",
                nominal: "",
                userid: "",
                uraian_kegiatan: "",
                sisa_nominal: "",
              };
              this.Upload = {
                file: null,
                rubrik: "",
                kdsubmatanggaran: "",
                nominal: "",
                jnspengajuan: "",
                idpengajuan: "",
              };
              this.refreshListTable(0);
              this.getAllAnggaran();
            });

            // this.getAllAnggaran();
          } catch (error) {
            this.$swal({
              icon: "error",
              title: "Gagal",
              text: error.response.data.Msg,
              confirmButtonColor: "#e77817",
            });
          }
        }
      }
    },
    async prosesInputPB() {
      let formData = new FormData();
      let Forminput = this.FormPB;
      let Upload = this.Upload;
      Forminput.userid = this.userSession.username;
      if (Forminput.nominal_kegiatan > this.preview.nominal_sisa_kegiatan) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal kegiatan tidak boleh lebih dari sisa anggaran",
          confirmButtonColor: "#e77817",
        });
      }
      if (Forminput.nominal_pengajuan > this.FormPB.nominal_kegiatan) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal pengajuan tidak boleh lebih dari nominal kegiatan",
          confirmButtonColor: "#e77817",
        });
      }

      this.v$.$validate();
      if (!this.v$.FormPB.$error && !this.v$.Upload.$error) {
        formData.append("myFile", Upload.file);
        formData.append("rubrik", Forminput.id_anggaran.kode_departemen);
        formData.append(
          "kdsubmatanggaran",
          Forminput.id_anggaran.kode_sub_mata_anggaran
        );
        formData.append("nominal", Forminput.nominal_pengajuan);
        formData.append("jnspengajuan", Forminput.jnspengajuan);

        Forminput.sisa_nominal =
          this.preview.nominal_sisa_kegiatan - Forminput.nominal_pengajuan;
        Forminput.id_anggaran = Forminput.id_anggaran.id;
        let addMonth = this.FormPB.bulan_pengajuan.month + 1;
        if (addMonth >= 10) {
          Forminput.bulan_pengajuan = addMonth.toString();
        } else {
          Forminput.bulan_pengajuan = "0" + addMonth.toString();
        }
        try {
          let respon = await serviceAnggaran.inputPengajuanPB(
            Forminput,
            this.token
          );
          formData.append("idpengajuan", respon.data.idpengajuan);
          await serviceFile.uploadFile(formData, this.token);
          this.modal.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          }).then(() => {
            this.FormPB = {
              id_anggaran: "",
              jnspengajuan: "PB",
              nominal_kegiatan: "",
              userid: "",
              nominal_pengajuan: "",
              uraian_kegiatan: "",
              sisa_nominal: "",
              bulan_pengajuan: "",
            };
            this.Upload = {
              file: null,
              rubrik: "",
              kdsubmatanggaran: "",
              nominal: "",
              jnspengajuan: "",
              idpengajuan: "",
            };
            // this.refreshListTable(0);
            this.pagination.currentPage = 1;
            this.getData();
            this.getAllAnggaran();
          });
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
    this.getAllAnggaran();
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

.dp__pointer {
  height: 50px !important;
}
/* .p-fileupload-choose {
  box-shadow: none;
  border: none;
  border-radius: 6px;
  background: #ff3300;
  color: #ffff;
  height: 48px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: inset 0 0 0 0 #ffff;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}
.p-fileupload-choose:hover {
  border-color: #ff3300 !important;
  color: #ff3300 !important;
  box-shadow: inset 0 0 0 50px #ffff;
}
.p-fileupload-choose:focus {
  border-color: #ff3300 !important;
  color: #ff3300 !important;
  box-shadow: inset 0 0 0 50px #ffff;
}



.p-focus {
  box-shadow: none;
  border: none;
  border-radius: 6px;
  background: #ff3300;
  color: #ffff;
  height: 48px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: inset 0 0 0 0 #ffff;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}
.p-focus:hover {
  border-color: #ff3300 !important;
  color: #ff3300 !important;
  box-shadow: inset 0 0 0 50px #ffff;
} */
</style>
