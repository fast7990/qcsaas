<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="flex">
        <div class="box-img" />
        <div class="box-right">
          <img src="@/assets/images/right.png" alt style="float:right;" />
          <div>
            <p class="right_title">Sign Up</p>
            <div class="username">
              <span class="mobile" style="margin-top:20px">手机号码</span>
              <input
                type="text"
                ref="mobile"
                v-model="loginForm.mobile"
                placeholder="请输入手机号码"
                placeholder-class="input-placeholder"
              />
            </div>
            <div class="password">
              <span class="pas" style="margin-top:20px">登录密码</span>
              <input
                type="text"
                ref="password"
                v-model="loginForm.password"
                placeholder="请输入登录密码"
                placeholder-class="input-placeholder"
              />
            </div>
            <!-- <div class="word_top">
              <span class="word">忘记密码</span>
              <span class="word_title">登陆</span>
            </div>-->

            <div class="button">
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;background: #e46e62;border:none;"
                @click.native.prevent="handleLogin"
              >登陆</el-button>
            </div>
            <div class="forget">
              <a href>忘记密码</a>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入最少6位密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "13303229781",
        password: ""
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid);
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.box-img {
  width: 625px;
  height: 592px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  background: url("../../assets/images/loginbg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.box-right {
  width: 383px;
  height: 592px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}
.right_title {
  font-size: 36px;
  font-weight: 700;
  color: #666666;
  margin-top: 120px;
  margin-left: 43px;
}
.username {
  width: 300px;
  height: 35px;
  border-bottom: 1px solid #d7d7d7;
  margin-left: 43px;
}
.mobile {
  font-size: 14px;
  color: #333333;
  font-family: "微软雅黑";
}
input {
  padding-left: 20px;
  border: none;
  color: #a7a7a7;
  font-size: 14px;
}
.password {
  width: 300px;
  height: 35px;
  border-bottom: 1px solid #d7d7d7;
  margin-left: 43px;
  margin-top: 20px;
}
.pas {
  font-size: 14px;
  color: #333333;
  font-family: "微软雅黑";
}
.word_top {
  margin-top: 12px;
}
.word {
  color: #a7a7a7;
  font-size: 14px;
  margin-left: 43px;
}
.word_title {
  color: #1373da;
  font-size: 16px;
  margin-left: 10px;
}
.button {
  width: 293px;
  height: 42px;
  font-size: 16px;
  color: #ffffff;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
  line-height: 40px;
}
.forget {
  width: 80px;
  height: 16px;
  color: #096dd9;
  margin: 0 auto;
  margin-top: 15px;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 1010px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
