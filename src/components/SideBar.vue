<template>
  <div class="wrapper">
    <div class="user-info">
      <div class="info-wrapper">
        <div
          class="profile"
          v-if="localUser()"
          :style="{backgroundImage: `url(${localUser().avatar})`}"
        ></div>
        <div v-else class="profile"></div>
        <span class="username">
          <router-link to="/person/avatar">{{localUser() ? localUser().username : "游客"}}</router-link>
        </span>
      </div>
      <div class="assign" v-if="localUser()">
        <span class="title">个人签名</span>
        <p>{{localUser().motto}}</p>
      </div>
    </div>
    <ul class="nav">
      <li>
        <router-link to="/person/avatar">个人中心</router-link>
      </li>
      <li>
        <router-link to="/person/info">消息提醒(10)</router-link>
      </li>
      <li>
        <router-link to="/person/ties">我的发帖</router-link>
      </li>
      <li>
        <router-link to="/person/favorite">我的收藏</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    localUser() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      return user;
    },
  },
};
</script>

<style scoped>
.wrapper {
  font-size: 18px;
  padding: 80px 30px;
  color: #fff;
  background: #2d64b3;
}

.user-info .info-wrapper {
  display: flex;
  align-items: center;
}

.user-info .profile {
  height: 100px;
  width: 100px;
  background-image: url("../assets/avatar.jpg");
  border-radius: 50px;
  background-size: cover;
  display: inline-block;
}

.user-info .username {
  display: inline-block;
  width: calc(100% - 120px);
  word-wrap: break-word;
  margin-left: 20px;
  font-size: 24px;
}

.user-info .username > a {
  color: #fff;
  text-decoration: none;
}

.user-info .assign {
  margin-top: 20px;
}

.user-info .assign > p {
  padding-left: 20px;
  font-size: 14px;
  line-height: 20px;
}

ul.nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav > li {
  display: block;
  margin-top: 28px;
}

.nav > li > a {
  color: #fff;
  text-decoration: none;
}

.nav > li > a:hover {
  color: #b3ffad;
}
</style>
