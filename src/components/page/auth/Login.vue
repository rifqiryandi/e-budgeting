<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-12 p-0">
        <div class="block-design"></div>
      </div>
      <div class="col-lg-8 col-md-8 col-12" style="margin-top: 3%">
        <div class="block-login">
          <div class="row new-row" style="height: 47%">
            <div class="col-lg-3 col-md-3 col-12"></div>
            <div
              class="col-lg-6 col-md-6 col-12 d-flex justify-content-center new-col"
            >
              <div class="iconStyle"></div>
            </div>
            <div class="col-lg-3 col-md-3 col-12"></div>
          </div>
          <div class="row">
            <div class="form-login col-lg-3 col-md-0 col-12"></div>
            <div class="form-login col-lg-6 col-md-12 col-12">
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Username</label>
                  <InputText
                    class="form-control"
                    type="text"
                    v-model="user.nippos"
                    style="border-radius: 16px; height: 48px"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Password</label>
                  <Password
                    v-model="user.password"
                    :feedback="false"
                    toggleMask
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="mt-3 d-flex justify-content-center">
                <button type="submit" class="button-style" @click="login">
                  Login
                </button>
              </div>
            </div>
            <div class="form-login col-lg-3 col-md-0 col-12"></div>
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

// import modelSession from "../../../model/modelSession";

export default {
  name: "loginView",
  data() {
    return {
      user: {
        nippos: null,
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
      let nippos = this.user.nippos;
      let password = this.user.password;
      let data = {
        nippos: nippos,
        password: password,
      };

      // 985397299
      try {
        let respon = await serviceAuth.getToken(data);
        if (respon.data.responCode == 200) {
          let token = respon.data.accessToken;
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("token", token);
          if (respon.data.data.kodeakses == 10) {
            sessionStorage.setItem("namaAkes", "Pusat");
          } else if (respon.data.data.kodeakses == 20) {
            sessionStorage.setItem("namaAkes", "Regional");
          } else if (respon.data.data.kodeakses == 30) {
            sessionStorage.setItem("namaAkes", "KCU");
          } else if (respon.data.data.kodeakses == 40) {
            sessionStorage.setItem("namaAkes", "KC");
          }
          sessionStorage.setItem("expTime", respon.data.expiresIn);
          sessionStorage.setItem(
            "dataUser",
            btoa(JSON.stringify(respon.data.data))
          );
          window.location.href = "/";
          // this.$router.push("/user");
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
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Roboto:ital,wght@0,100;0,300;0,400;1,400&display=swap');
.button-style {
  width: 50%;
  background-color: #003b2e;
  color: #ffff;
  border-radius: 16px;
  border: 2px solid #003b2e;
  height: 48px;
}
.button-style:hover {
  background-color: #ffff;
  color: #003b2e;
}
.block-login {
  width: 100%;
  height: 100%;
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
  height: 55%;
  margin-top: 15%;
  /* margin-left: auto; */
  margin-right: 5%;
  background-repeat: no-repeat;
  background-size: 100%;
}
@media only screen and (max-width: 720px) {
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
