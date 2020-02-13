<template>
    <div>
        <!-- 头部 -->
         <div class="add_head">
             <el-button type="text" @click="goback"><i class="el-icon-back"></i></el-button>
             <span class="p_title">商品详情</span>
         </div>
         <!-- 中间 -->
         <el-card shadow="never" style="padding:20px;" :rowdata="rowdata">
             <div>
                 <!-- 商品名称 -->
                 <div class="detal_box">
                 <el-tag>商品名称</el-tag>
                 <span class="detail_span">{{rowdata.name}}</span>
             </div>
               <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
               <!-- 商品描述 -->
                 <div class="detal_box">
                 <el-tag>商品描述</el-tag>
                 <span class="detail_span">{{rowdata.desc}}</span>
             </div>
               <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
               <!-- 商品价格 -->
                 <div class="detal_box">
                 <el-tag>商品价格</el-tag>
                 <span class="detail_span">{{rowdata.price}}</span>
             </div>
               <el-divider><i class="el-icon-bank-card"></i></el-divider>
               <!-- 所属分类 -->
                 <div class="detal_box">
                 <el-tag>所属分类</el-tag>
                 <span class="detail_span">{{aa}}</span>
             </div>
               <el-divider><i class="el-icon-picture-outline"></i></el-divider>
                <!-- 商品图片 -->
                 <div class="detal_box">
                 <el-tag>商品图片</el-tag>
                 <div class="block" v-for="p in rowdata.imgs" :key="p">
                     <el-image style="width:100px;height:100px;" :src="'http://118.24.25.7:5000/upload/'+p" fit="cover" lazy></el-image>
                     <div slot="error" class="image-slot"></div>
                     
                 </div>
             </div>
               <el-divider><i class="el-icon-umbrella"></i></el-divider>
                <!-- 商品详情 -->
                 <div class="detal_box">
                 <el-tag>商品详情</el-tag>
                 <span class="detail_span">{{rowdata.detail}}</span>
             </div>
               <el-divider><i class="el-icon-c-scale-to-original"></i></el-divider>



             </div>
             
         </el-card>







    </div>
</template>
<script>
export default {
    data(){
        return {
            rowdata:"",
            aa:"aa"
        }
    },
    mounted(){
       this.rowdata= JSON.parse(localStorage.getItem("rowdata"))
    },

    methods: {
         // 返回
        goback(){
            if(this.$router.currentRoute.name!='goods'){
            this.$router.push("/home/goods")
          }
        },
    },
}
</script>
<style lang="less">
    .details{
        padding:20px;
    }
    .detail_span{
        margin-left: 20px;
    }
    .detal_box{
        text-align: left;
    }
    .el-tag{
        font-size: 16px!important;
    }
    .block{
        display: inline-block;
        margin-left: 20px;
        vertical-align: middle;
    }
</style>