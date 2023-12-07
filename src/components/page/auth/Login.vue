<template>
  <div
    class="container-fluid centered"
    style="
      height: 100vh;
      background-image: linear-gradient(to right, #ff3300, #6792ff);
    "
  >
    <div class="card card-custom">
      <div class="card-body p-0">
        <div class="row m-0" style="height: 60vh">
          <div
            class="col-lg-6 col-0 d-flex justify-content-center col-custom-style p-0"
          >
            <img
              src="../../../assets/imgvector.jpg"
              class="img-left"
              style="border-radius: 16px 0px 0px 16px; width: 100%"
            />
          </div>
          <div
            class="form-login col-lg-6 col-md-12 col-12 d-flex justify-content-center flex items-center"
            style="height: 60vh"
          >
            <div class="blockCstm">
              <label class="form-label">Username</label>
              <InputText
                class="form-control"
                type="text"
                v-model="user.username"
                placeholder="Masukkan Username ..."
                style="
                  height: 48px;
                  text-align: center;
                  border: none;
                  border-bottom: 2px solid grey;
                  border-radius: 0;
                "
              />
              <p
                class="mt-2 text-sm text-red-600 dark:text-red-500 m-0 text-center"
                v-if="this.v$.user.username.$error"
              >
                Username tidak boleh kosong!
              </p>
              <label class="form-label mt-2">Password</label>
              <Password
                v-model="user.password"
                :feedback="false"
                toggleMask
                style="width: 100%"
                placeholder="Masukkan Password ..."
              />
              <p
                class="mt-2 text-sm text-red-600 dark:text-red-500 m-0 text-center"
                v-if="this.v$.user.password.$error"
              >
                Password tidak boleh kosong!
              </p>
              <div class="d-flex justify-content-center m-10">
                <button type="submit" class="button-style" @click="login">
                  LOGIN
                </button>
              </div>
              <div class="grid justify-center gap-3 mt-15">
                <img src="../../../assets/bnilogo.png" class="img-style" />
                <h4 class="text-info-style">e-Budgeting</h4>
              </div>
              <h4 class="text-info-style text-center">
                Corporate Secretary Division
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer justify-center bg-transparent inline-flex py-0">
        <p class="m-0 text-center pt-3 text-base">Powered by</p>
        <img
          src="../../../assets/janariLogo.png"
          width="48"
          height="48"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import serviceAuth from "../../../services/Auth.service";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
var md5 = require("md5");
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "loginView",
  data() {
    return {
      v$: useValidate(),
      user: {
        username: null,
        password: "",
      },
      loginIs: false,
      msg: "",
      DataUser: "",
    };
  },
  validations() {
    return {
      user: {
        username: { required },
        password: { required },
      },
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
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        let username = this.user.username;
        let password = this.user.password;
        let data = {
          username: username,
          password: md5(password),
        };
        try {
          let respon = await serviceAuth.getToken(data);
          if (respon.data.responCode == 200) {
            let token = respon.data.accessToken;
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("keypass", btoa(data.password));
            if (respon.data.data.leveluser == 1) {
              sessionStorage.setItem("namaAkes", "Superadmin");
            } else if (respon.data.data.leveluser == 2) {
              sessionStorage.setItem("namaAkes", "Officer");
            } else if (respon.data.data.leveluser == 3) {
              sessionStorage.setItem("namaAkes", "Departemen Head");
            } else if (respon.data.data.leveluser == 4) {
              sessionStorage.setItem("namaAkes", "BUM");
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
            if (respon.data.data.leveluser == 5) {
              window.location.href = "/dashboard";
            } else {
              window.location.href = "/";
            }
          }
        } catch (error) {
          this.$swal({
            icon: "error",
            title: "GAGAL",
            text: error.response.data.Msg,
            confirmButtonColor: "#e77817",
          });
        }
      }
    },
    showAlert() {
      if (sessionStorage.length == 0) {
        this.$swal({
          icon: "warning",
          title: "Waspada",
          text: "Jangan berikan data pribadi seperti username dan password kepada siapapun termasuk pihak yang tidak berkepentingan",
          confirmButtonColor: "#e77817",
        });
      }
    },
  },
  mounted() {
    this.showAlert();
    document.querySelector(".p-password-input").classList.add("form-control");
    document.querySelector(".p-password-input").classList.add("cstm-Input");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Roboto:ital,wght@0,100;0,300;0,400;1,400&display=swap");
.col-custom-style {
  border-radius: 0 16px 16px 0 !important;
  height: 60vh !important;
}
.cstm-logo-position {
  height: 130px;
  padding-top: 16%;
}
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-info-style {
  color: #006699;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  text-align: center;
  margin-bottom: 10px;
}
.img-style {
  width: 100%;
  height: 50px;
}
.blockCstm {
  width: 100%;
  padding-top: 5%;
  padding-left: 10%;
  padding-right: 10%;
}
.button-style {
  width: 50%;
  background-color: #006699;
  color: #ffff;
  border-radius: 6px;
  border: 2px solid #006699;
  height: 48px;
  box-shadow: inset 0 0 0 0 #006699;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}
.button-style:hover {
  /* background-color: #ffff; */
  color: #006699;
  box-shadow: inset 0 0 0 50px #ffff;
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
  width: 70%;
  border-radius: 16px !important;
}
@media only screen and (max-width: 720px) {
  .col-custom-style {
    height: 0 !important;
  }
  .col-custom-style img {
    display: none !important;
  }
  .cstm-logo-position {
    padding-top: 7%;
  }
  .card-custom {
    width: 100%;
  }
  .blockCstm {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
  }
  .img-style {
    width: 100%;
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
.form-control {
  box-shadow: none !important;
}
.form-control:focus,
.form-control:hover {
  border-color: #006699 !important;
}
</style>
