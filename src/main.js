import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import NProgress from 'nprogress';
import 'element-ui/lib/theme-chalk/index.css';
import './style/css/public.css';
import './icons/iconfont.css';
import './style/lib/animate.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;
/* 注册全局打印方法 */
Vue.prototype.Log = function (val) {
    console.log(val);
}
NProgress.configure({ showSpinner: false });

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
