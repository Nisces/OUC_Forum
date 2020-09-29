<template>
  <div class="container" :class="{simple : simple}">
    <div class="head-top" :style="{backgroundImage:`url(${minfo.cover})`}"></div>
    <div class="head-bottom">
      <div class="photo" :style="{backgroundImage:`url(${minfo.cover})`}"></div>
      <div class="title">
        <div class="name">
          {{minfo.name}}
          <span class="tieNum">
            帖子数:
            <em>{{minfo.tieNum}}</em>
          </span>
        </div>
        <div class="info">{{minfo.info}}</div>
      </div>
      <div class="btn-wrapper" style="display:none">
        <button class="btn btn-primary">发帖</button>
      </div>
    </div>
    <div class="tail">
      <div class="active">看帖</div>
      <div>精华</div>
      <div>公告</div>
      <SearchBar class="searchbar"></SearchBar>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Header",
  components: {
    SearchBar,
  },
  props: {
    simple: {
      //当前页
      type: Boolean,
      default: false,
    },
    minfo: {
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #e6e6e6;
}

.head-top {
  height: 180px;
  background: url(../assets/cover.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  background-size: cover;
}

.head-bottom {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 20px;
  background-color: #f7f8fa;
  border-bottom: 1px solid #e6e6e6;
}

.head-bottom .photo {
  width: 150px;
  height: 150px;
  padding: 5px;
  position: relative;
  top: -75px;
  margin-bottom: -75px;
  background: url(../assets/cat.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  background-size: cover;
  background-color: #fff;
  border: 1px solid #e6e6e6;
}

.head-bottom .title {
  flex: 1;
  margin-left: 20px;
  padding: 15px;
}

.head-bottom .title .name {
  font-size: 25px;
  margin-bottom: 10px;
}

.head-bottom .title .tieNum {
  font-size: 16px;
}

.head-bottom .title .tieNum em {
  color: red;
  font-style: normal;
}

.head-bottom .btn-wrapper {
  flex-basis: 20%;
  padding: 20px;
  text-align: center;
}

.head-bottom .btn-wrapper .btn {
  margin-top: 15px;
}

.tail {
  background: #f7f8fa;
}

.tail > div {
  font-size: 20px;
  padding: 15px 20px;
  display: inline-block;
}

.tail > div.active {
  background: #eaeaea;
}

.tail > div:hover {
  background: #eaeaea;
}

.tail > .searchbar {
  padding: 0;
  transform: scale(0.6);
  float: right;
}

.container.simple .head-top {
  display: none;
}

.container.simple .head-bottom {
  align-items: center;
  padding: 10px 20px;
}

.container.simple .head-bottom .photo {
  margin: 0;
  width: 75px;
  height: 75px;
  position: static;
}

.container.simple .head-bottom .title {
  margin: 0;
}

.container.simple .head-bottom .title .name,
.container.simple .head-bottom .title .info {
  margin: 0;
  margin-left: 15px;
  display: inline-block;
}

.container.simple .head-bottom .btn-wrapper .btn {
  display: none;
}
</style>
