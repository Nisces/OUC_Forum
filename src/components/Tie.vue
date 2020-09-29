<template>
  <div class="wrapper" v-loading.fullscreen.lock="loading">
    <!-- 头部条 -->
    <div class="footer">
      <router-link class="back" :to="{path: '/module/' + tie.mid}">
        <i class="fas fa-angle-double-left"></i> 返回分区
      </router-link>
      <el-pagination
        layout="prev, pager, next"
        :page-count="page"
        @current-change="changePage"
        background
      ></el-pagination>
    </div>
    <!-- 帖子标题头 -->
    <div class="header">
      <div class="title">
        <h1>{{tie.title}}</h1>
        <div class="tags">
          <i class="fas fa-tag" v-for="(tag, index) in tags" :key="index">&nbsp;{{tag}}</i>
        </div>
      </div>
      <div class="info">
        <em>{{tie.view}}</em>浏览 /
        <em>{{tie.replyNum}}</em>回复
      </div>
    </div>
    <!-- 各楼层回帖 -->
    <div class="replys-wrapper">
      <TItem
        v-for="(item,index) in replys"
        :key="item.id"
        :reply="item"
        :tie="tie"
        :floor="perPage*(currentPage-1)+index+1"
      ></TItem>
    </div>
    <!-- 底部分页区 -->
    <div class="footer">
      <router-link class="back" :to="{path: '/module/' + tie.mid}">
        <i class="fas fa-angle-double-left"></i> 返回分区
      </router-link>
      <el-pagination
        layout="prev, pager, next"
        :page-count="page"
        @current-change="changePage"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import TItem from "@/components/TItem";

export default {
  name: "Tie",
  components: {
    TItem,
  },
  props: {
    tie: {
      required: true,
    },
  },
  data() {
    return {
      replys: [],
      currentPage: 1,
      perPage: 20,
      loading: false,
    };
  },
  methods: {
    changePage: function (page) {
      this.currentPage = page;
      this.getReplys(this.currentPage);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    getReplys(page) {
      this.loading = true;
      this.axios
        .get(`/reply/tie/${this.tie.id}/${page}`)
        .then((res) => {
          this.replys = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    page() {
      return Math.ceil(this.tie.replyNum / this.perPage);
    },
    tags() {
      return this.tie.tags.split("#");
    },
  },
  created() {
    this.getReplys(1);
  },
};
</script>

<style scoped>
.header {
  padding: 16px 15px;
  border: 1px solid #e6e6e6;
  border-top: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header .title > h1 {
  display: inline-block;
  margin: 0;
  margin-right: 15px;
  font-size: 20px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}

.header .title .tags > i {
  color: #888;
  font-size: 12px;
  margin-right: 10px;
  display: inline-block;
}

.header .info {
  display: inline-block;
  font-size: 12px;
  color: #aaa;
}

.header .info em {
  font-style: normal;
  color: #3c83e7;
}

.replys-wrapper {
  min-height: 1000px;
  border: 1px solid #e6e6e6;
  border-top: none;
}

.footer {
  padding: 20px;
  background: #f7f8fa;
  border: 1px solid #e6e6e6;
  border-top: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.footer > a.back {
  text-decoration: none;
  color: #2d64b3;
}

.footer > a.back:hover {
  color: #3c83e7;
}
</style>
