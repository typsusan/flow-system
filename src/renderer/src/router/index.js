import { createRouter,createWebHashHistory } from "vue-router";
const router = createRouter({
  mode:"hash",
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:"/",
      name:"login",
      redirect:"/login",
    },
    {
      path:"/login",
      name:"登录",
      component:()=> import('@/views/login/index.vue')
    },
    {
      path:"/face",
      name:"人脸登录",
      component:()=> import('@/views/face/index.vue')
    },
    {
      path:"/main",
      redirect:"/desktop",
      name:"主容器",
      component:()=> import('@/views/main/index.vue'),
      children:[
        {
          path:"/desktop",
          name:"主页",
          component:()=>import('@/views/children/desktop/index.vue')
        },
        {
          path:"/payment",
          name:"付款",
          component:()=>import('@/views/children/payment/index.vue')
        },
        {
          path:"/robot",
          name:"机器人",
          component:()=>import('@/views/children/robot/index.vue')
        },
        {
          path:"/platform",
          name:"平台",
          component:()=>import('@/views/children/platform/index.vue')
        },
        {
          path:"/pageView",
          name:"访问量",
          component:()=>import('@/views/children/pageView/index.vue')
        },
        {
          path:"/upvote",
          name:"点赞",
          component:()=>import('@/views/children/upvote/index.vue')
        },
        {
          path:"/setting",
          name:"设置",
          component:()=>import('@/views/children/setting/index.vue')
        },
      ]
    }
  ]
})
export default router
