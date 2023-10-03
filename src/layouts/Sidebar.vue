<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar elevation-4" style="background-color: #003b2e">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="../assets/logo.svg" style="opacity: 0.8" />
      <span class="brand-text font-weight-light white-all" style="color: #ffff"
        >E-BUDGETING</span
      >
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <!-- <img src="../assets/img/avatar5.png" class="img-circle elevation-2" alt="User Image"> -->
        </div>
        <div class="info">
          <label class="d-block white-all">{{ userSession.nama }}</label>
          <small style="color: #ffff">{{ namaAkses }}</small>
          <br />
          <small style="color: #ffff">{{ userSession.namakantor }}</small>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <router-link
              to="/dashboard"
              :class="NamePage == 'Dashboard' ? Active : notActive"
            >
              <span class="material-symbols-outlined nav-icon" style="color: #ffff"> dashboard </span>
              <p style="color: #ffff">Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item" v-show="namaAkses == 'Pusat'">
            <a href="#" class="nav-link">
              <p class="white-all">
                REFRENSI
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  to="/user"
                  :class="NamePage == 'Daftar User' ? Active : notActive"
                >
                  <span
                    class="material-symbols-outlined nav-icon"
                    style="color: #ffff"
                  >
                    manage_accounts
                  </span>
                  <p style="color: #ffff">User</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  props: {
    NamePage: String,
  },
  data() {
    return {
      Active: "nav-link active",
      notActive: "nav-link",
      userSession: JSON.parse(atob(sessionStorage.getItem("dataUser"))),
      namaAkses: sessionStorage.getItem("namaAkes"),
    };
  },
};
</script>

<style>
.white-all {
  color: #ffff;
}
.active {
  background-color: #ffff !important;
}
.active p {
  color: black !important;
}
.active .nav-icon {
  color: black !important;
}
</style>
