<template>
  <div class="login-main" v-loading="changeRegLoading || submitLoading">
    <form class="form" @submit.prevent="submit">
      <!-- 账户输入 -->
      <div class="flex-column">
        <label>账户</label>
      </div>
      <div class="inputForm">
        <img src="~@/assets/login/email.svg" alt="email"/>
        <input
          type="text"
          class="input"
          v-model="loginObj.username"
          placeholder="您的账户"
        />
      </div>

      <!-- 密码输入 -->
      <div class="flex-column">
        <label>密码</label>
      </div>
      <div class="inputForm">
        <img src="~@/assets/login/pass.svg" alt="password" />
        <input
          :type="showPassword ? 'text' : 'password'"
          class="input"
          v-model="loginObj.password"
          placeholder="您的密码"
        />
        <img
          src="~@/assets/login/eye.svg"
          alt="toggle password visibility"
          class="eye-icon"
          @click="togglePasswordVisibility"
        />
      </div>

      <!-- 确认密码输入 -->
      <div v-if="regState" class="flex-column">
        <label>确认密码</label>
      </div>
      <div v-if="regState" class="inputForm">
        <img src="~@/assets/login/pass.svg" alt="password" />
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          class="input"
          v-model="loginObj.affirmPassword"
          placeholder="确认密码"
        />
        <img
          src="~@/assets/login/eye.svg"
          alt="toggle confirm password visibility"
          class="eye-icon"
          @click="toggleConfirmPasswordVisibility"
        />
      </div>

      <!-- 忘记密码 -->
      <div v-if="!regState" class="flex-row">
        <span class="span">忘记密码?</span>
      </div>

      <!-- 提交按钮 -->
      <button type="submit" class="button-submit">{{regState ? '注 册':'登 录'}}</button>

      <!-- 注册切换 -->
      <p class="p" v-if="!regState">
        没有账户?
        <span class="span" @click="toggleRegisterState">注 册</span>
      </p>
      <p class="p" v-else>
        点击返回
        <span class="span" @click="toggleRegisterState">登 录</span>
      </p>


      <p class="p line">或者以下方式登录</p>

      <!-- 第三方登录 -->
      <div class="flex-row">
        <button type="button" class="btn google" @click="showServiceUpgradeMessage('face')">
          <img src="~@/assets/login/face.svg" width="25" height="25" alt="google" />
          人脸登录
        </button>
        <button type="button" class="btn apple" @click="showServiceUpgradeMessage('sso')">
          <img src="~@/assets/login/sso.svg" width="25" height="25" alt="apple" />
          网页SSO登录
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regState: false,
      showPassword: false,
      showConfirmPassword: false,
      changeRegLoading:false,
      submitLoading:false,
      loginObj: {
        username: '',
        password: '',
        affirmPassword: '',
      },
    };
  },
  created() {
    this.$emit('updateBar')
  },
  methods: {
    // 切换注册状态
    toggleRegisterState() {
      this.changeRegLoading = true
      //window.ipcRenderer.send('loginOrRegister',!this.regState)
      setTimeout(()=>{
        this.regState = !this.regState;
        if (!this.regState){
          this.loginObj.username = ''
          this.loginObj.password = ''
          this.loginObj.affirmPassword = ''
        }
        this.changeRegLoading = false
      },1000)
    },
    // 显隐密码
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    // 提交表单
    submit() {
      // 校验逻辑
      if (!this.loginObj.username || !this.loginObj.password) {
        this.$message({
          message: '请输入完整的账户信息！',
          type: 'info',
        });
        return;
      }
      if (this.regState && this.loginObj.password !== this.loginObj.affirmPassword) {
        this.$message({
          message: '两次输入的密码不一致！',
          type: 'error',
        });
        return;
      }
      this.submitLoading = true

      setTimeout(()=>{

        this.$router.push('/main');
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        window.ipcRenderer.send('toMain',{
          username:this.loginObj.username,
          token:'',
          screenWidth:screenWidth,
          screenHeight:screenHeight
        })
        this.submitLoading = false
      },1000)
    },
    // 显示升级提示
    showServiceUpgradeMessage(type) {
      if ('face' === type){
        this.$router.push('/face');
      }else {
        window.open('https://www.baidu.com/','_blank')
      }
    },
  },
};
</script>

<style>
@import "./index.css";
.el-loading-spinner .path{
  stroke:#151717!important;
}
.el-loading-mask{
  border-radius: 20px!important;
  width: 510px!important;
}
</style>
