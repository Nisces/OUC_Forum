<template>
  <div class="module-wrapper" :class="{'row clear-f':direction}">
    <h1 class="title">论坛分类</h1>
    <div class="block" style="background:#2a9b27">
      <router-link to="/module/1">
        <h2 class="title">贰区：新生攻略</h2>
        <p class="item">帮助你更快更好适应大学新生活</p>
      </router-link>
    </div>
    <div class="block" style="background:#509ce7">
      <router-link to="/module/2">
        <h2 class="title">叁区：百家社团</h2>
        <p class="item">欣赏各社团精彩的演出，发现你真正的兴趣并加入他们吧</p>
      </router-link>
    </div>
    <div class="block" style="background:#c21b12">
      <router-link to="/module/3">
        <h2 class="title">肆区：食堂风味</h2>
        <p class="item">吃一回海大食堂，品一世人间美味！还有神秘的六餐风味，等你发现</p>
      </router-link>
    </div>
    <div class="block" style="background:#e87a19">
      <router-link to="/module/4">
        <h2 class="title">伍区：生活服务</h2>
        <p class="item">了解海大生活攻略，电费网费、体育健身、快递服务、还有青岛周边，应有尽有</p>
      </router-link>
    </div>
    <div class="block" style="background:#e8b617">
      <router-link to="/module/5">
        <h2 class="title">陆区：选课指导</h2>
        <p class="item">选课一时爽，期末火葬场</p>
      </router-link>
    </div>
    <div class="block" style="background:#2a9b27">
      <router-link to="/module/6">
        <h2 class="title">柒区：教育教学</h2>
        <p class="item">最新的学术讲座和竞赛，最全的图书馆指南，最有趣的教学活动，还有各类的教学区服务，都在这里等你</p>
      </router-link>
    </div>
    <div class="block" style="background:#509ce7">
      <router-link to="/module/8">
        <h2 class="title">捌区：考研交流</h2>
        <p
          class="item"
        >I hope I can triumph all the hardships and obstacles tha blocking my way. 决胜考研，舍我其谁！</p>
      </router-link>
    </div>
    <div class="block" style="background:#c21b12">
      <router-link to="/module/9">
        <h2 class="title">二区：社会实践</h2>
        <p class="item">志愿服务、爱心献血、暑期三下乡等等等等，海大的特色社会实践，都在这里</p>
      </router-link>
    </div>
    <div class="block" style="background:#e87a19">
      <router-link to="/module/7">
        <h2 class="title">三区：专业交流</h2>
        <p class="item">同学，转专业不？这里了解转专业的最新政策和动态</p>
      </router-link>
    </div>
    <div class="block" style="background:#e8b617">
      <router-link to="/module/10">
        <h2 class="title">新区：鱼山专区</h2>
        <p class="item">中国十大最美校园之一，不一般的学思之旅，等你来解锁</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModuleList",
  props: ["direction"],
};
</script>

<style scoped>
.module-wrapper .block {
  color: #fff;
  padding: 2px 10px;
}

.module-wrapper.row {
  overflow: hidden;
}

.module-wrapper.row .block {
  width: calc(20% - 5px);
  margin-left: 5px;
  float: left;
  margin-bottom: 5px;
  height: 150px;
  overflow: hidden;
}

.module-wrapper.row .block a {
  color: #fff;
}

h1.title {
  margin: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3c83e7;
}

.block .title {
  font-size: 20px;
  margin-bottom: 10px;
}

.block .item {
  font-size: 12px;
  padding-left: 10px;
  margin: 0;
  margin-bottom: 20px;
  overflow: hidden;
}

.block .item > a {
  text-decoration: none;
  color: inherit;
}

.block .item > a:hover {
  text-decoration: underline;
}
</style>
