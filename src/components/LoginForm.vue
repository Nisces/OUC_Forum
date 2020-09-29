<template>
  <div v-loading.fullscreen.lock="loading" @keypress.enter="login">
    <h1 v-if="!popup">欢迎登录海大论坛</h1>
    <form autocomplete="off">
      <div class="form-group">
        <label for="name">手机号</label>
        <input class="form-control" id="name" type="text" placeholder="请输入手机号" v-model.trim="phone" />
      </div>
      <div class="form-group">
        <label for="pwd">密码</label>
        <input
          class="form-control"
          id="pwd"
          type="password"
          placeholder="请输入密码"
          v-model.trim="password"
        />
      </div>
      <div class="form-group btn-wrapper">
        <button class="btn btn-primary" @click="login" type="button">登录</button>
      </div>
    </form>
    <div class="form-group reg">
      <router-link to="/register">注册账号</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    popup: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      phone: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    login() {
      if (!this.phone || !this.password) {
        this.$notify({
          message: "手机号和密码不能为空",
          showClose: true,
          type: "error",
        });
        return;
      }
      this.loading = true;
      this.axios
        .post("/user/login", {
          phone: this.phone,
          password: this.password,
        })
        .then((res) => {
          this.loading = false;
          if (res.data !== "") {
            this.$notify({
              title: "登录成功",
              message: "登录成功",
              type: "success",
            });
            var user = res.data;
            user.password = this.password;
            sessionStorage.setItem("user", JSON.stringify(user));
            if (this.popup) {
              this.$emit("pass");
            } else {
              this.$router.push("/");
            }
          } else {
            this.$notify({
              title: "登录失败",
              message: "手机号或密码错误",
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$notify({
            title: "登录失败",
            message: "系统错误",
            type: "error",
          });
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 30px;
}

.form-group label {
  width: 20%;
  display: inline-block;
  font-size: 18px;
}

.form-group .form-control {
  width: 75%;
  outline: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 5px;
}

.btn-wrapper,
.form-group.reg {
  text-align: center;
}

.form-group.reg {
  margin-top: 20px;
}

.btn.btn-primary {
  margin-top: 0;
  padding: 15px 60px;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 100px;
}

.form-group > a {
  cursor: pointer;
  text-decoration: none;
}
</style>
