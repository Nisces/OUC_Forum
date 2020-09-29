<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "WangEditor",
  data: function () {
    return {
      editor: null,
      data: "",
    };
  },
  methods: {
    initEditor() {
      this.editor = new E("#editor");
      this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.onchange = (html) => {
        this.data = html;
      };
      this.editor.create();
    },
    clear() {
      this.editor.txt.clear();
    },
  },
  mounted: function () {
    this.initEditor();
  },
};
</script>

<style scoped>
#editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: #fff;
  z-index: 0;
}
</style>
