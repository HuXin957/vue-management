<template>
<div>
    <!-- 头部 -->
    <div class="c-head">
      <el-button type="primary" size="medium " style="float:right" @click="AddGoodsFn">+添加商品</el-button>
      <!-- 左侧搜索框 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left">
                <!-- 搜索框 -->
                <el-form-item>
                    <el-select v-model="formInline.region" style="width:150px;">
                    <el-option label="按照名称搜索" value="s_name"></el-option>
                    <el-option label="按照描述搜索" value="s_describe"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 关键字 -->
                <el-form-item>
                    <el-input v-model="formInline.user" placeholder="关键字" style="width:150px;margin:0 10px"></el-input>
                </el-form-item>
                <!-- 搜索按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 搜索</el-button>
                </el-form-item>
        </el-form>
        </div>
        <!-- 中间表格 -->
         <el-card shadow="never" style="padding:20px;">
      <el-card shadow="never">
        <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <!-- 商品名称 -->
                    <el-table-column
                    prop="name"
                    label="商品名称"
                    width="280">
                    </el-table-column>
                    <!-- 商品描述 -->
                    <el-table-column
                    prop="desc"
                    label="商品描述"
                    width="470">
                    </el-table-column>
                    <!-- 商品价格 -->
                    <el-table-column
                    prop="price"
                    label="商品价格"
                    width="280">
                    </el-table-column>
                    <!-- 商品状态 -->
                    <el-table-column
                    prop="status"
                    label="商品状态"
                    width="285">
                    <template slot-scope="scope">
                      <div  v-if="scope.row.status == 0">
                         <el-button size="mini" @click="shelverFn(scope.$index, scope.row)">上架</el-button>
                         <el-button type="text">已下架</el-button>
                      </div>
                      <div v-else>
                        <el-button size="mini"  @click="shelverFn(scope.$index, scope.row)">下架
                         </el-button>
                          <el-button type="text">销售中</el-button>
                      </div>

                      
                     
                    </template>
                    
                    </el-table-column>
                    <!-- 操作选项 -->
                    <el-table-column
                    prop="operation"
                    label="操作选项"
                    width="281">
              <template slot-scope="scope">
              <el-button size="mini" @click="detailsFn(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" @click="ModifyFn(scope.$index, scope.row)">修改</el-button>
            </template>
                    </el-table-column>
         </el-table>
        </el-card>
         <!-- 分页器 -->
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :page-size="Pages"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>

      </el-card>

    
   


</div>
</template>

<script>
import {getGoods,getSearch,getShelves} from "../api/common"
export default {
   data() {
      return {
        formInline: {
          user: '',
          region:'s_name'
        },
        tableData:[],
        pageobj:{
          pageNum:1,
          pageSize:8
        },
        total:0,
        serchobj:{
          pageNum:1,
          pageSize:5,
          productName:"",
          productDesc:""
        },
        Pages:0,
        isNum:true,
        shelvesobj:{
          productId:"",
          status:null
        },
        goodsobj:{
          categoryId:"",
          pCategoryId:"",
          name:"",
          desc:"",
          price:"",
          detail:"",
          imgs:"",
        }
      


      }
    },
    mounted(){
      this.getGoodsListFn()
    },
    methods: {
      
      //获取商品列表
      getGoodsListFn(){
        this.isNum=true
        this.Pages=this.pageobj.pageSize
        getGoods(this.pageobj).then((res)=>{
          //有返回的数据 下面用
          if(!res.data.status){
            this.total=res.data.data.total//总数据条数
            this.tableData=res.data.data.list//数据
          }
          
        })
      },
      // 页码
      handleCurrentChange(val){   
       
        if(this.isNum){
            this.pageobj.pageNum=val
            this.getGoodsListFn()
        }else{
          this.serchobj.pageNum=val
          this.onSubmit()
        }
      
      },
        // 搜索
      onSubmit(){
        this.isNum=false
        if(this.formInline.region=="s_name"){
          this.serchobj.productName=this.formInline.user
        }else{
          this.serchobj.productDesc=this.formInline.user
        }
        this.Pages=this.serchobj.pageSize
        getSearch(this.serchobj).then((res)=>{
          if(!res.data.status){
            this.total=res.data.data.total//重新获取总数据条数，渲染页码
            this.tableData=res.data.data.list
            this.serchobj.productName=""//请求完成之后清空，否则换一个搜索方式没反应
            this.serchobj.productDesc=""
          }
        })
      },
      //上架下架
      shelverFn(index,row){
          if(row.status){
              row.status=0
            }else{
              row.status=1
            }
        this.shelvesobj.status=row.status//状态值
        this.shelvesobj.productId=row._id
        getShelves(this.shelvesobj).then((res)=>{
          if(!res.data.status){
          this.$message({
            type: 'success',
            message: "操作成功"
          });
          }
        })
      },
      //添加商品
      AddGoodsFn(){
         if(this.$router.currentRoute.name!='addgoods'){
          this.$router.push("/home/addgoods")
        }
      },
      //商品详情
      detailsFn(index,row){
         localStorage.setItem('rowdata',JSON.stringify(row))
        if(this.$router.currentRoute.name!='details'){
          this.$router.push("/home/details")
        }
      },
      //修改
        ModifyFn(index,row){
          localStorage.setItem('modidata',JSON.stringify(row))
        if(this.$router.currentRoute.name!='modify'){
          this.$router.push("/home/modify")
        }
      }     
    },
};
</script>
<style lang="less">
</style>