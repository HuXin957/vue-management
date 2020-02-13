<template>
    <div>
        <!-- 头部 -->
        <div class="add_head">
             <el-button type="text" @click="goback"><i class="el-icon-back"></i></el-button>
             <span class="p_title">订单详情</span>
         </div>
         <!-- 中间 -->
         <el-card shadow="never" style="padding:20px;">
             <div class="p_detail">
                 <!-- 订单 -->
                 <div>
                     <el-tag size="mini" class="txt_box">订&nbsp;&nbsp;单&nbsp;&nbsp;号</el-tag>
                     <span>{{mydata.orderId}}</span>
                 </div>
                  <!-- 订单人 -->
                 <div>
                     <el-tag size="mini" class="txt_box">订&nbsp;&nbsp;单&nbsp;&nbsp;人</el-tag>
                     <span>{{mydata.recipient}}</span>
                 </div>
                  <!-- 创建时间 -->
                 <div>
                     <el-tag size="mini" class="txt_box">创建时间</el-tag>
                    <span>{{mydata.create_time}}</span>
                 </div>
                  <!-- 订单状态 -->
                 <div>
                     <el-tag size="mini" class="txt_box">订单状态</el-tag>
                     <span>{{mydata.status}}</span>
                 </div>
                   <!-- 商品价格 -->
                 <div>
                     <el-tag size="mini" class="txt_box">商品价格</el-tag>
                     <span>{{mydata.allPrice}}</span>
                 </div>
                  <!-- 支付方式 -->
                 <div>
                     <el-tag size="mini" class="txt_box">支付方式</el-tag>
                     <span>{{mydata.paymentMethod}}</span>
                 </div>
             </div>
              <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
              <!-- 表格 -->
               <el-table
                :data="tableData"
                border
                style="width: 100%">
                <!-- 商品名称 -->
                <el-table-column
                prop="name"
                label="商品名称"
                width="100">
                </el-table-column>
                <!-- 商品图片 -->
                <el-table-column
                label="商品图片"
                width="640" >
                <div v-for="p in tableData" :key="p.id">

                
                <el-image v-for="n in p.imgs" :key="n" style="width:100px;height:100px;"  :src="'http://118.24.25.7:5000/upload/'+n" fit="cover" lazy>
                  </el-image>
                </div>
                </el-table-column>
                <!-- 商品信息 -->
                <el-table-column
                prop="info"
                label="商品信息"
                 width="640">
                </el-table-column>
                <!-- 价格 -->
                <el-table-column
                prop="price"
                label="单价">
                </el-table-column>
                <!-- 数量 -->
                <el-table-column
                prop="count"
                label="数量">
                </el-table-column>
            </el-table>
         </el-card>
 


    </div>
</template>
<script>
import {getOrderdetail} from "../api/common"

export default {
    data(){
        return{
            mydata:"",
            pricemethod:{
            1:"支付宝",
            2:"微信",
            3:"银联"
           },
           status:{
               1:"未完成",
               2:"已完成",
               3:"已取消"
           },
           tableData:[],



        }
        

    },
     mounted(){
        this.getdetailFn()
    },
    methods: {
         // 返回
        goback(){
            if(this.$router.currentRoute.name!='order'){
            this.$router.push("/home/order")
          }
        },
        //查看详情
        getdetailFn(){
            this.mydata=JSON.parse(localStorage.getItem('orderdata'))
           
            this.tableData=this.mydata.details
            console.log(this.tableData)
            console.log(this.tableData.imgs)
            if(this.mydata.status==1){
                this.mydata.status="未完成"
            }else if(this.mydata.status==2){
                this.mydata.status="已完成"
            }else if(this.mydata.status==3){
                this.mydata.status="已取消"
            }



            if(this.mydata.paymentMethod==1){
                this.mydata.paymentMethod="支付宝"
            }else if(this.mydata.paymentMethod==2){
                this.mydata.paymentMethod="微信"
            }else if(this.mydata.paymentMethod==3){
                this.mydata.paymentMethod="银联"
            }
        }


    },
   
}
</script>
<style lang="less">
    .p_detail{
        margin-left: 20px;
        text-align: left;
    }
    .txt_box{
        max-width:60px;
       font-size: 12px!important;
        margin-bottom: 18px;
    }
    .p_detail span{
        display: inline-block;
        font-size: 14px;
        margin-left: 20px;
    }
</style>