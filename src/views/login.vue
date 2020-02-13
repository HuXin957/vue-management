<template>
<div class="wrap">
       <div class="form-box">
           <h1 class="h1">登录</h1>
          <el-form status-icon :model="form" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input  placeholder="输入用户名" prefix-icon="el-icon-user" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" type="password"  prefix-icon="el-icon-lock" v-model="form.password" @keydown.enter="onSubmit('loginForm')"></el-input>
                </el-form-item>
                <el-form-item>
                 <el-button type="primary" @click="onSubmit('loginForm')" >登录</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>


<script>
import {getLogin} from "../api/common"//导入
export default {
    data(){
        return{
            form:{
                username:"",
                password:""
            },
            rules:{
                username:[
                   { required: true, message: '用户名不能为空', trigger: 'change' },
                   { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'change' }
                ],
                password:[
                   { required: true, message: '密码不能为空', trigger: 'change' },//必填验证
                   { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'change' }//长度验证
                ]
            }
        }
    },
    methods:{
        onSubmit(loginForm){
            this.$refs[loginForm].validate((valid)=>{
                if(valid){
                    getLogin(this.form).then((res)=>{
                        if(!res.data.status){
                           this.$store.commit("CHANGEUSERINFO",res.data.data)//往仓库传的东西，可删
                           localStorage.setItem('userdata',JSON.stringify(res.data.data))
                            this.$router.push("/home/index")
                        }else{
                            this.$message("用户名或密码输入错误!");
                        }
                    })
                }else{
                    this.$message("用户名或密码输入错误!");
                    return false;
                }
            })
        },    
    }
}
</script>



<style lang="less">
*{
    margin: 0;
    padding: 0;
}
html,body{
    height:100%;
    width:100%;
}
#app{
    height:100%;
}
 .wrap{
     width:100%;
     height:100%;
      background: url('../assets/background.jpg') no-repeat;
      background-size:cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center
}
.h1{
    text-align: center;
    font-size: 30px;
    color: #333;
    padding:10px;
    font-weight: 300;
    letter-spacing: 5px;
}
.form-box{
    width:400px;
    padding:20px 40px;
    box-sizing: border-box;
    border:2px solid gainsboro;
    border-radius: 20px;
    box-shadow: 2px 2px gray;
}   
.form-box button{
          width: 100%
      }

</style>