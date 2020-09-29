<template>
  <div class="clear-f personcenter">
    <div class="side-nav float-l">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/person/avatar">修改头像</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/person/info">个人资料</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/person/password">修改密码</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/person/ties">我的帖子</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/person/favorite">我的收藏</router-link>
        </li>
      </ul>
    </div>
    <div class="router-view float-r">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonCenter",
};
</script>

<style scoped>
.personcenter {
  width: 80%;
  margin: 0 auto;
}

.side-nav {
  width: 15%;
}

.side-nav .nav-list {
  padding: 0;
  margin: 0;
  list-style: none;
  border-left: 5px solid #7ab2ff;
  background: #3c83e7;
  min-height: 600px;
}

.nav-list .nav-item > a {
  display: block;
  color: #fff;
  padding: 15px 15px;
}

.nav-list .nav-item > a:hover,
.nav-list .nav-item > a.router-link-exact-active {
  background: #7ab2ff;
}

.router-view {
  width: 85%;
  padding-left: 25px;
  min-height: 600px;
}
</style>
