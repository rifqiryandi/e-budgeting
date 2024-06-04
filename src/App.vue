<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div v-if="isLogin == false">
      <loginPage />
    </div>
    <div v-else>
      <div class="wrapper">
        <Sidebar :NamePage="$route.name"></Sidebar>
        <Navbar></Navbar>
        <div class="content-wrapper">
          <ContentHeader :NamePage="$route.name"></ContentHeader>
          <section class="content">
            <div class="container-fluid">
              <router-view />
            </div>
          </section>
        </div>
        <Footer></Footer>
        <ControlSidebar></ControlSidebar>
      </div>
    </div>
  </body>
</template>

<script>
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../node_modules/admin-lte/plugins/select2/css/select2.min.css";

// import Preloader from "./layouts/Preloader.vue";
import ContentHeader from "./layouts/ContentHeader.vue";
import Navbar from "./layouts/Navbar.vue";
import Sidebar from "./layouts/Sidebar.vue";
import Footer from "./layouts/Footer.vue";
import ControlSidebar from "./layouts/ControlSidebar.vue";
import loginPage from "./components/page/auth/Login.vue";

export default {
  name: "App",
  data() {
    return {
      isLogin: false,
    };
  },
  components: {
    // Preloader,
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
    loginPage,
  },
  watch: {
    $route(to, from) {
      if (from.path == "/" || to.path == "/") {
        this.cekLogin(localStorage.getItem("isLogin"));
      }
    },
  },
  methods: {
    cekLogin(isLogin) {
      if (isLogin == null || isLogin == false) {
        console.log("Login Terlebih dahulu");
        this.isLogin = false;
      } else {
        this.isLogin = isLogin;
      }
    },
    
  },
  mounted() {
    this.cekLogin(localStorage.getItem("isLogin"));
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
