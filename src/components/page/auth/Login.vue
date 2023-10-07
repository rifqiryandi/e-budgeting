<template>
  <div
    class="container-fluid centered"
    style="
      height: 100vh;
      background-image: linear-gradient(to right, #ff6600, #006699);
    "
  >
    <div class="card card-custom">
      <div class="card-body" style="height: 60vh">
        <div class="row">
          <div
            class="form-login col-lg-12 col-md-12 col-12 d-flex justify-content-center"
          >
            <div class="blockCstm">
              <p class="text-info-style">Selamat datang !</p>
              <p class="text-info-style">Masukkan Username dan password anda</p>
              <label class="form-label">Username</label>
              <InputText
                class="form-control"
                type="text"
                v-model="user.username"
                style="border-radius: 16px; height: 48px; text-align: center"
              />
              <label class="form-label mt-2">Password</label>
              <Password
                v-model="user.password"
                :feedback="false"
                toggleMask
                style="width: 100%"
              />
              <div class="d-flex justify-content-center" style="margin-top: 6%">
                <button type="submit" class="button-style" @click="login">
                  Login
                </button>
              </div>
            </div>
          </div>
          <div
            class="col-12 d-flex justify-content-center"
            style="margin-top: 15%"
          >
            <img src="../../../assets/bnilogo.png" class="img-style" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serviceAuth from "../../../services/Auth.service";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
var md5 = require("md5");

// import modelSession from "../../../model/modelSession";

export default {
  name: "loginView",
  data() {
    return {
      user: {
        username: null,
        nama: "",
      },
      loginIs: false,
      msg: "",
      DataUser: "",
    };
  },
  components: {
    Password,
    InputText,
  },
  methods: {
    processLogout() {
      localStorage.clear();
      location.reload();
    },
    async login() {
      let username = this.user.username;
      let password = this.user.password;
      let data = {
        username: username,
        password: password,
      };
      console.log(md5(username));
      try {
        let respon = await serviceAuth.getToken(data);
        if (respon.data.responCode == 200) {
          let token = respon.data.accessToken;
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("token", token);
          if (respon.data.data.leveluser == 1) {
            sessionStorage.setItem("namaAkes", "Super Admin");
          } else if (respon.data.data.leveluser == 2) {
            sessionStorage.setItem("namaAkes", "Officer");
          } else if (respon.data.data.leveluser == 3) {
            sessionStorage.setItem("namaAkes", "Departemen Head");
          } else if (respon.data.data.leveluser == 4) {
            sessionStorage.setItem("namaAkes", "Keuangan/Treasury");
          } else if (respon.data.data.leveluser == 5) {
            sessionStorage.setItem("namaAkes", "General Manager");
          } else if (respon.data.data.leveluser == 6) {
            sessionStorage.setItem("namaAkes", "Admin Sistem");
          }
          sessionStorage.setItem("expTime", respon.data.expiresIn);
          sessionStorage.setItem(
            "dataUser",
            btoa(JSON.stringify(respon.data.data))
          );
          window.location.href = "/dashboard";
        }
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "GAGAL",
          text: error.response.data.Msg,
          confirmButtonColor: "#e77817",
        });
      }
    },
  },
  mounted() {
    document.querySelector(".p-password-input").classList.add("form-control");
    document.querySelector(".p-password-input").classList.add("cstm-Input");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Roboto:ital,wght@0,100;0,300;0,400;1,400&display=swap");
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-info-style {
  color: #006699;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  margin-bottom: 10px;
}
.img-style {
  width: 35%;
}
.blockCstm {
  width: 100%;
  margin-top: 10%;
}
.button-style {
  width: 50%;
  background-color: #006699;
  color: #ffff;
  border-radius: 16px;
  border: 2px solid #006699;
  height: 48px;
}
.button-style:hover {
  background-color: #ffff;
  color: #006699;
}
.block-login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}

.block-design {
  width: 100%;
  height: 100vh;
  /* background-image: url("../../assets/bgakhlak.svg"); */
  background-color: #003b2e;
  background-repeat: no-repeat;
  background-size: cover;
}

.form-login {
  align-content: center;
}

.form-login input {
  width: 80%;
  margin-left: 10%;
}

.form-login label {
  margin-left: 10%;
}

.iconStyle {
  background-image: url("../../../assets/logo.svg");
  width: 70%;
  height: 100%;
  margin-top: 15%;
  /* margin-left: auto; */
  margin-right: 5%;
  background-repeat: no-repeat;
  background-size: 100%;
}
.card-custom {
  width: 30%;
  border-radius: 16px !important;
}
@media only screen and (max-width: 720px) {
  .card-custom {
    width: 100%;
  }
  .blockCstm {
    width: 100%;
  }
  .img-style {
    width: 40%;
  }
  .block-design {
    display: none;
  }
  .iconStyle {
    width: 50%;
    min-height: 30%;
    margin-left: auto;
    margin-right: auto;
    align-content: center;
    display: flex;
  }
  .new-row {
    height: 50vh !important;
  }
  .new-col {
    height: 50vh !important;
  }
}
.p-password input {
  text-align: center;
  padding-right: 12px !important;
}
.p-password svg {
  margin-right: 10%;
}
.cstm-Input {
  border-radius: 16px !important;
  height: 48px !important;
}
.form-label {
  color: #1e1e1e !important;
  font-family: Roboto !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: normal !important;
}
</style>
