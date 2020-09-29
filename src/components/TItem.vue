<template>
  <div class="item">
    <!-- 侧边栏 -->
    <div class="side">
      <div class="lzbs" v-if="tie.uid === reply.uid"></div>
      <div class="user" v-if="user">
        <span class="name">{{user.username}}</span>
        <div class="profile" :style="{backgroundImage: 'url(' + user.avatar + ')'}"></div>
        <div class="level">
          <span>等级:</span>
          <span class="value">lv.{{user.level}}</span>
        </div>
      </div>
    </div>
    <!-- 右侧主要区域 -->
    <div class="main">
      <div class="header clear-f">
        <span class="time float-l">{{reply.postTime}}</span>
        <span class="floor float-r">{{floor}}楼</span>
      </div>
      <!-- 帖子内容区 -->
      <div class="content" v-html="reply.content"></div>
      <!-- 点赞收藏 -->
      <div class="like" v-if="floor == 1">
        <el-badge :value="zan" :max="99">
          <button class="zan" @click="zan += 1">
            点赞
            <i class="far fa-thumbs-up"></i>
          </button>
        </el-badge>
        <button class="cang" @click="collect">
          收藏
          <i class="far fa-star"></i>
        </button>
      </div>
      <!-- 内容区底部 -->
      <div class="footer">
        <a
          class="tail-info"
          @click="delTie"
          v-if="floor == 1 && localUser() && localUser().id == this.reply.uid"
        >删除</a>
        <el-popconfirm
          title="确认删除该回复吗？"
          v-else-if="floor != 1 && localUser() && localUser().id == this.reply.uid"
          @onConfirm="delReply"
          icon="el-icon-info"
          iconColor="red"
        >
          <a class="tail-info" slot="reference">删除</a>
        </el-popconfirm>
        <a
          class="tail-info reply"
          :class="{shadow: !fold}"
          @click="togglefold"
          v-if="floor != 1"
        >{{fold ? msg[0] : msg[1]}}</a>
        <!-- 回复区 -->
        <el-collapse-transition>
          <div class="reply-wrapper" v-show="!fold">
            <ul class="replys">
              <li class="reply" v-for="(item, index) in comments" :key="index">
                <div class="profile" :style="{backgroundImage: `url(${item.avatar})`}"></div>
                <div class="right-wrapper">
                  <p class="comment">
                    <span class="name">{{item.username}}</span>
                    {{item.content}}
                  </p>
                  <div class="footer">
                    <span
                      class="tail-info"
                      @click="delComment(item.id)"
                      v-if="localUser() && localUser().id == item.uid"
                    >删除</span>
                    <span class="tail-info">{{item.postTime}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="input-wrapper" v-if="true">
              <input type="text" v-model.trim.lazy="comment" />
              <button @click="postComment">回复</button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Louceng",
  props: {
    tie: {
      required: true,
    },
    reply: {
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      fold: true, //回复是否被折叠
      msg: ["回复", "收起回复"],
      comments: null,
      zan: 0,
      user: null,
      comment: "",
    };
  },
  methods: {
    togglefold() {
      this.fold = !this.fold;
    },
    collect() {
      //收藏帖子
      if (!this.localUser) {
        this.$message({
          message: "请先登录才能收藏帖子",
          type: "info",
        });
        return;
      }
      this.axios
        .post(`/favorite/${this.localUser().id}/${this.tie.id}`)
        .then((res) => {
          this.$message({
            message: "收藏成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    delTie() {
      //如果是一楼，则删除主贴
      this.$confirm("此操作将删除整个帖子, 是否继续?", "确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.axios
            .delete(`/tie/${this.tie.id}`)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$router.replace("/module/" + this.tie.mid);
            })
            .catch((err) => {
              console.error(err);
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delReply() {
      this.axios
        .delete(`/reply/${this.reply.id}`)
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$router.go(0);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "删除失败!",
          });
        });
    },
    postComment() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      if (!user) {
        this.$message({
          type: "info",
          message: "您还没有登录，请先登录再发表评论",
        });
        return;
      }
      this.axios
        .post("/comment/", {
          rid: this.reply.id,
          content: this.comment,
          uid: user.id,
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "回复成功!",
          });
          this.comment = "";
          this.getComments();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "回复失败!",
          });
          console.error(err);
        });
    },
    delComment(cid) {
      this.axios
        .delete(`/comment/${cid}`)
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除评论成功!",
          });
          this.getComments();
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "删除失败!",
          });
        });
    },
    getComments() {
      var rid = this.reply.id;
      this.axios
        .get(`/comment/${rid}`)
        .then((res) => {
          this.comments = res.data;
          this.msg[0] =
            this.comments.length == 0
              ? "回复"
              : `展开回复(${this.comments.length})`;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    localUser() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      return user;
    },
  },
  created() {
    this.zan = Math.ceil(Math.random() * 100);
    if (this.floor != 1) {
      this.getComments();
    }
    var uid = this.reply.uid;
    this.axios
      .get(`/user/${uid}`)
      .then((res) => {
        this.user = res.data;
        this.user.level = Math.ceil(Math.random() * 10);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-top: none;
  border-bottom: 1px solid #e6e6e6;
  border-top: none;
}

.side {
  flex-basis: 20%;
  padding: 10px 15px;
  background: #f2f9ff;
  position: relative;
}

.side .lzbs {
  position: absolute;
  width: 41px;
  height: 36px;
  top: 1px;
  right: 1px;
  background: url("../assets/louzhu.png") no-repeat 0 0;
  z-index: 1;
}

.side .name {
  font-size: 13px;
  display: block;
  margin-bottom: 10px;
  color: #000;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.side .profile {
  height: 100px;
  width: 100px;
  margin: 0 auto;
  border: 5px solid #fff;
  box-shadow: 1px 0px 5px #999;
}

.side .level {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  background: #fff;
  display: inline-block;
  padding: 5px 15px;
  border: 1px solid #eee;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.side .level > span:first-child {
  color: #888;
}

.side .level > span.value {
  display: inline-block;
  color: #fff;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  padding: 0 10px;
  margin-left: 10px;
  background: #3c83e7;
  border-radius: 99px;
}

.main {
  flex-basis: 80%;
}

.main .header,
.main .content,
.main .like,
.main .footer {
  padding: 10px 20px;
}

.main > .header {
  font-size: 14px;
  border-bottom: 1px solid #f2f6f7;
}

.main > .header > .time {
  float: left;
}

.main > .header > .floor {
  color: #666;
}

.main > .content {
  color: #333;
  min-height: 170px;
  font-size: 16px;
}

.main > .content > p {
  margin-top: 0;
}

.main .like {
  text-align: center;
}

.main .like button {
  background: #ffffff;
  padding: 8px 15px;
  border: 1px solid #e1e4e6;
  border-radius: 5px;
  color: #333;
  outline: none;
}

.main .like button.cang {
  margin-left: 25px;
  background: #3c83e7;
  color: #fff;
}

.main .like .zan:hover {
  background: #efefef;
}

.main .like .cang:hover {
  background: #419aff;
}

.main .footer {
  text-align: right;
  padding-right: 13px;
  border-top: 1px solid #f2f6f7;
}

.footer .tail-info {
  display: inline-block;
  font-size: 14px;
  line-height: 26px;
  color: #999;
  padding: 0 5px;
  text-decoration: none;
  cursor: pointer;
}

.footer .tail-info.reply {
  color: #2d64b3;
  cursor: pointer;
  user-select: none;
}

.footer .tail-info.reply.shadow {
  background: #f7f8fa;
  border: 1px solid #eee;
  position: relative;
}

.footer .tail-info.reply.shadow::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #f7f8fa;
  position: absolute;
  left: 0;
  bottom: -2px;
}

.reply-wrapper {
  background: #f7f8fa;
  padding: 20px;
  overflow: hidden;
  text-align: left;
  border: 1px solid #eee;
}

.reply-wrapper .replys {
  list-style: none;
  padding: 0;
  margin: 0;
}

.replys .reply {
  margin: 0 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.replys .reply .profile {
  height: 32px;
  width: 32px;
  margin-right: 10px;
  background-image: url("../assets/cover.jpg");
  padding: 1px;
  border: 1px solid #ccc;
}

.replys .reply .right-wrapper {
  flex: 1;
}

.replys .reply .comment {
  margin: 0;
}

.replys .reply .comment .name {
  padding-right: 10px;
  color: #3c83e7;
}

.replys .reply .comment .name::after {
  content: ":";
}

.replys .reply .footer {
  padding: 0;
}

.reply-wrapper .input-wrapper {
  margin-top: 25px;
  padding-right: 20px;
  text-align: right;
}

.reply-wrapper .input-wrapper input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  outline: none;
  border: 2px solid #3c83e7;
  border-radius: 5px;
  margin-bottom: 8px;
}

.reply-wrapper .input-wrapper button {
  padding: 10px 20px;
  color: #ffffff;
  background: #3c83e7;
  border: none;
  border-radius: 5px;
  outline: none;
}

.reply-wrapper .input-wrapper button:hover {
  background: royalblue;
}
</style>>
