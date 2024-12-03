<template>
  <div class="title-bar" :style="{width:expandState?'':'510px'}">

    <div class="title-bar-left" :style="{backgroundColor:expandState?'rgba(221, 228, 234,0.9)':'#fff'}">
      <img src="~@/assets/bar/logo.svg" alt="图标" class="icon" />
      <div class="title">流量监控系统</div>
    </div>

    <div class="title-bar-right">
      <div class="operating-button close-button" @click="closeWindow">
        <img src="~@/assets/bar/close.svg" />
      </div>
      <div class="operating-button minimum-button" @click="minimumWindow">
        <img src="~@/assets/bar/minimum.svg" />
      </div>
      <div v-if="expandState" class="operating-button expand-button" @click="expandWindow">
        <img src="~@/assets/bar/expand.svg" />
      </div>
      <div style="width: 10px;"></div>
    </div>


  </div>
</template>


<script>
export default {
  name: "TitleBar",
  data(){
    return{
      expandState:false,
    }
  },
  mounted() {
    this.expandState = !(this.$route.path === "/" || this.$route.path === '/login');
  },
  methods: {
    closeWindow() {
      window.close(); // 关闭窗口
    },
    minimumWindow() {
      window.ipcRenderer.send('minimizing')
    },
    expandWindow() {
      window.ipcRenderer.send('expandWindow',{
        screenWidth:window.screen.width,
        screenHeight:window.screen.height,
      })
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
