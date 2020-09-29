<template>
  <div class="page" v-loading.fullscreen.lock="loading">
    <SectionHeader :simple="true" v-if="minfo" :minfo="minfo"></SectionHeader>
    <Tie :tie="tie" v-if="tie"></Tie>
    <div class="editor-wrapper">
      <div class="header">
        <span>
          <i class="fas fa-pen"></i> 发表回复
        </span>
      </div>
      <WangEditor ref="editor"></WangEditor>
      <button class="btn btn-primary" @click="postReply">发表</button>
    </div>
    <el-dialog title="登录" :visible.sync="loginDialog" width="30%">
      <LoginForm :popup="true" @pass="loginDialog = false"></LoginForm>
    </el-dialog>
    <el-backtop :bottom="120" :right="80" :visibility-height="150"></el-backtop>
  </div>
</template>

<script>
import Tie from "@/components/Tie.vue";
import WangEditor from "@/components/WangEditor.vue";
import SectionHeader from "@/components/SectionHeader";
import LoginForm from "@/components/LoginForm";

export default {
  name: "TieReader",
  components: {
    SectionHeader,
    Tie,
    WangEditor,
    LoginForm,
  },
  data() {
    return {
      tid: 0,
      tie: null,
      minfo: null,
      loginDialog: false,
      loading: false,
    };
  },
  computed: {
    editorData() {
      return this.$refs.editor.data;
    },
  },
  methods: {
    clear() {
      this.$refs.editor.clear();
    },
    reloadTie() {
      var temp = this.tie;
      this.tie = null;
      this.$nextTick(() => {
        this.tie = temp;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    postReply() {
      var content = this.editorData;
      var tid = parseInt(this.tid);
      if (!content) {
        this.$notify({
          title: "请填写帖子内容",
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      if (!user) {
        this.loginDialog = true;
        return;
      }

      this.loading = true;
      this.axios
        .post("/reply/create", {
          content: content,
          tid: tid,
          uid: user.id,
        })
        .then((res) => {
          this.loading = false;
          this.clear();
          this.reloadTie();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.tid = this.$route.params.tid;
    this.loading = true;
    this.axios
      .get(`/tie/${this.tid}`)
      .then((res) => {
        this.tie = res.data;
        this.axios
          .get(`/module/${this.tie.mid}`)
          .then((res) => {
            this.minfo = res.data;
            this.loading = false;
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
};
</script>

<style scoped>
.page {
  width: 60%;
  margin: 0 auto;
}

.editor-wrapper {
  padding: 20px;
  margin-bottom: 50px;
  border: 1px solid #e6e6e6;
  border-top: none;
  background: #f6f6f6;
}

.editor-wrapper .header {
  padding: 20px 2px;
  font-weight: bold;
}

.editor-wrapper > .header > span > i {
  color: white;
  padding: 6px;
  background: #3c83e7;
  border-radius: 3px;
}

.btn.btn-primary {
  margin-top: 15px;
}
</style>
