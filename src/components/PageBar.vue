<template>
  <ul class="pages">
    <li v-show="currentPage > 1" @click="change(currentPage - 1)">
      <i class="fas fa-chevron-left"></i> 上一页
    </li>
    <li v-for="i in totalPage" :key="i" :class="{active: i == currentPage}" @click="change(i)">{{i}}</li>
    <li v-show="currentPage < totalPage" @click="change(currentPage + 1)">
      下一页
      <i class="fas fa-chevron-right"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PageBar",
  props: {
    currentPage: {
      //当前页
      type: Number,
      default: 1,
    },
    totalPage: {
      //总条数
      type: Number,
      default: 0,
      required: true,
    },
  },
  data: function () {
    return {};
  },
  methods: {
    change(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style scoped>
.pages {
  margin: 0;
  padding: 0;
  list-style: none;
  user-select: none;
}

.pages > li {
  font-size: 16px;
  padding: 7px 12px;
  text-align: center;
  color: #333;
  background: #fff;
  display: inline-block;
}

.pages > li:hover {
  color: #3c83e7;
}

.pages > li.active {
  background: #3c83e7;
  color: #fff;
}
</style>
