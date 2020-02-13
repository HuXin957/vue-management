<template>

<el-container>
 <el-aside width="220px">
      <!-- LOGO -->
      <div class="home-img"> </div>
      <!-- 下拉菜单 -->
        <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 首页 -->
       <el-menu-item index="1" @click="onIndex">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 商店 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>商店</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="2-1" @click="onCategory"><i class="el-icon-s-marketing"></i>品类管理</el-menu-item>
          <el-menu-item index="2-2" @click="onGoods"><i class="el-icon-shopping-cart-full"></i>商品管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 用户 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="onUser"><i class="el-icon-user"></i>用户管理</el-menu-item>
          <el-menu-item index="3-2" @click="onPermissions"><i class="el-icon-setting"></i>权限管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <!-- 订单 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-platform-eleme"></i>
          <span>订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1"  @click="onOrder"><i class="el-icon-phone-outline"></i>订单管理</el-menu-item>   
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
      <!-- 头部 -->
    <el-header>
      <div class="mylogin">
        <!-- 头像 -->
          <div>
               <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <div>{{this.mydata.username}}</div>
          <div class="line">|</div>
          <div class="out" @click="open">退出</div>
      </div>
          
    </el-header>
    <!-- 内容 -->
    <el-main>
        <!-- 大卡片 -->
        <el-card shadow="always">
              <router-view></router-view> 
        </el-card>
        <footer class="copy">Created By Qiang At 2020.01</footer>
    </el-main>
  </el-container>

</el-container>
</template>

<script>

     export default {
       data(){
         return{
           mydata:""
         }
       },
    methods: {
     handleOpen(key, keyPath) { 
    
      },
      handleClose(key, keyPath) {
     
      },
     
      // 退出
        open() {
        this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$router.push("/login")     
        }).catch(()=>{
           this.$message({
            type: 'info',
            message: '您倒是退呀!'
          });   
        });
      },
    
      //首页跳转
      onIndex(){
        if(this.$router.currentRoute.name!='index'){
          this.$router.push("/home/index")
        }
      },
      // 品类跳转
      onCategory(){
         if(this.$router.currentRoute.name!='category') {
           this.$router.push("/home/category")
         } 
      },
      onGoods(){
        if(this.$router.currentRoute.name!='goods') {
           this.$router.push("/home/goods")
         }
      },
      onUser(){
        if(this.$router.currentRoute.name!='user') {
           this.$router.push("/home/user")
         }
      },
      onPermissions(){
        if(this.$router.currentRoute.name!='permissions') {
           this.$router.push("/home/permissions")
         }
      },
      onOrder(){
        if(this.$router.currentRoute.name!='order') {
           this.$router.push("/home/order")
         }
      },


      },
      mounted(){//当数据获取到了，还没插进去
             this.mydata=JSON.parse(localStorage.getItem("userdata"))
             
      }
  
  }
</script>
<style lang="less">
  .el-header {
    height:100%;
    background-color: #fff;
    color: #333;
    text-align: center;
  }
  .el-aside {
    height:100%;
    background-color: #333;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    height:100%;
    background-color: #f1f9ff;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container{
      height:100%;
  }
  .el-menu li{
    width:220px;
}
.home-img{
    height:60px;
    background:url('../assets/mylogo.png') no-repeat;
    background-size: 160px 40px;
    background-position: center;
}
aside ul{
    text-align: left;
}
.mylogin{
  padding:5px 10px;
 float: right;
}
.mylogin::after{
  content: '';
  overflow: hidden;
  display: block;
  clear: both;
}
.mylogin div{
  display: inline-block;
   vertical-align: middle;
   padding-right: 10px;
}
.out{
  color: deepskyblue;
  font-size: 14px;
  cursor: pointer;
}
.line{
  color:gainsboro;
}
.copy{
  font-size: 12px;
  color:#333;
  position: absolute;
  bottom:10px;
  left:50%;
}
.el-card__body{
  padding:0!important;
}
.progress .el-card{
  padding:20px 50px;
}
</style>
