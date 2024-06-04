<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500">Pencarian</h3>
          <hr />
          <div class="grid grid-cols-1">
            <div class="w-full mb-2">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Kelompok Mata Anggaran
              </label>
              <select
                v-model="filters.kdkelmatanggaran"
                @change="getMataAnggaranFilter"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Kelompok Mata Anggaran --</option>
                <option
                  v-for="(item, index) in getKelompokMataAnggaran"
                  :key="index"
                  :value="item.kode_kelompok_mata_anggaran"
                >
                  {{ item.nama_kelompok_mata_anggaran }}
                </option>
              </select>
            </div>
            <div class="w-full">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Mata Anggaran
              </label>
              <select
                v-model="filters.kdmatanggaran"
                @change="getSubMataAnggaranFilter"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Mata Anggaran --</option>
                <option
                  v-for="(item, index) in rowAllMataAnggaranFilter"
                  :key="index"
                  :value="item.kode_mata_anggaran"
                >
                  {{ item.nama_mata_anggaran }}
                </option>
              </select>
            </div>
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
                  v-for="(item, index) in getSMataAnggaranFilter"
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
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Departemen
              </label>
              <select
                v-model="filters.kddepartemen"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Departemen --</option>
                <option
                  v-for="(item, index) in getDepartemen"
                  :key="index"
                  :value="item.kode_departement"
                >
                  {{
                    item.nama_departement + " (" + item.kode_departement + ")"
                  }}
                </option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1">
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
                <option value="">-- Pilih Status --</option>
                <option value="0">Belum Validasi</option>
                <option value="1">Validate By Superadmin</option>
                <option value="9">Validate By Officer</option>
                <option value="2">Validate By Departemen Head</option>
              </select>
            </div>
          </div>
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
            <Column
              field=""
              header="Status"
              style="min-width: 140px !important"
            >
              <template #body="{ data }">
                <ValidationBtn
                  :nilaiStatus="data.status_anggaran"
                  :keyid="data.id_anggaran"
                  :num="0"
                />
              </template>
            </Column>
            <Column
              field="nama_entitas"
              header="Entitas"
              style="min-width: 140px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_entitas + " - " + data.kode_entitas }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_departement"
              header="Departemen"
              style="min-width: 140px !important"
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
              style="min-width: 240px !important"
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
              style="min-width: 180px !important"
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
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>

            <Column field="tahun" header="Tahun">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>
            <Column
              field=""
              header="Nominal Awal Tahun"
              class="text-right"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.nominal.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column
              field=""
              header="Sisa Anggaran"
              class="text-right"
              style="min-width: 180px !important"
            >
              <template #body="{ data }">
                {{ data.sisa_anggaran.toLocaleString("de-DE") }}
              </template>
            </Column>
            <Column field="" header="Task" class="text-right">
              <template #body="{ data }">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    :disabled="data.status_anggaran != 2"
                  >
                    Aksi
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <button
                      class="dropdown-item"
                      @click="showSwitchAnggaranDep(data)"
                    >
                      Switch Antar departemen
                    </button>
                    <button class="dropdown-item" @click="topupView(data)">
                      Top Up Anggaran
                    </button>
                  </div>
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
              Kelompok Mata Anggaran
            </label>
            <select
              v-model="filterForm.kdkelmatanggaran"
              @change="rowDataMataAnggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Kelompok Mata Anggaran --</option>
              <option
                v-for="(item, index) in getKelompokMataAnggaran"
                :key="index"
                :value="item.kode_kelompok_mata_anggaran"
              >
                {{ item.nama_kelompok_mata_anggaran }}
              </option>
            </select>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Mata Anggaran
            </label>
            <select
              v-model="filterForm.kdmataanggaran"
              @change="getSubMataAnggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Mata Anggaran --</option>
              <option
                v-for="(item, index) in rowMataAnggaran"
                :key="index"
                :value="item.kode_mata_anggaran"
              >
                {{ item.nama_mata_anggaran }}
              </option>
            </select>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Sub Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.kdsubmatanggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Sub Mata Anggaran --</option>
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
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdsubmatanggaran.$error"
            >
              Sub Mata Anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Departemen <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.kddepartemen"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Departemen --</option>
              <option
                v-for="(item, index) in getDepartemen"
                :key="index"
                :value="item.kode_departement"
              >
                {{ item.nama_departement + " (" + item.kode_departement + ")" }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kddepartemen.$error"
            >
              Kode Departemen tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Tahun <span class="text-red-600">*</span>
            </label>
            <VueDatePicker v-model="Form.tahun" auto-apply year-picker />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.tahun.$error"
            >
              Tahun tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nominal <span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="Form.nominal"
              placeholder="Masukkan Nominal"
              class="w-full"
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
  <!-- Modal Top up -->
  <div
    id="topup-modal"
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
            Top Up Anggaran
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
              Sisa Anggaran<span class="text-red-600">*</span>
            </label>
            <InputNumber
              v-model="FormTopUp.nominalawal"
              placeholder="Masukkan Nominal Awal"
              class="w-full"
              disabled
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormTopUp.nominalawal.$error"
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
              v-model="FormTopUp.nominaltopup"
              placeholder="Masukkan Nominal Awal"
              class="w-full"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormTopUp.nominaltopup.$error"
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
              v-model="FormTopUp.keterangan"
              cols="30"
              rows="10"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.FormTopUp.keterangan.$error"
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
            @click="prosesInputTopUp"
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
  <!-- Modal Switch per departemen -->
  <div
    id="switch-depart-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 mb-8 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-6xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600 bg-bni-orange"
        >
          <h3 class="text-xl font-medium" style="color: #fff">
            Switch Antar Departemen
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
          <div class="row">
            <div class="col-12">
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Departemen <span class="text-red-600">*</span>
                </label>
                <select
                  v-model="switchDetail.idDepartemen"
                  @change="getSubByDep"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">-- Pilih Departemen --</option>
                  <option
                    v-for="(item, index) in getDepartemen"
                    :key="index"
                    :value="item.kode_departement"
                  >
                    {{
                      item.nama_departement + " (" + item.kode_departement + ")"
                    }}
                  </option>
                </select>
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Kelompok Mata Anggaran<span class="text-red-600">*</span>
                </label>
                <select
                  v-model="filterForm.kdkelmatanggaran"
                  @change="rowDataMataAnggaran"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">-- Pilih Kelompok Mata Anggaran --</option>
                  <option
                    v-for="(item, index) in getKelompokMataAnggaran"
                    :key="index"
                    :value="item.kode_kelompok_mata_anggaran"
                  >
                    {{
                      item.kode_kelompok_mata_anggaran +
                      " - " +
                      item.nama_kelompok_mata_anggaran
                    }}
                  </option>
                </select>
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Mata Anggaran<span class="text-red-600">*</span>
                </label>
                <select
                  v-model="switchDetail.idMataAnggaran"
                  @change="getSubByDep"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :disabled="filterForm.kdkelmatanggaran == ''"
                >
                  <option value="">-- Pilih Mata Anggaran --</option>
                  <option
                    v-for="(item, index) in getMataAnggaran"
                    :key="index"
                    :value="item.kode_mata_anggaran"
                  >
                    {{
                      item.kode_mata_anggaran + " - " + item.nama_mata_anggaran
                    }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-lg-6 col-md-6">
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Sub Mata Anggaran
                </label>
                <input
                  type="text"
                  id="base-input"
                  v-model="switchDetail.subMataAnggaran"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Nominal Asal
                </label>
                <InputNumber
                  v-model="switchForm.nominalawal"
                  placeholder="Masukkan Nominal"
                  class="w-full"
                  disabled
                />
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Nominal Transfer <span class="text-red-600">*</span>
                </label>
                <InputNumber
                  v-model="switchForm.nominalinout"
                  placeholder="Masukkan Nominal"
                  class="w-full"
                  @input="validationNominalTF"
                />
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                  v-if="this.v$.switchForm.nominalinout.$error"
                >
                  Nominal transfer tidak boleh kosong!
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-6 col-md-6">
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Sub Mata Anggaran <span class="text-red-600">*</span>
                </label>
                <select
                  v-model="switchForm.idanggaran_final"
                  @change="getDataSubMata"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :disabled="getAnggaran == null"
                >
                  <option value="">-- Pilih Sub Mata Anggaran --</option>
                  <option
                    v-for="(item, index) in getAnggaran"
                    :key="index"
                    :value="item"
                  >
                    {{
                      item.kode_sub_mata_anggaran +
                      " - " +
                      item.nama_sub_mata_anggaran
                    }}
                  </option>
                </select>
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                  v-if="this.v$.switchForm.idanggaran_final.$error"
                >
                  Sub Mata Anggaran tidak boleh kosong!
                </p>
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Nominal Tujuan
                </label>
                <InputNumber
                  v-model="switchForm.nominalfinal"
                  placeholder="Masukkan Nominal"
                  class="w-full"
                  disabled
                />
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Keterangan <span class="text-red-600">*</span>
                </label>
                <textarea
                  v-model="switchForm.keterangan"
                  cols="30"
                  rows="10"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                  v-if="this.v$.switchForm.keterangan.$error"
                >
                  Keterangan tidak boleh kosong!
                </p>
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
            @click="prosesSwitchPerDep"
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
// import exportFromJSON from "export-from-json";
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
import ValidationBtn from "../../../utils/ValidationBtn.vue";

import serviceAnggaran from "../../../../services/Transaction.service";
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";
import serviceDepartemen from "../../../../services/Departemen.service";
import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";
import serviceMataAnggaran from "../../../../services/MataAnggaran.service";
export default {
  name: "Anggaran",
  data() {
    return {
      v$: useValidate(),
      token: localStorage.getItem("token"),
      modal: null,
      ListTransaksi: null,
      rowSMataAnggaran: null,
      rowDepartemen: null,
      rowKMataAnggaran: null,
      rowMataAnggaran: null,
      rowAnggaran: null,
      rowMataAnggaranFilter: null,
      rowSMataAnggaranFilter: null,
      filters: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        cari: "",
        status: "",
        kdkelmatanggaran: "",
        kdmatanggaran: "",
        tahun: "",
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        totaldata: 0,
        first: 0,
      },
      Form: {
        kdsubmatanggaran: "",
        kddepartemen: "",
        tahun: "",
        nominal: "",
        keterangan: "",
        status: 0,
        userid: "",
      },
      FormTopUp: {
        idanggaran: "",
        nominalawal: "",
        nominaltopup: "",
        penanggungjwb: "",
        keterangan: "",
      },
      switchForm: {
        idanggaran_awal: "",
        idanggaran_final: "",
        nominalawal: "",
        nominalfinal: "",
        nominalinout: "",
        penanggungjwb: "",
        keterangan: "",
        status: "",
        userid: "",
        jenis_switchanggaran: "",
      },
      switchDetail: {
        mataAnggaran: "",
        subMataAnggaran: "",
        nominalTujuan: "",
        idMataAnggaran: "",
        idDepartemen: "",
      },
      filterForm: {
        kdkelmatanggaran: "",
        kdmataanggaran: "",
      },
      loading: true,
      userSession: JSON.parse(atob(localStorage.getItem("dataUser"))),
    };
  },
  validations() {
    return {
      Form: {
        kdsubmatanggaran: { required },
        kddepartemen: { required },
        tahun: { required },
        nominal: { required },
        keterangan: { required },
      },
      FormTopUp: {
        idanggaran: { required },
        nominalawal: { required },
        nominaltopup: { required },
        penanggungjwb: { required },
        keterangan: { required },
      },
      switchForm: {
        idanggaran_awal: { required },
        idanggaran_final: { required },
        nominalawal: { required },
        nominalfinal: { required },
        nominalinout: { required },
        keterangan: { required },
        status: { required },
        userid: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    VueDatePicker,
    InputNumber,
    ValidationBtn,
  },
  computed: {
    getAllData() {
      return this.ListTransaksi;
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
    getMataAnggaran() {
      return this.rowMataAnggaran;
    },
    getKelompokMataAnggaran() {
      return this.rowKMataAnggaran;
    },
    getSMataAnggaranFilter() {
      return this.rowSMataAnggaranFilter;
    },
    rowAllMataAnggaranFilter() {
      return this.rowMataAnggaranFilter;
    },
  },
  methods: {
    // tes() {
    //   const data = this.ListTransaksi;
    //   const fileName = "download";
    //   const exportType = exportFromJSON.types.csv;

    //   exportFromJSON({ data, fileName, exportType });
    // },
    async getMataAnggaranFilter() {
      let payload = {
        kdkelmatanggaran: this.filters.kdkelmatanggaran,
      };
      try {
        let respon = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );
        this.rowMataAnggaranFilter = respon.data.data;
      } catch (error) {
        this.rowMataAnggaranFilter = null;
        console.log(error);
      }
    },
    async rowDataKMataAnggaran() {
      try {
        let res = await serviceKMataAnggaran.getDataKMataAnggaran(this.token);
        this.rowKMataAnggaran = res.data.data;
      } catch (error) {
        this.rowKMataAnggaran = null;
        console.log(error);
      }
    },
    async rowDataMataAnggaran() {
      let payload = {
        kdkelmatanggaran: this.filterForm.kdkelmatanggaran,
      };
      try {
        let res = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );
        this.rowMataAnggaran = res.data.data;
      } catch (error) {
        this.rowMataAnggaran = null;
        console.log(error);
      }
    },
    async getSubByDep() {
      let payload = {
        idanggaran: "",
        status: 2,
        kddepartemen: this.switchDetail.idDepartemen,
        kdmatanggaran: this.switchDetail.idMataAnggaran,
        idanggaranawal: this.switchForm.idanggaran_awal,
      };
      try {
        let res = await serviceAnggaran.getIdAnggaran(payload, this.token);
        this.rowAnggaran = res.data.data;
      } catch (error) {
        this.rowAnggaran = null;
      }
    },
    getDataSubMata() {
      let data = this.switchForm.idanggaran_final;
      this.switchForm.nominalfinal = data.sisa_nominal_pengajaun;
    },
    showSwitchAnggaranDep(data) {
      this.rowAnggaran = null;
      this.switchForm = {
        idanggaran_awal: data.id_anggaran,
        nominalawal: data.sisa_anggaran,
        status: 0,
        userid: this.userSession.username,
        penanggungjwb: this.userSession.username,
        jenis_switchanggaran: 1,
      };

      this.switchDetail = {
        mataAnggaran: data.nama_mata_anggaran,
        subMataAnggaran: data.nama_sub_mata_anggaran,
        idMataAnggaran: data.kode_mata_anggaran,
      };
      const $targetEl = document.getElementById("switch-depart-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      // this.getIdAnggaran();
    },
    async prosesSwitchPerDep() {
      let FormSwitch = this.switchForm;
      if (FormSwitch.nominalinout > this.switchForm.nominalawal) {
        return this.$swal({
          icon: "info",
          title: "INFO",
          text: "Nominal transfer tidak boleh lebih dari nominal asal",
          confirmButtonColor: "#e77817",
        });
      }

      this.v$.$validate(); // checks all inputs
      if (!this.v$.switchForm.$error) {
        FormSwitch.idanggaran_final = FormSwitch.idanggaran_final.id;
        try {
          let res = await serviceAnggaran.inputSwitchAnggaran(
            FormSwitch,
            this.token
          );
          this.modal.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: res.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.switchForm = {
            idanggaran_awal: "",
            idanggaran_final: "",
            nominalawal: "",
            nominalfinal: "",
            nominalinout: "",
            penanggungjwb: "",
            keterangan: "",
            status: "",
            userid: "",
          };
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
    async prosesInputTopUp() {
      let Forminput = this.FormTopUp;
      console.log(Forminput);
      this.v$.$validate(); // checks all inputs
      if (!this.v$.FormTopUp.$error) {
        try {
          let respon = await serviceAnggaran.inputTopUp(Forminput, this.token);
          console.log(respon);
          this.modal.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.FormTopUp = {
            idanggaran: "",
            nominalawal: "",
            nominaltopup: "",
            penanggungjwb: "",
            keterangan: "",
          };
          this.refreshListTable(1);
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
    topupView(data) {
      this.FormTopUp = {
        nominalawal: data.sisa_anggaran,
        idanggaran: data.id_anggaran,
        penanggungjwb: this.userSession.username,
      };
      const $targetEl = document.getElementById("topup-modal");
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
      this.pagination.first = evt.first;
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
    async getSubMataAnggaranFilter() {
      let payload = {
        kdkelmatanggaran: this.filters.kdkelmatanggaran,
        kdmatanggaran: this.filters.kdmatanggaran,
      };
      try {
        let res = await serviceSMataAnggaran.getDataSubMataAnggaran(
          payload,
          this.token
        );
        this.rowSMataAnggaranFilter = res.data.data;
      } catch (error) {
        this.rowSMataAnggaranFilter = null;
        console.log(error);
      }
    },
    async getSubMataAnggaran() {
      let payload = {
        kdkelmatanggaran: this.filterForm.kdkelmatanggaran,
        kdmatanggaran: this.filterForm.kdmataanggaran,
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
        kdsubmatanggaran: "",
        kddepartemen: "",
        tahun: "",
        nominal: "",
        userid: "",
      };
      this.filterForm = {
        kdkelmatanggaran: "",
        kdmataanggaran: "",
      };
      this.rowSMataAnggaran = null;
      this.rowMataAnggaran = null;

      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    deleteAnggaran(data) {
      const $targetEl = document.getElementById("delete-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.idKey = data.id;
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdsubmatanggaran: this.filters.kdsubmatanggaran,
        kddepartemen: this.filters.kddepartemen,
        status: this.filters.status,
        perPage: this.pagination.perPage,
        currentPage: this.pagination.currentPage,
        cari: this.filters.cari,
        tahun: this.filters.tahun,
        kelmatanggaran: this.filters.kdkelmatanggaran,
        matanggaran: this.filters.kdmatanggaran,
      };
      try {
        let res = await serviceAnggaran.getTransaksi(payload, this.token);
        this.pagination.totaldata = res.data.data.total_data;
        this.ListTransaksi = res.data.data.data;
        this.loading = false;
      } catch (error) {
        this.ListTransaksi = null;
        this.loading = false;
        console.log(error);
      }
    },
    async prosesInput() {
      let Forminput = this.Form;
      Forminput.userid = this.userSession.username;
      Forminput.status = 0;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.Form.$error) {
        try {
          let respon = await serviceAnggaran.inputAnggaran(
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
            kdsubmatanggaran: "",
            kddepartemen: "",
            tahun: "",
            nominal: "",
            keterangan: "",
            status: 0,
            userid: "",
          };
          this.refreshListTable(1);
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
        this.pagination.first = 0;
        this.pagination.currentPage = 1;
        this.getData();
      } else {
        this.getData();
      }
    },
  },
  mounted() {
    initFlowbite();
    this.getData();
    this.getAllDepartemen();
    this.rowDataKMataAnggaran();
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
