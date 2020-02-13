import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
Vue.use(Vuex)

const store =new Vuex.Store({
  strict:process.env.NODE_ENV!=='production',
  modules:{
  app
  }
})

export default store