<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 style="font-weight: 500">Pencarian</h3>
          <hr />
          <div class="space-y-6">
            <div class="grid grid-cols-1 ">
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
            </div>
            <div>
              <button
                class="w-full"
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
    </div>
  </div>
  <!-- Sub Mata Anggaran -->
  <div class="row">
    <div class="col-12 flex justify-end">
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
            :value="getAllSMataAnggaran"
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
              <div class="flex justify-end">
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
              field="kode_sub_mata_anggaran"
              header="Kode Sub Mata Anggaran"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div>
                  {{ data.kode_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_sub_mata_anggaran"
              header="Nama Sub Mata Anggaran"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div>
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_mata_anggaran"
              header="Nama Mata Anggaran"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div>
                  {{ data.nama_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_kelompok_mata_anggaran"
              header="Nama Kelompok Mata Anggaran"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div>
                  {{ data.nama_kelompok_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column field="" header="Last Update" style="width: 20%; text-align: center;">
              <template #body="{ data }">
                <div>
                  {{
                    data.update_date == null
                      ? ""
                      : data.update_date.split("T")[0].split("-")[2] +
                        "-" +
                        data.update_date.split("T")[0].split("-")[1] +
                        "-" +
                        data.update_date.split("T")[0].split("-")[0] +
                        " | " +
                        data.update_date.split("T")[1].split(".")[0]
                  }}
                </div>
              </template>
            </Column>
            <Column field="" header="Status" style="width: 10%">
              <template #body="{ data }">
                <ToogleBtn
                  :nilaiStatus="data.status_aktif"
                  :apihit="this.apiHit"
                  :keyid="data.id"
                />
              </template>
            </Column>
            <Column field="" header="Task" style="min-width: 120px  !important;">
              <template #body="{ data }">
                <button
                  class="bg-transparent mr-2"
                  title="EDIT"
                  @click="editSMataAnggaran(data)"
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
                  @click="deleteSMataAnggaran(data)"
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
          <h3 class="text-xl font-medium" style="color: #fff">
            Tambah Sub Mata Anggaran
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
              Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.kdkelmatanggaran"
              @change="getMataAnggaran"
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
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdkelmatanggaran.$error"
            >
              Kelompok mata anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.kdmatanggaran"
              :disabled="rowAllMataAnggaran == null"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Mata Anggaran --</option>
              <option
                v-for="(item, index) in rowAllMataAnggaran"
                :key="index"
                :value="item.kode_mata_anggaran"
              >
                {{ item.nama_mata_anggaran }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdmatanggaran.$error"
            >
              Mata anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kode Sub Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.kdsubmatanggaran"
              placeholder="Masukkan Kode Sub mata anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.kdsubmatanggaran.$error"
            >
              Kode Sub mata anggaran tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nama Sub Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nmsubmatanggaran"
              placeholder="Masukkan Kode Sub mata anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nmsubmatanggaran.$error"
            >
              Nama Sub mata anggaran tidak boleh kosong!
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
          <div class="text-center" v-if="loadingDetail">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="fill: #006699"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Kelompok Mata Anggaran <span class="text-red-600">*</span>
              </label>
              <select
                v-model="Form.kdkelmatanggaran"
                @change="getMataAnggaran"
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
              <p
                class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                v-if="this.v$.Form.kdkelmatanggaran.$error"
              >
                Kelompok mata anggaran tidak boleh kosong!
              </p>
            </div>
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Mata Anggaran <span class="text-red-600">*</span>
              </label>
              <select
                v-model="Form.kdmatanggaran"
                :disabled="rowAllMataAnggaran == null"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Pilih Mata Anggaran --</option>
                <option
                  v-for="(item, index) in rowAllMataAnggaran"
                  :key="index"
                  :value="item.kode_mata_anggaran"
                >
                  {{ item.nama_mata_anggaran }}
                </option>
              </select>
              <p
                class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                v-if="this.v$.Form.kdmatanggaran.$error"
              >
                Mata anggaran tidak boleh kosong!
              </p>
            </div>
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Kode Sub Mata Anggaran <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="base-input"
                v-model="Form.kdsubmatanggaran"
                placeholder="Masukkan Kode Sub mata anggaran"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p
                class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                v-if="this.v$.Form.kdsubmatanggaran.$error"
              >
                Kode Sub mata anggaran tidak boleh kosong!
              </p>
            </div>
            <div class="">
              <label
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Nama Sub Mata Anggaran <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="base-input"
                v-model="Form.nmsubmatanggaran"
                placeholder="Masukkan Kode Sub mata anggaran"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p
                class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                v-if="this.v$.Form.nmsubmatanggaran.$error"
              >
                Nama Sub mata anggaran tidak boleh kosong!
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
import serviceSMataAnggaran from "../../../../services/SubMataAnggaran.service";
import serviceMataAnggaran from "../../../../services/MataAnggaran.service";
import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";

export default {
  name: "Sub Mata Anggaran",
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      modal: null,
      ListSMataAnggaran: null,
      rowMataAnggaran: null,
      rowKelompokMataA: null,
      rowMataAnggaranFilter: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        kdkelmatanggaran: "",
        kdmatanggaran: "",
      },
      Form: {
        kdkelmatanggaran: "",
        kdmatanggaran: "",
        kdsubmatanggaran: "",
        nmsubmatanggaran: "",
        userid: "",
        status: "",
      },
      idKey: "",
      loading: true,
      loadingDetail: true,
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
      apiHit: "SMataAnggaran",
    };
  },
  validations() {
    return {
      Form: {
        kdkelmatanggaran: { required },
        kdmatanggaran: { required },
        kdsubmatanggaran: { required },
        nmsubmatanggaran: { required },
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
    getAllSMataAnggaran() {
      return this.ListSMataAnggaran;
    },
    rowAllMataAnggaran() {
      return this.rowMataAnggaran;
    },
    rowAllMataAnggaranFilter() {
      return this.rowMataAnggaranFilter;
    },
    getKelompokMataAnggaran() {
      return this.rowKelompokMataA;
    },
  },
  methods: {
    async getKMataAnggaran() {
      try {
        let res = await serviceKMataAnggaran.getDataKMataAnggaran(this.token);
        this.rowKelompokMataA = res.data.data;
      } catch (error) {
        console.log(error.response.data.Msg);
      }
    },
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
    async getMataAnggaran() {
      let payload = {
        kdkelmatanggaran: this.Form.kdkelmatanggaran,
      };
      try {
        let respon = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );
        this.rowMataAnggaran = respon.data.data;
      } catch (error) {
        this.rowMataAnggaran = null;
        console.log(error);
      }
    },
    showInput() {
      this.Form = {
        kdkelmatanggaran: "",
        kdmatanggaran: "",
        kdsubmatanggaran: "",
        nmsubmatanggaran: "",
        userid: "",
        status: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let payload = {
        kdkelmatanggaran: this.filters.kdkelmatanggaran,
        kdmatanggaran: this.filters.kdmatanggaran,
      };
      try {
        let respon = await serviceSMataAnggaran.getDataSubMataAnggaran(
          payload,
          this.token
        );
        this.ListSMataAnggaran = respon.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.ListSMataAnggaran = null;
        console.log(error.response.data.Msg);
      }
    },
    async editSMataAnggaran(data) {
      this.loadingDetail = true;
      const $targetEl = document.getElementById("update-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.Form.kdkelmatanggaran = data.kode_kelompok_mata_anggaran;
      await this.getMataAnggaran();
      this.Form.kdmatanggaran = data.kode_mata_anggaran;
      this.Form.kdsubmatanggaran = data.kode_sub_mata_anggaran;
      this.Form.nmsubmatanggaran = data.nama_sub_mata_anggaran;
      this.Form.status = data.status_aktif;
      this.idKey = data.id;
      this.loadingDetail = false;
    },
    deleteSMataAnggaran(data) {
      const $targetEl = document.getElementById("delete-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.idKey = data.id;
    },
    async prosesInput() {
      let Forminput = this.Form;
      Forminput.userid = this.userSession.username;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.Form.$error) {
        try {
          let respon = await serviceSMataAnggaran.tambahDataSubMataAnggaran(
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
            kdmatanggaran: "",
            kdsubmatanggaran: "",
            nmsubmatanggaran: "",
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
        let respon = await serviceSMataAnggaran.deleteSubMataAnggaran(
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
      if (!this.v$.Form.$error) {
        Forminput.id = this.idKey;
        Forminput.userid = this.userSession.username;
        try {
          let respon = await serviceSMataAnggaran.updateSubMataAnggaran(
            Forminput,
            this.token
          );
          this.modal.hide();
          this.Form = {
            kdkelmatanggaran: "",
            kdmatanggaran: "",
            kdsubmatanggaran: "",
            nmsubmatanggaran: "",
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
    this.getKMataAnggaran();
    this.getMataAnggaranFilter();
  },
};
</script>
<style></style>
