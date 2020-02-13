import axios from "axios";//统一配置
var server = axios.create({
    baseURL:'/',
    timeout:6000,
    headers:{
        'classes':1923
    }
})

export default server