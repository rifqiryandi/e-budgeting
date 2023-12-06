<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <!-- <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/admin" class="nav-link">Home</router-link>
      </li> -->
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <!-- v-show="namaAkses == 'Departemen Head'" -->
      <li class="nav-item dropdown" v-show="namaAkses == 'Departemen Head'">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
            />
          </svg>
          <span
            class="badge badge-warning navbar-badge"
            v-show="totalNewNotif != 0"
            >{{ totalNewNotif }}</span
          >
        </a>
        <div
          class="dropdown-menu dropdown-menu-lg dropdown-menu-right cursor-pointer p-0 m-0"
          style="border-radius: 6px"
        >
          <div
            class="dropdown-item d-flex justify-content-center cursor-pointer"
          >
            ({{ totalNewNotif }}) Notifikasi
          </div>
          <div class="dropdown-divider"></div>
          <div
            class="dropdown-item d-flex cursor-pointer"
            v-for="(item, index) in getAllNotif"
            :key="index"
          >
            <a @click="directPage(item.jenis_switchanggaran, item.id)">
              <div class="grid grid-cols-1">
                <b>{{
                  item != undefined
                    ? item.jenis_switchanggaran == 2
                      ? "(Switch Sub Mata Anggaran)"
                      : "(Switch Antar Departemen)"
                    : ""
                }}</b>
                <p>{{ item.keterangan }}</p>
              </div>
            </a>
          </div>
          <div class="dropdown-divider"></div>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
            />
          </svg>
        </a>
        <div
          class="dropdown-menu dropdown-menu-lg dropdown-menu-right cursor-pointer p-0 m-0"
          style="border-radius: 6px"
        >
          <a
            @click="showModalPassword()"
            class="dropdown-item d-flex justify-content-center cursor-pointer cstm-logout"
          >
            Ubah Password
          </a>
          <div class="dropdown-divider"></div>
          <a
            @click="ProsesLogout()"
            class="dropdown-item d-flex justify-content-center cursor-pointer cstm-logout"
          >
            LOGOUT
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
  <!-- Modal pass change -->
  <div
    id="pass-modal"
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
          <h3 class="text-xl font-medium" style="color: #fff">Ubah Password</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModalPasswrod()"
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
          <div class="grid grid-cols-2 gap-3">
            <div id="form-inputan">
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Password Lama <span class="text-red-600">*</span>
                </label>
                <Password
                  v-model="passwordUserLama"
                  toggleMask
                  placeholder="Masukkan Password Lama"
                  style="width: 100%"
                  :feedback="false"
                />
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                  v-if="this.v$.passwordUserLama.$error"
                >
                  Password Lama tidak boleh kosong!
                </p>
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Password Baru <span class="text-red-600">*</span>
                </label>
                <Password
                  v-model="passwordUser"
                  toggleMask
                  placeholder="Masukkan Password Baru"
                  style="width: 100%"
                />
              </div>
              <div class="">
                <label
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Re-Password <span class="text-red-600">*</span>
                </label>
                <Password
                  v-model="rePassword"
                  toggleMask
                  placeholder="Masukkan Re-Password"
                  style="width: 100%"
                  :feedback="false"
                />
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500 m-0"
                  v-if="this.v$.rePassword.$error"
                >
                  Re Password tidak boleh kosong!
                </p>
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
                    this.v$.passwordUser.min.$invalid == false
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
                    this.v$.passwordUser.min.$invalid == false
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
                    this.v$.passwordUser.specialChars.$invalid == false
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
                    this.v$.passwordUser.specialChars.$invalid == false
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
                    this.v$.passwordUser.requiredAndUpper.$invalid == false
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
                    this.v$.passwordUser.requiredAndUpper.$invalid == false
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
                    this.v$.passwordUser.lowerCheck.$invalid == false
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
                    this.v$.passwordUser.lowerCheck.$invalid == false
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
                    this.v$.passwordUser.numberCheck.$invalid == false
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
                    this.v$.passwordUser.numberCheck.$invalid == false
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
            @click="prosesUbahPassword()"
            class="bg-bni-blue text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            SIMPAN
          </button>
          <button
            @click="hideModalPasswrod()"
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
import Password from "primevue/password";
import serviceAuth from "../services/Auth.service";
import { initFlowbite } from "flowbite";
import { Modal } from "flowbite";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
var md5 = require("md5");
import serviceUser from "../services/User.service";
import serviceNotif from "../services/Notif.service";
export default {
  data() {
    return {
      v$: useValidate(),
      token: sessionStorage.getItem("token"),
      passwordUser: "",
      passwordUserLama: "",
      rePassword: "",
      countDown: 10,
      textTime: "",
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
      keypass: atob(sessionStorage.getItem("keypass")),
      namaAkses: sessionStorage.getItem("namaAkes"),
      modalPassword: null,
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
      notif: {
        total: 0,
        ListData: null,
      },
    };
  },
  validations() {
    return {
      passwordUserLama: { required },
      rePassword: { required },
      passwordUser: {
        requiredAndUpper: this.validationPassword,
        numberCheck: this.checkNumber,
        specialChars: this.checkSpesialChar,
        lowerCheck: this.checkLower,
        min: this.checkMinLength,
        required,
      },
    };
  },
  components: {
    Password,
  },
  computed: {
    totalNewNotif() {
      return this.notif.total;
    },
    getAllNotif() {
      return this.notif.ListData;
    },
  },
  methods: {
    async directPage(findpage, idnotif) {
      let payload = {
        id: idnotif,
      };
      try {
        await serviceNotif.updateNotif(payload, this.token);
        if (findpage == 2) {
          window.location.href = "/switchSubMataAnggaran";
          // this.$router.push("/switchSubMataAnggaran");
        } else {
          window.location.href = "/switchDepartemen";
          // this.$router.push("/switchDepartemen");
        }
      } catch (error) {
        console.log(error.response.data.Msg);
      }
    },
    // Notif
    async toastNotifikasi() {
      await this.totalNotif();
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });
      if (this.namaAkses == "Departemen Head" && this.notif.total != 0) {
        return Toast.fire({
          icon: "info",
          title:
            "Terdapat " +
            this.notif.total +
            " notifikasi baru, jangan lupa di lihat :)",
        });
      }
    },
    async totalNotif() {
      let payload = {
        departemen: this.userSession.departemen,
      };
      try {
        let res = await serviceNotif.countNotif(payload, this.token);
        this.notif = {
          total: res.data.data[0].count,
        };
      } catch (error) {
        console.log(error.response.data.Msg);
        this.notif = {
          total: 0,
        };
      }
    },
    async listNotif() {
      let payload = {
        departemen: this.userSession.departemen,
      };
      try {
        let res = await serviceNotif.listNotif(payload, this.token);
        this.notif.ListData = res.data.data;
      } catch (error) {
        console.log(error.response.data.Msg);
        this.notif.ListData = null;
      }
    },

    // Custom Password validation
    validationPassword() {
      let pass = this.passwordUser;
      if (pass == "" || /[A-Z]/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkLower() {
      let pass = this.passwordUser;
      if (/[a-z]/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkNumber() {
      let pass = this.passwordUser;
      if (/\d/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkSpesialChar() {
      let pass = this.passwordUser;
      if (/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(pass) == false) {
        return false;
      } else {
        return true;
      }
    },
    checkMinLength() {
      let pass = this.passwordUser;
      if (pass.length <= 8) {
        return false;
      } else {
        return true;
      }
    },
    async ProsesLogout() {
      let payload = {
        username: this.userSession.username,
      };
      await serviceAuth.clearLogin(payload);
      sessionStorage.clear();
      // this.$router.push("/");
      window.location.href = "/";
    },
    countDownTimer() {
      if (sessionStorage.getItem("expTime") != undefined) {
        let dateExp = new Date(sessionStorage.getItem("expTime")).getTime();

        let x = setTimeout(() => {
          let dateNow = new Date().getTime();
          this.countDown = dateExp - dateNow;

          // Time calculations for days, hours, minutes and seconds
          // var days = Math.floor(this.countDown / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (this.countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor(
            (this.countDown % (1000 * 60 * 60)) / (1000 * 60)
          );
          var seconds = Math.floor((this.countDown % (1000 * 60)) / 1000);
          this.textTime = hours + "h " + minutes + "m " + seconds + "s ";

          if (this.countDown < 0) {
            clearTimeout(x);
            this.$swal({
              icon: "info",
              title: "Pemberitahuan",
              text: "Session Telah Habis, Silahkan Login Kembali",
            }).then(async () => {
              let payload = {
                username: this.userSession.username,
              };
              await serviceAuth.clearLogin(payload);
              sessionStorage.clear();
              // this.$router.push("/login");
              window.location.href = "/";
            });
          } else {
            this.countDownTimer();
          }
        }, 1000);
      }
    },

    showModalPassword() {
      const $targetEl = document.getElementById("pass-modal");
      this.modalPassword = new Modal($targetEl);
      this.modalPassword.show();
    },
    hideModalPasswrod() {
      this.modalPassword.hide();
    },
    async prosesUbahPassword() {
      let passwordLama = md5(this.passwordUserLama);
      let passwordBaru = this.passwordUser;
      let rePassword = this.rePassword;
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        if (passwordLama != this.keypass) {
          return this.$swal({
            icon: "info",
            title: "Kesalahan",
            text: "Password lama tidak sesuai",
            confirmButtonColor: "#e77817",
          });
        }
        if (passwordBaru != rePassword) {
          return this.$swal({
            icon: "info",
            title: "Kesalahan",
            text: "Password baru tidak sama dengan re-Password",
            confirmButtonColor: "#e77817",
          });
        }
        let payload = {
          username: this.userSession.username,
          password: md5(passwordBaru),
          id: this.userSession.id,
        };
        try {
          let respon = await serviceUser.changePassword(payload, this.token);
          this.modalPassword.hide();
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: respon.data.Msg,
            confirmButtonColor: "#e77817",
          });
          this.passwordUser = "";
          this.passwordUserLama = "";
          this.rePassword = "";
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
  },
  mounted() {
    initFlowbite();
    this.countDownTimer();
    this.toastNotifikasi();
    if (this.namaAkses == "Departemen Head") {
      this.listNotif();
    }
  },
};
</script>

<style>
.main-header {
  z-index: 20 !important;
}
.cstm-logout {
  width: 100% !important;
  border: 2px solid #fff !important ;
  background-color: #006699 !important;
  border-radius: 6px;
  color: #fff !important;
  box-shadow: inset 0 0 0 0 #ffff;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.cstm-logout:hover {
  border: 2px solid #006699 !important ;
  color: #006699 !important;
  box-shadow: inset 0 0 0 50px #ffff;
}

.p-password input {
  text-align: center;
  width: 100%;
  padding-right: 12px !important;
  border: none;
  border-bottom: 2px solid grey;
  border-radius: 0 !important;
  box-shadow: none;
}
.p-password input:focus,
.p-password input:hover {
  border-bottom: 2px solid #006699 !important;
}
.p-password svg {
  margin-right: 10%;
}
</style>
