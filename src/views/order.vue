<template>
    <div>
         <div class="c-head">
              <!-- 左侧搜索框 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left">
                <!-- 搜索框 -->
                <el-form-item>
                    <el-select v-model="formInline.region" style="width:150px;">
                    <el-option label="按照订单号搜索" value="orderId"></el-option>
                    <el-option label="按照收件人搜索" value="recipient"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 关键字 -->
                <el-form-item>
                    <el-input v-model="formInline.value" placeholder="订单号" style="width:150px;margin:0 10px"></el-input>
                </el-form-item>
                <!-- 搜索按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(type)"><i class="el-icon-search"></i> 搜索</el-button>
                </el-form-item>
        </el-form>
         </div>
    <!-- 头部结束 -->
      <el-card shadow="never" style="padding:20px;">
            <el-card shadow="never">
                <!-- 表格 -->
                  <!-- 表格 -->
        <el-table :data="tableList" border style="width: 100%">
          <!-- 订单号 -->
          <el-table-column prop="orderId" label="订单号" width="180"></el-table-column>
          <!-- 收件人 -->
          <el-table-column prop="recipient" label="收件人" width="180"></el-table-column>
          <!-- 订单状态 -->
          <el-table-column prop="status" label="订单状态" width="314"></el-table-column>
           <!-- 订单状态 -->
          <el-table-column prop="allPrice" label="订单总价" width="313"></el-table-column>
          <!-- 创建时间 -->
          <el-table-column prop="create_time" label="创建时间" width="313"></el-table-column>
           <!-- 操作 -->
          <el-table-column prop="operation" label="操作" width="313">
              <template slot-scope="scope">
                 <el-button type="text" @click="check(scope.$index, scope.row)">查看详情</el-button>
              </template>
              
          </el-table-column>
            </el-table>
               </el-card>
              <!-- 分页器 -->
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :page-size="orderobj.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>

      </el-card>


    </div>
</template>
<script>
import {getOrderList,getSearchOrder} from "../api/common"

export default {
    data(){
        return{
            formInline:{
                region:'orderId',
                value:""
            },
            tableList:[],
            orderobj:{
                pageNum:1,
                pageSize:5
            },
            total:null,
            type:"",
            serchobj:{
                type:"",
                value:"",
                pageNum:1,
                pageSize:5

            }
        }
    },
    methods: {
         //时间转换
        getTimeFn(){
            // 转换时间格式
            Date.prototype.Format = function(fmt) {
            var o = {
                "M+": this.getMonth() + 1, // 月份
                "d+": this.getDate(), // 日
                "h+": this.getHours(), // 小时
                "m+": this.getMinutes(), // 分
                "s+": this.getSeconds(), // 秒
                "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
                "S": this.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
            }
        },
        //搜索
        onSubmit(type){
            this.serchobj.value=this.formInline.value
            if(this.formInline.region=='orderId'){
                this.serchobj.type='orderId'
                getSearchOrder(this.serchobj).then((res)=>{
                    if(!res.data.status){
                        this.getListFn()
                    }
                })
            }else if(this.formInline.region=='recipient'){
                this.serchobj.type='recipient'
                getSearchOrder(this.serchobj).then((res)=>{
                    if(!res.data.status){
                        this.getListFn()  
                    }
                })
            }
        },
        getListFn(){
            getOrderList(this.orderobj).then((res)=>{
                if(!res.data.status){
                    
                    this.total=parseInt(res.data.data.total)
                    res.data.data.list.forEach((item)=>{
                        item.create_time = new Date(item.create_time).Format('yy-MM-dd hh:mm:ss')
                    })
                    this.tableList=res.data.data.list
                }
               
            })
        },
          // 页码
        handleCurrentChange(val){    
            this.orderobj.pageNum=val
            this.getListFn()
        },
        check(index,row){
              localStorage.setItem("orderdata",JSON.stringify(row))
              if(this.$router.currentRoute.name!='orderdetail'){
              this.$router.push("/home/orderdetail")
         }
        }

    },
    mounted(){
        this.getTimeFn()
        this.getListFn()
    }
}
</script>
<style lang="less">
    
</style>