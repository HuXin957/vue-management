import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'


import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import 'element-ui/lib/theme-chalk/index.css'; 

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor);


router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title;
    next();
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
