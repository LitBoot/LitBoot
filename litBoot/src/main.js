import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Carousel from 'vue-devui-carousel'
import 'ant-design-vue/dist/reset.css';
import 'vue-devui-carousel/dist/style.css'

createApp(App).use(Antd).use(Carousel).mount('#app')
