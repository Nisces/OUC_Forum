<template>
  <div class="announce">
    <div class="title">
      <i class="fas fa-clipboard-list"></i> 公告栏
    </div>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="{path:'/tie/' + item.id}" class="link">
          <span class="content">{{item.title}}</span>
          <span class="time">{{item.postTime}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Announce",
  data() {
    return {
      list: [],
    };
  },
  created() {
    var mid = 999;
    this.axios
      .get(`/module/tie/${mid}/${1}`)
      .then((res) => {
        this.list = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.announce {
  padding: 30px 30px;
  position: relative;
}

.announce .title {
  font-size: 25px;
  padding: 0 5px;
}

.announce .title > i {
  font-size: 45px;
}

.announce .title {
  position: absolute;
  top: -30px;
  left: 20px;
  background: #fff;
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.list > li {
  margin-bottom: 15px;
}

.list > li > .link {
  color: #2c3e50;
  text-decoration: none;
}

.list > li > .link:hover {
  text-decoration: underline;
  color: #2d64b3;
}

.list > li:last-child {
  margin-bottom: 0;
}

.list > li .content {
  color: inherit;
  width: 70%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: inherit;
}

.list > li .time {
  color: inherit;
  width: 30%;
  text-align: right;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
