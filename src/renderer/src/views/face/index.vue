<template>
  <div class="face-main">
    <div class="faceMain">
    </div>
    <button v-loading="backLoading" class="btn" @click="backReturn"> 返回登录
    </button>
  </div>
</template>

<script>
//  初次加载会很慢，请耐心等待，
// face-effet插件官网：https://faceeffet.com/
import 'face-effet/effet/effet.css'
import effet from 'face-effet/effet/effet'
export default {
  name: "index",
  data(){
    return{
      faceEffet:effet,
      backLoading:false,
    }
  },
  beforeDestroy(){
    if (this.faceEffet){
      this.faceEffet.close();
    }
  },
  mounted() {
    try {
      this.faceEffet.restart();
    }catch (e) {
      this.faceEffet.init({
        el:'faceMain',
        callBack:this.callBack
      })
    }
  },
  methods:{
    callBack(data){
      if (data.progressMessage === 'success'){ // 判断阶段是否成功
        if (!data.base64Array || data.base64Array.length === 0){
          return;
        }
        Promise.all(data.base64Array).then((base64Strings) => {
          // 人脸数据：base64Strings
          // 这里调用后端
          if (base64Strings){
            this.faceEffet.close();
            setTimeout(()=>{
              this.$router.push({
                path:'/main',
                query:{
                  base64:base64Strings[0]
                }
              });
              const screenWidth = window.screen.width;
              const screenHeight = window.screen.height;
              window.ipcRenderer.send('toMain',{
                username:'xxxxx',
                token:'',
                screenWidth:screenWidth,
                screenHeight:screenHeight
              })

            },1000)
          }
        }).catch((error) => {
          console.error("Error resolving promises:", error);
        });
      }
    },
    backReturn(){
      if (this.backLoading){
        return
      }
      // 先销毁人脸容器
      this.faceEffet.close();
      this.backLoading = true
      // 等待1s后跳转
      setTimeout(()=>{
        this.backLoading = false
        this.$router.push('/login');
      },1000)

    }
  }
}
</script>

<style>
@import "./index.css";
</style>
