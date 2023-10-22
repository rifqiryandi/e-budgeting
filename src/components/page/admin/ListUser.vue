<template lang="">
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <button class="btn d-flex btn-add" @click="showInput()">
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
        Tambah User
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable
            :value="getAllData"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            @page="tes(rows)"
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
            <Column>
              <template #body="{ data }">
                <div style="font-weight: 600">
                  <button
                    class="bg-transparent"
                    @click="detailData(data)"
                    title="Detail"
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
            <Column field="nama" header="Nama">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama }}
                </div>
              </template>
            </Column>
            <Column field="" header="Departemen">
              <template #body="{ data }">
                <div>
                  {{ data.departemen }}
                </div>
              </template>
            </Column>
            <Column field="jabatan" header="Jabatan">
              <template #body="{ data }">
                <div>
                  {{ data.jabatan }}
                </div>
              </template>
            </Column>
            <Column field="" header="Level">
              <template #body="{ data }">
                <div v-if="data.leveluser == 1">Super Admin</div>
                <div v-else-if="data.leveluser == 2">Officer</div>
                <div v-else-if="data.leveluser == 3">Departemen Head</div>
                <div v-else-if="data.leveluser == 4">Keuangan/Treasury</div>
                <div v-else-if="data.leveluser == 5">General Manager</div>
                <div v-else-if="data.leveluser == 6">Admin Sistem</div>
              </template>
            </Column>
            <Column field="" header="Status">
              <template #body="{ data }">
                <ToogleBtn
                  :nilaiStatus="data.statususer"
                  :apihit="apiHit"
                  :keyid="data.id"
                  :disabled="data.username == userSession.username"
                />
              </template>
            </Column>
            <Column header="Aksi">
              <template #body="{ data }">
                <button
                  class="bg-transparent mr-2"
                  title="EDIT"
                  @click="editUser(data)"
                  v-if="data.username != userSession.username"
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
                  @click="deleteUser(data)"
                  v-if="data.username != userSession.username"
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
          <h3 class="text-xl font-medium" style="color: #fff">Tambah User</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal()"
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
              Nama <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nama"
              placeholder="Masukkan Nama"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nama.$error"
            >
              Nama tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Jenis Kelamin <span class="text-red-600">*</span>
            </label>
            <select
              id="countries"
              v-model="Form.gender"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Gender --</option>
              <option value="L">Laki - Laki</option>
              <option value="P">Perempuan</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.gender.$error"
            >
              Jenis Kelamin tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Departemen <span class="text-red-600">*</span>
            </label>
            <select
              id="countries"
              v-model="Form.departemen"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih departemen --</option>
              <option
                v-for="(item, index) in getDepartemen"
                :key="index"
                :value="item.kode_departement"
              >
                {{ item.nama_departement }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.departemen.$error"
            >
              Departemen tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Jabatan <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.jabatan"
              placeholder="Masukkan Jabatan"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.jabatan.$error"
            >
              Jabatan tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Email <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.email"
              placeholder="Masukkan Email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.email.$error"
            >
              {{ this.v$.Form.email.$errors[0].$message }}
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              No Hp <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nohp"
              placeholder="Masukkan No Hp"
              @keypress="onlyNumber"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nohp.$error"
            >
              No Hp tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Level User <span class="text-red-600">*</span>
            </label>
            <select
              id="countries"
              v-model="Form.leveluser"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Level User --</option>
              <option value="1">Super Admin</option>
              <option value="2">Officer</option>
              <option value="3">Departemen Head</option>
              <option value="4">Keuangan/Treasury</option>
              <option value="5">General Manager</option>
              <option value="6">Admin Sistem</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.leveluser.$error"
            >
              Level user tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Status User <span class="text-red-600">*</span>
            </label>
            <select
              id="countries"
              v-model="Form.statususer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Status User --</option>
              <option value="1">Aktif</option>
              <option value="2">Non - Aktif</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.statususer.$error"
            >
              Status user tidak boleh kosong!
            </p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div id="form-inputan">
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Username <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="base-input"
                  v-model="Form.username"
                  placeholder="Masukkan Username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                  v-if="this.v$.Form.username.$error"
                >
                  Username tidak boleh kosong!
                </p>
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Password <span class="text-red-600">*</span>
                </label>
                <Password
                  v-model="password"
                  toggleMask
                  placeholder="Masukkan Password"
                  style="width: 100%"
                />
              </div>
            </div>
            <div id="text-syarat">
              <p
                class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Syarat Password :
              </p>
              <div class="flex">
                <p
                  :class="
                    this.v$.password.min.$invalid == false
                      ? Style.customValidIcon.trueText
                      : Style.customValidIcon.falseText
                  "
                >
                  Minimal 8 karakter
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  :class="
                    this.v$.password.min.$invalid == false
                      ? Style.customValidIcon.trueIcon
                      : Style.customValidIcon.falseIcon
                  "
                >
                  <path
                    d="m423.231-309.847 268.922-268.922L650-620.922 423.231-394.153l-114-114L267.078-466l156.153 156.153Zm56.836 209.846q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </div>
              <div class="flex">
                <p
                  :class="
                    this.v$.password.specialChars.$invalid == false
                      ? Style.customValidIcon.trueText
                      : Style.customValidIcon.falseText
                  "
                >
                  Minimal 1 spesial karakter
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  :class="
                    this.v$.password.specialChars.$invalid == false
                      ? Style.customValidIcon.trueIcon
                      : Style.customValidIcon.falseIcon
                  "
                >
                  <path
                    d="m423.231-309.847 268.922-268.922L650-620.922 423.231-394.153l-114-114L267.078-466l156.153 156.153Zm56.836 209.846q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </div>
              <div class="flex">
                <p
                  :class="
                    this.v$.password.requiredAndUpper.$invalid == false
                      ? Style.customValidIcon.trueText
                      : Style.customValidIcon.falseText
                  "
                >
                  Minimal 1 uppercase karakter
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  :class="
                    this.v$.password.requiredAndUpper.$invalid == false
                      ? Style.customValidIcon.trueIcon
                      : Style.customValidIcon.falseIcon
                  "
                >
                  <path
                    d="m423.231-309.847 268.922-268.922L650-620.922 423.231-394.153l-114-114L267.078-466l156.153 156.153Zm56.836 209.846q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </div>
              <div class="flex">
                <p
                  :class="
                    this.v$.password.lowerCheck.$invalid == false
                      ? Style.customValidIcon.trueText
                      : Style.customValidIcon.falseText
                  "
                >
                  Minimal 1 lowercase
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  style="fill: #32a852"
                  :class="
                    this.v$.password.lowerCheck.$invalid == false
                      ? Style.customValidIcon.trueIcon
                      : Style.customValidIcon.falseIcon
                  "
                >
                  <path
                    d="m423.231-309.847 268.922-268.922L650-620.922 423.231-394.153l-114-114L267.078-466l156.153 156.153Zm56.836 209.846q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </div>
              <div class="flex">
                <p
                  :class="
                    this.v$.password.numberCheck.$invalid == false
                      ? Style.customValidIcon.trueText
                      : Style.customValidIcon.falseText
                  "
                  style=""
                >
                  Minimal 1 angka
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  :class="
                    this.v$.password.numberCheck.$invalid == false
                      ? Style.customValidIcon.trueIcon
                      : Style.customValidIcon.falseIcon
                  "
                >
                  <path
                    d="m423.231-309.847 268.922-268.922L650-620.922 423.231-394.153l-114-114L267.078-466l156.153 156.153Zm56.836 209.846q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
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
            @click="prosesInput()"
            class="bg-bni-blue text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            SIMPAN
          </button>
          <button
            @click="hideModal()"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Detail -->
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
          class="flex items-center justify-between pl-6 pr-2 pt-3 border-b-4 border-bni-orange rounded-t dark:border-gray-600"
        >
          <div class="grid">
            <label class="text-xl font-semibold mb-2 text-bni-blue">{{
              detailUser != null ? detailUser.nama : ""
            }}</label>
            <label class="text-lg font-semibold">{{
              detailUser != null ? detailUser.email : ""
            }}</label>
          </div>

          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal()"
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
              <p class="text-lg font-semibold mb-0">Username</p>
              <p class="text-base">
                {{ detailUser != null ? detailUser.username : "" }}
              </p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Gender</p>
              <p class="text-base">
                {{
                  detailUser != null
                    ? detailUser.gender == "L"
                      ? "Laki - Laki"
                      : "Perempuan"
                    : ""
                }}
              </p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Nohp</p>
              <p class="text-base">
                {{ detailUser != null ? detailUser.nohp : "" }}
              </p>
            </div>
          </div>
          <div class>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Departemen</p>
              <p class="text-base">
                {{ detailUser != null ? detailUser.departemen : "" }}
              </p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Jabatan</p>
              <p class="text-base">
                {{ detailUser != null ? detailUser.jabatan : "" }}
              </p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Level User</p>
              <p class="text-base">
                {{ detailUser != null ? detailUser.NamaLevel : "" }}
              </p>
            </div>
            <div class="mb-1">
              <p class="text-lg font-semibold mb-0">Status</p>
              <p class="text-base">
                {{
                  detailUser != null
                    ? detailUser.statususer == 1
                      ? "Aktif"
                      : "Non-Aktif"
                    : ""
                }}
              </p>
            </div>
          </div>
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
          <h3 class="text-xl font-medium" style="color: #fff">Update User</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal()"
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
              Username <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.username.$error"
            >
              Username tidak boleh kosong!
            </p>
          </div>
          <div class="hidden">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Password <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="password"
              placeholder="Masukkan Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.password.$error"
            >
              Password tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Nama <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nama"
              placeholder="Masukkan Nama"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nama.$error"
            >
              Nama tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Jenis Kelamin <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.gender"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Gender --</option>
              <option value="L">Laki - Laki</option>
              <option value="P">Perempuan</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.gender.$error"
            >
              Jenis Kelamin tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Departemen <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.departemen"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih departemen --</option>
              <option
                v-for="(item, index) in getDepartemen"
                :key="index"
                :value="item.kode_departement"
              >
                {{ item.nama_departement }}
              </option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.departemen.$error"
            >
              Departemen tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Jabatan <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.jabatan"
              placeholder="Masukkan Jabatan"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.jabatan.$error"
            >
              Jabatan tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.email"
              placeholder="Masukkan Email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.email.$error"
            >
              Email tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              No Hp
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.nohp"
              placeholder="Masukkan No Hp"
              @keypress="onlyNumber"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.nohp.$error"
            >
              No Hp tidak boleh kosong!
            </p>
          </div>
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Level User <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.leveluser"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Level User --</option>
              <option value="1">Super Admin</option>
              <option value="2">Officer</option>
              <option value="3">Departemen Head</option>
              <option value="4">Keuangan/Treasury</option>
              <option value="5">General Manager</option>
              <option value="6">Admin Sistem</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.leveluser.$error"
            >
              Level user tidak boleh kosong!
            </p>
          </div>
          <div class="hidden">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Status User <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Form.statususer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Status User --</option>
              <option value="1">Aktif</option>
              <option value="2">Non - Aktif</option>
            </select>
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.statususer.$error"
            >
              Status user tidak boleh kosong!
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="prosesEdit()"
            type="button"
            class="bg-bni-blue text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            SIMPAN
          </button>
          <button
            @click="hideModal()"
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
          @click="hideModal()"
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
            Apakah anda yakin ingin <b>Non Aktifkan</b> user ini?
          </h3>
          <button
            @click="prosesDelete()"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Hapus
          </button>
          <button
            @click="hideModal()"
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
import Password from "primevue/password";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
import { Modal } from "flowbite";
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import ToogleBtn from "../../utils/ToggleBtn.vue";

import serviceUser from "../../../services/User.service";
import serviceDepartemen from "../../../services/Departemen.service";
// import md5 from "md5";
export default {
  name: "ListUser",
  data() {
    return {
      v$: useValidate(),
      ListUser: null,
      rowDepartemen: null,
      detailUser: null,
      modal: null,
      loading: true,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      Form: {
        username: "",
        nama: "",
        gender: "",
        departemen: "",
        jabatan: "",
        email: "",
        nohp: "",
        leveluser: "",
        statususer: "",
      },
      password: "",
      Style: {
        labelAktif: "label-aktif",
        labelNonAktif: "label-nonaktif",
        customValidIcon: {
          trueIcon: "showIcon",
          falseIcon: "hidden",
          trueText: "text-syarat text-green-500",
          falseText: "text-syarat",
        },
      },
      idKey: "",
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
      apiHit: "User",
    };
  },
  validations() {
    return {
      Form: {
        username: { required },
        nama: { required },
        gender: { required },
        departemen: { required },
        jabatan: { required },
        email: {
          required: helpers.withMessage("Email tidak boleh kosong!", required),
          email: helpers.withMessage("Format email tidak sesuai", email),
        },
        nohp: { required },
        leveluser: { required },
        statususer: { required },
      },
      password: {
        requiredAndUpper: this.validationPassword,
        numberCheck: this.checkNumber,
        specialChars: this.checkSpesialChar,
        lowerCheck: this.checkLower,
        min: this.checkMinLength,
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
    ToogleBtn,
    Password,
  },
  computed: {
    getAllData() {
      return this.ListUser;
    },
    getDepartemen() {
      return this.rowDepartemen;
    },
  },
  methods: {
    // Custom Password validation
    validationPassword() {
      let pass = this.password;
      if (pass == "" || /[A-Z]/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkLower() {
      let pass = this.password;
      if (/[a-z]/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkNumber() {
      let pass = this.password;
      if (/\d/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkSpesialChar() {
      let pass = this.password;
      if (/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkMinLength() {
      let pass = this.password;
      if (pass.length <= 8) {
        return false;
      } else {
        return true;
      }
    },
    // Utils Method
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    async getAllDepartemen() {
      let token = sessionStorage.getItem("token");
      let payload = {};
      try {
        let respon = await serviceDepartemen.getDataDepartemen(payload, token);
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
    // Utils Method
    showInput() {
      this.Form = {
        username: "",
        nama: "",
        gender: "",
        departemen: "",
        jabatan: "",
        email: "",
        nohp: "",
        leveluser: "",
        statususer: "",
        password: "",
      };
      const $targetEl = document.getElementById("input-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
    },
    async getData() {
      this.loading = true;
      let token = sessionStorage.getItem("token");
      try {
        let respon = await serviceUser.getDataUser(token);
        this.ListUser = respon.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.ListUser = null;
        this.$swal({
          icon: "error",
          title: "GAGAL",
          text: error.response.data.Msg,
          confirmButtonColor: "#e77817",
        });
      }
    },
    detailData(data) {
      const $targetEl = document.getElementById("detail-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      switch (data.leveluser) {
        case 1:
          data.NamaLevel = "Super Admin";
          break;
      }
      this.detailUser = data;
    },
    editUser(data) {
      const $targetEl = document.getElementById("update-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.Form = data;
      this.idKey = data.id;
    },
    deleteUser(data) {
      const $targetEl = document.getElementById("delete-modal");
      this.modal = new Modal($targetEl);
      this.modal.show();
      this.idKey = data.id;
    },
    async prosesInput() {
      let token = sessionStorage.getItem("token");
      let Forminput = this.Form;
      console.log(Forminput);
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // let md5Password = Forminput.password;
        // delete Forminput.password;
        Forminput.password = this.password;
        try {
          let respon = await serviceUser.tambahDataUser(Forminput, token);
          this.modal.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.Form = {
            username: "",
            nama: "",
            gender: "",
            departemen: "",
            jabatan: "",
            email: "",
            nohp: "",
            leveluser: "",
            statususer: "",
            password: "",
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
    async prosesEdit() {
      let token = sessionStorage.getItem("token");
      let Forminput = this.Form;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.Form.$error) {
        // let md5Password = Forminput.password;
        // delete Forminput.password;
        Forminput.password = this.password;
        Forminput.id = this.idKey;
        try {
          let respon = await serviceUser.updateUser(Forminput, token);
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
      }
    },
    async prosesDelete() {
      let token = sessionStorage.getItem("token");
      let payload = {
        id: this.idKey,
      };
      try {
        let respon = await serviceUser.deleteUser(payload, token);
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
    this.getAllDepartemen();
  },
};
</script>
<style>

.showIcon {
  fill: #32a852;
  display: block;
}
.text-syarat {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
}
.p-password input {
  /* padding-right: 12px !important; */
  padding: 10px !important;
  width: 100%;
  border-radius: 0.3rem !important;
  border: 1px solid #dee2e6 !important;
  font-size: 0.875rem !important;
  text-align: start;
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
}
.p-password input:focus {
  border-color: #006699 !important;
}
.p-inputtext:enabled:focus {
  box-shadow: none !important;
}
.p-password svg {
  margin-right: 2px !important;
  box-shadow: none !important;
}

@import "../../../../node_modules/vue-select/dist/vue-select.css";
</style>
