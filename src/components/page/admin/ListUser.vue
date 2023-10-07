<template lang="">
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <button
        class="btn d-flex"
        style="
          border-radius: 16px;
          background: #006699;
          color: #ffff;
          height: 48px;
          padding-top: 11px;
          padding-bottom: 11px;
        "
        @click="showInput()"
      >
        <span class="material-symbols-outlined"> add </span>
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
                    <span class="material-symbols-outlined"> visibility </span>
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
            <Column field="" header="Jabatan">
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
                <div :class="Style.labelAktif" v-if="data.statususer == 1">
                  Aktif
                </div>
                <div :class="Style.labelNonAktif" v-else>Non-Aktif</div>
              </template>
            </Column>
            <Column header="Aksi">
              <template #body="{ data }">
                <button
                  class="bg-transparent mr-2"
                  title="DETAIL"
                  @click="editUser(data)"
                  v-if="data.username != userSession.username"
                >
                  <span class="material-symbols-outlined"> edit </span>
                </button>
                <button
                  class="bg-transparent"
                  @click="deleteUser(data)"
                  v-if="data.username != userSession.username"
                >
                  <span class="material-symbols-outlined"> delete </span>
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
            <input
              type="text"
              id="base-input"
              v-model="Form.password"
              placeholder="Masukkan Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.password.$error"
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
              Email tidak boleh kosong!
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
          <div class="">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Password <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="base-input"
              v-model="Form.password"
              placeholder="Masukkan Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bni-blue focus:border-bni-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p
              class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
              v-if="this.v$.Form.password.$error"
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
          <div class="">
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
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { initFlowbite } from "flowbite";
import { Modal } from "flowbite";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import serviceUser from "../../../services/User.service";
import serviceDepartemen from "../../../services/Departemen.service";
import md5 from "md5";
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
        password: "",
      },
      Style: {
        labelAktif: "label-aktif",
        labelNonAktif: "label-nonaktif",
      },
      idKey: "",
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
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
        email: { required },
        nohp: { required },
        leveluser: { required },
        statususer: { required },
        password: { required },
      },
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
  },
  computed: {
    getAllData() {
      console.log(this.ListUser);
      return this.ListUser;
    },
    getDepartemen() {
      return this.rowDepartemen;
    },
  },
  methods: {
    // Utils Method
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    async getAllDepartemen() {
      let token = sessionStorage.getItem("token");
      try {
        let respon = await serviceDepartemen.getDataDepartemen(token);
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
      let token = sessionStorage.getItem("token");
      console.log(token);
      try {
        let respon = await serviceUser.getDataUser(token);
        this.ListUser = respon.data.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
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
      console.log(this.detailUser);
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
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        let md5Password = md5(Forminput.password);
        delete Forminput.password;
        Forminput.password = md5Password;
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
      if (!this.v$.$error) {
        let md5Password = md5(Forminput.password);
        delete Forminput.password;
        Forminput.password = md5Password;
        Forminput.id = this.idKey
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
.p-datatable-header {
  background-color: #ffff !important;
  border: none !important;
}
.p-datatable-thead tr th {
  background-color: #ffff !important;
}
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

@import "../../../../node_modules/vue-select/dist/vue-select.css";
</style>
