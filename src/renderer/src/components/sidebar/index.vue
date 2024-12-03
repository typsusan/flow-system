<template>
  <div class="sidebar-main">
    <div class="user-header">
      <img :src="avatarUrl" alt="Random Avatar" />
    </div>
    <div class="user-balance">
      <img src="~@/assets/sidebar/jif.svg">
      <p>积分余额：1120</p>
    </div>
    <div class="user-username">
      <h3>{{username}}</h3>
    </div>

    <div class="function-list">
      <div
        class="function-list-item"
        v-for="(item, index) in functionList"
        :key="index"
        @mouseover="hoverIndex = index"
        @mouseleave="hoverIndex = null"
        @click="funcItem(item.path,index)"
        :style="{
          backgroundColor:hoverIndex === index ? 'rgba(255, 255, 255, 0.6)' : (selectedIndex === index ? 'rgba(255, 255, 255, 0.6)' : 'transparent')
        }"
      >
        <img
          :src="getItemImage(index)"
          alt=""
        />
        <p
          :style="{
        color: hoverIndex === index ? '#247eff' : (selectedIndex === index ? '#247eff' : '#94a9c1')
      }"
        >
          {{ item.name }}
        </p>
      </div>


    </div>

  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
export default {
  data() {
    return {

      avatarUrl: '',
      username: 'typs****@163.com',
      hoverIndex: null, // 当前悬停的索引
      selectedIndex: 0, // 当前选中的索引，默认选中第一个
      functionList: [
        {
          name: "首页",
          selectedImg: new URL('@/assets/sidebar/home-selected.png', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/home-default.png', import.meta.url).href,
          path:'/desktop'
        },
        {
          name: "充值",
          selectedImg: new URL('@/assets/sidebar/czhi-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/czhi-default.svg', import.meta.url).href,
          path: '/payment'
        },
        {
          name: "机器人",
          selectedImg: new URL('@/assets/sidebar/jiqr-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/jiqr-default.svg', import.meta.url).href,
          path: '/robot'
        },
        {
          name: "平台申请",
          selectedImg: new URL('@/assets/sidebar/pingtai-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/pingtai-default.svg', import.meta.url).href,
          path:'/platform'
        },
        {
          name: "访问量",
          selectedImg: new URL('@/assets/sidebar/fwenl-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/fwenl-default.svg', import.meta.url).href,
          path: '/pageView'
        },
        {
          name: "点赞系列",
          selectedImg: new URL('@/assets/sidebar/dianz-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/dianz-default.svg', import.meta.url).href,
          path: '/upvote'
        },
        {
          name: "系统设置",
          selectedImg: new URL('@/assets/sidebar/set-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/set-default.svg', import.meta.url).href,
          path: '/setting'
        },
        {
          name: "退出登录",
          selectedImg: new URL('@/assets/sidebar/tuic-selected.svg', import.meta.url).href,
          defaultImg: new URL('@/assets/sidebar/tuic-default.svg', import.meta.url).href,
          path: '/login'
        },
      ],
    };
  },
  methods: {
    funcItem(path,index){
      this.selectedIndex = index
      if (path === '/login'){
        // 其他清除token的操作
        ElMessageBox.confirm(
          '确认需要退出吗?',
          '退出提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            // 确认退出
            this.$router.push(path);
          })
          .catch(() => {
            // 取消
          })
      }else {
        this.$router.push(path);
      }
    },
    getItemImage(index) {
      if (this.hoverIndex === index || this.selectedIndex === index) {
        // 悬停或选中时使用 selectedImg
        return this.functionList[index].selectedImg;
      }
      // 默认使用 defaultImg
      return this.functionList[index].defaultImg;
    },
    getRandomValue(options) {
      return options[Math.floor(Math.random() * options.length)];
    },
    generateAvatar() {
      const baseUrl = 'https://avataaars.io/';
      const params = new URLSearchParams({
        topType: this.getRandomValue([
          'NoHair',
          'ShortHairDreads01',
          'ShortHairFrizzle',
          'LongHairStraight',
          'Hat',
          'Hijab',
        ]),
        accessoriesType: this.getRandomValue([
          'Blank',
          'Kurt',
          'Prescription01',
          'Sunglasses',
          'Round',
        ]),
        hairColor: this.getRandomValue([
          'Black',
          'Blonde',
          'BrownDark',
          'Red',
          'SilverGray',
        ]),
        facialHairType: this.getRandomValue([
          'Blank',
          'BeardMedium',
          'BeardLight',
          'MoustacheFancy',
        ]),
        clotheType: this.getRandomValue([
          'Hoodie',
          'BlazerShirt',
          'BlazerSweater',
          'GraphicShirt',
          'ShirtCrewNeck',
        ]),
        clotheColor: this.getRandomValue([
          'PastelRed',
          'Blue03',
          'Heather',
          'Pink',
          'Gray01',
        ]),
        eyeType: this.getRandomValue([
          'Happy',
          'Squint',
          'Surprised',
          'Cry',
          'Wink',
        ]),
        eyebrowType: this.getRandomValue([
          'Default',
          'RaisedExcited',
          'AngryNatural',
          'SadConcerned',
        ]),
        mouthType: this.getRandomValue([
          'Smile',
          'Default',
          'Twinkle',
          'Tongue',
        ]),
        skinColor: this.getRandomValue([
          'Light',
          'Tanned',
          'Brown',
          'DarkBrown',
          'Black',
        ]),
      });

      if (this.$route.query && this.$route.query.base64){
        this.avatarUrl = this.$route.query.base64
      }else {
        this.avatarUrl = `${baseUrl}?${params.toString()}`;
      }
    },
  },
  mounted() {
    this.generateAvatar();
  },
};
</script>


<style>
@import "./index.css";
</style>
