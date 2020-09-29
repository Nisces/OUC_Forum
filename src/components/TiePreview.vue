<template>
  <div class="wrapper">
    <div class="reply-count">
      <span>{{tie.replyNum}}</span>
      <i class="fas fa-comment-alt"></i>
    </div>
    <div class="main">
      <div class="user-info" v-if="user">
        <div class="profile" :style="{backgroundImage : `url(${user.avatar})`}"></div>
        <span class="name">{{user.username}}</span>
      </div>
      <div class="header">
        <router-link
          :to="{path:`/module/${tie.mid}`}"
          class="section"
          v-if="showSection && minfo"
        >{{minfo.name}}</router-link>
        <router-link :to="{path:`/tie/${tie.id}`}" class="title" tag="a">
          <i class="far fa-file-alt"></i>
          {{tie.title}}
        </router-link>
      </div>
      <div class="content">
        <div class="text">{{text}}</div>
        <ul class="imgs">
          <li class="img-wrapper" v-for="(item, index) in images" :key="index">
            <div class="img" :style="{ backgroundImage : `url(${item})`}"></div>
          </li>
        </ul>
      </div>
      <div class="footer">
        <span class="time">{{tie.postTime}}</span>
        <span class="like" @click="zan">
          <i class="far fa-thumbs-up"></i>
          点赞 ({{like}})
        </span>
        <span class="reply">
          <i class="far fa-eye"></i>
          浏览 ({{tie.view}})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TiePreview",
  props: {
    showSection: {
      type: Boolean,
      default: true,
    },
    tie: {
      required: true,
    },
  },
  data: function () {
    return {
      user: null,
      like: 0,
      minfo: null,
    };
  },
  methods: {
    zan() {
      this.like++;
    },
  },
  components: {},
  computed: {
    text() {
      var reg = /<[^>]+>/gim;
      return this.tie.content.replace(reg, "");
    },
    images() {
      var str = this.tie.content;
      //匹配图片（g表示匹配所有结果i表示区分大小写）
      var imgReg = /<img.*?(?:>|\/>)/gi;
      //匹配src属性
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = str.match(imgReg);
      var result = [];
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          var src = arr[i].match(srcReg);
          result.push(src[1]);
        }
      }
      return result;
    },
  },
  created() {
    this.like = parseInt(Math.random() * 100);
    this.axios
      .get(`/user/${this.tie.uid}`)
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {});
    this.axios
      .get(`/module/${this.tie.mid}`)
      .then((res) => {
        this.minfo = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  padding: 20px;
  border-bottom: 1px dotted #ddd;
  z-index: 1;
}

.wrapper:hover {
  background: #f7f9fc;
}

.reply-count {
  float: left;
  position: relative;
}

.reply-count > i {
  color: #f7f7f7;
  font-size: 50px;
  text-shadow: #bbb 1px 0 0, #bbb 0 1px 0, #bbb -1px 0 0, #bbb 0 -1px 0;
}

.reply-count > span {
  position: absolute;
  text-align: center;
  width: 20px;
  left: 14px;
  top: 13px;
}

.main {
  margin-left: 70px;
}

.user-info {
  position: absolute;
  right: 25px;
  top: 15px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

.user-info .profile {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  /* background-image: url("../assets/cat.jpg"); */
  display: inline-block;
  margin-right: 10px;
}

.user-info .name {
  color: #666666;
  display: inline-block;
}

.header {
  min-height: 45px;
}

.header > a {
  color: #005097;
  font-size: 18px;
  display: block;
  text-decoration: none;
  margin-bottom: 5px;
}

.header > a.section {
  color: #2c3e50;
}

.header > a:hover {
  text-decoration: underline;
}

.content .text {
  line-height: 20px;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  max-height: 82px;
  overflow: hidden;
}

.imgs {
  margin: 0;
  padding: 0;
  list-style: none;
}

.img-wrapper {
  width: 33.33%;
  height: 0;
  padding-top: 23.33%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.img-wrapper .img {
  position: absolute;
  top: 10px;
  bottom: 10px;
  background-image: url("../assets/cat.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
}

.img-wrapper:nth-child(3n + 1) .img {
  left: 0;
  right: 10px;
}

.img-wrapper:nth-child(3n + 2) .img {
  left: 5px;
  right: 5px;
}

.img-wrapper:nth-child(3n + 0) .img {
  left: 10px;
  right: 0;
}

.footer {
  text-align: right;
}

.footer span {
  color: #666;
  display: inline-block;
  margin-left: 15px;
  user-select: none;
}
</style>
