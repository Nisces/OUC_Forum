<template>
  <div>
    <div class="form-group">
      <label for>新密码</label>
      <el-input class="input" v-model.trim="pwd" placeholder="请输入内容" show-password></el-input>
    </div>
    <div class="form-group">
      <label for>确认密码</label>
      <el-input class="input" v-model.trim="repwd" placeholder="请输入内容" show-password></el-input>
    </div>
    <div style="text-align:center">
      <button class="btn btn-primary" @click="updatePwd">确认修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pwd: "",
      repwd: "",
    };
  },
  methods: {
    updatePwd() {
      if (!this.pwd || !this.repwd) {
        this.$message({
          message: "以上信息均不能为空",
          type: "error",
        });
        return;
      }
      if (this.pwd !== this.repwd) {
        this.$message({
          message: "两次输入的密码不一致",
          type: "error",
        });
        return;
      }
      var user = this.localUser();
      this.axios
        .post(`/user/${user.id}`, {
          avatar: user.avatar,
          birth: user.birth,
          exp: user.exp,
          id: user.id,
          location: user.location,
          mail: user.mail,
          motto: user.motto,
          password: this.pwd,
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
            sessionStorage.setItem("user", JSON.stringify(user));
            this.pwd = "";
            this.repwd = "";
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
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
}
</style>
