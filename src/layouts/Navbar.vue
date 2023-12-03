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
      <li class="nav-item dropdown" v-show="true">
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
          <span class="badge badge-warning navbar-badge">5</span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-lg dropdown-menu-right cursor-pointer p-0 m-0"
          style="border-radius: 6px"
        >
          <div
            class="dropdown-item d-flex justify-content-center cursor-pointer"
          >
            (5) Notifikasi
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item d-flex cursor-pointer">
            ---Pesan notifikasi---
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
            @click="ProsesLogout()"
            class="dropdown-item d-flex justify-content-center cursor-pointer cstm-logout"
          >
            LOGOUT
          </a>
          <div class="dropdown-divider"></div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import serviceAuth from "../services/Auth.service";

export default {
  data() {
    return {
      countDown: 10,
      textTime: "",
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
      namaAkses: sessionStorage.getItem("namaAkes"),
    };
  },
  methods: {
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
    toastNotifikasi() {
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
      if (this.namaAkses == "Departemen Head") {
        return Toast.fire({
          icon: "info",
          title: "Terdapat 5 notifikasi baru, jangan lupa di lihat :)",
        });
      }
    },
  },
  mounted() {
    this.countDownTimer();
    this.toastNotifikasi();
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
</style>
