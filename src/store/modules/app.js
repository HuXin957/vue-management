import {CHANGEUSERINFO} from '../mutation-types'
var app={
    state:{
        
        userInfo:{
            username:"",
            img:""
        }
    },
    mutations:{
        [CHANGEUSERINFO]:function(state,userObj){
            state.userInfo.username=userObj.username
        }
    }
}
export default app