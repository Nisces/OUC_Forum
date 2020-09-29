<template>
  <div class="nav-bar">
    <div class="container">
      <router-link class="nav-brand" to="/">海大论坛</router-link>
      <div class="nav-right">
        <ul class="navs clear-f">
          <li v-if="!localUser()">
            <router-link to="/login">登录</router-link>
          </li>
          <li v-if="!localUser()">
            <router-link to="/register">注册</router-link>
          </li>
          <li class="info-container" v-else>
            <el-dropdown @command="menuClicked">
              <div class="drop">
                <span>欢迎</span>
                <div class="profile" :style="{backgroundImage:`url(${localUser().avatar})`}"></div>
                <span class="name">{{localUser().username}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                <el-dropdown-item command="quit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "../assets/avatar.jpg";
export default {
  name: "Nav",
  methods: {
    menuClicked(cmd) {
      if (cmd === "person") {
        this.$router.push("/person/avatar");
      } else {
        sessionStorage.removeItem("user");
        window.location.reload();
      }
    },
    localUser() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      return user;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: STHUPO;
  src: url("../assets/STHUPO.TTF");
}

.nav-bar {
  height: 60px;
  margin-bottom: 30px;
  font-size: 16px;
  color: #fff;
  background: #3c83e7;
}

.nav-bar .container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-bar .nav-brand {
  color: #fff;
  font-size: 26px;
  font-family: STHUPO;
  cursor: pointer;
  text-decoration: none;
}

.navs {
  padding: 0;
  margin: 0;
  list-style: none;
}

.navs > li {
  float: left;
  margin-left: 15px;
}

.navs > li > a {
  text-decoration: none;
  color: #fff;
}

.navs > li.info-container .drop {
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.navs > li.info-container .profile {
  margin: 0 10px;
  display: inline-block;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-image: url("../assets/cat.jpg");
}
</style>
