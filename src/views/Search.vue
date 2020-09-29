<template>
  <div class="search-container" v-loading.fullscreen.lock="loading">
    <div class="searchbar-wrapper">
      <SearchBar :round="true" :fill="keyword" v-if="keyword"></SearchBar>
    </div>
    <div class="container clear-f">
      <div class="tie-wrapper">
        <TieList :list="ties" :minfo="{tieNum:ties.length}" :page="false" v-if="ties"></TieList>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import TieList from "@/components/TieList.vue";
import ModuleList from "@/components/ModuleList.vue";

export default {
  name: "Search",
  components: {
    SearchBar,
    TieList,
    ModuleList,
  },
  data() {
    return {
      loading: false,
      ties: null,
      keyword: "",
    };
  },
  created() {
    this.keyword = this.$route.query.kw;
    this.loading = true;
    this.axios
      .get(`/tie/search/${this.keyword}`)
      .then((res) => {
        this.ties = res.data;
        this.loading = false;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.search-container {
  padding-left: 5%;
}

.searchbar-wrapper {
  width: 60%;
  padding-right: 50px;
}

.tie-wrapper {
  width: 70%;
  margin-top: 25px;
  padding-top: 20px;
  padding-right: 80px;
  border-right: 1px solid #e6e6e6;
  min-height: 800px;
}

.module-wrapper {
  width: 30%;
}

.item:last-child {
  border-bottom: none;
}

.footer {
  padding: 20px;
  padding-bottom: 0;
}

.footer .info {
  margin-top: 20px;
  padding-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.footer .info em {
  color: red;
  font-style: normal;
}
</style>
