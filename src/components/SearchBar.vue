<template>
  <div class="searchbar" :class="{round: round}" @keyup.enter="search">
    <input type="text" class="input" placeholder="你感兴趣的都在海大" v-model.trim="keyword" />
    <button class="button btn btn-primary" @click="search">搜索</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    round: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    search() {
      if (!this.keyword) {
        this.$message({
          message: "搜索关键词不能为空",
          type: "error",
        });
        return;
      }
      this.$router.push({
        path: "/search",
        query: {
          kw: this.keyword,
        },
      });
    },
  },
  created() {
    this.keyword = this.fill;
  },
};
</script>

<style scoped>
.searchbar .input {
  width: 75%;
  padding: 15px 25px;
  border: 1px solid #a9a9a9;
  border-right: none;
  outline: none;
}

.input:focus,
.input:focus + .button {
  border-color: #3c83e7;
}

.searchbar .input::placeholder {
  color: #aaa;
}

.searchbar .button {
  width: 25%;
  padding: 15px 0;
  border: 1px solid #c9c9c9;
  border-right: none;
}

.searchbar.round .input {
  border-radius: 25px 0 0 25px;
}

.searchbar.round .button {
  border-radius: 0 25px 25px 0;
}
</style>
