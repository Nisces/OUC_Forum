<template>
  <div class="container" v-loading.fullscreen.lock="loading">
    <div>
      <TiePreview
        class="item"
        v-for="item in ties"
        :key="item.id"
        :showSection="!section"
        :tie="item"
      ></TiePreview>
    </div>
    <div class="footer" v-if="footer">
      <el-pagination
        v-if="page"
        layout="prev, pager, next"
        :page-count="totalPage"
        background
        @current-change="changePage"
      ></el-pagination>
      <div class="info">
        共有帖子
        <em>{{minfo.tieNum}}</em> 个
      </div>
    </div>
  </div>
</template>

<script>
import TiePreview from "@/components/TiePreview.vue";

export default {
  name: "TieList",
  components: {
    TiePreview,
  },
  props: {
    section: {
      type: Boolean,
      default: false,
    },
    minfo: {},
    list: {
      type: Array,
    },
    page: {
      default: true,
    },
    footer: {
      default: true,
    },
  },
  data() {
    return {
      ties: [],
      currentPage: 1,
      loading: false,
    };
  },
  methods: {
    getTies(page) {
      this.loading = true;
      this.axios
        .get(`/module/tie/${this.minfo.id}/${page}`)
        .then((res) => {
          this.ties = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.getTies(this.currentPage);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.minfo.tieNum / 6);
    },
  },
  created() {
    if (!this.list) {
      this.getTies(1);
    } else {
      this.ties = this.list;
    }
  },
};
</script>

<style scoped>
.item:last-child {
  border-bottom: none;
}

.footer {
  padding: 20px;
  padding-bottom: 0;
  border-top: 1px solid #e6e6e6;
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
