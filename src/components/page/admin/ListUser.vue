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
        data-bs-toggle="modal"
        data-bs-target="#inputModal"
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
            :value="getDataUser"
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
                  <InputText placeholder="Search" />
                </span>
              </div>
            </template>
            <template #empty> No Data found. </template>
            <template #loading> Loading data. Please wait. </template>
            <Column field="nama" header="Nama" sortable style="width: 20%">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama }}
                </div>
              </template>
            </Column>
            <Column
              field="jumlahtotalaktif"
              header="Total Aktif"
              sortable
              style="width: 20%"
            >
              <template #body="{ data }">
                <div class="label-aktif" @click="getDataSpesifik(data, 1)">
                  {{ data.jumlahtotalaktif }}
                </div>
              </template>
            </Column>
            <Column
              field="jumlahtotalnonakatif"
              header="Total Non-Aktif"
              sortable
              style="width: 20%"
            >
              <template #body="{ data }">
                <div class="label-nonaktif" @click="getDataSpesifik(data, 0)">
                  {{ data.jumlahtotalnonakatif }}
                </div>
              </template>
            </Column>
            <Column
              field="jumlahtotal"
              header="Total Kantor"
              sortable
              style="width: 20%"
            >
              <template #body="{ data }">
                <div class="label-total" @click="getDataSpesifik(data)">
                  {{ data.jumlahtotal }}
                </div>
              </template>
            </Column>
            <Column header="Aksi" sortable style="width: 20%">
              <template #body="{ data }">
                <div class="label-total" @click="getDataSpesifik(data)">
                  <button
                    class="btn btn-sm"
                    title="DETAIL"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                  >
                    <span class="material-symbols-outlined"> visibility </span>
                  </button>
                  <!-- {{ data }} -->
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="inputModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div
          class="modal-header"
          style="background-color: #ff6600; color: #ffff"
        >
          <h5 class="modal-title" id="exampleModalLabel">Tambah User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">NIPPOS</label>
            <input
              type="text"
              class="form-control"
              @input="findNippos()"
              placeholder="Nippos..."
              v-model="User.nippos"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">NAMA</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nama..."
              v-model="User.nama"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">BAGIAN</label>
            <input
              type="text"
              class="form-control"
              placeholder="Bagian..."
              v-model="User.bagian"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">JABATAN</label>
            <input
              type="text"
              class="form-control"
              placeholder="Jabatan..."
              v-model="User.jabatan"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">KANTOR</label>
            <input
              type="text"
              class="form-control"
              placeholder="Kantor..."
              v-model="User.kantor"
              readonly
            />
          </div>

          <div class="mb-3">
            <label class="form-label">HAK AKSES</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="User.hakakses"
            >
              <option value="" selected>--Pilih Hak Akses--</option>
              <option
                v-for="hakakses in listHakakses"
                :key="hakakses.id"
                :value="hakakses.id"
              >
                {{ hakakses.deskripsi }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">PROVINSI</label>
            <!-- Provinsi -->
            <v-select
              :options="getDataProv"
              label="Nama_Propinsi"
              v-model="User.propinsi"
              @focusout="getKab()"
              placeholder="--Pilih Provinsi--"
            ></v-select>
          </div>
          <div class="mb-3">
            <label class="form-label">KOTA</label>
            <!-- Kabupaten -->
            <v-select
              :options="getDataKab"
              label="Nama_Kabupaten_Kota"
              v-model="User.kota"
              placeholder="--Pilih Kota--"
            ></v-select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            BATAL
          </button>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color: #006699; border: 0"
            data-bs-dismiss="modal"
            @click="inputData()"
          >
            SIMPAN
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Update Modal -->
  <div
    class="modal fade"
    id="updateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div
          class="modal-header"
          style="background-color: #ff6600; color: #ffff"
        >
          <h5 class="modal-title" id="exampleModalLabel">Data User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">NIPPOS</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nippos..."
              v-model="detail.nippos"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">NAMA</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nama..."
              v-model="detail.nama"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">BAGIAN</label>
            <input
              type="text"
              class="form-control"
              placeholder="Bagian..."
              v-model="detail.bagian"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">JABATAN</label>
            <input
              type="text"
              class="form-control"
              placeholder="Jabatan..."
              v-model="detail.jabatan"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">KANTOR</label>
            <input
              type="text"
              class="form-control"
              placeholder="Kantor..."
              v-model="detail.kantor"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">STATUS</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="detail.status"
            >
              <option value="" selected>--Pilih Hak Akses--</option>
              <option value="1">AKTIF</option>
              <option value="0">NON-AKTIF</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">HAK AKSES</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="detail.hakakses"
            >
              <option value="" selected>--Pilih Hak Akses--</option>
              <option
                v-for="hakakses in listHakakses"
                :key="hakakses.id"
                :value="hakakses.id"
              >
                {{ hakakses.deskripsi }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            BATAL
          </button>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color: #003b2e; border: 0"
            data-bs-dismiss="modal"
            @click="updateData()"
          >
            SIMPAN
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modelUserStore from "../../../model/modelUserstore";
import CountryService from "../../../services/Country.service";
// import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
export default {
  name: "RefKelurahan",
  data() {
    return {
      page: 1,
      limit: 10,
      cari: "",
      loading: true,
      User: {
        nippos: null,
        nama: "",
        bagian: "",
        jabatan: "",
        kantor: "",
        hakakses: null,
        propinsi: null,
        kota: null,
      },
      listHakakses: [],
      paramUser: [],
      queryProv: "",
      queryKab: "",
      provinsiData: [],
      kabupatenData: [],
      detail: {
        nippos: null,
        nama: "",
        bagian: "",
        jabatan: "",
        kantor: "",
        hakakses: null,
        propinsi: null,
        kota: null,
        status: null,
      },
      btnKurang: true,
      btnTambah: false,
    };
  },
  components: {
    DataTable,
    Column,
    InputText,
  },
  computed: {
    getDataUser() {
      return modelUserStore.listUser;
    },
    getTotalPage() {
      return modelUserStore.totalPage;
    },
    getDataProv() {
      let arr = [];
      if (this.queryProv == "") {
        this.provinsiData;
      } else {
        this.provinsiData.filter((data) => {
          if (
            data.Nama_Propinsi.toLowerCase()
              .replace(/\s+/g, "")
              .includes(this.queryProv.toLowerCase().replace(/\s+/g, ""))
          ) {
            arr.push(data);
          }
        });
      }

      return arr.length == 0 ? this.provinsiData : arr;
    },
    getDataKab() {
      let arr = [];
      if (this.queryKab == "") {
        this.kabupatenData;
      } else {
        this.kabupatenData.filter((data) => {
          if (
            data.Nama_Kabupaten_Kota.toLowerCase()
              .replace(/\s+/g, "")
              .includes(this.queryKab.toLowerCase().replace(/\s+/g, ""))
          ) {
            arr.push(data);
          }
        });
      }
      return arr.length == 0 ? this.kabupatenData : arr;
    },
  },
  methods: {
    // DetailData dan update
    detailData(data) {
      let detail = this.detail;
      detail.nippos = data.nippos;
      detail.nama = data.nama;
      detail.bagian = data.bagian;
      detail.jabatan = data.jabatan;
      detail.hakakses = data.kodeakses;
      detail.kantor = data.namakantor;
      detail.status = data.status;
      detail.propinsi = data.provinsi;
      detail.kota = data.kota;
    },
    async updateData() {
      let detail = this.detail;
      let payload = {
        nippos: detail.nippos,
        statusaktif: detail.status,
        hakakses: detail.hakakses,
      };
      let res = await modelUserStore.updateUser(payload);
      if (res == true) {
        this.$swal({
          icon: "success",
          title: "Berhasil",
        }).then((result) => {
          if (result.isConfirmed) {
            this.getData(this.cari, this.limit, this.page);
          }
        });
      } else {
        this.$swal({
          icon: "error",
          title: "Gagal",
        });
      }
    },
    // Save Data
    async inputData() {
      if (
        this.User.propinsi == null ||
        this.User.kota == null ||
        this.User.nippos == null ||
        this.User.hakakses == null
      ) {
        return this.$swal({
          icon: "error",
          title: "Data Masih Ada yang Kosong",
        });
      }
      this.paramUser.propinsi = this.User.propinsi.Kode_Propinsi;
      this.paramUser.kota = this.User.kota.Kode_Kabupaten_Kota;
      this.paramUser.kodeakses = this.User.hakakses;

      let res = await modelUserStore.inputUser(this.paramUser);
      if (res == true) {
        this.$swal({
          icon: "success",
          title: "Berhasil",
        }).then((result) => {
          if (result.isConfirmed) {
            this.User.nama = "";
            this.User.bagian = "";
            this.User.jabatan = "";
            this.User.kantor = "";
            this.User.nippos = "";

            // let myModal = new Modal(document.getElementById("exampleModal"));
            // console.log(myModal);
            // myModal.hide();

            // let body = document.getElementsByTagName("body");
            // body[0].style.overflow = null;
            // body[0].style.paddingRight = null;
            // body[0].classList.remove("modal-open");
            // document.getElementById("exampleModal").style.display = "none";
            // document.getElementById("exampleModal").classList.remove("show");
            // var divsToHide =
            //   document.getElementsByClassName("modal-backdrop"); //divsToHide is an array
            // divsToHide[0].remove();

            this.getData(this.cari, this.limit, this.page);
          }
        });
      } else {
        this.$swal({
          icon: "error",
          text: res,
          confirmButtonColor: "#e77817",
        });
      }
    },
    // Get Data
    async getData(cari, limit, page) {
      this.loading = true;
      try {
        let res = await modelUserStore.getData(cari, limit, page);
        if (res || res == undefined) {
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        console.log(error.message);
      }
    },
    // next Page
    async movePage(operator) {
      this.loading = true;

      if (operator == "tambah") {
        this.page += 1;
      } else {
        this.page -= 1;
      }
      if (this.page == 1) {
        this.btnKurang = true;
        this.btnTambah = false;
      } else if (this.page == this.getTotalPage) {
        this.btnKurang = false;
        this.btnTambah = true;
      } else {
        this.btnKurang = false;
        this.btnTambah = false;
      }
      await modelUserStore.getData(this.cari, this.limit, this.page);
      this.loading = false;
    },
    // Search
    async findTable() {
      this.loading = true;
      await modelUserStore.getData(this.cari, this.limit, 1);
      this.loading = false;
    },
    async findNippos() {
      let res = await modelUserStore.findNippos(this.User.nippos);
      if (res.data.responCode == 200) {
        let data = res.data.data[0];
        this.User.nama = data.nama;
        this.User.bagian = data.namabagian;
        this.User.jabatan = data.descjabatan;
        this.User.kantor = data.namaktr;
        this.paramUser = {
          nippos: data.nippos,
          nama: data.nama,
          nopend: data.nopend,
          kcu: data.kcu,
          regional: data.regional2,
          namaktr: data.namaktr,
          kodejab: data.jabatan.replace(/\s+/g, ""),
          namajab: data.descjabatan,
          kodebag: data.kodebagian.replace(/\s+/g, ""),
          namabag: data.namabagian,
          jenisrelasi: data.jenisrelasi,
        };
      }
    },
    async loadHakakses() {
      try {
        let res = await modelUserStore.getHakakses();
        this.listHakakses = res.data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getProv() {
      try {
        let res = await CountryService.getProvinsi();
        this.provinsiData = res.data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getKab() {
      try {
        this.User.kota = "";
        let param = this.User.propinsi;
        if (param.Kode_Propinsi != undefined) {
          let payload = {
            propinsi: Number(param.Kode_Propinsi),
          };
          let res = await CountryService.getKabupaten(payload);
          this.kabupatenData = res.data.data;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted() {
    this.loadHakakses();
    this.getProv();
    this.getData(this.cari, this.limit, this.page);
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
.cari-style {
  width: 30%;
}
@media only screen and (max-width: 720px) {
  .cari-style {
    width: 80%;
  }
  .custom-table {
    width: 100%;
    display: block;
    overflow-x: auto;
  }
}
.custom-table {
  width: 100%;
  border-radius: 5px;
}

.custom-table thead {
  background: rgba(230, 120, 23, 0.2) !important;
}
.custom-table th {
  padding: 20px;
}
.custom-table tbody {
  border-bottom: 1px solid #000;
  background: #fff;
}
.custom-table td {
  padding: 19px 21px 18px 21px;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #e77817; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@import "../../../../node_modules/vue-select/dist/vue-select.css";
</style>
