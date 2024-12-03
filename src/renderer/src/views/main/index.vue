<template>
  <div class="flow-main" :style="{ height: screenHeight + 'px' }">
    <div class="flow-main-left">
      <sidebar/>
    </div>
    <div class="flow-main-right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import sidebar from "../../components/sidebar/index.vue";
export default {
  name: "index",
  components:{
    sidebar
  },
  data() {
    return {
      screenWidth: (window.screen.width / 5) * 3 + 100,
      screenHeight: window.innerHeight - 50 // 初始高度，减去可能的标题栏或边距
    };
  },
  created() {
    this.$emit('updateBar');
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateHeight); // 清理事件监听器
  },
  methods: {
    updateHeight() {
      this.screenHeight = window.innerHeight - 50; // 更新为窗口高度，减去标题栏
    }
  }
};
</script>

<style scoped>
.flow-main {
  width: auto;
  border-left: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  color: #151717;
}
.flow-main-left {
  width: 25%;
  height: 100%; /* 左侧自适应父容器高度 */
  float: left;
  background-color: rgba(221, 228, 234, 0.9);
  border-bottom-left-radius: 20px;
}
.flow-main-right {
  width: 75%;
  height: 100%; /* 右侧自适应父容器高度 */
  float: left;
  background-color: white;
}
</style>
