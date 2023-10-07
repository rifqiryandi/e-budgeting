import {
  createWebHistory,
  createRouter
} from "vue-router";


const routes = [{
    path: "/",
    alias: "/login",
    name: "Login",
    component: () => import("./components/page/auth/Login.vue"),
  },
  {
    path: "/dashboard",
    alias: "/admin",
    name: "Dashboard",
    component: () => import("./components/page/admin/Dashboard.vue"),
  },
  {
    path: "/user",
    alias: "/user",
    name: "Daftar User",
    component: () => import("./components/page/admin/ListUser.vue"),
  },
  {
    path: "/entitas",
    alias: "/entitas",
    name: "Daftar Entitas",
    component: () => import("./components/page/admin/entitas/ListEntitas.vue"),
  },
  {
    path: "/departemen",
    alias: "/departemen",
    name: "Daftar Departemen",
    component: () => import("./components/page/admin/departemen/ListDepartemen.vue"),
  },
  {
    path: "/kelompokMataAnggaran",
    alias: "/kelompokMataAnggaran",
    name: "Kelompok Mata Anggaran",
    component: () => import("./components/page/admin/mataAnggaran/KelompokMataAnggaran.vue"),
  },
  
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard
router.beforeEach((to) => {
  let isLogin = sessionStorage.getItem('isLogin')
  if (isLogin != null) {
    if (to.path == '/') {
      return false
    }
  }else{
    if (to.path != '/') {
      return {path:'/'}
    }
  }
})

export default router;