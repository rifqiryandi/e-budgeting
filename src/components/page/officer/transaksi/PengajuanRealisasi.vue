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
                Pengajuan Biaya
              </label>
              <select
                v-model="filters.jenis_pengajuan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Jenis Pengajuan --</option>
                <option value="PBI">Beban Reguler</option>
                <option value="PK">Beban Komitmen</option>
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
                <div class="label-nonAktif" v-if="data.status_realisasi == 0">
                  Request By Officer
                </div>
                <div class="label-Aktif" v-else-if="data.status_realisasi == 1">
                  Validate By Departemen Head
                </div>
                <div class="label-Aktif" v-else-if="data.status_realisasi == 2">
                  Validate By BUM
                </div>
              </template>
            </Column>

            <Column
              field="uraian_kegiatan"
              header="Kegiatan"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.uraian_kegiatan }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_sub_mata_anggaran"
              header="Sub Mata Anggaran"
              style="min-width: 200px !important"
            >
              <template #body="{ data }">
                <div>
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="kode_pengajuan"
              header="Kode Pengajuan"
              style="min-width: 200px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.kode_pengajuan }}
                </div>
              </template>
            </Column>
            <Column
              field="nominal"
              header="Nominal"
              style="min-width: 220px !important"
            >
              <template #body="{ data }">
                <div class="text-right">
                  {{ data.nominal.toLocaleString("de-DE") }}
                </div>
              </template>
            </Column>
            <Column
              field="tanggal"
              header="Tanggal Pengajuan"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                <div>
                  {{
                    data.tanggal_pengajuan.split("T")[0].split("-")[2] +
                    "-" +
                    data.tanggal_pengajuan.split("T")[0].split("-")[1] +
                    "-" +
                    data.tanggal_pengajuan.split("T")[0].split("-")[0]
                  }}
                </div>
              </template>
            </Column>
            <Column
              field=""
              header="Jenis Pengajuan"
              style="min-width: 160px !important"
            >
              <template #body="{ data }">
                <div>
                  <p class="text-base">
                    {{
                      data.jenis_pengajuan == "PBI"
                        ? "Beban Reguler"
                        : data.jenis_pengajuan == "PB"
                        ? "Pengajuan Baru"
                        : data.jenis_pengajuan == "PK"
                        ? "Beban Komitmen"
                        : ""
                    }}
                  </p>
                </div>
              </template>
            </Column>
            <Column field="" header="Task">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <button
                    class="bg-transparent border-0"
                    title="Detail Realisasi"
                    @click="detailView(data)"
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
            Pengajuan Realisasi Anggaran
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
              Jenis Beban <span class="text-red-600">*</span>
            </label>
            <select
              v-model="preview.jenisPengajuan"
              @change="getPengajuan"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Jenis Beban --</option>
              <option value="PBI">Beban Reguler</option>
              <option value="PK">Beban Komitmen</option>
            </select>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Pengajuan Pembayaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.id_pengajuan"
              @change="setPreview"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :disabled="preview.jenisPengajuan == ''"
            >
              <option value="">-- Pilih Pengajuan Pembayaran --</option>
              <option
                v-for="(item, index) in getRowPengajuan"
                :key="index"
                :value="item"
              >
                {{
                  item.kode_sub_mata_anggaran +
                  " - " +
                  item.prefix_kegiatan +
                  " - " +
                  item.uraian_kegiatan
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
              PKP <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.pkp"
              @change="setPreview"
              class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih PKP --</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.pkp.$error"
            >
              PKP tidak boleh kosong!
            </p>
          </div>
          <div class="" v-show="Form.pkp == 1">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nomor Faktur
            </label>
            <input
              v-model="Form.nomor_faktur"
              placeholder="Masukkan Nomor Faktur"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
            />
          </div>
          <div class="" v-show="Form.pkp == 1">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Tanggal Faktur
            </label>
            <VueDatePicker
              placeholder="Pilih Tanggal"
              v-model="Form.tanggal_faktur"
              format="dd/MMMM/yyyy"
              auto-apply
            />
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Tanggal Pengajuan<span class="text-red-600">*</span>
            </label>
            <VueDatePicker
              placeholder="Pilih Tanggal"
              v-model="Form.tanggal_pengajuan"
              format="dd/MMMM/yyyy"
              auto-apply
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.tanggal_pengajuan.$error"
            >
              Tanggal tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Pengajuan
            </label>
            <InputNumber
              v-model="preview.nominal"
              placeholder=""
              class="w-full"
              disabled
            />
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal Realisasi
            </label>
            <InputNumber
              v-model="Form.nominal"
              @input="validationNominal"
              placeholder=""
              class="w-full"
              :disabled="preview.nominal <= 0"
            />
          </div>
          <div class="" v-show="false">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kode Pengajuan
            </label>
            <input
              v-model="preview.kode_pengajuan"
              placeholder="Masukkan kode pengajuan"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
              disabled
            />
          </div>
          <!-- <div class="" >
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kode buku <span class="text-red-600">*</span>
            </label>
            <input
              v-model="Form.kode_buku"
              placeholder="Masukkan kode buku"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style="height: 50px"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kode_buku.$error"
            >
              Kode buku tidak boleh kosong!
            </p>
          </div> -->
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
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
  <!-- Modal detail -->
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
            Detail Realisasi
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
        <div class="p-6">
          <div class="grid grid-cols-2 gap-2 mb-2">
            <div class="">
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Entitas</p>
                <p class="text-base">{{ detail.nama_entitas + " - " + detail.kode_entitas }}</p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Sub Mata Anggaran</p>
                <p class="text-base">
                  {{
                    detail.kode_sub_mata_anggaran +
                    " - " +
                    detail.nama_sub_mata_anggaran
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Jenis Pengajuan</p>
                <p class="text-base">
                  {{
                    detail.jenis_pengajuan == "PBI"
                      ? "Pengajuan biasa"
                      : detail.jenis_pengajuan == "PB"
                      ? "Pengajuan Baru"
                      : detail.jenis_pengajuan == "PK"
                      ? "Pengajuan Komitmen"
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Nama Kegiatan</p>
                <p class="text-base">
                  {{ detail.uraian_kegiatan }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Uraian Kegiatan</p>
                <p class="text-base">
                  {{ detail.uraian_pengajuan }}
                </p>
              </div>
            </div>
            <div class>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Departemen</p>
                <p class="text-base">
                  {{
                    detail.nama_departement != undefined
                      ? detail.nama_departement
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Nominal Realisasi</p>
                <p class="text-base">
                  {{
                    detail.nominal != undefined
                      ? "Rp " + detail.nominal.toLocaleString("de-DE")
                      : ""
                  }}
                </p>
              </div>
              <div class="mb-1">
                <p class="text-lg font-semibold mb-0">Status</p>
                <div class="label-nonAktif" v-if="detail.status_realisasi == 0">
                  Request By Officer
                </div>
                <div
                  class="label-Aktif"
                  v-else-if="detail.status_realisasi == 1"
                >
                  Validate By Departemen Head
                </div>
                <div
                  class="label-Aktif"
                  v-else-if="detail.status_realisasi == 2"
                >
                  Validate By BUM
                </div>
              </div>
              <div class="mb-1" v-show="detail.pkp == 1">
                <p class="text-lg font-semibold mb-0">Nomor Faktur</p>
                <p class="text-base">
                  {{
                    detail.nomor_faktur != undefined ? detail.nomor_faktur : ""
                  }}
                </p>
              </div>
              <div class="mb-1" v-show="detail.pkp == 1">
                <p class="text-lg font-semibold mb-0">Tanggal Faktur</p>
                <p class="text-base">
                  {{
                    detail.tanggal_faktur != undefined
                      ? detail.tanggal_faktur.split("T")[0].split("-")[2] +
                        "-" +
                        detail.tanggal_faktur.split("T")[0].split("-")[1] +
                        "-" +
                        detail.tanggal_faktur.split("T")[0].split("-")[0]
                      : ""
                  }}
                </p>
              </div>
            </div>
          </div>
          <hr class="bg-gray-400" />
          <div class="row">
            <div class="col-12">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Jenis Dokumen
              </label>
              <select
                v-model="Upload.jnsdokumen"
                @change="cekButtonUpload"
                class="border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Jenis Dokumen --</option>
                <option value="1" v-show="jenisPengajuan.SPK == ''">SPK</option>
                <option value="3" v-show="jenisPengajuan.Invoice == ''">
                  Invoice
                </option>
                <option
                  value="2"
                  v-if="detail.pkp == 1"
                  v-show="jenisPengajuan.Faktur == ''"
                >
                  Faktur Pajak
                </option>
                <option
                  value="4"
                  v-if="detail.pkp == 0"
                  v-show="jenisPengajuan.FileLampiran == ''"
                >
                  Lampiran Non PKP
                </option>
              </select>
            </div>
            <div class="col-12 pt-8">
              <FileUpload
                mode="advanced"
                chooseLabel="Browse"
                :maxFileSize="1000000"
                @uploader="prosesUpload($event)"
                :customUpload="true"
                :fileLimit="4"
                :disabled="buttonActive"
                accept="application/pdf,zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
              />
            </div>
            <div class="col-12 pt-6" v-show="listFileRealisasi != null">
              <label
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                List File
              </label>
              <div
                class="row"
                v-for="(item, index) in getListFile"
                :key="index"
                :value="item"
              >
                <div class="col-8 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="64"
                    viewBox="0 -960 960 960"
                    width="64"
                    style="fill: #006699"
                  >
                    <path
                      d="M252.309-100.001q-30.308 0-51.308-21t-21-51.308v-615.382q0-30.308 21-51.308t51.308-21h317.692l209.998 209.998v477.692q0 30.308-21 51.308t-51.308 21H252.309Zm287.692-520V-800H252.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v615.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h455.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-447.692H540.001ZM240-800v179.999V-800v640V-800Z"
                    />
                  </svg>
                  <p class="text-base m-0 pt-3">
                    {{ item.lampiran.slice(0, 50) }}
                  </p>
                </div>
                <div class="col-4">
                  <button
                    class="download-style w-full lg:mt-1"
                    style="float: 'right'"
                    @click="downloadLinkFile(item.link)"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
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

import serviceTransaksi from "../../../../services/Transaction.service";

export default {
  name: "Pengajuan Realisasi",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      listRealisasi: null,
      listFileRealisasi: null,
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
      Upload: {
        myFile: null,
        id_realisasi: "",
        kode_pengajuan: "",
        jnsdokumen: "",
      },
      Form: {
        id_pengajuan: "",
        tanggal_realisasi: "",
        kode_pengajuan: "",
        kode_buku: "",
        nominal: "",
        keterangan: "",
        user_id: "",
        tanggal_pengajuan: "",
        pkp: "",
        nomor_faktur: "",
        tanggal_faktur: "",
      },
      jenisPengajuan: {
        SPK: "",
        Faktur: "",
        Invoice: "",
        FileLampiran: "",
      },
      preview: {
        kode_pengajuan: "",
        kode_buku: "",
        nominal: "",
        jenisPengajuan: "",
      },
      buttonActive: true,
      detail: { pkp: "" },
      loading: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        id_pengajuan: { required },
        tanggal_pengajuan: { required },
        kode_pengajuan: { required },
        nominal: { required },
        keterangan: { required },
        pkp: { required },
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
      return this.listRealisasi;
    },
    getRowPengajuan() {
      return this.rowPengajuan;
    },
    getListFile() {
      return this.listFileRealisasi;
    },
  },
  methods: {
    downloadLinkFile(link) {
      window.open(link, "_blank", "noreferrer");
    },
    setFileUploadSPK(evt) {
      this.UploadSPK.myFile = evt.files[0];
    },
    validationNominal(evt) {
      if (evt.value > this.preview.nominal) {
        this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal realisasi tidak boleh lebih dari nominal pengajuan",
          confirmButtonColor: "#e77817",
        });
      }
    },
    cekButtonUpload(evt) {
      if (evt.target.value == "") {
        this.buttonActive = true;
      } else {
        this.buttonActive = false;
      }
    },
    async detailView(data) {
      this.listFileRealisasi = null;
      this.jenisPengajuan = {
        SPK: "",
        Faktur: "",
        Invoice: "",
        FileLampiran: "",
      };
      this.detail = data;
      this.Upload.id_realisasi = data.id_realisasi;
      this.Upload.kode_pengajuan = data.kode_pengajuan;
      let payload = {
        id_realisasi: this.detail.id_realisasi,
      };
      try {
        let res = await serviceTransaksi.listFileRealisasi(payload, this.token);
        this.listFileRealisasi = res.data.data;
        for (let i = 0; i < this.listFileRealisasi.length; i++) {
          if (this.listFileRealisasi[i].jenis_dokumen == 1) {
            this.jenisPengajuan.SPK = this.listFileRealisasi[i].jenis_dokumen;
          } else if (this.listFileRealisasi[i].jenis_dokumen == 2) {
            this.jenisPengajuan.Faktur =
              this.listFileRealisasi[i].jenis_dokumen;
          } else if (this.listFileRealisasi[i].jenis_dokumen == 3) {
            this.jenisPengajuan.Invoice =
              this.listFileRealisasi[i].jenis_dokumen;
          } else if (this.listFileRealisasi[i].jenis_dokumen == 4) {
            this.jenisPengajuan.FileLampiran =
              this.listFileRealisasi[i].jenis_dokumen;
          }
        }
      } catch (error) {
        this.listFileRealisasi = null;
        // this.$swal({
        //   icon: "error",
        //   title: "Gagal",
        //   text: error.response.data.Msg,
        //   confirmButtonColor: "#e77817",
        // });
      }
      const $targetEl = document.getElementById("detail-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    setPreview() {
      this.preview = {
        kode_pengajuan: this.Form.id_pengajuan.prefix_kegiatan,
        nominal: this.Form.id_pengajuan.nominal_pengajuan,
        jenisPengajuan: this.preview.jenisPengajuan,
      };
      this.Form.keterangan = this.Form.id_pengajuan.uraian_kegiatan
      this.Form.nominal = this.preview.nominal;
    },
    async getPengajuan() {
      let payload = {
        idpengajuan: "",
        kddepartemen: this.userSession.departemen,
        status_pengajuan: 1,
        jenis_pengajuan: this.preview.jenisPengajuan,
      };
      try {
        let res = await serviceTransaksi.getPengajuanRealisasi(
          payload,
          this.token
        );
        this.rowPengajuan = res.data.data;
        this.Form = {
          id_pengajuan: "",
          tanggal: "",
          kode_pengajuan: "",
          kode_buku: "",
          nominal: "",
          keterangan: "",
          user_id: "",
        };
        this.preview.kode_pengajuan = "";
        this.preview.nominal = "";
      } catch (error) {
        this.rowPengajuan = null;
        console.log(error);
      }
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
        jenis_pengajuan: this.filters.jenis_pengajuan,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
        tanggalawal: "",
        tanggalakhir: "",
      };
      try {
        let res = await serviceTransaksi.listRealisasi(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.listRealisasi = res.data.data.data;
        this.loading = false;
      } catch (error) {
        this.listRealisasi = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesInput() {
      if (this.Form.nominal > this.preview.nominal) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal realisasi tidak boleh lebih dari nominal pengajuan",
          confirmButtonColor: "#e77817",
        });
      }
      if (this.Form.pkp == 1) {
        if (this.Form.tanggal_faktur == "" || this.Form.nomor_faktur == "") {
          return this.$swal({
            icon: "info",
            title: "INFO",
            text: "Nomor Faktur dan Tanggal Faktur Tidak Boleh Kosong",
            confirmButtonColor: "#e77817",
          });
        }
      }
      let Forminput = this.Form;

      // Forminput.kode_buku = this.preview.kode_buku;
      Forminput.kode_pengajuan = this.preview.kode_pengajuan;
      Forminput.user_id = this.userSession.username;
      Forminput.id_pengajuan = Forminput.id_pengajuan.id;

      this.v$.$validate(); // checks all inputs
      if (!this.v$.Form.$error) {
        let tanggal = new Date(Forminput.tanggal_pengajuan);
        if (Forminput.tanggal_faktur != undefined) {
          let tanggalFaktur = new Date(Forminput.tanggal_faktur);
          let yearF = tanggalFaktur.getFullYear();
          let dayF = tanggalFaktur.getDate();
          let monthF;
          let addMonthF = tanggalFaktur.getMonth() + 1;
          if (addMonthF >= 10) {
            monthF = addMonthF.toString();
          } else {
            monthF = "0" + addMonthF.toString();
          }
          Forminput.tanggal_faktur = yearF + "-" + monthF + "-" + dayF;
        }

        let year = tanggal.getFullYear();
        let day = tanggal.getDate();
        let month;
        let addMonth = tanggal.getMonth() + 1;
        if (addMonth >= 10) {
          month = addMonth.toString();
        } else {
          month = "0" + addMonth.toString();
        }
        Forminput.tanggal_pengajuan = year + "-" + month + "-" + day;
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
          this.preview = {
            kode_pengajuan: "",
            kode_buku: "",
            nominal: "",
            jenisPengajuan: "",
          };
          this.UploadSPK = {
            myFile: null,
            id_realisasi: "",
            kode_pengajuan: "",
            jnsdokumen: "SPK",
          };
          this.UploadFaktur = {
            myFile: null,
            id_realisasi: "",
            kode_pengajuan: "",
            jnsdokumen: "Faktur Pajak",
          };
          this.UploadInovice = {
            myFile: null,
            id_realisasi: "",
            kode_pengajuan: "",
            jnsdokumen: "Inovice",
          };
          this.refreshListTable();
          this.getPengajuan();
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
    async prosesUpload(evt) {
      this.Upload.myFile = evt.files[0];
      let formData = new FormData();
      let files = this.Upload;
      // SPK
      formData.append("myFile", files.myFile);
      formData.append("id_realisasi", files.id_realisasi);
      formData.append("kode_pengajuan", files.kode_pengajuan);
      formData.append("jnsdokumen", files.jnsdokumen);
      try {
        serviceTransaksi
          .uploadFileRealisasi(formData, this.token)
          .then((respon) => {
            this.$swal({
              icon: "success",
              title: "Berhasil",
              text: respon.data.Msg,
              confirmButtonColor: "#e77817",
            }).then(async (result) => {
              if (result.isConfirmed) {
                this.jenisPengajuan = {
                  SPK: "",
                  Faktur: "",
                  Invoice: "",
                  FileLampiran: "",
                };
                files.jnsdokumen = "";
                let payload = {
                  id_realisasi: this.detail.id_realisasi,
                };
                this.loadFileRealiasi(payload);
              }
            });
          });
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "Gagal",
          text: error.response.data.Msg,
          confirmButtonColor: "#e77817",
        });
      }
    },
    async loadFileRealiasi(payload) {
      try {
        let res = await serviceTransaksi.listFileRealisasi(payload, this.token);
        this.listFileRealisasi = res.data.data;
        for (let i = 0; i < this.listFileRealisasi.length; i++) {
          if (this.listFileRealisasi[i].jenis_dokumen == 1) {
            this.jenisPengajuan.SPK = this.listFileRealisasi[i].jenis_dokumen;
          } else if (this.listFileRealisasi[i].jenis_dokumen == 2) {
            this.jenisPengajuan.Faktur =
              this.listFileRealisasi[i].jenis_dokumen;
          } else if (this.listFileRealisasi[i].jenis_dokumen == 3) {
            this.jenisPengajuan.Invoice =
              this.listFileRealisasi[i].jenis_dokumen;
          } else if (this.listFileRealisasi[i].jenis_dokumen == 4) {
            this.jenisPengajuan.FileLampiran =
              this.listFileRealisasi[i].jenis_dokumen;
          }
        }
      } catch (error) {
        this.listFileRealisasi = null;
      }
    },
    hideModal() {
      this.rowPengajuan = null;
      this.preview.jenisPengajuan = "";
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
<style>
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
