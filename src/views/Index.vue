<template>
  <div class="page clear-f" v-loading.fullscreen.lock="loading">
    <div class="left">
      <div class="logo">
        <img src="../assets/logo.png" width="100%" />
      </div>
      <SideBar></SideBar>
    </div>
    <div class="right">
      <div class="searchbar-wrapper">
        <SearchBar :round="true"></SearchBar>
      </div>
      <Announce class="alist"></Announce>
      <div class="ties clear-f">
        <div class="module">
          <ModuleList :direction="'row'"></ModuleList>
        </div>
        <div class="main">
          <div class="header">
            <h1 class="title">热门</h1>
          </div>
          <TieList v-if="ties" :list="ties" :footer="false"></TieList>
        </div>
      </div>
    </div>
    <el-backtop :bottom="120" :right="80" :visibility-height="150"></el-backtop>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import SearchBar from "@/components/SearchBar";
import Announce from "@/components/Announce";
import TieList from "@/components/TieList";
import ModuleList from "@/components/ModuleList";

export default {
  components: {
    SideBar,
    SearchBar,
    Announce,
    TieList,
    ModuleList,
  },
  data() {
    return {
      ties: null,
      loading: false,
    };
  },
  methods: {
    getHotTies() {
      this.loading = true;
      this.axios
        .get("/tie/search/hot/15")
        .then((res) => {
          this.ties = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getHotTies();
  },
};
</script>

<style scoped>
.page {
  width: 83.333%;
  margin: 0 auto 0 0;
}

.page .left {
  width: 20%;
  float: left;
}

.page .left .logo {
  width: 100%;
}

.page .left .logo > img {
  margin: 0;
  display: block;
}

.page .right {
  width: 80%;
  padding-left: 40px;
  float: right;
}

.page .right .searchbar-wrapper {
  width: 70%;
  margin: 0 auto;
  padding: 30px 0;
}

.page .right .announce-wrapper {
  width: 90%;
  margin: 0 auto;
}
.page .right .alist {
  margin-top: 50px;
  border: 1px solid #e6e6e6;
}

.page .right .ties {
  margin-top: 25px;
}

.page .right .ties .module {
  margin-bottom: 20px;
}

.page .right .ties .main {
  width: 100%;
  padding-left: 10px;
}

.page .right .ties .header .title {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #2a9b27;
}
</style>
