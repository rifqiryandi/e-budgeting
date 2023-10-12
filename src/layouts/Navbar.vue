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
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <span class="material-symbols-outlined"> person </span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a
            @click="ProsesLogout()"
            class="dropdown-item d-flex justify-content-center"
          >
            Log Out
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
  },
  mounted() {
    this.countDownTimer();
  },
};
</script>

<style>
.main-header {
  z-index: 20 !important;
}
</style>
