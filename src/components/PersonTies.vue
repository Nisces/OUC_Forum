<template>
  <div v-loading.fullscreen.lock="loading">
    <TieList
      :footer="true"
      :page="false"
      :section="true"
      :list="list"
      :minfo="{tieNum:list.length}"
      v-if="list"
    ></TieList>
  </div>
</template>

<script>
import TieList from "@/components/TieList.vue";

export default {
  name: "PersonFavorite",
  components: {
    TieList,
  },
  data() {
    return {
      list: null,
      loading: false,
    };
  },
  methods: {
    localUser() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      return user;
    },
  },
  created() {
    this.loading = true;
    this.axios
      .get(`/tie/search/user/${this.localUser().id}`)
      .then((res) => {
        this.loading = false;
        this.list = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style>
</style>
