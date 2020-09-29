<template>
  <div v-loading.fullscreen.lock="loading">
    <div class="current">
      <p class="title">当前我的头像</p>
      <p class="info">如果您还没有设置自己的头像，系统会显示为默认头像，您需要自己上传一张新照片来作为自己的个人头像</p>
      <el-image class="current-avatar" :src="localUser().avatar"></el-image>
    </div>
    <div class="new-avatar">
      <p class="title">设置我的新头像</p>
      <p class="info">请点击下方选择一张图片上传，作为新头像，再次点击可重新选择</p>
      <div>
        <div class="avatar-uploader" @click.stop="chooseAvatar">
          <el-image v-if="avatar" class="avatar" :src="avatar" :fit="'cover'"></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <input
            type="file"
            accept="image/*"
            id="avatar-input"
            @change="handleHeadChange"
            style="display:none"
          />
        </div>
      </div>
      <button class="btn btn-primary" @click="uploadAvatar">上传</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonAvatar",
  data() {
    return {
      avatar: "",
      loading: false,
    };
  },
  methods: {
    handleHeadChange(e) {
      var that = this;
      var file = e.target.files[0];
      if (!file) return;
      var size = file.size;
      if (size > 4 * 1024 * 1024) {
        this.$message({
          message: "图片大小不能超过4M",
          type: "info",
        });
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        let res = e.target || e.srcElement;
        that.avatar = res.result;
      };
      reader.readAsDataURL(file);
    },
    chooseAvatar() {
      this.$el.querySelector("#avatar-input").click();
    },
    uploadAvatar() {
      this.loading = true;
      if (!this.avatar) {
        return;
      }
      var user = this.localUser();
      this.axios
        .post(`/user/${user.id}`, {
          avatar: this.avatar,
          birth: user.birth,
          exp: user.exp,
          id: user.id,
          location: user.location,
          mail: user.mail,
          motto: user.motto,
          password: user.password,
          phone: user.phone,
          qq: user.qq,
          secrecy: user.secrecy,
          sex: user.sex,
          sno: user.sno,
          username: user.username,
        })
        .then((res) => {
          if (res.data == 1) {
            this.loading = false;
            this.$message({
              message: "修改成功",
              type: "success",
            });
            user.avatar = this.avatar;
            sessionStorage.setItem("user", JSON.stringify(user));
            window.location.reload();
          } else {
            this.loading = false;
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
    },
    localUser() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      return user;
    },
  },
};
</script>

<style scoped>
.current {
  margin-bottom: 20px;
}

.info,
.title,
.avatar-uploader,
.current-avatar {
  margin-bottom: 10px;
}

.avatar-uploader {
  display: inline-block;
}

.current-avatar {
  width: 178px;
  height: 178px;
  border-radius: 5px;
}

.title {
  display: inline-block;
  padding: 0 10px 5px 0;
  margin: 0;
  border-bottom: 2px solid #3c83e7;
}

.info {
  font-size: 14px;
  color: #999;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon:hover {
  color: #3c83e7;
  border-color: #3c83e7;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
