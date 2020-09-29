<template>
  <div v-loading.fullscreen.lock="loading" @keypress.enter="register">
    <h1 class>欢迎注册</h1>
    <p style="color: gray;">
      已有帐号，去
      <router-link to="/login" style="text-decoration:none">登录</router-link>
    </p>
    <form autocomplete="off">
      <div class="form-group">
        <label for="name">用户名</label>
        <input
          class="form-control"
          id="name"
          type="text"
          placeholder="请输入用户名"
          v-model.trim="username"
        />
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
      <div class="form-group">
        <label for="iph">手机号</label>
        <input
          class="form-control"
          id="iph"
          type="text"
          placeholder="用于接收验证和找回密码"
          v-model.trim="phone"
        />
      </div>
      <div class="form-group">
        <label for="num">验证码</label>
        <div class="verwrapper">
          <input class="ver-code" type="text" placeholder="输入验证码" v-model.trim="verCode" />
          <button class="btn-ver" type="button" @click="getVerCode">获取验证码</button>
        </div>
      </div>
      <div class="form-group btn-wrapper">
        <button class="btn btn-primary" @click="register" type="button">注册</button>
      </div>
      <div class="accept">
        <input id="acc" type="checkbox" checked="checked" />
        <label for="acc">我已阅读并接受海大论坛用户协议</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      verCode: "",
      loading: false,
    };
  },
  methods: {
    getVerCode() {
      var code = "";
      for (var i = 1; i <= 6; i++) {
        code += parseInt(Math.random() * 10);
      }
      this.verCode = code;
    },
    register() {
      if (!this.username || !this.password || !this.phone || !this.verCode) {
        this.$notify({
          title: "注册失败",
          message: "注册信息均不能为空",
          type: "error",
        });
        return;
      }
      this.loading = true; //显示注册loading组件
      this.axios
        .post("/user/register", {
          username: this.username,
          password: this.password,
          phone: this.phone,
        })
        .then((res) => {
          this.loading = false;
          if (res.data == 1) {
            this.$notify({
              message: "注册成功，为您跳转到登录页面",
              type: "success",
            });
            this.$router.push("/login");
          } else {
            this.$notify({
              title: "注册失败",
              message: "该用户已存在",
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
          this.$notify({
            title: "注册失败",
            message: "系统错误",
            type: "error",
          });
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.accept {
  margin-top: 10px;
}

.form-group {
  margin-top: 30px;
}

.form-group label {
  width: 20%;
  display: inline-block;
  font-size: 18px;
}

.form-group .form-control {
  width: 80%;
  outline: none;
  font-size: 16px;
  padding: 10px 15px;
  border: 1px solid #999;
  border-radius: 5px;
}

.form-group .verwrapper {
  display: inline-block;
  width: 80%;
}

.form-group .ver-code {
  width: 60%;
  outline: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 5px;
}

.btn-ver {
  width: calc(40% - 12px);
  outline: none;
  font-size: 13px;
  padding: 10px 0;
  margin-left: 12px;
  border: 1px solid #999;
  background: #f6f6f6;
  border-radius: 5px;
  cursor: pointer;
}

.btn-ver:hover {
  color: #0099ff;
  border-color: #0099ff;
  transition: 0.5s;
}

.btn-wrapper,
.accept {
  text-align: center;
}

.btn.btn-primary {
  margin-top: 0;
  padding: 15px 60px;
  outline: none;
  border: none;
  color: white;
  border-radius: 100px;
}
</style>
