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
      .get(`/favorite/${this.localUser().id}`)
      .then((res) => {
        this.loading = false;
        var list = [];
        for (var i = 0; i < res.data.length; i++) {
          this.axios
            .get(`/tie/${res.data[i].tid}`)
            .then((res) => {
              list.push(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        this.list = list;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style>
</style>
