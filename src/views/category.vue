<template>

<div>
   <div class="c-head">
        <el-button type="text" style="float:left" @click="handleOne">一级商品分类列表</el-button>
        <span style="float:left;line-height:35px;padding:0 10px;font-size:14px;" :geroname="geroname" :iright="iright"><i :class="iright"></i>{{geroname}}</span>
        <el-button type="primary" size="mini" style="float:right"  @click="dialogFormVisible=true,getAddFn()">+添加分类</el-button>
   </div>
       

    <el-card shadow="never" style="padding:20px;">
          <!-- 表格 -->
        <el-card  shadow="never">
                    <el-table
                    stripe
                    :data="tableData"
                    style="width: 100%">
                   
                    <el-table-column
                    label="商品分类"
                    width="700%">
                    <template slot-scope="scope">
                        
                        <div slot="reference" class="name-wrapper">
                            <span>{{ scope.row.name }}</span>
                        </div>
                        
                    </template>
                    </el-table-column>

                    <el-table-column label="操作选项">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改分类</el-button>
                        <el-button
                        size="mini"
                        :display="display"
                        v-show="display"
                        @click="handleChildren(scope.$index, scope.row)">查看子分类</el-button>
                    </template>
                    </el-table-column>
                </el-table>
              </el-card>
              <!-- 分页器 -->
              <el-pagination
              style="margin-top:20px;"
              background
              :page-size="gero.pageSize"
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange">
            </el-pagination>         
          </el-card>
    <!-- 弹出框 -->
    
                <el-dialog title="添加分类" :visible.sync="dialogFormVisible" style="text-align:left">
                <el-form :model="form">
                 
                  <el-form-item label="分类列表" :label-width="formLabelWidth" style="text-align:left">
                    <el-select v-model="form.region" >
                      <el-option label="一级分类" value="shanghai"></el-option>
                      
                    </el-select>
                  </el-form-item>

                   <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false,getAddFn()">确 定</el-button>
                </div>
              </el-dialog>
     </div>
</template>
<script>
import {getCategory,getUpdate,getAddgero} from "../api/common"
export default {
     data() {
      return {
        tableData: [],
        search: '',
        gero:{
            parentId:0,
            pageNum:1,
            pageSize:10
        },
        editobj:{
          categoryId:"",
          categoryName:""
        },
        addobj:{
          parentId:0,
          categoryName:"你大爷"
        },
        total:0,
        geroname:"",
        iright:"",
        display:true,
        dialogTableVisible: false,
        dialogFormVisible: false,
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
     
    },
    mounted(){//页面加载时要渲染的东西
       this.MyGero();
    },
    methods:{
      //修改分类
      handleEdit(index, row) {
        
                this.$prompt('请输入新的类名', '修改分类', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '不能为空'
              }).then((value) => {
                this.editobj.categoryId=row._id
                this.editobj.categoryName=value.value
              getUpdate(this.editobj).then((res)=>{
                  if(!res.data.status){
                    row.name=value.value
                  }
              })
               
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });       
              });
           
      },
      //查看子分类
      handleChildren(index, row) {
        this.geroname=row.name
        this.gero.parentId=row._id
        this.iright="el-icon-right"
        this.display=false
        this.MyGero()
      },
      MyGero(){
            getCategory(this.gero).then((res)=>{
              
                        if(!res.data.status){
                        this.tableData=res.data.data.list//数据列表
                       
                        this.total=res.data.data.total//总条数
                        
                        }
                    })
      },
      //改变页码
      handleCurrentChange(val){//当前页改变时触发
        this.gero.pageNum=val
        this.MyGero()
      },
     

      //查看一级分类
      handleOne(){
        this.gero.parentId=0
        this.geroname=""
        this.MyGero()
        this.iright=""
        this.display=true
      },
      // 添加分类
      getAddFn(){
        this.addobj.categoryName=this.form.name
        getAddgero(this.addobj).then((res)=>{
           if(!res.data.status){
            //  请求成功
            this.$message({
                  type: 'info',
                  message: '添加成功，哈哈'
                });   
           }
        })
      }



    }
  
  
}
</script>
<style lang="less">
  .c-head{
     padding:20px;
     overflow: hidden;
     border-bottom: 1px solid #ebeef5;
  }
.el-table_1_column_1  {
    border-right: 1px solid #EBEEF5;;
}

</style>