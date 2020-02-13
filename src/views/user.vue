<template>
  <div>
    <!-- 头部 -->
    <div class="c-head">
      <el-button type="primary" size="mini" style="float:left" @click="dialogFormVisible = true,AddUserFn()">创建用户</el-button>
    </div>
    <!-- 内容 -->
    <el-card shadow="never" style="padding:20px;">
      <el-card shadow="never">
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <!-- 用户名 -->
          <el-table-column prop="username" label="用户名" width="268"></el-table-column>
          <!-- 邮箱 -->
          <el-table-column prop="email" label="邮箱" width="269"></el-table-column>
          <!-- 电话 -->
          <el-table-column prop="phone" label="电话" width="269"></el-table-column>
          <!-- 注册时间 -->
          <el-table-column prop="create_time" label="注册时间" width="269"></el-table-column>
          <!-- 权限角色 -->
          <el-table-column prop="name" label="权限角色" width="269"></el-table-column>
          <!-- 操作 -->
          <el-table-column prop="operation" label="操作" width="269">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogFormVisible = true,getModify(scope.$index, scope.row)"
              >修改</el-button>
              <el-button size="mini" @click="open(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 分页器 -->
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :page-size="userobj.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 弹出框 -->
    <!-- 标题 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="userForm">
        <!-- 用户名 -->
        <el-form-item  label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
          <!-- 密码 -->
        <el-form-item v-if="isShow" label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item
          label="角色"
          prop="role_id"
          :label-width="formLabelWidth"
          style="text-align:left"
        >
          <el-select v-model="form.role_id" placeholder="请选择">
            <!-- 选项 -->
            <el-option v-for="n in role" :key="n._id" :label="n.name" :value="n._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer" lot-scope="scope">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="dialogFormVisible = false, onSubmit('userForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框结束 -->

   
  </div>
</template>
<script>
import {getUserInfo,getUpdateUser,getDel,getAddUser} from "../api/common"
export default {
    data(){
        return{
            
            tableData:[],
            userobj:{
                pageNum:1,
                pageSize:5
            },
            perobj:{
                _id:null,
                menus:null,
                auth_time:null,
                auth_name:null
            },
            udateobj:{
                _id:"",
                username:"",
                phone:"",
                email:"",
                role_id:""
            },
            total:0,
             dialogTableVisible: false,
             dialogFormVisible: false,
             form: {
                 username:"",
                 phone:"",
                 email:"",
                 role_id:"",
                 password:""
                },
                 formLabelWidth: '120px',
        rules:{
            username:[
                {required:true,message:"请输入用户名",trigger:"blur"}
            ],
            phone:[
                {required:true,message:"请输入手机号",trigger:"blur"},
                {len:11,message:"手机号位数不对",trigger:"blur"}
                ],
            email:[
                {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                {type:"email", message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
            ]

        },
        role:[],
        userId:"",
        isShow:false,
        title:"",
        switch:""
               
        }
    },
      mounted(){
        this.getTimeFn()
        this.getUseInfos()
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
        getUseInfos() {
        // 获取用户列表请求
            getUserInfo(this.userobj).then((res)=>{
                if(!res.data.status){
                  this.total=res.data.data.total//总数据条数
                    this.role=res.data.data.roles//保存角色信息,以便下边修改角色使用

                    res.data.data.list.forEach((item)=>{
                        // 将转换时间更新
                        res.data.data.roles.forEach((myitem)=>{
                            
                            if(item.role_id==myitem._id){
                               item.name=myitem.name
                            }
                        })
                     item.create_time = new Date(item.create_time).Format('yy-MM-dd hh:mm:ss')
                        
                    })
                    this.tableData=res.data.data.list
                }
                
            })
            

        },
        // 页码
        handleCurrentChange(val){    
            this.userobj.pageNum=val
            this.getUseInfos()
        },
        //确定  创建/修改
        onSubmit(userForm){
            let _this=this
            this.$refs[userForm].validate((valid)=>{
                if(valid){
                    this.udateobj.role_id=this.form.role_id//权限id
                    this.udateobj.username=this.form.username
                    this.udateobj.phone=this.form.phone
                    this.udateobj.email=this.form.email
               if(this.switch){
                 getUpdateUser(this.udateobj).then((res)=>{
                    if(!res.data.status){
                
                    //重新发送获取用户列表请求,重新渲染
                    _this.getUseInfos()
                    
                    this.$message({
                            type: 'success',
                            message: '修改成功'
                    });
                    }
                    
                })
               }else{
                 //创建用户请求
                 getAddUser(this.form).then((res)=>{
                   _this.getUseInfos()//重新渲染
                    this.$message({
                            type: 'success',
                            message: '添加成功'
                    });
                 })
               }
                
                }else{
                    this.$message("请补全信息!");
                        return false;
                }
            })
        },
        getModify(index,row){//点击修改时
        this.switch=true
        this.title="修改用户"
            this.isShow=false
            this.udateobj._id=row._id//保存当前记录id
            this.form.username=row.username
            this.form.email=row.email
            this.form.phone=row.phone
            this.form.role_id=row.name
        },
      //删除确认框
      getDel(index,row){
          this.userId=row._id
      },
       open(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //删除请求 
             getDel( {userId:row._id}).then((res)=>{
                if(!res.data.status){ 
                    this.getUseInfos()//重新渲染
                    //请求成功
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }   
            })

        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

    //   清空
    clear(){
            this.form.username=""
            this.form.email=""
            this.form.phone=""
            this.form.role_id=""
            this.form.password=""
    },
      //点击创建用户
      AddUserFn(){
          this.clear()//清空input
          this.isShow=true
          this.title="创建用户"
          this.switch=false
      },
      
  
    }
}
</script>
<style lang="less">
</style>