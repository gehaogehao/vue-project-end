import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'
import {AUTOLOGIN} from '@/store/mutation-type.js'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}  


const router = new VueRouter({
    routes,
    mode:"history",
    linkActiveClass:"active"
})
router.beforeEach(async (to,from,next)=>{
    if(to.path !== '/login'){
        await store.dispatch(AUTOLOGIN)
        if(store.state.user._id){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})
router.beforeResolve((to,from,next)=>{
    next()
})
router.afterEach((to,from)=>{})

export default router