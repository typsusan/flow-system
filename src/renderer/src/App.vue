<script>
import bar from "./components/bar/index.vue";
export default {
  components:{
    bar
  },
  data(){
    return{
      barIndex:'bar-default'
    }
  },
  methods:{
    updateBar(){
      this.barIndex = new Date().getTime();
      console.log(this.barIndex)
    }
  }
}
</script>

<template>
  <div>
    <bar :key="barIndex"/>
    <router-view @updateBar="updateBar" />
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
