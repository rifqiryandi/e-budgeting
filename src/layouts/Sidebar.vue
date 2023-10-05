<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar elevation-4" style="background-color: #fff">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img
        src="../assets/img/avatar.png"
        style="opacity: 0.8"
        class="brand-image img-circle elevation-3"
      />
      <span
        class="brand-text white-all"
        style="color: #1e1e1e; margin-left: 3.5%"
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
          <small style="color: #1e1e1e">{{ namaAkses }}</small>
          <br />
          <small style="color: #1e1e1e">{{ userSession.namakantor }}</small>
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
              <span
                class="material-symbols-outlined nav-icon"
                style="color: #1e1e1e"
              >
                dashboard
              </span>
              <p style="color: #1e1e1e">Dashboard</p>
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
                    style="color: #1e1e1e"
                  >
                    manage_accounts
                  </span>
                  <p style="color: #1e1e1e">Pengguna</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/entitas"
                  :class="NamePage == 'Daftar Entitas' ? Active : notActive"
                >
                  <span
                    class="material-symbols-outlined nav-icon"
                    style="color: #1e1e1e"
                  >
                    remember_me
                  </span>
                  <p style="color: #1e1e1e">Entitas</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/departemen"
                  :class="NamePage == 'Daftar Departemen' ? Active : notActive"
                >
                  <span
                    class="material-symbols-outlined nav-icon"
                    style="color: #1e1e1e"
                  >
                    groups
                  </span>
                  <p style="color: #1e1e1e">Departemen</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/kelompokMataAnggaran"
                  :class="NamePage == 'Kelompok Mata Anggaran' ? Active : notActive"
                >
                  <span
                    class="material-symbols-outlined nav-icon"
                    style="color: #1e1e1e"
                  >
                    inventory_2
                  </span>
                  <p style="color: #1e1e1e">Kelompok Mata Anggaran</p>
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
  color: #1e1e1e;
}
.active {
  background-color: #ff6600 !important;
}
.active p {
  color: #fff !important;
}
.active .nav-icon {
  color: #fff !important;
}
</style>
