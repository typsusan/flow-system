import { createApp } from 'vue';
import 'typeface-roboto';
import ElementPlus, { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';


import router from './router';

const app = createApp(App);

// 将 ElementPlus 和路由器挂载到应用实例
app.use(ElementPlus);
app.use(router);

app.config.globalProperties.$message = ElMessage;

// 挂载应用
app.mount('#app');
