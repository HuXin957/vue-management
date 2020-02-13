<template>
<div>


    <div class="c-head">
      <el-button type="primary" size="mini" style="float:left" @click="open">创建角色</el-button>
    </div>
    <!-- 中间内容 -->
     <el-card shadow="never" style="padding:20px;">
      <el-card shadow="never">
        <!-- 表格 -->
        <el-table border style="width: 100%" :data="tableData">
          <!-- 角色名称 -->
          <el-table-column prop="name" label="角色名称" width="325"></el-table-column>
          <!-- 创建时间 -->
          <el-table-column prop="create_time" label="创建时间" width="322"></el-table-column>
          <!-- 授权时间 -->
          <el-table-column prop="auth_time" label="授权时间" width="322"></el-table-column>
          <!-- 授权人 -->
          <el-table-column prop="auth_name" label="授权人" width="322"></el-table-column>
          <!-- 操作 -->
          <el-table-column prop="operation" label="操作" width="322">
            <template slot-scope="scope">
              <el-button size="mini" @click="dialogFormVisible = true,SetPermisFn(scope.$index, scope.row)">设置权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
         <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :page-size="roleobj.pageSize"
        :total="total"
       @current-change="handleCurrentChange"  
        >
        </el-pagination>
      </el-card>
     </el-card>
      <!-- 内容结束 -->
   <!-- 弹框 -->
   <el-dialog title="设置权限" :visible.sync="dialogFormVisible" style="text-align:left">
     <el-tag>当前设置角色：{{nowName}}</el-tag>
  <div slot="footer" class="dialog-footer">
  <el-form :model="form">
      <!-- 树状菜单 -->
            <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
     
  </el-form>
   
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,getSureFn()">确 定</el-button>
  </div>
</el-dialog>


</div>
</template>
<script>
import {getRole,getCreateRole,getPermissions} from "../api/common"
export default {
  
    data(){
      return{
          data: [{
          id: "/home",
          label: '首页',
         
        }, {
          id: "/goods",
          label: '商品',
          children: [{
            id:"/category",
            label: '品类管理'
          }, {
            id: "/product",
            label: '商品管理'
          }]
        }, {
          id: "/users",
          label: '用户',
          children: [{
            id: "/user",
            label: '用户管理'
          }, {
            id: "/role",
            label: '权限管理'
          }]
        }, {
          id: "/orders",
          label: '订单',
          children: [{
            id: "/order",
            label: '订单管理'
          }]
        }],

           defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData:[],
        roleobj:{
          pageNum:1,
          pageSize:10
        },
        total:0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form:{
          name:""
        },
        perobj:{
          _id:"",
          menus:[],
          auth_time:null,
          auth_name:""
        },
        nowName:"",
        authPerson:"",



      }
      
    },
    mounted(){
      this.getTimeFn()
      this.updateRole()
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
      //获取角色列表
      updateRole(){
        getRole(this.roleobj).then((res)=>{
          if(!res.data.status){
            this.tableData=res.data.data.list
            this.total=res.data.data.total
            res.data.data.list.forEach((item)=>{
               item.create_time = new Date(item.create_time).Format('yy-MM-dd hh:mm:ss')
               item.auth_time = new Date(item.auth_time).Format('yy-MM-dd hh:mm:ss')
            })
         
          }
          
        })
      },
        // 页码
     handleCurrentChange(val){    
        this.roleobj.pageNum=val
        this.updateRole()
    },
    //创建角色
    CreateRoleFn(value){
      getCreateRole({roleName:value}).then((res)=>{
        if(!res.data.status){
         this.updateRole()
          //msg
          this.$message({
            type: 'success',
            message: "添加成功"
          });
        }
      })
    },
    //弹框
    open() {
        this.$prompt('请输入角色名', '添加角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          //确定
          this.CreateRoleFn(value)
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您倒是添加呀！'
          });       
        });
      },
      //点击设置权限
      SetPermisFn(index,row){
        this.authPerson=JSON.parse(localStorage.getItem("userdata")).username
        this.nowName=row.name
        this.perobj.auth_time=row.auth_time
        this.perobj.auth_name=this.authPerson
        this.perobj._id=row._id
      },
      //确定
      getSureFn(){
        this.perobj.menus=this.$refs.tree.getCheckedKeys()
        getPermissions(this.perobj).then((res)=>{
          if(!res.data.status){
            //请求成功
            this.updateRole()
            this.$message({
            type: 'success',
            message: "设置成功！"
          });
          }
        })
      },
    },
}
</script>
<style lang="less">
    .el-dialog__body{
      text-align: center;
    }
</style>