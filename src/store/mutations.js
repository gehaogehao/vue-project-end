import {GETADDRESSOBJ,GETCATEGORYARR,GETSHOPSARR,GETUSER,CLEARUSER,AUTOLOGIN,GETSELLERS,GETGOODS} from './mutation-type'
export default {
    [GETADDRESSOBJ](state,addressObj){
        state.addressObj = addressObj
    },
    [GETCATEGORYARR](state,categoryArr){
        state.categoryArr = categoryArr
    },
    [GETSHOPSARR](state,shopsArrs){
        state.shopsArr = shopsArrs
    },
    [GETUSER](state,user){
        state.user = user
        state.token = user.token
    },
    [CLEARUSER](state){
        state.user = {}
        state.token = ""
    },
    [AUTOLOGIN](state,user){
        state.user = user
    },
    [GETSELLERS](state,sellers){
        state.sellersData = sellers
    },
    [GETGOODS](state,goods){
        state.goods = goods
    }
}