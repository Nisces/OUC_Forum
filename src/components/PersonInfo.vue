<template>
  <div class="personinfo">
    <p class="title">在下方填写需要修改的信息，不需要修改的内容请保持原值</p>
    <div class="form-group">
      <label for>用户名</label>
      <el-input class="input" v-model="user.username" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>学号</label>
      <el-input class="input" v-model="user.sno" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>专业</label>
      <el-input class="input" v-model="user.major" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>性别</label>
      <el-radio-group v-model="user.sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </div>
    <div class="form-group">
      <label for>生日</label>
      <el-date-picker
        v-model="user.birth"
        type="date"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <div class="form-group">
      <label for>地区</label>
      <el-input class="input" v-model="user.location" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>手机号</label>
      <el-input class="input" v-model="user.phone" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>QQ</label>
      <el-input class="input" v-model="user.qq" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>邮箱</label>
      <el-input class="input" v-model="user.mail" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>个性签名</label>
      <el-input class="input" v-model="user.motto" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">
      <label for>是否保密</label>
      <el-radio-group v-model="user.secrecy">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </div>
    <div style="text-align:center">
      <button class="btn btn-primary" @click="changeInfo">提交修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonInfo",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    localUser() {
      var user = sessionStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      return user;
    },
    changeInfo() {
      this.axios
        .post(`/user/${this.user.id}`, {
          avatar: this.user.avatar,
          birth: this.user.birth,
          exp: this.user.exp,
          id: this.user.id,
          location: this.user.location,
          mail: this.user.mail,
          motto: this.user.motto,
          major: this.user.major,
          password: this.user.password,
          phone: this.user.phone,
          qq: this.user.qq,
          secrecy: this.user.secrecy,
          sex: this.user.sex,
          sno: this.user.sno,
          username: this.user.username,
        })
        .then((res) => {
          if (res.data == 1) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            sessionStorage.setItem("user", JSON.stringify(this.user));
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
  },
  created() {
    var user = this.localUser();
    this.user = user;
  },
};
</script>

<style scoped>
.personinfo {
  padding: 20px;
}

.personinfo > .title {
  color: #999;
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  width: 10%;
  display: inline-block;
}

.form-group .input {
  width: 90%;
  display: inline-block;
}
</style>
