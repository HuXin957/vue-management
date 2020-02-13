import server from '../utlis/request.js'//导入这个,写下面的
//登陆
export function getLogin(obj){
    return server({
        method:"POST",
        url:"/api/login",
        data:obj
    })
}
//获取分类
export function getCategory(obj){
    return server({
        method:"GET",
        url:"/api/manage/category/list",
        params:obj,
        data:obj
        
    })
}
//更新
export function getUpdate(obj){
    return server({
        method:"POST",
        url:"/api/manage/category/update",
        data:obj
    })
}
//添加类别
export function getAddgero(obj){
    return server({
        method:"POST",
        url:"/api/manage/category/add",
        data:obj
    })
}
//获取用户
export function getUserInfo(obj){
    return server({
        method:"GET",
        url:"/api/manage/user/list",
        data:obj,
        params:obj
    })
}
//更新用户
export function getUpdateUser(obj){
    return server({
        method:"POST",
        url:"/api/manage/user/update",
        data:obj,
    })
}

// 删除
export function getDel(obj){
    return server({
        method:"POST",
        url:"/api/manage/user/delete",
        data:obj,
    })
}

//创建用户
export function getAddUser(obj){
    return server({
        method:"POST",
        url:"/api/manage/user/add",
        data:obj,
    })
}
//获取角色
export function getRole(obj){
    return server({
        method:"GET",
        url:"/api/manage/role/list",
        data:obj,
        params:obj
    })
}
//创建角色
export function getCreateRole(obj){
    return server({
        method:"POST",
        url:"/api/manage/role/add",
        data:obj
    })
}

//更新角色
export function getPermissions(obj){
    return server({
        method:"POST",
        url:"/api/manage/role/update",
        data:obj,
    })
}
//获取商品列表
export function getGoods(obj){
    return server({
        method:"GET",
        url:"/api/manage/product/list",
        data:obj,
        params:obj
    })
}
//搜索产品
export function getSearch(obj){
    return server({
        method:"GET",
        url:"/api/manage/product/search",
        data:obj,
        params:obj
    })
}
//上下架处理
export function getShelves(obj){
    return server({
        method:"POST",
        url:"/api/manage/product/updateStatus",
        data:obj,
        
    })
}
// 添加商品
export function getAddGoods(obj){
    return server({
        method:"POST",
        url:"/api/manage/product/add",
        data:obj,
        
    })
}
//更新商品
export function getModity(obj){
    return server({
        method:"POST",
        url:"/api/manage/product/update",
        data:obj,
        
    })
}
//订单列表
export function getOrderList(obj){
    return server({
        method:"GET",
        url:"/api/manage/order/list",
        data:obj,
        params:obj
        
    })
}
//订单搜索
export function getSearchOrder(obj){
    return server({
        method:"GET",
        url:"/api/manage/order/search",
        data:obj,
        params:obj
        
    })
}
//订单详情
export function getOrderdetail(obj){
    return server({
        method:"GET",
        url:"/api/manage/order/info",
        data:obj,
        params:obj
        
    })
}