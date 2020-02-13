import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Index from '../views/index.vue'
import Category from '../views/category.vue'
import Goods from '../views/goods.vue'
import User from '../views/user.vue'
import Permissions from '../views/permissions.vue'
import Order from '../views/order.vue'
import Addgoods from '../views/addgoods.vue'
import Details from '../views/details.vue'
import Modify  from '../views/modify.vue'
import Orderdetail  from '../views/orderdetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta:{title:'登录'}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{title:'登录'}
  },
  {
    path:"/home",
    name:"home",
    component:Home,
    children:[{
      path:"index",
      name:"index",
      component:Index,
      meta:{title:'首页'}
    },
    {
      path:"category",
      name:"category",
      component:Category,
      meta:{title:'分类'}
    },
    {
      path:"goods",
      name:"goods",
      component:Goods,
      meta:{title:'商品'}
    },
    {
      path:"addgoods",
      name:"addgoods",
      component:Addgoods,
      meta:{title:'添加商品'}
    },{
      path:"details",
      name:"details",
      component:Details,
      meta:{title:'详情'}
    },
    {
      path:"modify",
      name:"modify",
      component:Modify,
      meta:{title:'修改'}
    },
     {
      path:"user",
      name:"user",
      component:User,
      meta:{title:'用户'}
    }, 
     {
      path:"permissions",
      name:"permissions",
      component:Permissions,
      meta:{title:'权限'}
    },{
      path:"order",
      name:"order",
      component:Order,
      meta:{title:'订单'}
    },
    {
      path:"orderdetail",
      name:"orderdetail",
      component:Orderdetail,
      meta:{title:'订单详情'}
    }]
  }]

const router = new VueRouter({
  routes
})

export default router
