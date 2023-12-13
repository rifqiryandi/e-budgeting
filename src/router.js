import {
  createWebHistory,
  createRouter
} from "vue-router";

let namaAkses = sessionStorage.getItem('namaAkes')
let routes
switch (namaAkses) {
  case 'Superadmin':
    routes = [{
        path: "/",
        alias: "/login",
        name: "Login",
        component: () => import("./components/page/auth/Login.vue"),
      },
      {
        path: "/anggaran",
        alias: "/anggaran",
        name: "Daftar Anggaran",
        component: () => import("./components/page/superadmin/transaksi/Anggaran.vue"),
      },
      {
        path: "/persenAnggaran",
        alias: "/persenAnggaran",
        name: "Persentasi Anggaran",
        component: () => import("./components/page/superadmin/transaksi/PersentasiAnggaran.vue"),
      },
      {
        path: "/topupanggaran",
        alias: "/topupanggaran",
        name: "Top Up Anggaran",
        component: () => import("./components/page/superadmin/transaksi/TopUpAnggaran.vue"),
      },
      {
        path: "/laporanRealisasi",
        alias: "/laporanRealisasi",
        name: "Laporan Realisasi",
        component: () => import("./components/page/superadmin/laporan/LaporanRealisasi.vue"),
      },
      {
        path: "/switchDepartemen",
        alias: "/switchDepartemen",
        name: "Switch Anggaran Antar Departemen",
        component: () => import("./components/page/superadmin/transaksi/SwitchAnggaranDepartemen.vue"),
      },
      {
        path: "/summary",
        alias: "/summary",
        name: "Summary",
        component: () => import("./components/page/superadmin/laporan/Summary.vue"),
      },
    ];
    break;
  case 'Admin Sistem':
    routes = [{
        path: "/",
        alias: "/login",
        name: "Login",
        component: () => import("./components/page/auth/Login.vue"),
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
      {
        path: "/mataAnggaran",
        alias: "/mataAnggaran",
        name: "Mata Anggaran",
        component: () => import("./components/page/admin/mataAnggaran/ListMataAnggaran.vue"),
      },
      {
        path: "/submataAnggaran",
        alias: "/submataAnggaran",
        name: "Sub Mata Anggaran",
        component: () => import("./components/page/admin/mataAnggaran/ListSubMataAnggaran.vue"),
      }

    ];
    break;
  case "Officer":
    routes = [{
        path: "/",
        alias: "/login",
        name: "Login",
        component: () => import("./components/page/auth/Login.vue"),
      },
      {
        path: "/kegiatan",
        alias: "/kegiatan",
        name: "Daftar Proyeksi Kegiatan",
        component: () => import("./components/page/officer/transaksi/Kegiatan.vue"),
      },
      {
        path: "/anggaran",
        alias: "/anggaran",
        name: "Daftar Anggaran",
        component: () => import("./components/page/officer/transaksi/Anggaran.vue"),
      },
      {
        path: "/pengajuanBiaya",
        alias: "/pengajuanBiaya",
        name: "Pengajuan Biaya",
        component: () => import("./components/page/officer/transaksi/PengajuanBiaya.vue"),
      },
      {
        path: "/pengajuanKomitmen",
        alias: "/pengajuanKomitmen",
        name: "Pengajuan Termin",
        component: () => import("./components/page/officer/transaksi/PengajuanKomitmen.vue"),
      },
      {
        path: "/pengajuanRetur",
        alias: "/pengajuanRetur",
        name: "Pengajuan Retur",
        component: () => import("./components/page/officer/transaksi/PengajuanRetur.vue"),
      },
      {
        path: "/switchSubMataAnggaran",
        alias: "/switchSubMataAnggaran",
        name: "Switch Sub Mata Anggaran",
        component: () => import("./components/page/officer/transaksi/SwitchAnggaranSubMata.vue"),
      },
      {
        path: "/switchDepartemen",
        alias: "/switchDepartemen",
        name: "Switch Anggaran Antar Departemen",
        component: () => import("./components/page/officer/transaksi/SwitchAnggaranDepartemen.vue"),
      },
      {
        path: "/topupanggaran",
        alias: "/topupanggaran",
        name: "Top Up Anggaran",
        component: () => import("./components/page/officer/transaksi/TopUpAnggaran.vue"),
      },
      {
        path: "/realisasianggaran",
        alias: "/realisasianggaran",
        name: "Realisasi Anggaran",
        component: () => import("./components/page/officer/transaksi/PengajuanRealisasi.vue"),
      },
      {
        path: "/laporanRealisasi",
        alias: "/laporanRealisasi",
        name: "Laporan Realisasi",
        component: () => import("./components/page/officer/laporan/LaporanRealisasi.vue"),
      },


    ];
    break;
  case "Departemen Head":
    routes = [{
        path: "/",
        alias: "/login",
        name: "Login",
        component: () => import("./components/page/auth/Login.vue"),
      },
      {
        path: "/anggaran",
        alias: "/anggaran",
        name: "Daftar Anggaran",
        component: () => import("./components/page/departemenHead/transaksi/Anggaran.vue"),
      },
      {
        path: "/kegiatan",
        alias: "/kegiatan",
        name: "Daftar Proyeksi Kegiatan",
        component: () => import("./components/page/departemenHead/transaksi/Kegiatan.vue"),
      },
      {
        path: "/validasiPengajuanBiaya",
        alias: "/validasiPengajuanBiaya",
        name: "Validasi Pengajuan Biaya",
        component: () => import("./components/page/departemenHead/transaksi/ValidasiPengajuanBiaya.vue"),
      },
      {
        path: "/validasiPengajuanKomitmen",
        alias: "/validasiPengajuanKomitmen",
        name: "Validasi Pengajuan Komitmen",
        component: () => import("./components/page/departemenHead/transaksi/ValidasiPengajuanKomitmen.vue"),
      },
      {
        path: "/topupanggaran",
        alias: "/topupanggaran",
        name: "Top Up Anggaran",
        component: () => import("./components/page/departemenHead/transaksi/TopUpAnggaran.vue"),
      },
      {
        path: "/switchSubMataAnggaran",
        alias: "/switchSubMataAnggaran",
        name: "Switch Sub Mata Anggaran",
        component: () => import("./components/page/departemenHead/transaksi/SwitchAnggaranSubMata.vue"),
      },
      {
        path: "/switchDepartemen",
        alias: "/switchDepartemen",
        name: "Switch Anggaran Antar Departemen",
        component: () => import("./components/page/departemenHead/transaksi/SwitchAnggaranDepartemen.vue"),
      },
      {
        path: "/realisasianggaran",
        alias: "/realisasianggaran",
        name: "Realisasi Anggaran",
        component: () => import("./components/page/departemenHead/transaksi/PengajuanRealisasi.vue"),
      },
      {
        path: "/laporanRealisasi",
        alias: "/laporanRealisasi",
        name: "Laporan Realisasi",
        component: () => import("./components/page/departemenHead/laporan/LaporanRealisasi.vue"),
      },

    ];
    break;
  case "BUM":
    routes = [{
        path: "/",
        alias: "/login",
        name: "Login",
        component: () => import("./components/page/auth/Login.vue"),
      },
      {
        path: "/realisasianggaran",
        alias: "/realisasianggaran",
        name: "Validasi Realisasi Anggaran",
        component: () => import("./components/page/keuangan/transaksi/PengajuanRealisasi.vue"),

      },
      {
        path: "/entryrealisasianggaran",
        alias: "/entryrealisasianggaran",
        name: "Entry Realisasi Anggaran",
        component: () => import("./components/page/keuangan/transaksi/EntryRealisasi.vue"),
      }


    ];
    break;
  case "General Manager":
    routes = [{
        path: "/",
        alias: "/login",
        name: "Login",
        component: () => import("./components/page/auth/Login.vue"),
      },
      {
        path: "/dashboard",
        alias: "/admin",
        name: "Dashboard",
        component: () => import("./components/page/generalManager/Dashboard.vue"),
      },
      {
        path: "/rekapRealisasi",
        alias: "/rekapRealisasi",
        name: "Rekap Realisasi",
        component: () => import("./components/page/generalManager/RekapRealisasi.vue"),
      }
      
    ];
    break;

  default:
    routes = [{
      path: "/",
      alias: "/login",
      name: "Login",
      component: () => import("./components/page/auth/Login.vue"),
    }];
    break;
}





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
  } else {
    if (to.path != '/') {
      return {
        path: '/'
      }
    }
  }
})

export default router;