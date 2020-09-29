<template>
  <div class="back">
    <img class="logo" src="../assets/logo.jpg" alt="LOGO" />
    <div class="back1">
      <LoginForm v-if="isLogin"></LoginForm>
      <RegisterForm v-else></RegisterForm>
    </div>
    <div class="back2">
      <h1 class="motto">海纳百川</h1>
      <h1 class="motto" style="padding-left:90px">取则行远</h1>
    </div>
    <div class="form3">
      <a class="link" href="http://www.ouc.edu.cn/">中国海洋大学官网</a>
      <a class="link" href="http://jwc.ouc.edu.cn/">中国海洋大学教务处</a>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
    RegisterForm,
  },
  data: function () {
    return {
      isLogin: true,
    };
  },
  methods: {},
  created() {
    this.isLogin = this.$route.path == "/login";
  },
};
</script>

<style scoped>
.form3 {
  position: absolute;
  left: 30px;
  bottom: 2%;
  height: 50px;
  width: 100%;
  padding: 10px;
}

.form3 a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
}

.link {
  display: inline-block;
  padding: 0 10px;
}

.link:first-child {
  border-right: 2px solid #999;
}

img.logo {
  position: fixed;
  left: 50px;
  top: 50px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
}

.motto {
  font-family: "黑体";
  font-size: 70px;
  color: white;
}

.back2 {
  color: white;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  z-index: -1;
}

.back1 {
  position: fixed;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 450px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  padding: 30px 50px;
  z-index: 99;
}

.back {
  position: fixed;
  z-index: -99;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../assets/cover.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.link:hover {
  color: white;
}
</style>
