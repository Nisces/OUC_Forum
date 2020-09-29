<template>
  <div class="wrapper" v-loading.fullscreen.lock="loading">
    <SectionHeader :minfo="minfo" v-if="minfo"></SectionHeader>
    <TieList class="list" :minfo="minfo" v-if="minfo" :section="true"></TieList>
    <div class="editor-wrapper">
      <div class="header">
        <div class="info">
          <i class="fas fa-pen-nib"></i> 发表新帖
        </div>
        <div class="input">
          <input type="text" class="title" placeholder="请填写标题" v-model="postTitle" />
        </div>
        <div class="tags">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            effect="plain"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button class="button-new-tag" v-else size="small" @click="showInput">
            <i class="el-icon-plus"></i> 新标签
          </el-button>
        </div>
      </div>
      <WangEditor ref="editor"></WangEditor>
      <button class="btn btn-primary" @click="postTie">发表</button>
    </div>
    <el-dialog title="登录" :visible.sync="loginDialog" width="30%">
      <LoginForm :popup="true" @pass="loginDialog = false"></LoginForm>
    </el-dialog>
    <el-backtop :bottom="120" :right="80" :visibility-height="150"></el-backtop>
  </div>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import TieList from "@/components/TieList.vue";
import WangEditor from "@/components/WangEditor.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Section",
  components: {
    SectionHeader,
    TieList,
    WangEditor,
    LoginForm,
  },
  data() {
    return {
      mid: 1,
      minfo: null,
      postTitle: "",
      loading: false,
      loginDialog: false,
      dynamicTags: [],
      inputValue: "",
      inputVisible: false,
    };
  },
  computed: {
    editorData() {
      return this.$refs.editor.data;
    },
  },
  methods: {
    clear() {
      this.postTitle = "";
      this.$refs.editor.clear();
      this.dynamicTags = [];
    },
    reloadList() {
      var temp = this.minfo;
      this.minfo = null;
      this.$nextTick(() => {
        this.minfo = temp;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    showInput() {
      if (this.dynamicTags.length >= 3) {
        this.$message({
          message: "最多添加三个标签",
          type: "info",
        });
        return;
      }
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    postTie() {
      var title = this.postTitle;
      var content = this.editorData;
      if (!title || !content) {
        this.$notify({
          title: "请填写内容标题",
          message: "标题或内容不能为空",
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
        .post("/tie", {
          title: title,
          content: content,
          mid: this.mid,
          tags: this.dynamicTags.join("#"),
          uid: user.id,
        })
        .then((res) => {
          this.$message({
            message: "发表成功",
            type: "success",
          });
          this.loading = false;
          this.clear();
          this.reloadList();
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            message: "发表失败",
            type: "error",
          });
          this.loading = false;
          this.clear();
        });
    },
  },
  created() {
    this.mid = this.$route.params.mid;
    this.loading = true;
    this.axios
      .get(`/module/${this.mid}`)
      .then((res) => {
        this.minfo = res.data;
        this.loading = false;
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
.wrapper {
  width: 60%;
  margin: 0 auto;
}

.list {
  border: 1px solid #e6e6e6;
  border-top: none;
}

.editor-wrapper {
  padding: 20px;
  margin-bottom: 50px;
  border: 1px solid #e6e6e6;
  border-top: none;
  background: #f6f6f6;
}

.editor-wrapper .header {
  padding: 0 0 15px;
  font-weight: bold;
}

.editor-wrapper .input {
  margin-top: 15px;
}

.editor-wrapper .input input.title {
  width: 100%;
  padding: 10px;
  line-height: 20px;
  outline: none;
  border: 1px solid #e6e6e6;
  transition: all 0.2s;
}

.editor-wrapper .input input.title:focus {
  border: 1px solid #3c83e7;
}

.editor-wrapper .tags {
  margin-top: 10px;
}

.el-tag + .el-tag,
.el-tag + .button-new-tag,
.el-tag + .input-new-tag {
  margin-left: 10px;
}

.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}

.editor-wrapper > .header > div > i {
  color: white;
  padding: 6px;
  background: #3c83e7;
  border-radius: 3px;
}

.btn.btn-primary {
  margin-top: 15px;
}
</style>
